import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon, Loader2, Flame } from "lucide-react";
import { useRadio } from "@/components/radio/RadioProvider";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/radio")({
  head: () => ({
    meta: [
      { title: "RRG Radio — Live Hebrew-Rooted Stream" },
      { name: "description", content: "Listen live to Raw & Real Gospel Radio — Hebrew-rooted music, teaching, prayer, and prophetic broadcasts streaming 24/7." },
      { property: "og:title", content: "RRG Radio — Live" },
      { property: "og:description", content: "Hebrew-rooted music, teaching, and prophetic broadcasts. Streaming 24/7." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RadioPage,
});

function RadioPage() {
  const { isPlaying, isLoading, isMuted, volume, mode, error, toggle, setVolume, setMuted } = useRadio();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section · Live Broadcast</p>
      <h1 className="mt-2 font-display text-4xl sm:text-6xl font-semibold tracking-tight">
        RRG <span className="text-primary">Radio.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        A 24/7 stream of Hebrew-rooted music, teaching, prayer, and prophetic word — calling the remnant back to TORAH, BERITH, and the unfiltered BESORAH.
      </p>

      <div className="mt-12 scroll-panel rounded-2xl p-8 sm:p-12 noise-overlay">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full ${isPlaying ? "animate-ping bg-primary/30" : ""}`} />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-oxblood shadow-2xl shadow-primary/30">
              <RadioIcon className="h-14 w-14 text-primary-foreground" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--color-oxblood)" }}>
              {isPlaying ? "● Live · On Air" : isLoading ? "Connecting..." : "Off Air"}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold" style={{ color: "var(--color-scroll-fg)" }}>
              Raw & Real Gospel Radio
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--color-scroll-muted)" }}>
              Hebrew-rooted music · teaching · prayer · prophetic word
            </p>
          </div>

          <Button
            onClick={toggle}
            size="lg"
            className="mt-8 h-16 w-16 rounded-full p-0"
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 translate-x-0.5" />
            )}
          </Button>

          <div className="mt-8 flex w-full max-w-xs items-center gap-3">
            <Button
              onClick={() => setMuted(!isMuted)}
              size="icon"
              variant="ghost"
              className="shrink-0"
              style={{ color: "var(--color-scroll-fg)" }}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={([v]) => { setVolume(v / 100); if (v > 0 && isMuted) setMuted(false); }}
              max={100}
              step={1}
              aria-label="Volume"
            />
          </div>

          {error && (
            <p className="mt-6 text-sm text-destructive">{error}</p>
          )}

          {mode !== "idle" && (
            <p className="mt-6 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--color-scroll-muted)" }}>
              Stream: {mode.toUpperCase()}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="mt-3 font-serif text-lg font-semibold">Set-Apart Sound</h3>
          <p className="mt-1 text-sm text-muted-foreground">Music and worship that calls on the Name.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <RadioIcon className="h-5 w-5 text-secondary" />
          <h3 className="mt-3 font-serif text-lg font-semibold">Live Teaching</h3>
          <p className="mt-1 text-sm text-muted-foreground">Hebrew-rooted study and prophetic broadcasts.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <Volume2 className="h-5 w-5 text-secondary" />
          <h3 className="mt-3 font-serif text-lg font-semibold">24/7 Stream</h3>
          <p className="mt-1 text-sm text-muted-foreground">Always on. Tune in anytime, anywhere.</p>
        </div>
      </div>
    </div>
  );
}
