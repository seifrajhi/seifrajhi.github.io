import rss from '@astrojs/rss';

import siteMetadata from "../data/siteMetadata";
import { getBlogPosts, getThoughts } from 'src/content/collections';
import { getBlogUrl, getThoughtUrl } from 'src/content/routing';


export async function get(context) {
	const blogPosts = await getBlogPosts()
	const thoughts = await getThoughts()

	const blogItems = blogPosts.map((post) => ({
		...post.data,
		link: getBlogUrl(post.slug),
	}))

	const thoughtItems = thoughts.map((post) => ({
		...post.data,
		link: getThoughtUrl(post.slug),
	}))

	return rss({
		title: siteMetadata.title,
		description: siteMetadata.description,
		site: context.site,
		items: [...blogItems, ...thoughtItems],
	});
}
