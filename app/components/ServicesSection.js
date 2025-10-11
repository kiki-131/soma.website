// ✅ app/components/ServiceSection.js
// Serviceセクション全体の構成
// 高校生でも理解できるよう、コメント多めに書いています

import React from "react";

export default function ServiceSection() {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      {/* 🌎 セクションタイトル */}
  <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Services
      </h2>

      {/* 🧭 ① 海外進出の重要性 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ① 海外進出の重要性
        </h3>
        <p className="leading-relaxed text-lg">
          日本国内の消費が減少する中、新たな販路の開拓は企業の成長に欠かせません。
          円安トレンドや物価の差を活かすことで、海外市場では日本製品がより競争力を持ちます。
          世界には、まだ出会っていない「あなたの商品のファン」が数多く存在します。
        </p>
      </div>

      {/* 🚧 ② 現状の課題 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ② 現状の課題
        </h3>
        <p className="leading-relaxed text-lg mb-2">
          しかし、多くの中小企業が海外進出に踏み切れないのが現実です。
          その理由は、金銭的・時間的なコストの大きさ。さらに以下のような課題もあります。
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>言語・文化の壁</li>
          <li>現地での販売チャネル構築の難しさ</li>
          <li>マーケティングやPRの知識不足</li>
          <li>法規制・輸出入手続きの煩雑さ</li>
        </ul>
      </div>

      {/* 💪 ③ サポートの目的と概要 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ③ サポートの目的と概要
        </h3>
        <p className="leading-relaxed text-lg mb-4">
          私たちは、
          <span className="font-bold text-blue-600">
            「海外のマーケットに進出し収益を最大化する」
          </span>
          を目標に、中小企業の海外展開をトータルサポートします。
        </p>
        <p className="leading-relaxed text-lg mb-2 font-semibold">
          主なサポート内容：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>SNSを活用し、世界中にファンコミュニティを構築</li>
          <li>米国やマレーシアなどのクラウドファンディングサイトで予約販売を実施</li>
        </ul>

        <p className="leading-relaxed text-lg mt-4 mb-2 font-semibold">
          オプション展開：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>成功後の「おかわりクラファン」</li>
          <li>メタバース展示会「METAEXPO JAPAN」への出展</li>
          <li>日本のクラウドファンディングへの逆輸入</li>
          <li>自社EC構築と一般販売開始</li>
        </ul>
      </div>

      {/* 💡 ④ クラウドファンディングとは */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ④ クラウドファンディングとは？
        </h3>
        <p className="leading-relaxed text-lg">
          「購入型クラウドファンディング」は、商品を
          <span className="font-bold">先行予約販売</span>
          する仕組みです。
          開発・製造前に市場の反応を確かめられるため、
          <span className="font-bold text-blue-600">
            ローリスク・ローコストで海外市場に挑戦
          </span>
          できます。
        </p>
      </div>

      {/* 🌏 ⑤ 米国クラウドファンディングの魅力 */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ⑤ 米国クラウドファンディングの魅力
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>世界最大級の市場規模と宣伝効果</li>
          <li>プラットフォーム利用料が低い</li>
          <li>支払サイクルが早く、キャッシュフローが安定</li>
        </ul>
      </div>

      {/* 🧩 ⑥ 海外進出のワンストップサポート */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ⑥ 海外進出をワンストップでサポート
        </h3>
        <p className="leading-relaxed text-lg">
          海外展開に必要なあらゆる領域を、
          <span className="font-bold text-blue-600">1つの窓口で完結</span>
          できます。
          WEB制作・マーケティング・PR・資金調達・物流・EC構築・ポップアップイベントまで、
          専任チームがフルサポートします。
        </p>
      </div>

      {/* 💼 ⑦ サポートプラン */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          ⑦ サポートプラン
        </h3>

        {/* プラン表 */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 text-left text-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 font-bold">プラン</th>
                <th className="border px-4 py-2 font-bold">初期費用</th>
                <th className="border px-4 py-2 font-bold">成果報酬</th>
                <th className="border px-4 py-2 font-bold">特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Aプラン</td>
                <td className="border px-4 py-2">275,000円</td>
                <td className="border px-4 py-2">売上の15％</td>
                <td className="border px-4 py-2">コストを抑えて挑戦したい方向け</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Bプラン</td>
                <td className="border px-4 py-2">598,000円</td>
                <td className="border px-4 py-2">売上の5％</td>
                <td className="border px-4 py-2">本格的な海外展開を目指す方向け</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* サポート内容 */}
        <p className="text-lg mb-2 font-semibold">サポート期間：概ね7か月</p>
        <ul className="list-disc pl-6 space-y-2 text-lg mb-6">
          <li>プラットフォーム登録</li>
          <li>事業計画・収益計画の策定</li>
          <li>LP・ティザーサイト作成（英文対応）</li>
          <li>商品説明書（英文）作成</li>
          <li>プロジェクト運用代行</li>
          <li>広告運用（広告費別途）</li>
          <li>顧客対応</li>
          <li>リターン発送手配＋お届け後1か月サポート</li>
        </ul>

        {/* オプション */}
        <p className="text-lg mb-2 font-semibold">オプション：</p>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>メタバース展示会：198,000円〜</li>
          <li>インフルエンサーマーケティング：固定費1万円/人＋15％</li>
          <li>商品撮影：3万円〜</li>
          <li>動画制作：6万円〜</li>
          <li>SNS運営代行：2.5万円/月</li>
        </ul>
      </div>
    </section>
  );
}
