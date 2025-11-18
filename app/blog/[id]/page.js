export default async function BlogDetail({ params }) {
  const { id } = params;
  const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
  let post = null;

  try {
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
  } catch (e) {
    console.error("Failed to fetch blog post:", e);
  }

  if (!post) {
    return <p className="text-center mt-20">Post not found.</p>;
  }

  return (
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
    </article>
  );
}
