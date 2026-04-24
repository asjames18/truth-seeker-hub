import { Link, useLocation } from "@tanstack/react-router";
import { Play, Pause, Volume2, VolumeX, Radio, Loader2 } from "lucide-react";
import { useRadio } from "./RadioProvider";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function RadioMiniPlayer() {
  const { isPlaying, isLoading, isMuted, volume, error, toggle, setVolume, setMuted } = useRadio();
  const location = useLocation();

  // Hide on the dedicated radio page (it has its own player UI)
  if (location.pathname === "/radio") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-secondary/20 bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2 sm:px-6 sm:py-2.5">
        <Button
          onClick={toggle}
          size="icon"
          variant="default"
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
          className="h-10 w-10 shrink-0 rounded-full"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
        </Button>

        <Link to="/radio" className="flex min-w-0 flex-1 items-center gap-2 group">
          <div className="relative shrink-0">
            <Radio className="h-4 w-4 text-secondary" />
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-secondary group-hover:text-primary transition-colors">
              RRG Radio {isPlaying && <span className="text-primary">· Live</span>}
            </div>
            <div className="truncate text-[11px] text-muted-foreground hidden sm:block">
              {error ? error : "Hebrew-rooted music · teaching · prayer"}
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 w-40">
          <Button
            onClick={() => setMuted(!isMuted)}
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={([v]) => { setVolume(v / 100); if (v > 0 && isMuted) setMuted(false); }}
            max={100}
            step={1}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
