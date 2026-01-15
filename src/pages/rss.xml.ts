import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const learnings = await getCollection('learnings', ({ data }) => {
        return !data.draft;
    });
    const validLearnings = learnings
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
