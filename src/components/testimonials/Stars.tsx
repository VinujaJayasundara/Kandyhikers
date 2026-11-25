import { Star } from "lucide-react";

export function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating.toFixed(1).replace(/\.0$/, "")} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${size} ${n <= Math.round(rating) ? "fill-sun text-sun" : "fill-line text-line"}`} aria-hidden />
      ))}
    </span>
  );
}
