import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/rrg-logo.jpg";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/start-here", label: "Start Here" },
  { to: "/hebrew-terms", label: "Hebrew Terms" },
  { to: "/torah", label: "Torah" },
  { to: "/moedim", label: "Mo'edim" },
  { to: "/blog", label: "Sefer" },
  { to: "/devotionals", label: "Devotionals" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary/15 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Raw & Real Gospel"
            className="h-9 w-9 rounded-md ring-1 ring-secondary/30 group-hover:ring-primary/60 transition"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg tracking-wide text-foreground">
              RAW &amp; REAL <span className="text-primary">GOSPEL</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-secondary">
              Truth · Identity · Covenant
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
            <Link to="/donate"><Flame className="h-3.5 w-3.5" /> Partner</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex border-secondary/40 text-secondary hover:bg-secondary/10 hover:text-secondary">
            <a href="/auth">Sign In</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[380px]">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex items-center gap-3 mb-8 mt-2">
                <img src={logo} alt="" className="h-10 w-10 rounded-md" />
                <div>
                  <div className="font-display text-lg tracking-wide">RAW &amp; REAL GOSPEL</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-secondary">
                    Truth · Identity · Covenant
                  </div>
                </div>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
                    activeProps={{
                      className: "px-3 py-3 rounded-md text-base font-semibold bg-primary/10 text-primary",
                    }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-2 border-t border-border/50 pt-6">
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link to="/donate">Partner with the Mission</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/auth" onClick={() => setOpen(false)}>Sign In</a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
