import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/videos/")({
  head: () => ({
    meta: [
      { title: "Videos — Raw & Real Gospel" },
      { name: "description", content: "Prophetic teaching videos and BESORAH content from Raw & Real Gospel." },
      { property: "og:title", content: "Videos — Raw & Real Gospel" },
      { property: "og:description", content: "Prophetic teaching videos from Raw & Real Gospel." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  loader: async () => {
    const { data } = await supabase
      .from("content")
      .select("slug,title,summary,published_at")
      .eq("content_type", "video")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(50);
    return { videos: data ?? [] };
  },
  component: VideosIndex,
});

function VideosIndex() {
  const { videos } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Watch · Listen</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-semibold tracking-tight">Video Teachings</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Prophetic teaching, scripture deep-dives, and the unfiltered BESORAH on screen.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.length === 0 ? (
          <Card className="sm:col-span-2 lg:col-span-3 border-dashed bg-card">
            <CardContent className="py-14 text-center">
              <PlayCircle className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">New videos coming soon.</p>
            </CardContent>
          </Card>
        ) : videos.map((v: { slug: string; title: string; summary: string | null; published_at: string | null }) => (
          <Link key={v.slug} to="/videos/$slug" params={{ slug: v.slug }} className="group">
            <Card className="h-full bg-card transition hover:border-primary/50">
              <CardContent className="p-6">
                <PlayCircle className="h-7 w-7 text-primary mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {v.published_at ? new Date(v.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-primary transition-colors">{v.title}</h3>
                {v.summary && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{v.summary}</p>}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
