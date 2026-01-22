import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function GET(context: any) {
    const learnings = await getCollection('learnings');
    const validLearnings = learnings
        .filter((entry): entry is CollectionEntry<'learnings'> & { data: { type: 'weekly' } } => {
            return !entry.data.draft && entry.data.type === 'weekly';
        })
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return rss({
        title: 'Ideas to Life — Weekly Learnings',
        description: 'Weekly learnings from building Ideas to Life experiments: what worked, what broke, and what I learned.',
        site: context.site,
        items: validLearnings.map((entry) => ({
            title: entry.data.title,
            pubDate: entry.data.date,
            description: entry.data.summary,
            link: `/learnings/${entry.slug}/`,
            categories: entry.data.tags ?? [],
        })),
    });
}
