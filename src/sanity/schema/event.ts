import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Evenimente",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu eveniment",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "date",
      title: "Data evenimentului",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "endDate",
      title: "Data de sfârșit (opțional)",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Locație",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Test Ride", value: "test-ride" },
          { title: "Expoziție", value: "expozitie" },
          { title: "Meetup", value: "meetup" },
          { title: "Promoție", value: "promotie" },
          { title: "Circuit", value: "circuit" },
          { title: "Altele", value: "altele" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "excerpt",
      title: "Descriere scurtă (pentru card)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Descriere completă",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "mainImage",
      title: "Imagine principală",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie foto",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Eveniment evidențiat",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "mainImage" },
    prepare({ title, date, media }) {
      const d = date ? new Date(date).toLocaleDateString("ro-RO") : "";
      return { title, subtitle: d, media };
    },
  },
});
