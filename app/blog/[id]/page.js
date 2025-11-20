import Link from 'next/link';
import LikeButton from '@/app/components/LikeButton';

export default async function BlogDetail({ params }) {
  const { id } = params;
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
  let post = null;
  let otherPosts = [];

  try {
    // 現在の記事を取得
    const res = await fetch(
      `https://${service}.microcms.io/api/v1/blogs/${id}`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    post = await res.json();

    // 他の記事を取得 (最新5件、現在の記事を除く)
    const listRes = await fetch(
      `https://${service}.microcms.io/api/v1/blogs?limit=6`,
      {
        headers: { "X-MICROCMS-API-KEY": key },
        cache: "no-store",
      }
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      otherPosts = (listData.contents || []).filter(p => p.id !== id).slice(0, 5);
    }
  } catch (e) {
    console.error("Failed to fetch blog post:", e);
  }

  if (!post) {
    return <p className="text-center mt-20">Post not found.</p>;
  }

  return (
    <>
      <article className="w-full max-w-4xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        {post.eyecatch?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.eyecatch.url}
            alt={post.title}
            className="w-full h-auto object-contain rounded-lg mb-6"
          />
        )}
        <div className="blog-content text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content || post.body || "" }} />
        
        {/* いいねボタン */}
        <div className="mt-8">
          <LikeButton postId={post.id} initialLikes={post.likes || 0} />
        </div>
      </article>

      {/* 他の記事セクション */}
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
    </>
  );
}
