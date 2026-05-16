import Link from 'next/link';
import LikeButton from '@/app/components/LikeButton';

export const revalidate = 60;

async function getPost(id) {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  const res = await fetch(
    `https://${service}.microcms.io/api/v1/blogs/${id}`,
    {
      headers: { "X-MICROCMS-API-KEY": key },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getOtherPosts(currentId) {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  const res = await fetch(
    `https://${service}.microcms.io/api/v1/blogs?limit=6`,
    {
      headers: { "X-MICROCMS-API-KEY": key },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.contents || []).filter(p => p.id !== currentId).slice(0, 5);
}

export async function generateStaticParams() {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

  if (!service || !key) return [];

  try {
    const res = await fetch(
      `https://${service}.microcms.io/api/v1/blogs?limit=100`,
      { headers: { "X-MICROCMS-API-KEY": key } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.contents || []).map(post => ({ id: post.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "記事が見つかりません | SOMA株式会社" };
  }

  const description = post.content
    ? post.content.replace(/<[^>]+>/g, '').slice(0, 120)
    : "海外クラウドファンディングに関する記事です。";

  return {
    title: `${post.title} | SOMA株式会社`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.eyecatch?.url ? [{ url: post.eyecatch.url }] : [],
    },
    alternates: {
      canonical: `/blog/${id}`,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { id } = await params;

  let post = null;
  let otherPosts = [];

  try {
    [post, otherPosts] = await Promise.all([
      getPost(id),
      getOtherPosts(id),
    ]);
  } catch (e) {
    console.error("Failed to fetch blog post:", e);
  }

  if (!post) {
    return <p className="text-center mt-20">Post not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <article className="w-full max-w-4xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ja-JP') : ""}
        </p>
        {post.eyecatch?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.eyecatch.url}
            alt={post.title}
            className="w-full h-auto object-contain rounded-lg mb-6"
          />
        )}
        <div className="blog-content text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content || post.body || "" }} />

        <div className="mt-8">
          <LikeButton postId={post.id} initialLikes={post.likes || 0} />
        </div>
      </article>

      {otherPosts.length > 0 && (
        <section className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-8">他の記事</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="group block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {p.eyecatch?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.eyecatch.url}
                      alt={p.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    {p.publishedAt && (
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(p.publishedAt).toLocaleDateString('ja-JP')}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ブログ一覧へ
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
