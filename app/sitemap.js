export const revalidate = 3600;

const BASE_URL = "https://www.soma-jp.net";

const staticPages = [
  { url: "/", changeFrequency: "weekly", priority: 1.0 },
  { url: "/blog", changeFrequency: "daily", priority: 0.9 },
  { url: "/about", changeFrequency: "monthly", priority: 0.7 },
  { url: "/service", changeFrequency: "monthly", priority: 0.7 },
  { url: "/contact", changeFrequency: "monthly", priority: 0.5 },
];

async function getBlogPosts() {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  if (!service || !key) return [];

  try {
    const res = await fetch(
      `https://${service}.microcms.io/api/v1/blogs?limit=100`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.contents || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const posts = await getBlogPosts();

  const blogEntries = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries = staticPages.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
