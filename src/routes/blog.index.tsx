import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Real & Raw Gospel" },
      { name: "description", content: "Truth-centered teaching, prophetic articles, and discipleship writing from Real & Raw Gospel." },
      { property: "og:title", content: "Blog — Real & Raw Gospel" },
      { property: "og:description", content: "Truth-centered teaching from Real & Raw Gospel." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("posts")
      .select("slug,title,summary,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(50);
    return { posts: data ?? [] };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: Array<{ slug: string; title: string; summary: string | null; published_at: string | null }> };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Teaching</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Articles, teaching, and prophetic writing.</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {posts.length === 0 ? (
          <Card className="sm:col-span-2 border-dashed bg-card"><CardContent className="py-14 text-center text-muted-foreground">No posts yet. Check back soon.</CardContent></Card>
        ) : posts.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
            <Card className="h-full bg-card transition hover:border-primary/50">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {p.published_at ? new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                {p.summary && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
