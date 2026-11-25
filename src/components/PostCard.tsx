import Image from "next/image";
import Link from "next/link";
import { formatDate, readingMinutes, type Post } from "@/data/journal";

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className={`group flex overflow-hidden rounded-[var(--radius-panel)] bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        large ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden ${large ? "aspect-[16/10] lg:aspect-auto lg:w-3/5" : "aspect-[16/10]"}`}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes={large ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col ${large ? "p-8 lg:p-12" : "p-6"}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-moss">{post.category}</p>
        <h3 className={`mt-3 font-display font-extrabold uppercase leading-tight ${large ? "text-3xl sm:text-4xl" : "text-xl"}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-muted ${large ? "text-base" : "line-clamp-3 text-sm"}`}>{post.excerpt}</p>
        <p className="mt-auto pt-6 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
        </p>
      </div>
    </Link>
  );
}
