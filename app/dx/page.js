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

        {/* 04. データ活用方針 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">04</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">データ活用方針</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">
            当社は、顧客情報、商談履歴、案件進捗、広告配信データ、クラウドファンディング支援実績、問い合わせ内容、売上・費用・利益データ等を適切に収集・管理・分析し、海外展開支援の品質向上に活用します。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            これらのデータをもとに、提案内容の改善、広告運用の最適化、プロジェクトページの改善、顧客対応の標準化、自治体事業における報告品質の向上を図ります。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 05. デジタル人材育成方針 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">05</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">デジタル人材育成方針</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">
            当社は、DXを継続的に推進するため、生成AI、広告運用、データ分析、クラウドツール活用、情報セキュリティ、越境EC・海外クラウドファンディング運用等に関する知識・スキルの向上に取り組みます。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            業務マニュアル、チェックリスト、テンプレート、ナレッジ共有を整備し、特定の担当者に依存しない業務運営を目指します。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 06. IT環境整備方針 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">06</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">IT環境整備方針</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">
            当社は、案件管理、顧客管理、広告データ管理、制作物管理、契約情報管理をクラウド上で行い、必要な情報を安全かつ効率的に共有できる環境を整備します。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            今後は、案件管理ツール、顧客管理ツール、広告分析ツール、生成AI等を活用し、案件ごとの進捗、成果、課題、収益性を可視化することで、業務品質の標準化と生産性向上を図ります。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 07. KPI */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">07</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">DX推進に関するKPI</h2>
          </div>
          <ul className="space-y-3 mb-6">
            {[
              '案件管理表への登録率',
              '顧客情報および商談履歴の記録率',
              '提案書・報告書作成工数の削減率',
              '広告運用レポート作成時間の削減率',
              '支援企業数',
              '海外クラウドファンディング支援件数',
              '自治体・官公庁案件への提案件数',
              'セキュリティ権限確認の実施回数',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/40 flex items-center justify-center text-[10px] text-[#0066FF] font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-black/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-black/50 text-sm leading-loose">
            これらの指標を定期的に確認し、DX施策の進捗と成果を継続的に改善します。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 08. 情報セキュリティ方針 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">08</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">情報セキュリティ方針</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">
            当社は、顧客情報、契約情報、広告アカウント情報、支援者情報、自治体関連資料等を取り扱うため、情報セキュリティ対策を重要な経営課題と位置づけています。
          </p>
          <p className="text-black/50 text-sm leading-loose mb-4">
            クラウドサービスや広告アカウントについては、アクセス権限管理、二要素認証、パスワード管理、バックアップ、外部共有リンクの管理を行います。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            また、従業員および外部パートナーに対して、個人情報保護、機密情報管理、フィッシング対策、クラウド共有ルール等に関する周知を行い、情報セキュリティの継続的な改善に取り組みます。
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 09. 代表メッセージ */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">09</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">代表メッセージ</h2>
          </div>
          <div className="space-y-4 text-black/50 text-sm leading-loose">
            <p>
              SOMA株式会社は、日本企業・地域事業者の海外展開を支援する会社として、海外クラウドファンディング、越境EC、海外販路開拓、自治体支援等に取り組んでまいりました。
            </p>
            <p>
              海外市場への挑戦には、言語、商習慣、広告運用、物流、決済、顧客対応、規制確認など多くの課題があります。これらを経験や人手だけで解決するのではなく、デジタル技術とデータ活用によって、より再現性の高い支援体制を構築してまいります。
            </p>
            <p>
              当社は、案件情報、顧客情報、広告データ、支援実績等を蓄積・分析し、支援品質の向上、業務効率化、成果の可視化を進め、日本企業の海外展開を力強く支援してまいります。
            </p>
          </div>
          <p className="mt-8 text-black/40 text-sm text-right">
            SOMA株式会社<br />
            代表取締役　内藤 拓馬
          </p>
        </section>

        <div className="border-t border-black/8 mb-16" />

        {/* 10. 意思決定および継続的見直し */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#0066FF] text-xs font-bold tracking-widest uppercase">10</span>
            <h2 className="text-lg font-bold tracking-tight text-[#0A0F1E]">意思決定および継続的見直し</h2>
          </div>
          <p className="text-black/50 text-sm leading-loose mb-4">
            本DX推進基本方針は、代表取締役を中心とする経営判断に基づき策定し、当社の経営方針および事業戦略の一部として決定したものです。
          </p>
          <p className="text-black/50 text-sm leading-loose">
            代表取締役がDX推進責任者として内容を確認・承認し、当社コーポレートサイト上に公開しています。今後も、経営環境や事業内容の変化に応じて、必要に応じて見直しを行います。
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
