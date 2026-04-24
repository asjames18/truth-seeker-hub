import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
    return { devotional: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.devotional.title} — Devotional` },
          { name: "description", content: `${loaderData.devotional.theme} — ${loaderData.devotional.passage_ref}` },
          { property: "og:title", content: loaderData.devotional.title },
          { property: "og:description", content: loaderData.devotional.passage_ref },
        ]
      : [{ title: "Devotional" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Devotional not found</h1>
      <Button asChild className="mt-6"><Link to="/devotionals">Back to devotionals</Link></Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
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
  const { devotional: d } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/devotionals" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All devotionals
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{d.theme}</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{d.title}</h1>
      <p className="scripture mt-5 text-xl">{d.passage_ref}</p>

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
    </article>
  );
}
