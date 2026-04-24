import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Calendar, Scroll, Heart } from "lucide-react";
import logo from "@/assets/rrg-logo.jpg";
import heroScroll from "@/assets/hero-scroll-flame.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// Loader: pull live data from Supabase. Everything below the hero is real.
// ─────────────────────────────────────────────────────────────────────────────

interface HomeData {
  latestPosts: Array<{ slug: string; title: string; summary: string | null; published_at: string | null }>;
  featuredTerms: Array<{ id: string; term: string; meaning: string; context: string | null; transliteration: string | null }>;
  nextFeast: { slug: string; title: string; start_date: string; category: string; short_description: string | null } | null;
  todayDevotional: { slug: string; title: string; theme: string; passage_ref: string; passage_text: string } | null;
}

async function loadHome(): Promise<HomeData> {
  const today = new Date().toISOString().slice(0, 10);
  const [postsRes, termsRes, feastRes, devRes] = await Promise.all([
    supabase
      .from("content")
      .select("slug,title,summary,published_at")
      .eq("content_type", "blog")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3),
    supabase
      .from("hebrew_terms")
      .select("id,term,meaning,context,transliteration")
      .eq("published", true)
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(6),
    supabase
      .from("feast_calendar_entries")
      .select("slug,title,start_date,category,short_description")
      .gte("start_date", today)
      .order("start_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("devotionals")
      .select("slug,title,theme,passage_ref,passage_text,published_at,created_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    latestPosts: postsRes.data ?? [],
    featuredTerms: termsRes.data ?? [],
    nextFeast: feastRes.data ?? null,
    todayDevotional: devRes.data
      ? {
          slug: devRes.data.slug,
          title: devRes.data.title,
          theme: devRes.data.theme,
          passage_ref: devRes.data.passage_ref,
          passage_text: devRes.data.passage_text,
        }
      : null,
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raw & Real Gospel — Restoring Truth, Identity, and Covenant" },
      {
        name: "description",
        content:
          "Hebrew-rooted prophetic ministry. YAHUAH. YAHUSHA HA'MASHIACH. RUACH HAQODESH. Walk the ancient paths. Honor the Mo'edim. Return to the BERITH.",
      },
      { property: "og:title", content: "Raw & Real Gospel — Restoring Truth, Identity, and Covenant" },
      {
        property: "og:description",
        content: "Hebrew-rooted prophetic ministry. Walk the ancient paths. Honor the Mo'edim. Return to the BERITH.",
      },
      { property: "og:image", content: heroScroll },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroScroll },
    ],
  }),
  loader: () => loadHome(),
  component: HomePage,
});

// ─────────────────────────────────────────────────────────────────────────────
// Static content: tetragrammaton column + the Mo'edim
// ─────────────────────────────────────────────────────────────────────────────

const TETRA = ["י", "ה", "ו", "ה"]; // YHWH

const MOEDIM = [
  { num: "01", name: "PESACH", en: "Passover", month: "Abib · I" },
  { num: "02", name: "MATSAH", en: "Unleavened Bread", month: "Abib · I" },
  { num: "03", name: "BIKKURIYM", en: "Firstfruits", month: "Abib · I" },
  { num: "04", name: "SHAVUOT", en: "Weeks · Pentecost", month: "Sivan · III" },
  { num: "05", name: "YOM TERUAH", en: "Day of Trumpets", month: "Ethanim · VII" },
  { num: "06", name: "YOM KIPPUR", en: "Day of Atonement", month: "Ethanim · VII" },
  { num: "07", name: "SUKKOT", en: "Tabernacles", month: "Ethanim · VII" },
];

