import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Lightbulb } from "lucide-react";
import { formatDate, getPost, posts, readingMinutes, sortedPosts, type Block } from "@/data/journal";
import { getTrip } from "@/data/trips";
import { ButtonLink, Tag, TripCard } from "@/components/ui";
import { PostCard } from "@/components/PostCard";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date, images: [post.image] },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="display pt-6 text-2xl text-moss-dark sm:text-3xl">{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-moss">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside className="flex gap-4 rounded-2xl bg-sand/40 p-5 text-ink">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
          <p><strong>Guide&apos;s tip: </strong>{block.text}</p>
        </aside>
      );
    case "image":
      return (
        <figure className="py-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)]">
            <Image src={block.src} alt={block.alt} fill sizes="(min-width:768px) 720px, 100vw" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-2 text-center text-xs text-muted">{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const trips = post.relatedTrips.map(getTrip).filter((t) => t !== undefined);
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-20 pt-24">
      <header className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/journal" className="inline-flex items-center gap-1 py-2 text-sm text-muted hover:text-ink">
          <ChevronLeft className="h-4 w-4" /> Journal
        </Link>
        <div className="mt-6">
          <Tag>{post.category}</Tag>
        </div>
        <h1 className="display mt-4 text-4xl text-moss-dark sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        <p className="mt-6 text-sm text-muted">
          {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-[1400px] px-3 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] sm:aspect-[21/9]">
          <Image src={post.image} alt="" fill fetchPriority="high" loading="eager" quality={60} sizes="100vw" className="object-cover" />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-5 px-4 text-base leading-relaxed text-ink/85 sm:px-6">
        {post.body.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>

      {trips.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1400px] px-3 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display text-3xl text-moss-dark">Do it with a guide</h2>
            <ButtonLink href="/contact" variant="outline">Ask us about it</ButtonLink>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((t) => (
              <TripCard key={t.slug} trip={t} />
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1400px] px-3 sm:px-6">
          <h2 className="display text-3xl text-moss-dark">More from the journal</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
