"use client";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Blog</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左側：プロフィール */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="text-center mb-4">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/images/naito.jpg"
                    alt="内藤 拓馬"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">内藤 拓馬</h3>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed mb-4">
                <p className="mb-3">
                  海外クラウドファンディング専門の支援会社で、日本メーカー・スタートアップのKickstarter／Indiegogo／zeczec出店をサポートしています。
                </p>
                <p className="mb-3">
                  企画設計からLP、広告、物流・DDPまで&quot;初めての海外クラファン&quot;を初期費無料で伴走中。
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <a 
                  href="https://www.soma-jp.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 hover:underline"
                >
                  🏢 SOMA株式会社
                </a>
                <a 
                  href="https://x.com/kaigai_support7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <span className="font-bold text-base">𝕏</span>
                  <span>@kaigai_support7をフォロー</span>
                </a>
              </div>
            </div>
          </aside>

          {/* 右側：ブログ記事一覧 */}
          <main className="flex-1">
            {isLoading ? (
              <p className="text-center text-gray-500">読み込み中...</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-500">No posts found.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <article className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
                        {/* サムネイル画像 */}
                        {post.eyecatch?.url && (
                          <div className="relative w-full h-48 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.eyecatch.url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* コンテンツ */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h2 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          
                          {/* メタ情報 */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                            <time className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('ja-JP') : ""}
                            </time>
                            
                            <div className="flex items-center gap-1">
                              <FaHeart className="text-red-500" />
                              <span className="font-semibold">{post.likes || 0}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

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
          </main>
        </div>
      </div>
    </div>
  );
}
