import Link from 'next/link';
import Image from 'next/image';
import { FaChevronRight, FaCheckCircle } from 'react-icons/fa';

export const metadata = {
  title: '海外クラウドファンディングとは？主要4プラットフォーム解説｜Kickstarter・Indiegogo・zeczec・MyStartr',
  description: '海外クラウドファンディング（海外クラファン）とは何かを、Kickstarter・Indiegogo・zeczec・MyStartrの4プラットフォームを比較しながら分かりやすく解説。日本のものづくり企業が海外市場をテストする際の選び方のポイントも紹介します。',
};

export default function CrowdfundingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-[#333] leading-relaxed">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo.jpg"
              alt="SOMA CORPORATION"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </Link>
          <a 
            href="https://www.soma-jp.net/#contact/" 
            className="text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center"
          >
            お問い合わせ <FaChevronRight className="ml-1" />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-4xl py-12 md:py-20">
        
        {/* Hero / Intro */}
        <section className="mb-16 text-center">
            <h1 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-slate-900">
                海外クラウドファンディングとは？<br className="hidden md:block" />
                <span className="text-blue-600 text-2xl md:text-3xl block mt-2">日本のものづくりを世界に試せる新しいテストマーケティング</span>
            </h1>
            <div className="text-left bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                <p className="mb-6">
                海外クラウドファンディング（海外クラファン）とは、
                <strong>Kickstarter・Indiegogo・zeczec・MyStartr</strong> などの「海外向けクラウドファンディングプラットフォーム」を活用し、
                世界中のユーザーから先行予約・応援購入を集める仕組みです。
                </p>
                <p className="mb-6">
                海外展示会や現地法人設立のように、いきなり大きな投資をするのではなく、
                <strong>オンライン上で“小さく・早く”海外の反応をテストできる</strong>のが特徴です。
                </p>
                <p>
                このページでは、日本企業が利用しやすい代表的な4つの海外クラウドファンディング、
                <strong>Kickstarter / Indiegogo / zeczec / MyStartr</strong> の特徴を、分かりやすく整理してご紹介します。
                </p>
            </div>
        </section>

        {/* Basic Info */}
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b-4 border-blue-900 inline-block pb-1">海外クラウドファンディングの基本</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
                <p className="mb-6">
                海外クラウドファンディングは、仕組み自体は日本のクラファン（Makuake・CAMPFIRE 等）と同じです。プロジェクトページを公開し、期間を決めて支援者を募り、集まった支援額に応じて製品を届けます。
                </p>
                <p className="mb-4 font-bold">ただし、次のような違いがあります。</p>

                <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                        対象市場：日本語圏ではなく、<strong>英語を中心とした世界市場</strong>
                    </div>
                </li>
                <li className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                        支援者の期待値：
                        「日本製の品質」や「ユニークなアイデア」に対する評価が高く、
                        <strong>1人あたりの支援額が高くなりやすい</strong>
                    </div>
                </li>
                <li className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                        その後の展開：
                        クラファンの実績をもとに、
                        <strong>越境EC・海外小売店・代理店との取引につなげやすい</strong>
                    </div>
                </li>
                </ul>

                <p className="bg-blue-50 p-4 rounded-lg text-blue-900 font-medium">
                海外クラウドファンディングは、「いきなり大きく進出する」のではなく、まずは
                <strong>数字で反応を見るテストの場</strong>として活用されることが増えています。
                </p>
            </div>
        </section>

        {/* 4 Platforms */}
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">代表的な4つの海外クラウドファンディング</h2>
            <p className="mb-8 text-center text-gray-600">
            ここからは、日本企業が活用しやすい4つのプラットフォームを、簡潔にご紹介します。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Kickstarter */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-green-700">Kickstarter（キックスターター）</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-gray-700">
                        <li>世界最大級のクラウドファンディングプラットフォーム</li>
                        <li>北米・欧州を中心に、世界中のユーザーが利用</li>
                        <li>ガジェット、デザイン雑貨、アートなど、<strong>クリエイティブなプロジェクトが多い</strong></li>
                    </ul>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                    「新しい体験」「革新的なプロダクト」「ストーリー性のあるもの」に強く、
                    <strong>“世界のど真ん中”で反応を見たいプロジェクト</strong>に向いています。
                    </p>
                </div>

                {/* Indiegogo */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-pink-600">Indiegogo（インディーゴーゴー）</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-gray-700">
                        <li>Kickstarter と同じく、北米・欧州を中心に利用される大手</li>
                        <li>特にハードウェア・ガジェット系プロジェクトが多い傾向</li>
                        <li>ルールや運用が比較的柔軟で、<strong>継続販売（InDemand）などの機能</strong>もある</li>
                    </ul>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                    Kickstarterと比較して、
                    <strong>「プロトタイプ段階のハードウェア系」や「継続的な販売」を視野に入れたいプロジェクト</strong>に適しています。
                    </p>
                </div>

                {/* zeczec */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-yellow-600">zeczec（ゼクゼク）</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-gray-700">
                        <li>台湾発のクラウドファンディングプラットフォーム</li>
                        <li>デザイン性の高い雑貨、ファッション、フードなどが多く掲載</li>
                        <li>台湾ローカルのユーザーに強くリーチできるのが特徴</li>
                    </ul>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                    <strong>「台湾市場でテストマーケティングをしたい日本ブランド」</strong>にとって、
                    現地ユーザーの反応をダイレクトに知ることができる場として活用されています。
                    </p>
                </div>

                {/* MyStartr */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-blue-600">MyStartr（マイスターター）</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-gray-700">
                        <li>マレーシアを中心とした東南アジア向けプラットフォーム</li>
                        <li>ガジェット、生活雑貨、日用品、サービスなど、幅広いジャンル</li>
                        <li>東南アジア市場の価格帯やニーズを意識した運営がポイント</li>
                    </ul>
                    <p className="text-sm bg-gray-50 p-3 rounded">
                    <strong>「東南アジア、とくにマレーシア周辺をターゲットにしたい」</strong>場合に、
                    ローカルユーザーの反応を見られる選択肢のひとつです。
                    </p>
                </div>
            </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">4つのプラットフォーム比較（ざっくりイメージ）</h2>
            <div className="overflow-x-auto shadow-lg rounded-xl">
                <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-blue-900 text-white text-sm">
                        <tr>
                            <th className="p-4 border-b border-blue-800 whitespace-nowrap">プラットフォーム</th>
                            <th className="p-4 border-b border-blue-800 whitespace-nowrap">主な利用地域</th>
                            <th className="p-4 border-b border-blue-800 min-w-[150px]">得意ジャンル</th>
                            <th className="p-4 border-b border-blue-800 min-w-[200px]">特徴のイメージ</th>
                            <th className="p-4 border-b border-blue-800 min-w-[200px]">向いているケース</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="hover:bg-gray-50 border-b">
                            <td className="p-4 font-bold">Kickstarter</td>
                            <td className="p-4">北米・欧州中心</td>
                            <td className="p-4">ガジェット、デザイン、アート等</td>
                            <td className="p-4">世界最大級。革新性・ストーリー性が重視されやすい</td>
                            <td className="p-4">グローバル市場で新しいプロダクトを試したい</td>
                        </tr>
                        <tr className="hover:bg-gray-50 border-b">
                            <td className="p-4 font-bold">Indiegogo</td>
                            <td className="p-4">北米・欧州中心</td>
                            <td className="p-4">ハードウェア、ガジェット</td>
                            <td className="p-4">ルールが比較的柔軟。継続販売機能なども利用しやすい</td>
                            <td className="p-4">ハードウェア系、長めに販売・検証を続けたい</td>
                        </tr>
                        <tr className="hover:bg-gray-50 border-b">
                            <td className="p-4 font-bold text-orange-600">zeczec</td>
                            <td className="p-4">台湾</td>
                            <td className="p-4">デザイン雑貨、ファッション、フード</td>
                            <td className="p-4">台湾ローカル色が強く、ファンコミュニティが活発</td>
                            <td className="p-4">台湾市場でのテストマーケティングを行いたい</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-blue-600">MyStartr</td>
                            <td className="p-4">マレーシア・東南アジア</td>
                            <td className="p-4">ガジェット、生活雑貨、日用品など</td>
                            <td className="p-4">東南アジア向け。ローカル価格帯・文化の理解が重要</td>
                            <td className="p-4">東南アジア市場を意識してプロダクトを試したい</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-right">
                ※あくまで「ざっくりしたイメージ」であり、プロジェクトの内容によって最適な選択は変わります。
            </p>
        </section>

        {/* How to Choose */}
        <section className="mb-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-8 text-center">どの海外クラウドファンディングを選ぶべきか？</h2>
            <p className="mb-8 text-center">どのプラットフォームが良いかは、次の3つのポイントで考えると整理しやすくなります。</p>

            <div className="space-y-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">どの国・地域を見たいか</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>北米・欧州などグローバル全体の反応を見たい → <strong>Kickstarter / Indiegogo</strong></li>
                            <li>台湾市場に絞って深くテストしたい → <strong>zeczec</strong></li>
                            <li>マレーシアを中心とした東南アジア市場を見たい → <strong>MyStartr</strong></li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">自社商品のジャンル・価格帯</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>ガジェット・家電・IoT・デバイス系 → <strong>Kickstarter / Indiegogo</strong></li>
                            <li>デザイン雑貨・ファッション・ローカルに紐づくフード等 → <strong>zeczec</strong></li>
                            <li>生活雑貨・日用品・身近なプロダクト → <strong>MyStartr</strong> も候補に入る場合があります。</li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">クラファン後にどう展開したいか</h3>
                        <p className="mb-2 text-gray-700">
                            越境ECや自社ECにつなげたいのか、海外の小売店・代理店との取引につなげたいのか、
                            あるいは現地法人やパートナーシップを視野に入れているのかによっても、
                            選ぶプラットフォームや組み合わせ方が変わってきます。
                        </p>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded">
                            実際には、「1つだけ」ではなく、
                            まずは Kickstarter でグローバルな反応を見る、その後、zeczec や MyStartr でローカル市場を深掘りするといった
                            <strong>段階的な展開</strong>を設計するケースもあります。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Summary */}
        <section className="mb-16 bg-blue-50 p-8 rounded-xl border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">まとめ：自社に合う海外クラウドファンディングの選び方</h2>
            <div className="md:flex md:gap-8 justify-center">
                <div className="mb-6 md:mb-0">
                    <p className="font-bold mb-2">海外クラウドファンディングは、日本のものづくり企業にとって、</p>
                    <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow-sm text-gray-700">
                        <li>大きな固定費をかけずに</li>
                        <li>世界中のユーザーの反応を</li>
                        <li>数字で確かめながら</li>
                    </ul>
                    <p className="mt-2">海外展開の可能性を探るための有力な選択肢です。</p>
                </div>
                <div>
                    <p className="font-bold mb-2">一方で、</p>
                    <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow-sm text-gray-700">
                        <li>どのプラットフォームを選ぶか</li>
                        <li>どの国・地域を狙うか</li>
                        <li>商品の見せ方・価格設定をどうするか</li>
                    </ul>
                    <p className="mt-2">によって、結果は大きく変わってきます。</p>
                </div>
            </div>
        </section>

        {/* CTA / Footer */}
        <section className="text-center py-12 border-t">
            <h2 className="text-2xl font-bold mb-6">詳しい相談・具体的な支援内容について</h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-600">
                このページでは、海外クラウドファンディングの基本と、代表的な4つのプラットフォームの特徴を簡潔にご紹介しました。<br />
                具体的な支援内容や、「自社の商品はどこで試すのが良さそうか？」といった個別のご相談については、
                <strong>SOMA株式会社のメインページ</strong>で詳しくご案内しています。
            </p>
            
            <a 
                href="https://www.soma-jp.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                海外クラファンの具体的な支援内容・サービス詳細はこちら
                <FaChevronRight className="ml-2" />
            </a>
        </section>

      </main>
    </div>
  );
}
