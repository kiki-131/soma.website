import BlogListClient from "./BlogListClient";

export const revalidate = 60;

export const metadata = {
  title: "ブログ | SOMA株式会社",
  description: "海外クラウドファンディング（Kickstarter・Indiegogo）に関する最新情報、ノウハウ、事例を発信しています。",
};

async function getPosts() {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  if (!service || !key) return [];

  try {
    const res = await fetch(
      `https://${service}.microcms.io/api/v1/blogs?limit=100`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.contents || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogListClient posts={posts} />;
}
