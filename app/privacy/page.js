import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'プライバシーポリシー｜SOMA株式会社',
  description: 'SOMA株式会社のプライバシーポリシー。個人情報の利用目的、安全管理、第三者提供、アクセス解析ツールの利用についてご説明します。',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-[#0A0F1E]">

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-black/8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.jpg"
              alt="SOMA"
              width={44}
              height={44}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2 text-sm font-semibold text-[#0A0F1E] border border-black/20 rounded-full hover:bg-[#0A0F1E] hover:text-white transition-all duration-300"
          >
            Contact us
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-16 py-20 md:py-28">

        {/* ラベル */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-[#0066FF]" />
          <span className="text-[#0066FF] text-[11px] font-bold tracking-[0.4em] uppercase">
            Privacy Policy
          </span>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-10 leading-tight text-[#0A0F1E]">
          プライバシーポリシー
        </h1>

        <div className="border-t border-black/8 mb-16" />

        {/* 情報の利用目的 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">01</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">情報の利用目的</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">当社は、取得した情報を以下の目的で利用します。</p>
          <ul className="space-y-3">
            {[
              'サービス登録の受付や本人確認',
              'サービス利用履歴の管理',
              '利用料金の決済',
              'サービス改善のための行動履歴の分析',
              'サービスやキャンペーンの案内',
              'お問い合わせへの対応',
              '規約や法令違反行為への対応',
              'サービス内容の変更や終了のご案内',
              '規約の変更通知',
              'その他、サービス提供、保護、改善のため',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/40 flex items-center justify-center text-[10px] text-[#0066FF] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-black/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 安全管理のための措置 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">02</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">安全管理のための措置</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose">
            取得した情報の安全管理に関する具体的な措置については、法令に基づき個別にお答えします。お問い合わせ窓口よりご連絡ください。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 第三者提供について */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">03</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">第三者提供について</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">当社は、お客様の個人データを第三者に提供することはありません。ただし、以下の場合を除きます。</p>
          <ul className="space-y-3">
            {[
              '外部委託先への業務委託',
              '事業譲渡に伴う情報提供',
              'パートナー企業との共同利用（詳細は別途公表します）',
              '法律で認められる場合',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/40 flex items-center justify-center text-[10px] text-[#0066FF] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-black/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* アクセス解析ツールの利用 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">04</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">アクセス解析ツールの利用</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Google Analytics',
                body: 'ユーザーのアクセスログを収集・解析するために使用します。Cookieを利用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。',
              },
              {
                title: 'Google Search Console',
                body: '当サイトの検索パフォーマンスを分析し、サービスの改善に役立てるために使用します。個人を特定する情報は収集されません。',
              },
              {
                title: 'Google reCAPTCHA',
                body: '不正アクセスやスパム防止のために使用します。ツールによって収集されるデータはGoogleのプライバシーポリシーに基づいて管理されます。',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 mt-1 w-1 self-stretch bg-[#0066FF]/30 rounded-full" />
                <div>
                  <h3 className="text-[#0A0F1E] font-semibold mb-2 text-sm">{item.title}</h3>
                  <p className="text-black/50 text-sm leading-loose">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* プライバシーポリシーの変更 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">05</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">プライバシーポリシーの変更</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose">
            当社は、本ポリシーを必要に応じて変更することがあります。変更後の内容と施行時期については、適切な方法でお知らせします。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* お問い合わせ */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">06</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">お問い合わせ</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-6">
            情報の開示、訂正、利用停止、削除をご希望の場合は、以下の窓口にご連絡ください。ご請求は、ご本人確認の上で対応いたします。なお、開示請求には1件あたり1,000円の手数料が発生します。
          </p>
          <div className="space-y-1 text-black/55 text-sm">
            <p>連絡先：info@soma-jp.net</p>
            <p>事業者の名称：SOMA株式会社</p>
            <p>代表者氏名：内藤 拓馬</p>
            <p>住所：〒241-0825　神奈川県横浜市旭区中希望が丘 127-9</p>
          </div>
        </section>

        <div className="border-t border-black/8 mb-16" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-black/35 text-sm hover:text-[#0A0F1E] transition-colors"
        >
          ← ホームに戻る
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0F1E] border-t border-black/8 py-10 mt-10">
        <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Image
            src="/images/logo.jpg"
            alt="SOMA"
            width={44}
            height={44}
            className="h-8 w-auto opacity-60"
          />
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} SOMA株式会社. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
