import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 「検索とAI」の論考。src/content/essays/ に Markdown を1本ずつ置く。
// draft: true のものはサイトに出さない。
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays };
