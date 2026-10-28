import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { books, topics, formatYear, type Book } from "@/lib/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Quiet Library — 50 Books to Read Slowly" },
      { name: "description", content: "A calm library of 50 books across self improvement, love, religion, history, science and more." },
      { property: "og:title", content: "The Quiet Library" },
      { property: "og:description", content: "A calm library of 50 books across many topics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Book | null>(null);
  const [favs, setFavs] = useState<number[]>([]);
  const toggleFav = (id: number) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const surprise = () => setOpen(books[Math.floor(Math.random() * books.length)] ?? null);

  const list = useMemo(
    () =>
      books.filter(
        (b) =>
          (topic === "All" || b.topic === topic) &&
          (b.title + b.author).toLowerCase().includes(q.toLowerCase()),
      ),
    [topic, q],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold animate-floaty"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 6) * 0.8}s`, animationDuration: `${5 + (i % 4)}s` }}
          />
        ))}
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center animate-fade-up">
          <p className="tracking-[0.4em] text-xs uppercase text-gold">Est. for quiet minds</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-shimmer">The Quiet Library</h1>
          <div className="mx-auto mt-6 h-0.5 w-32 gold-shimmer rounded-full" />
          <p className="mx-auto mt-6 max-w-xl text-primary-foreground/70 leading-relaxed">
            Fifty books, gently gathered. Take a breath, choose a shelf, and read slowly.
          </p>
          <button onClick={surprise} className="mt-8 rounded-full border border-gold px-6 py-2.5 text-sm text-gold transition-all duration-500 hover:scale-105 hover:bg-gold hover:text-primary">
            ✦ Surprise me with a book
          </button>
          <Link to="/free-books" className="ml-3 mt-8 inline-block rounded-full bg-gold px-6 py-2.5 text-sm text-primary transition-all duration-500 hover:scale-105">
            Free Books →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or author…"
          className="mx-auto block w-full max-w-md rounded-full border border-border bg-card px-6 py-3 text-center outline-none focus:border-gold"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...topics].map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-500 hover:-translate-y-0.5 active:scale-95 ${
                topic === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {list.length} books · <span className="text-gold">♥ {favs.length} saved</span>
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => (
            <div
              key={`${topic}-${q}-${b.id}`}
              role="button"
              onClick={() => setOpen(b)}
              style={{ animationDelay: `${Math.min(i, 15) * 60}ms` }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-6 text-left shadow-soft transition-all duration-500 animate-fade-up hover:-translate-y-2 hover:rotate-[0.5deg] hover:border-gold hover:shadow-xl"
            >
              <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
              <button
                onClick={(e) => { e.stopPropagation(); toggleFav(b.id); }}
                aria-label="Save book"
                key={favs.includes(b.id) ? "on" : "off"}
                className={`absolute right-4 top-4 text-xl transition-colors animate-pop ${favs.includes(b.id) ? "text-gold" : "text-border hover:text-gold"}`}
              >
                {favs.includes(b.id) ? "♥" : "♡"}
              </button>
              <span className="text-xs uppercase tracking-widest text-gold">{b.topic}</span>
              <h3 className="mt-3 pr-6 font-display text-2xl text-primary leading-snug transition-transform duration-500 group-hover:translate-x-1">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-foreground/80">{b.description}</p>
              <div className="mt-5 flex justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>{formatYear(b.year)}</span>
                <span>{b.pages} pages</span>
              </div>
              <span className="mt-4 block text-xs text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">Open book →</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-primary py-10 text-center text-sm text-primary-foreground/60">
        <span className="text-gold">✦</span> Read gently <span className="text-gold">✦</span>
      </footer>

      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-6 backdrop-blur-sm animate-in fade-in duration-500"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border-t-4 border-gold bg-card p-8 shadow-soft animate-in zoom-in-90 slide-in-from-bottom-8 duration-500"
          >
            <span className="text-xs uppercase tracking-widest text-gold">{open.topic}</span>
            <h2 className="mt-3 font-display text-4xl text-primary">{open.title}</h2>
            <p className="mt-2 text-muted-foreground">by {open.author}</p>
            <p className="mt-6 leading-relaxed">{open.description}</p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
              <div><dt className="text-xs text-muted-foreground">Year</dt><dd className="font-display text-xl text-primary">{formatYear(open.year)}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Pages</dt><dd className="font-display text-xl text-primary">{open.pages}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Topic</dt><dd className="font-display text-xl text-primary">{open.topic}</dd></div>
            </dl>
            <div className="mt-8 flex gap-3">
            <button onClick={() => toggleFav(open.id)} className="flex-1 rounded-full border border-gold py-3 text-gold transition hover:bg-gold hover:text-primary">
              {favs.includes(open.id) ? "♥ Saved" : "♡ Save"}
            </button>
            <button onClick={surprise} className="flex-1 rounded-full border border-border py-3 transition hover:border-gold">Another ✦</button>
            </div>
            <button onClick={() => setOpen(null)} className="mt-3 w-full rounded-full bg-primary py-3 text-primary-foreground transition hover:bg-primary/90">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
