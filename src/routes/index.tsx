import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Flame, BookOpen, Crown, Calendar, Scroll, Heart } from "lucide-react";
import logo from "@/assets/rrg-logo.jpg";

interface HomeData {
  latestPosts: Array<{ slug: string; title: string; summary: string | null; published_at: string | null }>;
  featuredTerms: Array<{ id: string; term: string; meaning: string; context: string | null; category: string }>;
}

async function loadHome(): Promise<HomeData> {
  const [postsRes, termsRes] = await Promise.all([
    supabase
      .from("posts")
      .select("slug,title,summary,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3),
    supabase
      .from("hebrew_terms")
      .select("id,term,meaning,context,category")
      .eq("published", true)
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(8),
  ]);
  return {
    latestPosts: postsRes.data ?? [],
    featuredTerms: termsRes.data ?? [],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raw & Real Gospel — Restoring Truth, Identity, and Covenant" },
      { name: "description", content: "Hebrew-rooted prophetic ministry. YAHUAH. YAHUSHA HA'MASHIACH. RUACH HAQODESH. Wake up. Return. Walk set-apart." },
      { property: "og:title", content: "Raw & Real Gospel — Restoring Truth, Identity, and Covenant" },
      { property: "og:description", content: "Hebrew-rooted prophetic ministry. Wake up. Return. Walk set-apart." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: () => loadHome(),
  component: HomePage,
});

const SACRED = [
  {
    name: "YAHUAH",
    sub: "The Set-Apart Name of the Father",
    body: "He exists. He causes to be. The Name above every name — restored on our lips, not hidden behind titles.",
    accent: "ember",
  },
  {
    name: "YAHUSHA",
    sub: "HA'MASHIACH · The Anointed One",
    body: '"YAHUAH is salvation." The Name His mother spoke, the Name the disciples preached, the Name no man can erase.',
    accent: "gold",
  },
  {
    name: "RUACH HAQODESH",
    sub: "The Set-Apart Spirit · Sacred Breath",
    body: "Not a force. The very breath of YAHUAH — poured out at Shavu'oth, sealing the BERITH inside His people.",
    accent: "ember",
  },
];

function HomePage() {
  const { latestPosts, featuredTerms } = Route.useLoaderData();

  return (
    <div className="overflow-hidden">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative noise-overlay">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.620_0.165_42/0.22),transparent_55%),radial-gradient(ellipse_at_bottom,oklch(0.730_0.110_80/0.10),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28 text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-card ring-1 ring-secondary/30 shadow-2xl shadow-primary/20">
            <img src={logo} alt="" className="h-16 w-16 rounded-lg" />
          </div>

          <p className="paleo-strip mb-5">⊥ † ⊥ ⊕ ⊥ † ⊥</p>

          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
            <Flame className="h-3.5 w-3.5" /> Truth · Identity · Covenant
          </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-semibold leading-[1.02] tracking-tight">
            Raw &amp; Real <span className="text-primary">Gospel</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-xl sm:text-2xl text-foreground/85 leading-snug italic">
            Restoring Truth, Identity, and Covenant.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A Hebrew-rooted prophetic ministry calling the remnant out of Babylon and back to YAHUAH — through Scripture, Mo'edim, and the unfiltered BESORAH of YAHUSHA HA'MASHIACH.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="text-base">
              <Link to="/start-here">Start Here <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-secondary/50 text-secondary hover:text-secondary hover:bg-secondary/10">
              <Link to="/hebrew-terms">Hebrew Terms</Link>
            </Button>
          </div>

          <p className="scripture mt-12 text-lg">
            "Stand in the ways and see, ask for the ancient paths… and walk in it." — Yirmeyahu 6:16
          </p>
        </div>
      </section>

      {/* ─────────────── SACRED NAMES ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section I</p>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold tracking-tight">
            The <span className="text-primary">Sacred Names.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Names are not interchangeable. They carry covenant, authority, and identity. Restore the Name. Restore the walk.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SACRED.map((s) => (
            <article key={s.name} className="group relative rounded-lg border border-border bg-card p-8 hover:-translate-y-0.5 hover:border-primary/60 transition shadow-xl shadow-black/30">
              <div className="absolute top-0 left-8 h-1 w-12 -translate-y-1/2 rounded-full" style={{ background: s.accent === "ember" ? "var(--color-ember)" : "var(--color-gold)" }} />
              <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-foreground">{s.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-secondary">{s.sub}</p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 hover:text-secondary">
            <Link to="/hebrew-terms">Explore the full lexicon <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ─────────────── HEBREW TERMS PARCHMENT PANEL ─────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scroll-panel rounded-lg p-8 sm:p-14 noise-overlay">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--color-oxblood)" }}>Section II · The Lexicon</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight" style={{ color: "var(--color-scroll-fg)" }}>
                Hebrew Terms <em className="text-[var(--color-oxblood)] not-italic">·</em> Meanings <em className="text-[var(--color-oxblood)] not-italic">·</em> Usage
              </h2>
              <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--color-scroll-muted)" }}>
                Learn the words YAHUSHA spoke. Speak them with reverence. Walk them with EMUNAH.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(featuredTerms.length > 0 ? featuredTerms : SEED_FALLBACK).map((t) => (
                <article key={t.id ?? t.term} className="rounded-md border bg-[oklch(0.96_0.025_85)] p-5 transition hover:shadow-lg" style={{ borderColor: "var(--color-scroll-border)" }}>
                  <h4 className="font-display text-xl tracking-wide" style={{ color: "var(--color-oxblood)" }}>{t.term}</h4>
                  <p className="mt-2 text-sm font-medium leading-snug" style={{ color: "var(--color-scroll-fg)" }}>{t.meaning}</p>
                  {t.context && (
                    <p className="mt-2 text-xs leading-relaxed border-t pt-2" style={{ color: "var(--color-scroll-muted)", borderColor: "var(--color-scroll-border)" }}>
                      {t.context}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild className="bg-[var(--color-oxblood)] text-[var(--color-scroll-bg)] hover:bg-[var(--color-oxblood)]/90">
                <Link to="/hebrew-terms">Open the full library <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── TORAH & COVENANT ─────────────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section III</p>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold tracking-tight">
              <span className="text-primary">TORAH.</span> BERITH. The walk that was never abolished.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              The instructions of YAHUAH are not chains — they are the path of life. The covenant cut with Avraham, sealed in YAHUSHA's blood, written on hearts by RUACH HAQODESH. One people. One walk. One King.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/torah">Walk the Torah <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary">
                <Link to="/hebrew-terms">Covenant Words</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { icon: Scroll, title: "TORAH", body: "Instruction. Teaching. The blueprint." },
              { icon: Crown, title: "BERITH", body: "Covenant cut, sealed, renewed in MASHIACH." },
              { icon: Flame, title: "TESHUVAH", body: "Return. Repent. Walk back into the Way." },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xl tracking-wide">{c.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── MO'EDIM ─────────────── */}
      <section className="relative py-20">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-card/60 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section IV</p>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-semibold tracking-tight">
              The <span className="text-primary">Mo'edim.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed">
              Seven appointed times. YAHUAH's calendar — not man's. A prophetic blueprint from Pesach to Sukkoth.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "PESACH", en: "Passover" },
              { name: "MATSAH", en: "Unleavened Bread" },
              { name: "BIKKURIYM", en: "Firstfruits" },
              { name: "SHAVU'OTH", en: "Weeks · Pentecost" },
              { name: "YOM TERUAH", en: "Day of Trumpets" },
              { name: "YOM KIPPURIYM", en: "Day of Atonements" },
              { name: "SUKKOTH", en: "Tabernacles" },
              { name: "SHABBATH", en: "The Weekly Sign" },
            ].map((f, i) => (
              <article key={f.name} className="rounded-lg border border-border bg-card p-5 hover:border-primary/60 transition">
                <span className="font-display text-xs text-secondary tabular-nums">No. {String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-1.5 font-display text-xl tracking-wide">{f.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{f.en}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary">
              <Link to="/moedim"><Calendar className="h-4 w-4" /> Open the calendar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────── BLOG / TEACHING HUB ─────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section V · Teaching Hub</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              From the <span className="text-primary">Sefer.</span>
            </h2>
          </div>
          <Link to="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary/80">
            All teaching <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <Card className="bg-card border-dashed">
            <CardContent className="py-14 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">Teaching articles will appear here as they're published.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group">
                <Card className="h-full bg-card transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.summary && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{post.summary}</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ─────────────── CTA: WAKE UP ─────────────── */}
      <section className="relative noise-overlay py-24">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.620_0.165_42/0.25),transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="paleo-strip mb-5">⊥ † ⊥</p>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02]">
            Wake up. <span className="text-primary">Return.</span><br />
            Walk set-apart.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The hour is late. The QAHAL is being gathered. Step out of Babylon. Step into the BERITH.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="text-base"><Link to="/start-here">Begin <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="text-base border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary">
              <Link to="/donate"><Heart className="h-4 w-4" /> Partner</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Fallback in case loader returns no featured terms (DB unreachable)
const SEED_FALLBACK = [
  { id: "f1", term: "YAHUAH", meaning: "The Set-Apart Name of the Father", context: "He exists; He causes to be.", category: "sacred-names" },
  { id: "f2", term: "YAHUSHA", meaning: "Name of the Messiah", context: "YAH is salvation.", category: "sacred-names" },
  { id: "f3", term: "TORAH", meaning: "Instruction, teaching", context: "The path of life, not law for slaves.", category: "covenant" },
  { id: "f4", term: "SHABBATH", meaning: "The seventh-day rest", context: "The weekly sign of the BERITH.", category: "covenant" },
];
