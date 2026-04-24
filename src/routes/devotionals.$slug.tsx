import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Neighbour = { slug: string; title: string } | null;

export const Route = createFileRoute("/devotionals/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("devotionals")
      .select("slug,title,theme,passage_ref,passage_text,reflection,prayer,action,published_at")
      .eq("slug", params.slug)
      .eq("published", true)
      .eq("workflow_state", "published")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();

    // Previous (older) and next (newer) devotionals by published_at
    const [prevRes, nextRes] = await Promise.all([
      data.published_at
        ? supabase
            .from("devotionals")
            .select("slug,title")
            .eq("published", true)
            .eq("workflow_state", "published")
            .lt("published_at", data.published_at)
            .order("published_at", { ascending: false, nullsFirst: false })
            .limit(1)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      data.published_at
        ? supabase
            .from("devotionals")
            .select("slug,title")
            .eq("published", true)
            .eq("workflow_state", "published")
            .gt("published_at", data.published_at)
            .order("published_at", { ascending: true, nullsFirst: false })
            .limit(1)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    return {
      devotional: data,
      prev: (prevRes.data ?? null) as Neighbour,
      next: (nextRes.data ?? null) as Neighbour,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.devotional.title} — Devotional` },
          { name: "description", content: `${loaderData.devotional.theme} — ${loaderData.devotional.passage_ref}` },
          { property: "og:title", content: loaderData.devotional.title },
          { property: "og:description", content: loaderData.devotional.passage_ref },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Devotional" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Devotional not found</h1>
      <Button asChild className="mt-6"><Link to="/devotionals">Back to devotionals</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">An unexpected error occurred. Please try again later.</p>
        <Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Retry</Button>
      </div>
    );
  },
  component: DevotionalDetail,
});

function DevotionalDetail() {
  const { devotional: d, prev, next } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/devotionals" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> All devotionals
      </Link>

      <header className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{d.theme}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">{d.title}</h1>
        <p className="scripture mt-5 text-xl">{d.passage_ref}</p>
        {d.published_at && (
          <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
            {new Date(d.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
      </header>

      <div className="mt-10 scroll-panel rounded-lg p-8 sm:p-12 noise-overlay">
        <p className="font-serif text-lg leading-relaxed italic" style={{ color: "var(--color-oxblood)" }}>
          "{d.passage_text}"
        </p>
        <div className="mt-8 prose prose-lg max-w-none" style={{ color: "var(--color-scroll-fg)" }}>
          <h3 className="font-serif text-2xl mt-0">Reflection</h3>
          <p className="whitespace-pre-wrap">{d.reflection}</p>
          {d.prayer && (
            <>
              <h3 className="font-serif text-2xl">Prayer</h3>
              <p className="whitespace-pre-wrap italic">{d.prayer}</p>
            </>
          )}
          {d.action && (
            <>
              <h3 className="font-serif text-2xl">Walk it out</h3>
              <p className="whitespace-pre-wrap">{d.action}</p>
            </>
          )}
        </div>
      </div>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <nav className="mt-12 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/devotionals/$slug"
              params={{ slug: prev.slug }}
              className="group rounded-lg border border-border bg-card p-5 hover:border-primary/50 transition"
            >
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-secondary">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <p className="mt-2 font-serif text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <Link
              to="/devotionals/$slug"
              params={{ slug: next.slug }}
              className="group rounded-lg border border-border bg-card p-5 hover:border-primary/50 transition sm:text-right"
            >
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-secondary">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <p className="mt-2 font-serif text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                {next.title}
              </p>
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </nav>
      )}
    </article>
  );
}
