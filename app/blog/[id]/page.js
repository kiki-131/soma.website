"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${id}`,
          {
            headers: { "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY },
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        console.error("Failed to fetch blog post:", e);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!post) return <p className="text-center mt-20">Post not found.</p>;

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      {post.eyecatch?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.eyecatch.url}
          alt={post.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
