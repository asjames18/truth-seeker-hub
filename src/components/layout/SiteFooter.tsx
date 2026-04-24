import { Link } from "@tanstack/react-router";
import logo from "@/assets/rrg-logo.jpg";

const FOOTER_GROUPS = [
  {
    title: "Discover",
    links: [
      { to: "/start-here", label: "Start Here" },
      { to: "/blog", label: "Blog" },
      { to: "/devotionals", label: "Devotionals" },
      { to: "/videos", label: "Videos" },
    ],
  },
  {
    title: "Ministry",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/donate", label: "Donate" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/40 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Real & Raw Gospel"
                className="h-10 w-10 rounded-md ring-1 ring-border"
              />
              <div>
                <div className="font-serif text-xl font-semibold">Real &amp; Raw Gospel</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-secondary">
                  Truth. Discipleship. Fire.
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A discipleship ministry preaching the unfiltered gospel — calling
              believers into truth, identity, and weekly spiritual growth.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Real &amp; Raw Gospel. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="scripture">
              "For the word of God is alive and active." — Hebrews 4:12
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
