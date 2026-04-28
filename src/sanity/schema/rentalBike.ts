import { defineType, defineField } from "sanity";

export const rentalBikeSchema = defineType({
  name: "rentalBike",
  title: "Motocicletă Închiriere",
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
      name: "engine",
      type: "string",
      title: "Motor",
      description: "ex: 800cc",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Foto principală",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "available",
      type: "boolean",
      title: "Disponibilă (debifează dacă nu este disponibilă momentan)",
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
