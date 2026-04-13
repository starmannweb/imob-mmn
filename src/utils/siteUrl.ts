import { headers } from "next/headers";

/**
 * Returns the current site's base URL.
 * Uses NEXT_PUBLIC_SITE_URL env var when available,
 * otherwise falls back to the request Host header (works on Vercel + local).
 */
export async function getSiteUrl(): Promise<string> {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }
    try {
        const hdrs = await headers();
        const host = hdrs.get("host") || "localhost:3000";
        const proto = host.startsWith("localhost") ? "http" : "https";
        return `${proto}://${host}`;
    } catch {
        return "http://localhost:3000";
    }
}
