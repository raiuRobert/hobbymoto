/**
 * One-time script: seeds the two rental bikes (BMW F800GT, BMW F800R) into Sanity.
 * Run: npx tsx scripts/migrate-rental-bikes.ts
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

const rentalBikes = [
  { brand: "BMW", model: "F800GT", year: 2015, km: 71800, engine: "800cc", image: "/bikes/bmw-f800gt-hq.jpg", available: true },
  { brand: "BMW", model: "F800R", year: 2010, km: 36000, engine: "800cc", image: "/bikes/bmw-f800r-hq.jpg", available: true },
];

async function uploadImage(imagePath: string) {
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
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
    process.exit(1);
  }

  console.log(`\nSeeding ${rentalBikes.length} rental bikes into Sanity...\n`);

  for (const bike of rentalBikes) {
    console.log(`→ ${bike.brand} ${bike.model}`);
    console.log(`  Uploading image: ${bike.image}`);
    const mainImage = await uploadImage(bike.image);

    await client.create({
      _type: "rentalBike",
      brand: bike.brand,
      model: bike.model,
      year: bike.year,
      km: bike.km,
      engine: bike.engine,
      available: bike.available,
      ...(mainImage ? { mainImage } : {}),
    });

    console.log(`  ✓ Done\n`);
  }

  console.log("✅ Seeding complete! Both bikes are now in Sanity.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
