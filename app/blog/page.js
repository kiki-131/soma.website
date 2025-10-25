"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs`,
          {
            headers: { "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY },
          }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        setPosts(data.contents || []);
      } catch (e) {
        console.error("Failed to fetch blog list:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found.</p>
      )}

      {posts.map((post) => (
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
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : ""}
          </p>
          <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
            → Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
