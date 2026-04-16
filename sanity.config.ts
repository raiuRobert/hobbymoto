import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";

export default defineConfig({
  name: "hobbymoto",
  title: "HobbyMoto CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("HobbyMoto")
          .items([
            S.listItem()
              .title("Motociclete Rulate")
              .schemaType("bike")
              .child(S.documentTypeList("bike").title("Motociclete Rulate")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});
