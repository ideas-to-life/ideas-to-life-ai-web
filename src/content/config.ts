import { defineCollection, z } from 'astro:content';

const experimentsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        date: z.date().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'experiments': experimentsCollection,
};
