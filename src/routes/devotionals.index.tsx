import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/devotionals/")({
  head: () => ({
    meta: [
      { title: "Devotionals — Raw & Real Gospel" },
      { name: "description", content: "Daily Hebrew-rooted devotionals — scripture, reflection, and prayer to walk set-apart with YAHUAH." },
      { property: "og:title", content: "Devotionals — Raw & Real Gospel" },
      { property: "og:description", content: "Daily Hebrew-rooted devotionals from Raw & Real Gospel." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("devotionals")
      .select("slug,title,theme,passage_ref,published_at")
      .eq("published", true)
      .eq("workflow_state", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(50);
    return { devotionals: data ?? [] };
  },
  component: DevotionalsIndex,
});

function DevotionalsIndex() {
  const { devotionals } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Devotionals</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
        Walk it daily.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Scripture. Reflection. Prayer. A daily call to remember the Berith and walk in TESHUVAH.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {devotionals.length === 0 ? (
          <Card className="sm:col-span-2 border-dashed bg-card">
            <CardContent className="py-14 text-center text-muted-foreground">
              New devotionals coming soon.
            </CardContent>
          </Card>
        ) : devotionals.map((d: { slug: string; title: string; theme: string; passage_ref: string; published_at: string | null }) => (
          <Link key={d.slug} to="/devotionals/$slug" params={{ slug: d.slug }} className="group">
            <Card className="h-full bg-card transition hover:border-primary/50">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {d.published_at ? new Date(d.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                  {d.title}
                </h3>
                <p className="scripture mt-2 text-sm">{d.passage_ref}</p>
                <p className="mt-2 text-xs text-muted-foreground">Theme: {d.theme}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
