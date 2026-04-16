import { defineType, defineField } from "sanity";

export const bikeSchema = defineType({
  name: "bike",
  title: "Motocicletă Rulată",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      type: "string",
      title: "Marcă",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "model",
      type: "string",
      title: "Model",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug URL",
      description: "Apasă Generate după ce ai completat Marca și Modelul.",
      options: {
        source: (doc: Record<string, unknown>) =>
          `${(doc.brand as string) ?? ""}-${(doc.model as string) ?? ""}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        maxLength: 100,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      title: "An fabricație",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "km",
      type: "number",
      title: "Kilometraj",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Preț",
      description: "Lasă gol pentru 'Preț la cerere'.",
    }),
    defineField({
      name: "currency",
      type: "string",
      title: "Monedă",
      options: { list: ["EUR", "RON"] },
      initialValue: "EUR",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Categorie",
      options: {
        list: [
          { value: "sport", title: "Sport" },
          { value: "naked", title: "Naked" },
          { value: "touring", title: "Touring" },
          { value: "adventure", title: "Adventure" },
          { value: "cruiser", title: "Cruiser" },
          { value: "scooter", title: "Scooter" },
          { value: "standard", title: "Standard" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "engine",
      type: "string",
      title: "Motor",
      description: "ex: 1103cc V4",
    }),
    defineField({
      name: "power",
      type: "string",
      title: "Putere",
      description: "ex: 215 CP @ 13.000 rpm",
    }),
    defineField({
      name: "torque",
      type: "string",
      title: "Cuplu",
      description: "ex: 124 Nm @ 9.500 rpm",
    }),
    defineField({
      name: "weight",
      type: "string",
      title: "Greutate",
      description: "ex: 189 kg",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Culoare",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Foto principală",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Galerie foto",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Descriere",
      rows: 4,
    }),
    defineField({
      name: "extras",
      type: "array",
      title: "Dotări & accesorii",
      description: "Adaugă fiecare dotare separat.",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "warranty",
      type: "string",
      title: "Garanție",
      description: "ex: Garanție 12 luni",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Promovat pe homepage",
      initialValue: false,
    }),
    defineField({
      name: "available",
      type: "boolean",
      title: "Disponibil (debifează când s-a vândut)",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "model",
      subtitle: "brand",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${subtitle ?? ""} ${title ?? ""}`.trim(),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Disponibil",
      name: "availableDesc",
      by: [
        { field: "available", direction: "desc" as const },
        { field: "_createdAt", direction: "desc" as const },
      ],
    },
  ],
});
