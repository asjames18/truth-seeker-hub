import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Real & Raw Gospel" },
      {
        name: "description",
        content:
          "Real & Raw Gospel is a discipleship ministry preaching the unfiltered gospel of Yeshua. Our mission, our beliefs, and how we serve.",
      },
      { property: "og:title", content: "About — Real & Raw Gospel" },
      {
        property: "og:description",
        content: "Our mission is the unfiltered gospel — truth, discipleship, fire.",
      },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Who we are
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
          About Real &amp; Raw Gospel
        </h1>

        <div className="prose prose-invert mt-10 max-w-none text-foreground/90 space-y-6 leading-relaxed">
          <p className="text-lg">
            <strong className="text-primary">Real &amp; Raw Gospel</strong> exists
            for one reason: to preach the unfiltered word of God to a generation
            starving for truth.
          </p>

          <p>
            We're not a church. We're not a brand. We're a discipleship ministry
            committed to scripture-rooted teaching that doesn't soften, dilute,
            or trade the gospel for cultural comfort. We believe truth is more
            loving than flattery, and that real freedom is found in walking
            with Yeshua — Jesus the Messiah — daily.
          </p>

          <h2 className="font-serif text-3xl font-semibold mt-12 text-foreground">
            Our mission
          </h2>
          <p>
            To equip believers — and seekers — with the doctrine, identity, and
            practical tools to grow in spiritual maturity every week. Through
            blog teaching, devotionals, video content, and prayer, we help
            people move from first encounter to consistent discipleship.
          </p>

          <h2 className="font-serif text-3xl font-semibold mt-12 text-foreground">
            What we believe
          </h2>
          <ul className="space-y-3 list-disc pl-6 marker:text-primary">
            <li>The Bible is the inspired, authoritative word of God.</li>
            <li>
              Yeshua (Jesus) is the Messiah, fully God and fully man, crucified
              and risen for the salvation of all who believe.
            </li>
            <li>
              Salvation comes by grace through faith — and that faith is
              demonstrated in obedience and discipleship.
            </li>
            <li>
              The Holy Spirit empowers believers to live holy, bold, and
              fruitful lives.
            </li>
            <li>
              The Father's heart is for restoration — calling His people into
              identity, freedom, and purpose.
            </li>
          </ul>

          <div className="mt-12 rounded-2xl border border-secondary/30 bg-secondary/5 p-8 text-center">
            <p className="scripture text-xl">
              "The harvest is plentiful, but the workers are few." — Mattithyahu (Matthew) 9:37
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
