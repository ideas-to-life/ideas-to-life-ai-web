import { defineCollection, z } from 'astro:content';

const experimentsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        summary: z.string(),
        image: z.string(),
        date: z.date().optional(),
        status: z.enum(['exploring', 'validating', 'shipping', 'paused']),
        domain: z.array(z.string()),
        deployment: z.string().optional(),
        repo: z.string().url().optional(),
        demo: z.string().url().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const pagesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        heroTitle: z.string().optional(),
        heroSubtitle: z.string().optional(),
        heroDetails: z.string().optional(),
        whyTitle: z.string().optional(),
        whyText: z.string().optional(),
        whyBullets: z.array(z.string()).optional(),
        focusTitle: z.string().optional(),
        focusSubtitle: z.string().optional(),
        experimentsTitle: z.string().optional(),
        experimentsSubtitle: z.string().optional(),
        howTitle: z.string().optional(),
        howSubtitle: z.string().optional(),
        joinTitle: z.string().optional(),
        joinText: z.string().optional(),
        quote: z.string().optional(),
    }),
});

const learningsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        summary: z.string(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'experiments': experimentsCollection,
    'pages': pagesCollection,
    'learnings': learningsCollection,
};
