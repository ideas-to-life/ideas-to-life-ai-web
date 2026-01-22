import { defineCollection, z } from 'astro:content';

const experimentsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        summary: z.string(),
        image: z.string(),
        date: z.date().optional(),
        status: z.enum(['exploring', 'validating', 'shipping', 'paused', 'archived']),
        domain: z.array(z.string()),
        deployment: z.string().optional(),
        repo: z.string().url().optional(),
        demo: z.string().optional(),
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
        title: z.string().trim().min(8),
        date: z.coerce.date(),
        summary: z.string().trim().min(20).max(180),
        tags: z
            .array(z.string().trim().toLowerCase().min(2).max(24))
            .max(8)
            .optional(),
        draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
    'experiments': experimentsCollection,
    'pages': pagesCollection,
    'learnings': learningsCollection,
};
