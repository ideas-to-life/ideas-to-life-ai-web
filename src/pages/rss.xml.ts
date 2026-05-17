import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const learnings = await getCollection('learnings');
    const experiments = await getCollection('experiments');
    const patterns = await getCollection('patterns');

    // Filter and format learnings
    const learningItems = learnings
        .filter(entry => !entry.data.draft)
        .map((entry) => ({
            title: `[Learning] ${entry.data.title}`,
            pubDate: entry.data.date || new Date(), // Handle optional date for threads
            description: entry.data.summary || entry.data.title,
            link: `/learnings/${entry.id}/`,
            categories: entry.data.tags ?? [],
        }));

    // Filter and format experiments
    const experimentItems = experiments
        .filter(entry => !entry.data.draft)
        .map((entry) => ({
            title: `[Experiment] ${entry.data.title}`,
            pubDate: entry.data.date || new Date(),
            description: entry.data.description,
            link: `/experiments/${entry.id}/`,
            categories: entry.data.tags ?? [],
        }));

    // Filter and format patterns (Architecture)
    const patternItems = patterns.map((entry) => ({
        title: `[Pattern] ${entry.data.title}`,
        pubDate: entry.data.date,
        description: entry.data.summary,
        link: `/architecture/patterns/${entry.id}/`,
        categories: entry.data.tags ?? [],
    }));

    // Merge and sort all items by date (descending)
    const allItems = [...learningItems, ...experimentItems, ...patternItems].sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    );

    return rss({
        title: 'Ideas to Life — Content Feed',
        description: 'Updates from the Ideas to Life lab: experiments, architectural patterns, and weekly learnings.',
        site: context.site,
        items: allItems,
    });
}
