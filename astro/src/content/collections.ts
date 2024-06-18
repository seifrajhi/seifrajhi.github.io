import { getCollection } from "astro:content"

export const getBlogPosts = async () => {
    return (await getCollection('blog'))
        .filter((post) => !post.data.draft)
        .sort(
            (a, b) =>  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
        )
}

export const getThoughts = async () => {
    return (await getCollection('thoughts'))
        .filter((post) => !post.data.draft)
        .sort(
            (a, b) =>  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
        )
}

export const getResumes = async () => {
    return (await getCollection('cv'))
        .filter((post) => !post.data.draft)
        .sort(
            (a, b) =>  b.data.order.valueOf() - a.data.order.valueOf()
        )
}