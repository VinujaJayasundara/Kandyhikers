"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** One large image + thumbnails; click opens a full-screen viewer. Same pattern for every trip. */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const go = (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <div className="grid h-[420px] gap-3 sm:h-[520px] sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
        {images.slice(0, 3).map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className={`relative overflow-hidden rounded-[var(--radius-panel)] ${i === 0 ? "sm:row-span-2" : "hidden sm:block"}`}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title}, photo ${i + 1}`}
              fill
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              sizes={i === 0 ? "(min-width:640px) 66vw, 100vw" : "33vw"}
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${title} photos`} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIndex(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white" aria-label="Close" autoFocus>
            <X className="h-5 w-5" />
          </button>
          <button onClick={() => go(-1)} className="absolute left-4 rounded-full bg-white/10 p-3 text-white" aria-label="Previous photo">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image src={images[index]} alt={`${title}, photo ${index + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <button onClick={() => go(1)} className="absolute right-4 rounded-full bg-white/10 p-3 text-white" aria-label="Next photo">
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="absolute bottom-4 text-sm text-white/70">
            {index + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
