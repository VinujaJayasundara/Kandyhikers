import { IMG } from "@/data/trips";
import { ButtonLink, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero image={IMG.mistyHiker} eyebrow="404" title="This trail isn't mapped yet">
      <p className="mt-4 max-w-xl text-white/85">
        The page you&apos;re looking for doesn&apos;t exist, or we&apos;re still building it.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/" variant="light">Back home</ButtonLink>
        <ButtonLink href="/experiences" variant="light">Browse experiences</ButtonLink>
      </div>
    </PageHero>
  );
}
