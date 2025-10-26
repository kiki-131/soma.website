import Link from "next/link";

export default async function BlogPage() {
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
  let posts = [];

  try {
    if (!service || !key) {
      console.warn("microCMS service or API key is missing. Skipping fetch.");
    } else {
      const res = await fetch(`https://${service}.microcms.io/api/v1/blogs`, {
        headers: { "X-MICROCMS-API-KEY": key },
        // no-store to always fetch fresh content; change if you want caching
        cache: "no-store",
      });

      if (!res.ok) {
        // don't throw — handle gracefully and log details for debugging
        console.error(`microCMS list fetch failed: ${res.status} ${res.statusText}`);
      } else {
        const data = await res.json();
        posts = data.contents || [];
      }
    }
  } catch (e) {
    // log on server — user sees friendly message
    console.error("Failed to fetch blog list:", e);
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-10 border-b pb-6">
            {post.eyecatch?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.eyecatch.url}
                alt={post.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
            </p>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
              → Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
