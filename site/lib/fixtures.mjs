/** Sample content for the docs preview, shaped like Ghost's Content API. */
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './paths.mjs';

export function loadFixtures() {
	const { posts: raw } = JSON.parse(fs.readFileSync(path.join(SITE, 'fixtures/content.json'), 'utf8'));

	const author = {
		id: 'a1',
		name: 'Swarnil Singhai',
		slug: 'swarnil',
		url: '/author/swarnil/',
		bio: 'Engineer and creator. Writes about building things, travel, and the tools in between.',
		location: 'Budapest, Hungary',
		profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
	};

	const tagMap = new Map();
	const posts = raw.map((p, i) => {
		const tags = p.tags.map((t) => {
			if (!tagMap.has(t.slug)) tagMap.set(t.slug, { ...t, id: `t-${t.slug}`, url: `/tag/${t.slug}/`, visibility: 'public', count: { posts: 0 } });
			const tag = tagMap.get(t.slug);
			tag.count.posts += 1;
			return tag;
		});
		return {
			...p,
			id: `p${i}`,
			url: `/${p.slug}/`,
			html: `<p>${p.excerpt}</p>`,
			plaintext: p.excerpt,
			custom_excerpt: p.excerpt,
			visibility: 'public',
			access: true,
			type: 'post',
			tags,
			primary_tag: tags[0] || null,
			authors: [author],
			primary_author: author,
		};
	});
	posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
	author.count = { posts: posts.length };

	return { posts, pages: [], tags: [...tagMap.values()], authors: [author], author };
}
