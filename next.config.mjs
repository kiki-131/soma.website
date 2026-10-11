// 全ページに付けるセキュリティヘッダー。
// HSTS は Vercel が自動で付与するため、ここでは設定しない。
// Content-Security-Policy は、GA・動画ウィジェット(shortify)・YouTube・インラインの
// 構造化データ等を許可リスト化する必要があり、誤ると表示が壊れるため、ここには入れていない。
// 入れる場合は、まず Content-Security-Policy-Report-Only で違反を観測してから切り替えること。
const securityHeaders = [
  // ブラウザによる Content-Type の推測を禁止（拡張子と中身が違うファイルの誤実行を防ぐ）
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 他サイトへ遷移するとき、送るリファラ（遷移元URL）を最小限にする
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 他サイトの iframe にこのサイトを埋め込ませない（クリックジャッキング対策）
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // 使っていない端末機能を無効化
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
