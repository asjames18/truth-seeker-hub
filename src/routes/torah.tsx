import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scroll, Crown, Heart } from "lucide-react";

export const Route = createFileRoute("/torah")({
  head: () => ({
    meta: [
      { title: "Torah & Berith — Raw & Real Gospel" },
      { name: "description", content: "TORAH (instruction) and BERITH (covenant) — the foundation of walking set-apart with YAHUAH and YAHUSHA HA'MASHIACH." },
      { property: "og:title", content: "Torah & Covenant — Raw & Real Gospel" },
      { property: "og:description", content: "TORAH and BERITH — the foundation of the set-apart walk." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: TorahPage,
});

function TorahPage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="paleo-strip mb-4">⊥ † ⊥</p>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Torah · Berith</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold tracking-tight">
          Instruction. <span className="text-primary">Covenant.</span> Walk.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          TORAH is not law for slaves — it is instruction for sons and daughters of YAHUAH. BERITH is the covenant cut, sealed, and renewed in YAHUSHA HA'MASHIACH.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 grid gap-6 md:grid-cols-3">
        {[
          { icon: Scroll, title: "TORAH", sub: "Instruction · Teaching", body: "The five books of Mosheh — the foundation YAHUSHA Himself walked, taught, and fulfilled. Not abolished. Written on hearts." },
          { icon: Crown, title: "BERITH", sub: "Covenant", body: "From Avraham to the cross — one continuous covenant family. Grafted in, not replaced. Sealed by blood, lived in EMUNAH (faith)." },
          { icon: Heart, title: "TESHUVAH", sub: "Return · Repentance", body: "The first word of every prophet: turn. Not feel guilty — turn. Walk the other way. Walk back into the BERITH." },
        ].map((c) => (
          <article key={c.title} className="rounded-lg border border-border bg-card p-7">
            <c.icon className="h-7 w-7 text-primary mb-4" />
            <h3 className="font-display text-3xl tracking-wide">{c.title}</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-secondary mt-1">{c.sub}</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="scroll-panel rounded-lg p-10 sm:p-14 noise-overlay text-center">
          <p className="paleo-strip mb-5" style={{ color: "var(--color-oxblood)", opacity: 0.5 }}>⊥ † ⊥</p>
          <p className="font-serif text-2xl sm:text-3xl leading-snug italic" style={{ color: "var(--color-oxblood)" }}>
            "If you love Me, you will keep My commandments."
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--color-scroll-muted)" }}>
            — YAHUSHA · Yochanan (John) 14:15
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">Keep walking.</h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link to="/hebrew-terms">Hebrew Terms <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/moedim">Mo'edim Calendar</Link></Button>
        </div>
      </section>
    </div>
  );
}
