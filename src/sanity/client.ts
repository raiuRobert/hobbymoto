import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  // No token needed — bikes are public content
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityBike = {
  id: string; // slug.current — used as URL param
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number | null;
  currency: string;
  category: string;
  engine: string;
  power: string;
  torque: string | null;
  weight: string | null;
  color: string;
  image: string | null; // CDN URL of mainImage
  gallery: string[]; // CDN URLs (already filtered of nulls)
  description: string;
  extras: string[] | null;
  warranty: string | null;
  featured: boolean;
  available: boolean;
};

export type SanityBikeCard = Pick<
  SanityBike,
  "id" | "brand" | "model" | "year" | "km" | "price" | "currency" | "image" | "gallery"
>;

// ─── Shared field projection ──────────────────────────────────────────────────

const BIKE_FIELDS = `
  "id": slug.current,
  brand,
  model,
  year,
  km,
  price,
  currency,
  category,
  engine,
  power,
  torque,
  weight,
  color,
  "image": mainImage.asset->url,
  "gallery": gallery[defined(asset)][].asset->url,
  description,
  extras,
  warranty,
  featured,
  available
`;

// ─── Queries ──────────────────────────────────────────────────────────────────

export const USED_BIKES_QUERY = `
  *[_type == "bike" && available == true] | order(_createdAt desc) {
    ${BIKE_FIELDS}
  }
`;

export const BIKE_BY_SLUG_QUERY = `
  *[_type == "bike" && slug.current == $slug][0] {
    ${BIKE_FIELDS}
  }
`;

export const SIMILAR_BIKES_QUERY = `
  *[_type == "bike" && available == true && category == $category && slug.current != $slug]
    | order(_createdAt desc) [0...3] {
    "id": slug.current,
    brand,
    model,
    year,
    km,
    price,
    currency,
    "image": mainImage.asset->url,
    "gallery": gallery[defined(asset)][].asset->url
  }
`;
