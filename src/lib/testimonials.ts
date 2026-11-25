// Server-side storage for traveller testimonials.
//
// Two backends, picked automatically:
// • Redis (Upstash) when its env vars are set — use this on Vercel, where the
//   filesystem is read-only. Add it in Vercel → Storage → Upstash for Redis;
//   that sets KV_REST_API_URL / KV_REST_API_TOKEN (UPSTASH_REDIS_REST_* also work).
// • data/testimonials.json otherwise — fine for `npm run dev` / a normal Node server.
//
// In Redis mode, reviews already in data/testimonials.json at build time are
// shown too (bundled as seed data), so nothing collected locally is lost.

import { promises as fs } from "fs";
import path from "path";
import { cacheTag } from "next/cache";
import { Redis } from "@upstash/redis";
import seed from "../../data/testimonials.json";

export interface Testimonial {
  id: string;
  trip: string; // trip slug
  name: string;
  country?: string;
  rating: number; // 1–5
  message: string;
  createdAt: string; // ISO
  approved: boolean;
}

/**
 * false = new testimonials show immediately.
 * true  = they're saved with approved: false and only appear once approved
 *         (edit data/testimonials.json locally, or the entry in the Upstash data browser).
 */
export const REQUIRE_APPROVAL = false;

export const TESTIMONIALS_TAG = "testimonials";

/* ───────── Redis backend ───────── */
const REDIS_KEY = "testimonials";
const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/* ───────── File backend ───────── */
const FILE = path.join(process.cwd(), "data", "testimonials.json");

async function readFile(): Promise<Testimonial[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // missing or unreadable file = no testimonials yet
  }
}

async function appendToFile(entry: Testimonial) {
  const all = await readFile();
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify([...all, entry], null, 2), "utf8");
  await fs.rename(tmp, FILE); // atomic replace, so a crash never leaves half a file
}

/* ───────── Public API ───────── */
async function readAll(): Promise<Testimonial[]> {
  if (!redis) return readFile();
  const stored = await redis.lrange<Testimonial>(REDIS_KEY, 0, -1);
  const ids = new Set(stored.map((t) => t.id));
  return [...(seed as Testimonial[]).filter((t) => !ids.has(t.id)), ...stored];
}

/** Approved testimonials, newest first. Cached until a new one is added. */
export async function getTestimonials(trip?: string): Promise<Testimonial[]> {
  "use cache";
  cacheTag(TESTIMONIALS_TAG);
  const all = await readAll();
  return all
    .filter((t) => t.approved && (!trip || t.trip === trip))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveTestimonial(t: Omit<Testimonial, "id" | "createdAt" | "approved">) {
  const entry: Testimonial = {
    ...t,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    approved: !REQUIRE_APPROVAL,
  };
  if (redis) await redis.rpush(REDIS_KEY, entry); // atomic append, safe with concurrent visitors
  else await appendToFile(entry);
  return entry;
}

/** True when reviews can be saved (Redis connected, or running somewhere with a writable disk). */
export const canSaveTestimonials = Boolean(redis) || !process.env.VERCEL;
