import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("slug,title,summary,body_md,published_at")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return { post: data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Raw & Real Gospel` },
          { name: "description", content: loaderData.post.summary ?? loaderData.post.title },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.summary ?? loaderData.post.title },
        ]
      : [{ title: "Article" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
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
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-secondary">
        {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
      </p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{post.title}</h1>
      {post.summary && <p className="mt-4 text-lg text-muted-foreground">{post.summary}</p>}
      {post.body_md && (
        <div className="mt-10 scroll-panel rounded-lg p-8 sm:p-12 noise-overlay">
          <div className="font-serif text-lg leading-relaxed whitespace-pre-wrap" style={{ color: "var(--color-scroll-fg)" }}>
            {post.body_md}
          </div>
        </div>
      )}
    </article>
  );
}
