import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Real & Raw Gospel" },
      {
        name: "description",
        content:
          "Partner with Real & Raw Gospel. Your gift fuels gospel content, discipleship, and outreach.",
      },
      { property: "og:title", content: "Donate — Real & Raw Gospel" },
      { property: "og:description", content: "Partner with the mission. Give today." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <Heart className="mx-auto h-12 w-12 text-primary mb-4" />
      <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
        Partner with the Mission
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Every gift fuels gospel teaching, devotionals, video production, and
        outreach. Whether one-time or monthly, your generosity carries the
        unfiltered word further.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="text-base">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Give Now <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Donation provider integration coming soon. Reach out for other ways to give.
      </p>
      <div className="mt-14 rounded-2xl border border-secondary/30 bg-secondary/5 p-8">
        <p className="scripture text-lg">
          "Each of you should give what you have decided in your heart to give." — 2 Corinthians 9:7
        </p>
      </div>
    </div>
  );
}
