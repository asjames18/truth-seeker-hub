import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Strip a leading H1 (the page already renders the title) and trailing
// "Continue reading" link list (we render related posts separately).
// Also collapse blank lines between consecutive list items so remark
// renders a tight list instead of a "loose" one with paragraph gaps.
function prepareMarkdown(md: string): string {
  let out = md.replace(/^\s*#\s+.+\n+/, "");
  out = out.replace(/\n+##\s+Continue Reading[\s\S]*$/i, "");
  // Collapse blank lines between two list items (-, *, or numbered).
  const listItem = /^[ \t]*(?:[-*+]|\d+\.)[ \t]+/;
  const lines = out.split("\n");
  const compacted: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") {
      // Look ahead past additional blank lines.
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      const prev = compacted[compacted.length - 1] ?? "";
      const next = lines[j] ?? "";
      if (listItem.test(prev) && listItem.test(next)) {
        i = j - 1; // skip the blank lines entirely
        continue;
      }
    }
    compacted.push(line);
  }
  return compacted.join("\n").trim();
}

type RelatedPost = { slug: string; title: string };

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("content")
      .select("slug,title,summary,body_md,published_at")
      .eq("slug", params.slug)
      .eq("content_type", "blog")
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();

    const { data: relatedData } = await supabase
      .from("content")
      .select("slug,title")
      .eq("content_type", "blog")
      .eq("status", "published")
      .neq("slug", params.slug)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3);

    return { post: data, related: (relatedData ?? []) as RelatedPost[] };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Raw & Real Gospel` },
          { name: "description", content: loaderData.post.summary ?? loaderData.post.title },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.summary ?? loaderData.post.title },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Article" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
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
  component: BlogDetail,
});

function readingMinutes(text: string | null): number {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function BlogDetail() {
  const { post, related } = Route.useLoaderData();
  const minutes = readingMinutes(post.body_md);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-secondary">
          <span>
            {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : ""}
          </span>
          <span aria-hidden className="opacity-40">·</span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground normal-case tracking-normal">
            <Clock className="h-3.5 w-3.5" /> {minutes} min read
          </span>
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-5 font-serif text-xl text-muted-foreground italic leading-relaxed">
            {post.summary}
          </p>
        )}
      </header>

      {post.body_md && (
        <div className="mt-10 scroll-panel rounded-lg p-8 sm:p-12 noise-overlay">
          <div
            className="prose prose-lg max-w-none font-serif leading-relaxed
              prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-3xl
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-2xl
              prose-p:my-5
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-hr:my-10 prose-hr:border-border
              prose-ul:my-5 prose-ul:pl-6 prose-ol:my-5 prose-ol:pl-6
              prose-li:my-1 prose-li:pl-1
              [&_li>p]:my-0
              prose-ul:list-disc prose-ol:list-decimal
              prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:bg-muted"
            style={{ color: "var(--color-scroll-fg)" }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {prepareMarkdown(post.body_md)}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <aside className="mt-16 border-t border-border pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Continue reading</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {related.map((r: RelatedPost) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition"
              >
                <h3 className="font-serif text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-secondary">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
