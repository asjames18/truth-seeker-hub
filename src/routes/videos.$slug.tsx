import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/videos/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("content")
      .select("slug,title,summary,body_md,body_html,published_at")
      .eq("slug", params.slug)
      .eq("content_type", "video")
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return { video: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.video.title} — Video` },
          { name: "description", content: loaderData.video.summary ?? loaderData.video.title },
          { property: "og:title", content: loaderData.video.title },
          { property: "og:description", content: loaderData.video.summary ?? loaderData.video.title },
        ]
      : [{ title: "Video" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Video not found</h1>
      <Button asChild className="mt-6"><Link to="/videos">Back to videos</Link></Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Button className="mt-6" onClick={() => { router.invalidate(); reset(); }}>Retry</Button>
      </div>
    );
  },
  component: VideoDetail,
});

function VideoDetail() {
  const { video } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/videos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All videos
      </Link>
      <h1 className="mt-8 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{video.title}</h1>
      {video.summary && <p className="mt-4 text-lg text-muted-foreground">{video.summary}</p>}
      {video.body_html ? (
        <div className="prose prose-invert mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: video.body_html }} />
      ) : video.body_md ? (
        <div className="prose prose-invert mt-10 max-w-none whitespace-pre-wrap">{video.body_md}</div>
      ) : null}
    </article>
  );
}