const PILLARS = [
  {
    glyph: "א",
    label: "I.",
    name: "EMET",
    en: "Truth",
    body: "Scripture above tradition. The Word of YAHUAH measured against itself, not against the doctrines of men.",
  },
  {
    glyph: "ב",
    label: "II.",
    name: "ZEHUT",
    en: "Identity",
    body: "Grafted in by covenant, not by lineage. One olive tree. One people. One King.",
  },
  {
    glyph: "ג",
    label: "III.",
    name: "BERITH",
    en: "Covenant",
    body: "Cut with Avraham. Sealed in YAHUSHA's blood. Written on hearts by the RUACH HAQODESH.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatFeastDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function daysUntil(iso: string): number {
  const target = new Date(iso + "T00:00:00Z").getTime();
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.max(0, Math.round((target - todayUtc) / 86_400_000));
}

function postDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function HomePage() {
  const { latestPosts, featuredTerms, nextFeast, todayDevotional } = Route.useLoaderData();

  return (
    <div className="overflow-hidden">
      {/* ═══════════════ I. HERO — vertical scroll composition ═══════════════ */}
      <section className="relative noise-overlay overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-20">
          <img
            src={heroScroll}
            alt=""
            width={1920}
            height={1088}
            className="h-full w-full object-cover opacity-[0.28]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.620_0.165_42/0.28),transparent_55%),linear-gradient(to_bottom,oklch(0.10_0.015_30/0.55),oklch(0.10_0.015_30/0.94))]"
        />

        {/* Tetragrammaton column — desktop only */}
        <div
          aria-hidden
          className="hidden lg:flex absolute left-8 xl:left-16 top-0 bottom-0 w-16 flex-col items-center justify-center gap-6 text-secondary/30 select-none"
        >
          <div className="h-24 w-px bg-gradient-to-b from-transparent to-secondary/40" />
          {TETRA.map((g, i) => (
            <span key={i} className="font-display text-4xl xl:text-5xl tracking-widest">
              {g}
            </span>
          ))}
          <div className="h-24 w-px bg-gradient-to-b from-secondary/40 to-transparent" />
        </div>

        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pt-24 pb-24 sm:pt-32 sm:pb-32 lg:pl-32 xl:pl-40">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm ring-1 ring-secondary/30 shadow-xl shadow-primary/10">
              <img src={logo} alt="" className="h-11 w-11 rounded-md" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-[0.4em] text-secondary/80">RAW · REAL · GOSPEL</span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Est. for the Remnant</span>
            </div>
          </div>

          <h1 className="font-display text-[2.75rem] sm:text-7xl lg:text-[5.75rem] font-semibold leading-[0.98] tracking-tight">
            Stand in the ways.
            <br />
            <span className="text-primary">See.</span> <span className="text-secondary">Ask.</span>{" "}
            <span className="text-foreground">Walk.</span>
          </h1>

          <p className="mt-7 max-w-2xl font-serif text-xl sm:text-2xl text-foreground/85 leading-snug italic">
            A Hebrew-rooted prophetic ministry calling the remnant out of Babylon and back to YAHUAH.
          </p>

          <p className="mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">
            Scripture above tradition. Covenant above religion. The unfiltered BESORAH of YAHUSHA HA'MASHIACH —
            taught plainly, walked daily.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="text-base">
              <Link to="/start-here">
                Start Here <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              <Link to="/blog">Read the Teachings</Link>
            </Button>
          </div>

          <p className="scripture mt-14 text-base sm:text-lg max-w-xl border-l-2 border-secondary/40 pl-5">
            "Stand in the ways and see, ask for the ancient paths… and walk in it, and find rest for your souls."
            <span className="block mt-1 not-italic text-xs uppercase tracking-[0.22em] text-secondary/70">
              — Yirmeyahu (Jeremiah) 6:16
            </span>
          </p>
        </div>
      </section>

      {/* ═══════════════ II. THE WATCH — next appointed time strip ═══════════════ */}
      {nextFeast && (
        <section className="border-y border-secondary/20 bg-card/40 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center justify-center rounded-md border border-secondary/30 bg-background/60 px-4 py-2 min-w-[72px]">
                  <span className="font-display text-3xl text-primary leading-none">{daysUntil(nextFeast.start_date)}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Days</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
                    Next Appointed Time · Mo'ed
                  </p>
                  <p className="mt-1 font-serif text-2xl font-semibold leading-tight">{nextFeast.title}</p>
                  <p className="text-sm text-muted-foreground">{formatFeastDate(nextFeast.start_date)}</p>
                </div>
              </div>
              <Button asChild variant="ghost" className="self-start md:self-auto text-secondary hover:text-secondary hover:bg-secondary/10">
                <Link to="/moedim">
                  <Calendar className="h-4 w-4" /> Open the calendar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ III. THREE PILLARS ═══════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-baseline justify-between mb-12 gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">§ I — The Foundation</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Three pillars.<br className="sm:hidden" /> One walk.
            </h2>
          </div>
          <div className="hidden md:block paleo-strip">א ב ג</div>
        </div>

        <div className="grid gap-px bg-secondary/15 border border-secondary/15 rounded-lg overflow-hidden md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.name} className="bg-background p-8 sm:p-10 group hover:bg-card/60 transition-colors">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl text-secondary/50 leading-none">{p.glyph}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{p.label}</span>
              </div>
              <h3 className="font-display text-3xl tracking-wide text-primary">{p.name}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.22em] text-secondary/80">{p.en}</p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════ IV. TODAY — devotional + next steps ═══════════════ */}
      <section className="bg-card/30 border-y border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-10 gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">§ II — Today</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                A word for the <span className="text-primary">remnant.</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            {/* Devotional scroll */}
            {todayDevotional ? (
              <article className="scroll-panel rounded-lg p-8 sm:p-12 noise-overlay">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--color-oxblood)" }}>
                  Daily Devotional · {todayDevotional.theme}
                </p>
                <h3
                  className="mt-3 font-display text-3xl sm:text-4xl font-semibold leading-tight"
                  style={{ color: "var(--color-scroll-fg)" }}
                >
                  {todayDevotional.title}
                </h3>
                <blockquote
                  className="mt-6 font-serif text-xl sm:text-2xl italic leading-relaxed border-l-4 pl-5"
                  style={{
                    color: "var(--color-scroll-fg)",
                    borderColor: "var(--color-oxblood)",
                  }}
                >
                  "{todayDevotional.passage_text}"
                </blockquote>
                <p
                  className="mt-3 text-sm uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-scroll-muted)" }}
                >
                  — {todayDevotional.passage_ref}
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    className="bg-[var(--color-oxblood)] text-[var(--color-scroll-bg)] hover:bg-[var(--color-oxblood)]/90"
                  >
                    <Link to="/devotionals/$slug" params={{ slug: todayDevotional.slug }}>
                      Read full reflection <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            ) : (
              <div className="scroll-panel rounded-lg p-12 noise-overlay text-center">
                <Scroll className="mx-auto h-10 w-10" style={{ color: "var(--color-oxblood)", opacity: 0.5 }} />
                <p className="mt-4 font-serif text-lg" style={{ color: "var(--color-scroll-fg)" }}>
                  New devotionals are being prepared.
                </p>
              </div>
            )}

            {/* Next steps stack */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary mb-2">
                One clear next step
              </p>
              {[
                { num: "01", title: "Take the 7-Day Reset", body: "A clear first week in the Word.", to: "/start-here" },
                { num: "02", title: "Walk the Torah", body: "The instruction that was never abolished.", to: "/torah" },
                { num: "03", title: "Honor the Mo'edim", body: "YAHUAH's calendar — not man's.", to: "/moedim" },
                { num: "04", title: "Learn the Hebrew", body: "Speak the words YAHUSHA spoke.", to: "/hebrew-terms" },
              ].map((step) => (
                <Link
                  key={step.num}
                  to={step.to}
                  className="group flex items-center gap-5 rounded-lg border border-border bg-background/60 p-5 hover:border-primary/60 hover:bg-card/80 transition"
                >
                  <span className="font-display text-2xl text-secondary/60 tabular-nums">{step.num}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.body}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-secondary/60 group-hover:text-primary group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ V. THE NAMES — typographic showcase ═══════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.620_0.165_42/0.10),transparent_70%)]"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">§ III — The Names</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Restore the <span className="text-primary">Name.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            "LORD" is a title. The Father has a Name — and He gave it for every generation to remember.
          </p>
        </div>

        <div className="mx-auto max-w-6xl mt-16 px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              hebrew: "יהוה",
              name: "YAHUAH",
              role: "The Father · The Self-Existent One",
              line: "He exists. He causes to be. The Name above every name — restored on our lips, not hidden behind titles.",
            },
            {
              hebrew: "יהושע",
              name: "YAHUSHA",
              role: "HA'MASHIACH · The Anointed One",
              line: "\"YAHUAH is salvation.\" The Name His mother spoke, the Name the disciples preached, the Name no man can erase.",
            },
            {
              hebrew: "רוח הקודש",
              name: "RUACH HAQODESH",
              role: "The Set-Apart Spirit · Sacred Breath",
              line: "Not a force. The very breath of YAHUAH — poured out at Shavuot, sealing the BERITH inside His people.",
            },
          ].map((n, i) => (
            <article
              key={n.name}
              className={`grid gap-6 md:grid-cols-[auto_1fr] items-center ${
                i % 2 === 1 ? "md:[&>:first-child]:order-2" : ""
              }`}
            >
              <div className="text-center md:text-left">
                <span
                  className="block font-display text-6xl sm:text-7xl text-secondary/70 tracking-wider"
                  dir="rtl"
                  lang="he"
                >
                  {n.hebrew}
                </span>
              </div>
              <div className={i % 2 === 1 ? "md:text-right" : ""}>
                <h3 className="font-display text-4xl sm:text-5xl tracking-wide text-primary">{n.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-secondary">{n.role}</p>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl md:inline-block">
                  {n.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════ VI. LEXICON PARCHMENT ═══════════════ */}
      {featuredTerms.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="scroll-panel rounded-lg p-8 sm:p-14 noise-overlay">
              <div className="flex items-baseline justify-between gap-6 mb-10">
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: "var(--color-oxblood)" }}
                  >
                    § IV — The Lexicon
                  </p>
                  <h2
                    className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight"
                    style={{ color: "var(--color-scroll-fg)" }}
                  >
                    Words that carry <em className="not-italic" style={{ color: "var(--color-oxblood)" }}>weight.</em>
                  </h2>
                </div>
                <span className="hidden md:block paleo-strip" style={{ color: "var(--color-oxblood)", opacity: 0.5 }}>
                  ד ה ו ז
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredTerms.map((t: HomeData["featuredTerms"][number]) => (
                  <article
                    key={t.id}
                    className="rounded-md border bg-[oklch(0.96_0.025_85)] p-5 transition hover:shadow-lg"
                    style={{ borderColor: "var(--color-scroll-border)" }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-2xl tracking-wide" style={{ color: "var(--color-oxblood)" }}>
                        {t.term}
                      </h4>
                      {t.transliteration && (
                        <span className="text-xs italic" style={{ color: "var(--color-scroll-muted)" }}>
                          {t.transliteration}
                        </span>
                      )}
                    </div>
                    <p
                      className="mt-2 text-sm font-medium leading-snug"
                      style={{ color: "var(--color-scroll-fg)" }}
                    >
                      {t.meaning}
                    </p>
                    {t.context && (
                      <p
                        className="mt-3 text-xs leading-relaxed border-t pt-2"
                        style={{
                          color: "var(--color-scroll-muted)",
                          borderColor: "var(--color-scroll-border)",
                        }}
                      >
                        {t.context}
                      </p>
                    )}
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button
                  asChild
                  className="bg-[var(--color-oxblood)] text-[var(--color-scroll-bg)] hover:bg-[var(--color-oxblood)]/90"
                >
                  <Link to="/hebrew-terms">
                    Open the full lexicon <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ VII. LATEST FROM THE SEFER (real blog data) ═══════════════ */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-baseline justify-between mb-12 gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">§ V — From the Sefer</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                Latest <span className="text-primary">teachings.</span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary/80"
            >
              All teaching <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Featured — first post */}
            <Link
              to="/blog/$slug"
              params={{ slug: latestPosts[0].slug }}
              className="group relative flex flex-col justify-end rounded-lg border border-border bg-card p-8 sm:p-10 min-h-[320px] overflow-hidden hover:border-primary/60 transition"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.620_0.165_42/0.18),transparent_60%)]"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Featured · {postDate(latestPosts[0].published_at)}
              </span>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-tight group-hover:text-primary transition-colors">
                {latestPosts[0].title}
              </h3>
              {latestPosts[0].summary && (
                <p className="mt-4 text-base text-muted-foreground leading-relaxed line-clamp-3 max-w-2xl">
                  {latestPosts[0].summary}
                </p>
              )}
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                Read teaching <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </span>
            </Link>

            {/* Stack — remaining posts */}
            <div className="flex flex-col gap-4">
              {latestPosts.slice(1).map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex-1 rounded-lg border border-border bg-card p-6 hover:border-primary/60 transition"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {postDate(post.published_at)}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              <Link to="/blog">
                All teachings <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* ═══════════════ VIII. MO'EDIM TIMELINE ═══════════════ */}
      <section className="bg-card/30 border-y border-border/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">§ VI — The Mo'edim</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                Seven appointed <span className="text-primary">times.</span>
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                YAHUAH's calendar — not man's. A prophetic blueprint from Pesach to Sukkot.
              </p>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute left-0 right-0 top-7 h-px bg-secondary/20 hidden md:block" />
            <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 relative">
              {MOEDIM.map((f) => (
                <li key={f.name} className="relative">
                  <div
                    aria-hidden
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 top-7 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"
                  />
                  <div className="md:pt-14 rounded-lg border border-border bg-background/70 p-4 hover:border-primary/60 transition">
                    <span className="font-display text-xs text-secondary tabular-nums">№ {f.num}</span>
                    <h4 className="mt-1 font-display text-lg tracking-wide">{f.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{f.en}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-secondary/70">{f.month}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              <Link to="/moedim">
                <Calendar className="h-4 w-4" /> Open the full calendar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════ IX. CLOSING COVENANT ═══════════════ */}
      <section className="relative noise-overlay py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.620_0.165_42/0.22),transparent_65%)]"
        />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="divider-flame mb-10">
            <Flame className="h-5 w-5" />
          </div>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-semibold tracking-tight leading-[1.02]">
            Wake up. <span className="text-primary">Return.</span>
            <br />
            Walk set-apart.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The hour is late. The QAHAL is being gathered. Step out of Babylon. Step into the BERITH.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="text-base">
              <Link to="/start-here">
                Begin the walk <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
            >
              <Link to="/donate">
                <Heart className="h-4 w-4" /> Partner with us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
