import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/moedim")({
  head: () => ({
    meta: [
      { title: "Mo'edim — Appointed Times — Raw & Real Gospel" },
      { name: "description", content: "MO'EDIM — YAHUAH's appointed times: Pesach, Matsah, Bikkuriym, Shavu'oth, Yom Teruah, Yom Kippuriym, Sukkoth." },
      { property: "og:title", content: "Mo'edim — Appointed Times" },
      { property: "og:description", content: "YAHUAH's seven appointed times explained." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: MoedimPage,
});

const FEASTS = [
  { name: "PESACH", en: "Passover", season: "Spring · Aviv 14", body: "The Lamb. Blood on the doorposts. Deliverance from Mitsrayim — and a shadow of YAHUSHA, our Pesach Lamb." },
  { name: "MATSAH", en: "Unleavened Bread", season: "Spring · Aviv 15–21", body: "Seven days without leaven. A call to put out sin (chametz) and walk pure before the face of YAHUAH." },
  { name: "BIKKURIYM", en: "Firstfruits", season: "Spring · day after Sabbath", body: "The wave offering — and the day YAHUSHA rose, the Firstfruit of those who are His." },
  { name: "SHAVU'OTH", en: "Weeks · Pentecost", season: "Late Spring · 50 days after", body: "Torah given at Sinai. RUACH HAQODESH poured out in Yerushalayim. The same fire, same covenant people." },
  { name: "YOM TERUAH", en: "Day of Trumpets", season: "Fall · Tishri 1", body: "The shout. The shofar. A wake-up call to the QAHAL — return, prepare, the King is coming." },
  { name: "YOM KIPPURIYM", en: "Day of Atonements", season: "Fall · Tishri 10", body: "Affliction of soul. The High Priest enters. Blood covers. A picture of the final reckoning and full atonement." },
  { name: "SUKKOTH", en: "Tabernacles · Booths", season: "Fall · Tishri 15–22", body: "Seven days in temporary dwellings. Remembering wilderness. Foreshadowing YAHUAH dwelling with His people forever." },
];

function MoedimPage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="paleo-strip mb-4">⊥ † ⊥</p>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Mo'edim</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl font-semibold tracking-tight">
          The <span className="text-primary">Appointed Times.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          MO'EDIM — YAHUAH's set times. Not Jewish holidays. Not optional. They are His calendar, His prophetic blueprint, His invitation to meet Him on the dates He set.
        </p>
        <p className="scripture mt-6 text-lg">"These are the mo'edim of YAHUAH…" — Wayyiqra (Lev) 23:2</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24 space-y-5">
        {FEASTS.map((f, i) => (
          <article key={f.name} className="grid gap-6 md:grid-cols-[auto_1fr] items-start rounded-lg border border-border bg-card p-7 hover:border-primary/40 transition">
            <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-1 md:min-w-[140px]">
              <span className="font-display text-5xl text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-secondary">{f.season}</span>
            </div>
            <div>
              <h3 className="font-display text-3xl tracking-wide">{f.name}</h3>
              <p className="text-sm font-semibold text-secondary mt-1">{f.en}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
