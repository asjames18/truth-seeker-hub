import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HebrewTerm {
  id: string;
  term: string;
  meaning: string;
  context: string | null;
  category: string;
  featured: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  "sacred-names": "Sacred Names",
  "titles": "Divine Titles",
  "covenant": "Covenant & Torah",
  "wisdom": "Wisdom & Light",
  "priesthood": "Priesthood & Prophets",
  "identity": "Identity & The Way",
  "scripture": "Scripture & Witness",
  "moedim": "Mo'edim — Appointed Times",
};
const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

export const Route = createFileRoute("/hebrew-terms")({
  head: () => ({
    meta: [
      { title: "Hebrew Terms Library — Raw & Real Gospel" },
      { name: "description", content: "A library of Hebrew-rooted sacred names and terms — YAHUAH, YAHUSHA, RUACH HAQODESH, Torah, Berith, Mo'edim — with meanings and context." },
      { property: "og:title", content: "Hebrew Terms Library — Raw & Real Gospel" },
      { property: "og:description", content: "Sacred names and Hebrew-rooted terms with meanings and usage." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: async () => {
    const { data, error } = await supabase
      .from("hebrew_terms")
      .select("id,term,meaning,context,category,featured")
      .eq("published", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return { terms: (data ?? []) as HebrewTerm[] };
  },
  component: HebrewTermsPage,
});

function HebrewTermsPage() {
  const { terms } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      if (activeCat !== "all" && t.category !== activeCat) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.meaning.toLowerCase().includes(q) ||
        (t.context ?? "").toLowerCase().includes(q)
      );
    });
  }, [terms, query, activeCat]);

  const grouped = useMemo(() => {
    const map = new Map<string, HebrewTerm[]>();
    for (const t of filtered) {
      const list = map.get(t.category) ?? [];
      list.push(t);
      map.set(t.category, list);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => [c, map.get(c)!] as const);
  }, [filtered]);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <p className="paleo-strip mb-4">⊥ † ⊥ ⊕ ⊥ † ⊥</p>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Lexicon</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold tracking-tight">
          Hebrew Terms <span className="text-primary">Library</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed">
          The set-apart language of Scripture. Each term carries weight — names, covenant words, appointed times. Learn them. Speak them. Walk them.
        </p>

        <div className="relative mx-auto mt-10 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for YAHUAH, Torah, Shabbath…"
            className="pl-11 h-12 text-base bg-card"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <CatChip active={activeCat === "all"} onClick={() => setActiveCat("all")}>All</CatChip>
          {CATEGORY_ORDER.map((c) => (
            <CatChip key={c} active={activeCat === c} onClick={() => setActiveCat(c)}>
              {CATEGORY_LABELS[c]}
            </CatChip>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {grouped.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No terms match your search.</p>
        ) : grouped.map(([cat, list]) => (
          <div key={cat}>
            <div className="divider-flame mb-8">
              <span className="font-serif text-sm uppercase tracking-[0.3em] text-gold">{CATEGORY_LABELS[cat]}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => <TermCard key={t.id} term={t} />)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition border ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TermCard({ term }: { term: HebrewTerm }) {
  return (
    <article className={`group relative rounded-lg border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 ${term.featured ? "border-primary/40" : "border-border"}`}>
      {term.featured && (
        <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest text-primary/80">★ Core</span>
      )}
      <h3 className="font-display text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors">
        {term.term}
      </h3>
      <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/90">{term.meaning}</p>
      {term.context && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
          {term.context}
        </p>
      )}
    </article>
  );
}
