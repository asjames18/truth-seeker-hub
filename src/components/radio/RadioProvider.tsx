import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react";
import Hls from "hls.js";

const HLS_URL = "https://radio.realandrawgospel.com/hls/rrg_radio.m3u8";
const MP3_URL = "https://radio.realandrawgospel.com/listen/rrg_radio/stream";

type StreamMode = "hls" | "mp3" | "idle";

type RadioContextValue = {
  isPlaying: boolean;
  isLoading: boolean;
  isMuted: boolean;
  volume: number;
  mode: StreamMode;
  error: string | null;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const RadioContext = createContext<RadioContextValue | null>(null);

const isIOS = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && (navigator as Navigator & { maxTouchPoints: number }).maxTouchPoints > 1));

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttempts = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMutedState] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [mode, setMode] = useState<StreamMode>("idle");
  const [error, setError] = useState<string | null>(null);

  const cleanupHls = useCallback(() => {
    if (hlsRef.current) {
      try { hlsRef.current.destroy(); } catch { /* noop */ }
      hlsRef.current = null;
    }
  }, []);

  const loadMp3 = useCallback((audio: HTMLAudioElement) => {
    cleanupHls();
    setMode("mp3");
    // Cache-bust to avoid stale buffered chunks on reconnect
    audio.src = `${MP3_URL}?t=${Date.now()}`;
    audio.load();
  }, [cleanupHls]);

  const loadHls = useCallback((audio: HTMLAudioElement) => {
    cleanupHls();
    if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      setMode("hls");
      audio.src = HLS_URL;
      audio.load();
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true, liveSyncDurationCount: 3 });
      hlsRef.current = hls;
      hls.loadSource(HLS_URL);
      hls.attachMedia(audio);
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) {
          // Fall back to MP3 on fatal HLS errors
          loadMp3(audio);
          audio.play().catch(() => { /* noop */ });
        }
      });
      setMode("hls");
      return;
    }
    loadMp3(audio);
  }, [cleanupHls, loadMp3]);

  const initSource = useCallback((audio: HTMLAudioElement) => {
    if (isIOS()) {
      loadMp3(audio);
    } else {
      loadHls(audio);
    }
  }, [loadHls, loadMp3]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    setIsLoading(true);
    try {
      if (mode === "idle" || !audio.src) {
        initSource(audio);
      }
      await audio.play();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to play stream");
      setIsLoading(false);
    }
  }, [mode, initSource]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const setMuted = useCallback((m: boolean) => {
    setIsMutedState(m);
    if (audioRef.current) audioRef.current.muted = m;
  }, []);

  // Watchdog: reconnect on unexpected pause/stall while playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      reconnectAttempts.current = 0;
    };
    const onWaiting = () => setIsLoading(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsLoading(false);
      // Attempt reconnect with backoff
      if (reconnectAttempts.current < 5) {
        reconnectAttempts.current += 1;
        const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 10000);
        reconnectTimer.current = setTimeout(() => {
          // On error, try MP3 as a more reliable fallback
          loadMp3(audio);
          audio.play().catch(() => { /* noop */ });
        }, delay);
      } else {
        setError("Stream unavailable. Please try again later.");
      }
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("stalled", onWaiting);

    audio.volume = volume;
    audio.muted = isMuted;

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("stalled", onWaiting);
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      cleanupHls();
    };
    // Only on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<RadioContextValue>(() => ({
    isPlaying, isLoading, isMuted, volume, mode, error,
    play, pause, toggle, setVolume, setMuted, audioRef,
  }), [isPlaying, isLoading, isMuted, volume, mode, error, play, pause, toggle, setVolume, setMuted]);

  return (
    <RadioContext.Provider value={value}>
      {children}
      {/* Single persistent audio element for the entire app */}
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" playsInline />
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("useRadio must be used within RadioProvider");
  return ctx;
}
