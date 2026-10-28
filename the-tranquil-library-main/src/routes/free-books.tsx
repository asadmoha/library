import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import freeBooks from "@/lib/free-books.json";

export const Route = createFileRoute("/free-books")({
  head: () => ({
    meta: [
      { title: "Free Books — The Quiet Library" },
      { name: "description", content: "100 free public-domain books you can read online today, from Project Gutenberg." },
      { property: "og:title", content: "Free Books — The Quiet Library" },
      { property: "og:description", content: "100 free classic books to read online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FreeBooks,
});

function FreeBooks() {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => freeBooks.filter((b) => (b.title + b.author).toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center animate-fade-up">
          <Link to="/" className="text-sm text-gold transition hover:opacity-70">← Back to library</Link>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-shimmer">Free Books</h1>
          <div className="mx-auto mt-6 h-0.5 w-32 gold-shimmer rounded-full" />
          <p className="mx-auto mt-6 max-w-xl text-primary-foreground/70">
            100 timeless classics, free to read online. Courtesy of Project Gutenberg.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-14">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search free books…"
          className="mx-auto block w-full max-w-md rounded-full border border-border bg-card px-6 py-3 text-center outline-none focus:border-gold"
        />
        <p className="mt-6 text-center text-sm text-muted-foreground">{list.length} free books</p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((b, i) => (
            <a
              key={`${q}-${b.id}`}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              style={{ animationDelay: `${Math.min(i, 20) * 40}ms` }}
              className="group animate-fade-up overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-xl"
            >
              <div className="aspect-[2/3] overflow-hidden bg-muted">
                {b.cover && (
                  <img src={b.cover} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase tracking-widest text-gold line-clamp-1">{b.topic}</span>
                <h3 className="mt-1 font-display text-lg leading-tight text-primary line-clamp-2">{b.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{b.author}</p>
                <span className="mt-3 block text-xs text-gold opacity-0 transition group-hover:opacity-100">Read free →</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
