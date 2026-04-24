import { Link } from "@tanstack/react-router";
import logo from "@/assets/rrg-logo.jpg";

const FOOTER_GROUPS = [
  {
    title: "Walk",
    links: [
      { to: "/start-here" as const, label: "Start Here" },
      { to: "/hebrew-terms" as const, label: "Hebrew Terms" },
      { to: "/torah" as const, label: "Torah · Berith" },
      { to: "/moedim" as const, label: "Mo'edim" },
    ],
  },
  {
    title: "Sefer",
    links: [
      { to: "/blog" as const, label: "Teaching" },
      { to: "/devotionals" as const, label: "Devotionals" },
      { to: "/about" as const, label: "About" },
      { to: "/contact" as const, label: "Contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary/15 bg-card/40 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="Raw & Real Gospel" className="h-10 w-10 rounded-md ring-1 ring-secondary/30" />
              <div>
                <div className="font-display text-xl tracking-wide">RAW &amp; REAL <span className="text-primary">GOSPEL</span></div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-secondary">Truth · Identity · Covenant</div>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A Hebrew-rooted prophetic ministry — restoring the Names, the Mo'edim, the BERITH, and the unfiltered BESORAH of YAHUSHA HA'MASHIACH.
            </p>
            <p className="mt-4 paleo-strip">⊥ † ⊥ ⊕ ⊥ † ⊥</p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-sm uppercase tracking-[0.22em] text-secondary mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-secondary/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Raw &amp; Real Gospel. HalleluYAH.
          </p>
          <p className="text-xs">
            <span className="scripture">"Stand in the ways and see, ask for the ancient paths." — Yirmeyahu 6:16</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
