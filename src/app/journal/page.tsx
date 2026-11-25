import type { Metadata } from "next";
import { IMG } from "@/data/trips";
import { sortedPosts } from "@/data/journal";
import { ButtonLink, PageHero } from "@/components/ui";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Journal",
  description: "Trail guides, travel tips and stories from Sri Lanka's hills, temples and wild places.",
};

export default function JournalPage() {
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <PageHero image={IMG.campfire} eyebrow="Journal" title="Stories from the trail">
        <p className="mt-4 max-w-xl text-white/85">
          Trail guides, planning tips and notes on culture and wildlife from our guides in Kandy.
        </p>
      </PageHero>

      <section className="mx-auto max-w-[1400px] px-3 py-12 sm:px-6">
        {featured && <PostCard post={featured} large />}
        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-panel)] bg-moss p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="display text-3xl">Want to see it for yourself?</h2>
            <p className="mt-2 max-w-lg text-sm text-white/80">Every trail in these stories is one we guide.</p>
          </div>
          <ButtonLink href="/experiences" variant="light">Browse experiences</ButtonLink>
        </div>
      </section>
    </>
  );
}
