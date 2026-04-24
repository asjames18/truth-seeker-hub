import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Flame, BookOpen, PlayCircle, Heart } from "lucide-react";
import logo from "@/assets/rrg-logo.jpg";

interface HomeData {
  latestDevotional: {
    slug: string;
    title: string;
    theme: string;
    passage_ref: string;
  } | null;
  latestPosts: Array<{
    slug: string;
    title: string;
    summary: string | null;
    published_at: string | null;
  }>;
  latestVideos: Array<{
    slug: string;
    title: string;
    summary: string | null;
    published_at: string | null;
  }>;
}

async function loadHome(): Promise<HomeData> {
  const [devRes, postsRes, videosRes] = await Promise.all([
    supabase
      .from("devotionals")
      .select("slug,title,theme,passage_ref")
      .eq("published", true)
      .eq("workflow_state", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("posts")
      .select("slug,title,summary,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3),
    supabase
      .from("content")
      .select("slug,title,summary,published_at")
      .eq("content_type", "video")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3),
  ]);

  return {
    latestDevotional: devRes.data ?? null,
    latestPosts: postsRes.data ?? [],
    latestVideos: videosRes.data ?? [],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Real & Raw Gospel — Truth. Discipleship. Fire." },
      {
        name: "description",
        content:
          "A discipleship ministry preaching the unfiltered gospel. Biblical teaching, devotionals, videos, and tools to grow in truth.",
      },
      { property: "og:title", content: "Real & Raw Gospel — Truth. Discipleship. Fire." },
      {
        property: "og:description",
        content:
          "A discipleship ministry preaching the unfiltered gospel. Start your spiritual growth journey today.",
      },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: () => loadHome(),
  component: HomePage,
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function HomePage() {
  const { latestDevotional, latestPosts, latestVideos } = Route.useLoaderData();

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.679_0.176_49/0.18),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card ring-1 ring-border shadow-2xl shadow-primary/10">
            <img src={logo} alt="" className="h-16 w-16 rounded-lg" />
          </div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Flame className="h-3.5 w-3.5" /> Truth · Discipleship · Fire
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            The unfiltered gospel,
            <br />
            <span className="text-primary">preached without apology.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Real &amp; Raw Gospel is a discipleship ministry calling believers
            into truth, identity, and weekly spiritual growth — through
            scripture-rooted teaching, devotionals, and prophetic content.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="text-base">
              <Link to="/start-here">
                Start Here <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link to="/blog">Read the Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WEEKLY FOCUS / LATEST DEVOTIONAL */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-12 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Today's Devotional
              </p>
              {latestDevotional ? (
                <>
                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
                    {latestDevotional.title}
                  </h2>
                  <p className="scripture mt-3 text-lg">
                    {latestDevotional.passage_ref}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Theme: {latestDevotional.theme}
                  </p>
                  <Button asChild className="mt-6">
                    <Link
                      to="/devotionals/$slug"
                      params={{ slug: latestDevotional.slug }}
                    >
                      Read Devotional <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight">
                    Devotionals coming soon
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    New devotionals will appear here as they're published.
                  </p>
                  <Button asChild variant="outline" className="mt-6">
                    <Link to="/devotionals">Browse devotionals</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST FROM THE BLOG */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Latest Teaching
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
              From the Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {latestPosts.length === 0 ? (
          <Card className="bg-card border-dashed">
            <CardContent className="py-14 text-center">
              <p className="text-muted-foreground">
                Articles will appear here as they're published.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group"
              >
                <Card className="h-full bg-card transition hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {formatDate(post.published_at)}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        {post.summary}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* LATEST VIDEOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Watch
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
              Latest Videos
            </h2>
          </div>
          <Link
            to="/videos"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {latestVideos.length === 0 ? (
          <Card className="bg-card border-dashed">
            <CardContent className="py-14 text-center">
              <PlayCircle className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">
                Videos will appear here as they're published.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestVideos.map((v) => (
              <Link
                key={v.slug}
                to="/videos/$slug"
                params={{ slug: v.slug }}
                className="group"
              >
                <Card className="h-full bg-card transition hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <PlayCircle className="h-7 w-7 text-primary mb-3" />
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {formatDate(v.published_at)}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                      {v.title}
                    </h3>
                    {v.summary && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                        {v.summary}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* DONATE STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-10 sm:p-14 text-center">
          <Heart className="mx-auto h-10 w-10 text-primary mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
            Partner with the Mission
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every gift fuels gospel content, discipleship, and outreach.
            Join us in spreading the unfiltered word.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link to="/donate">Give Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
