import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'DX推進基本方針｜SOMA株式会社',
  description: 'SOMA株式会社のDX推進基本方針。デジタル技術とデータ活用を通じて、日本企業・地域事業者の海外展開支援の品質向上と業務効率化を推進します。',
};

export default function DxPage() {
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
            Digital Transformation
          </span>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-10 leading-tight text-[#0A0F1E]">
          DX推進基本方針
        </h1>

        {/* 導入文 */}
        <p className="text-black/50 text-sm md:text-base leading-loose mb-20">
          SOMA株式会社は、海外クラウドファンディング・越境EC・海外販路開拓・自治体の海外展開支援において、デジタル技術とデータ活用を経営の中核に位置づけ、<span className="text-[#0A0F1E] font-medium">支援品質の標準化・業務効率化・成果の可視化</span>を実現することを基本方針とします。
        </p>

        {/* Divider */}
        <div className="border-t border-black/8 mb-16" />

        {/* 1. DX推進の方向性 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">01</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">DX推進の方向性</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: '業務改革と生産性向上',
                body: '案件管理・顧客管理・広告運用・報告書作成等の業務を、クラウドツールや生成AIを活用してデジタル化し、属人化の解消と業務効率の向上を図ります。',
              },
              {
                title: 'データ活用による価値創造',
                body: '広告配信データ・商談履歴・支援実績・問い合わせ内容等を蓄積・分析し、提案精度の向上と再現性のある海外展開支援モデルの構築を目指します。',
              },
              {
                title: '組織文化の変革と人材育成',
                body: '生成AI・広告運用・データ分析・クラウドツール活用等に関する知識・スキルの向上を継続的に図り、デジタルを当たり前に使える組織づくりを推進します。',
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

        {/* 2. DXプロジェクト */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">02</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">DXプロジェクト</h2>
          </div>

          <ul className="space-y-4">
            {[
              '案件管理・顧客管理のデジタル化（進捗・商談履歴・成果物の一元管理）',
              '広告・マーケティングデータの分析と改善サイクルの確立',
              '生成AIを活用した提案書・報告書・広告文の作成効率化',
              '情報セキュリティ体制の整備（アクセス権限管理・バックアップ・認証強化）',
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

        {/* 3. 推進体制 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">03</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">推進体制</h2>
          </div>

          <p className="text-black/50 text-sm leading-loose mb-4">
            代表取締役をDX推進責任者とし、経営方針と一体となったDX推進を行います。全案件・顧客情報のデジタル管理を徹底し、提案書・報告書の作成工数30%削減、支援企業数・海外販売実績の継続的拡大を目指します。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            必要に応じて広告運用・翻訳・システム等の外部パートナーとも連携し、専門性の高い支援体制を維持します。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 署名 */}
        <div className="space-y-1 text-black/35 text-sm mb-20">
          <p>2026年4月30日</p>
          <p>SOMA株式会社</p>
          <p>代表取締役　内藤 拓馬</p>
        </div>

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
