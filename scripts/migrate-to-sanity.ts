/**
 * One-time migration script: imports existing used bikes from data.ts into Sanity.
 *
 * Prerequisites:
 *   1. Fill in .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN
 *   2. Run: npx tsx scripts/migrate-to-sanity.ts
 *
 * The script uploads all local images to Sanity and creates bike documents.
 * Run it only once — re-running will create duplicates.
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN!,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// Import bikes data — adjust path if needed
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { bikes } = require("../src/lib/data") as { bikes: import("../src/lib/data").Bike[] };

async function uploadImage(imagePath: string) {
  // imagePath is like "/bikes/gallery/ducati/1.jpg"
  const fullPath = path.join(process.cwd(), "public", imagePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${fullPath}`);
    return null;
  }
  const file = fs.createReadStream(fullPath);
  const filename = path.basename(imagePath);
  const asset = await client.assets.upload("image", file, { filename });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function migrate() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID not set in .env.local");
    process.exit(1);
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN not set in .env.local");
    process.exit(1);
  }

  const usedBikes = bikes.filter((b) => b.type === "used" && b.available);
  console.log(`\nMigrating ${usedBikes.length} used bikes to Sanity...\n`);

  for (const bike of usedBikes) {
    console.log(`→ ${bike.brand} ${bike.model} (${bike.year})`);

    const slug = bike.id; // keep existing slug format

    // Upload main image
    console.log(`  Uploading main image: ${bike.image}`);
    const mainImage = await uploadImage(bike.image);

    // Upload gallery images
    const gallery = [];
    for (const imgPath of bike.gallery) {
      console.log(`  Uploading gallery: ${imgPath}`);
      const img = await uploadImage(imgPath);
      if (img) gallery.push(img);
    }

    const doc = {
      _type: "bike",
      brand: bike.brand,
      model: bike.model,
      slug: { _type: "slug", current: slug },
      year: bike.year,
      km: bike.km,
      price: bike.price || null,
      currency: bike.currency,
      category: bike.category,
      engine: bike.engine,
      power: bike.power,
      torque: bike.torque ?? null,
      weight: bike.weight ?? null,
      color: bike.color,
      ...(mainImage ? { mainImage } : {}),
      gallery,
      description: bike.description,
      extras: bike.extras ?? null,
      warranty: bike.warranty ?? null,
      featured: bike.featured,
      available: bike.available,
    };

    await client.create(doc);
    console.log(`  ✓ Done\n`);
  }

  console.log("✅ Migration complete!");
  console.log("You can now remove the 'used' bikes from src/lib/data.ts.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
