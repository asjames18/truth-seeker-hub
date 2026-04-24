import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  summary: string | null;
  published_at: string | null;
};

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Raw & Real Gospel" },
      { name: "description", content: "Truth-centered teaching, prophetic articles, and Hebrew-rooted writing on TORAH, BERITH, and the BESORAH of YAHUSHA HA'MASHIACH." },
      { property: "og:title", content: "Blog — Raw & Real Gospel" },
      { property: "og:description", content: "Truth-centered teaching from Raw & Real Gospel." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("content")
      .select("slug,title,summary,published_at")
      .eq("content_type", "blog")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(50);
    return { posts: (data ?? []) as Post[] };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Section V · Teaching Hub</p>
      <h1 className="mt-2 font-display text-4xl sm:text-6xl font-semibold tracking-tight">
        From the <span className="text-primary">Sefer.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Articles, teaching, and prophetic writing — calling the remnant back to TORAH, BERITH, and the unfiltered BESORAH.
      </p>

      {posts.length === 0 ? (
        <Card className="mt-12 border-dashed bg-card">
          <CardContent className="py-16 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">New teaching articles will appear here as they're published.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group mt-12 block">
              <Card className="overflow-hidden border-secondary/30 bg-card transition hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10">
                <CardContent className="p-8 sm:p-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">Latest teaching</p>
                  <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  {featured.summary && (
                    <p className="mt-5 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                      {featured.summary}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {featured.published_at
                        ? new Date(featured.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                        : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 text-secondary group-hover:translate-x-0.5 transition-transform">
                      Read teaching <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}

          {/* Rest of the posts */}
          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p: Post) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
                  <Card className="h-full bg-card transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {p.published_at
                          ? new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                          : ""}
                      </p>
                      <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      {p.summary && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
