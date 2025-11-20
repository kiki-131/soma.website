"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const service = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
      const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

      try {
        if (!service || !key) {
          console.warn("microCMS service or API key is missing. Skipping fetch.");
          return;
        }

        const res = await fetch(`https://${service}.microcms.io/api/v1/blogs?limit=100`, {
          headers: { "X-MICROCMS-API-KEY": key },
          cache: "no-store",
        });

        if (!res.ok) {
          console.error(`microCMS list fetch failed: ${res.status} ${res.statusText}`);
        } else {
          const data = await res.json();
          setPosts(data.contents || []);
        }
      } catch (e) {
        console.error("Failed to fetch blog list:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 現在のページに表示する記事を計算
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">読み込み中...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <>
          {currentPosts.map((post) => (
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
            <div className="flex items-center gap-4 mb-2">
              <p className="text-gray-500 text-sm">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
              </p>
              <div className="flex items-center gap-1 text-gray-600">
                <FaHeart className="text-red-500" />
                <span className="text-sm font-semibold">{post.likes || 0}</span>
              </div>
            </div>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
              → Read More
            </Link>
          </div>
          ))}

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                前へ
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // 最初のページ、最後のページ、現在のページ付近のみ表示
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                次へ
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
