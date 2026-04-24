import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Flame, Heart, Compass, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/start-here")({
  head: () => ({
    meta: [
      { title: "Start Here — Real & Raw Gospel" },
      {
        name: "description",
        content:
          "New to Real & Raw Gospel? Begin your discipleship journey with a clear path: scripture, devotionals, and teaching designed to grow your faith.",
      },
      { property: "og:title", content: "Start Here — Real & Raw Gospel" },
      {
        property: "og:description",
        content: "Begin your discipleship journey with Real & Raw Gospel.",
      },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: StartHerePage,
});

const STEPS = [
  {
    icon: Compass,
    title: "1. Get oriented",
    body: "Read our About page to understand the mission and the doctrine that drives this ministry.",
    cta: { to: "/about" as const, label: "Read About" },
  },
  {
    icon: BookOpen,
    title: "2. Daily devotionals",
    body: "Anchor each day in scripture. Our devotionals walk you through a passage with reflection and prayer.",
    cta: { to: "/devotionals" as const, label: "Open Devotionals" },
  },
  {
    icon: Flame,
    title: "3. Dig into teaching",
    body: "Read articles on identity, warfare, prophecy, and more. Built to challenge and equip.",
    cta: { to: "/blog" as const, label: "Browse Blog" },
  },
  {
    icon: Heart,
    title: "4. Stay connected",
    body: "Sign in to save bookmarks, follow updates, or reach out — we want to walk with you.",
    cta: { to: "/contact" as const, label: "Contact Us" },
  },
];

function StartHerePage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          New here?
        </p>
        <h1 className="mt-5 font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
          Start Here
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Whether you're new to faith, returning, or hungry for deeper truth —
          this is a doorway. Take it one step at a time.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {STEPS.map((step) => (
            <Card key={step.title} className="bg-card">
              <CardContent className="p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-muted-foreground">{step.body}</p>
                <Button asChild variant="outline" size="sm" className="mt-5">
                  <Link to={step.cta.to}>
                    {step.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center">
          <p className="scripture text-xl">
            "Then you will know the truth, and the truth will set you free." — John 8:32
          </p>
        </div>
      </section>
    </div>
  );
}
