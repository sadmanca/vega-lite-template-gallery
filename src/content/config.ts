// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const directoryCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      card_image: image().optional(),
      links: z
        .array(z.object({ name: z.string(), link: z.string() }))
        .optional(),
    }),
});

// 2. Define a `type` and `schema` for each collection
const pagesCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  directory: directoryCollection,
  front: pagesCollection,
};
