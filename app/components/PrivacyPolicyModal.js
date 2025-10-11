"use client";
import React from "react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8 overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">プライバシーポリシー</h3>

        <div className="space-y-6 text-gray-700 text-base">
          <section>
            <h4 className="text-xl font-semibold mb-2">情報の利用目的</h4>
            <p>当社は、取得した情報を以下の目的で利用します</p>
            <ul className="list-disc pl-6 mt-2">
              <li>サービス登録の受付や本人確認</li>
              <li>サービス利用履歴の管理</li>
              <li>利用料金の決済</li>
              <li>サービス改善のための行動履歴の分析</li>
              <li>サービスやキャンペーンの案内</li>
              <li>お問い合わせへの対応</li>
              <li>規約や法令違反行為への対応</li>
              <li>サービス内容の変更や終了のご案内</li>
              <li>規約の変更通知</li>
              <li>その他、サービス提供、保護、改善のため</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">安全管理のための措置</h4>
            <p>
              取得した情報の安全管理に関する具体的な措置については、法令に基づき個別にお答えします。お問い合わせ窓口よりご連絡ください。
            </p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">第三者提供について</h4>
            <p>当社は、お客様の個人データを第三者に提供することはありません。ただし、以下の場合を除きます。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>外部委託先への業務委託</li>
              <li>事業譲渡に伴う情報提供</li>
              <li>パートナー企業との共同利用（詳細は別途公表します）</li>
              <li>法律で認められる場合</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">アクセス解析ツールの利用</h4>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Google Analytics</strong><br />
                ユーザーのアクセスログを収集・解析するために使用します。Cookieを利用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。
              </li>
              <li>
                <strong>Google Search Console</strong><br />
                当サイトの検索パフォーマンスを分析し、サービスの改善に役立てるために使用します。個人を特定する情報は収集されません。
              </li>
              <li>
                <strong>Google reCAPTCHA</strong><br />
                不正アクセスやスパム防止のために使用します。ツールによって収集されるデータはGoogleのプライバシーポリシーに基づいて管理されます。
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">プライバシーポリシーの変更</h4>
            <p>当社は、本ポリシーを必要に応じて変更することがあります。変更後の内容と施行時期については、適切な方法でお知らせします。</p>
          </section>

          <section>
            <h4 className="text-xl font-semibold mb-2">お問い合わせ</h4>
            <p>
              情報の開示、訂正、利用停止、削除をご希望の場合は、以下の窓口にご連絡ください。ご請求は、ご本人確認の上で対応いたします。なお、開示請求には1件あたり1,000円の手数料が発生します。
            </p>
            <ul className="list-none pl-0 mt-2">
              <li>連絡先：info@soma-jp.net</li>
              <li>事業者の名称：SOMA株式会社</li>
              <li>代表者氏名：内藤 拓馬</li>
              <li>住所：〒241-0825　神奈川県横浜市旭区中希望が丘 127-9</li>
            </ul>
          </section>
        </div>

            <div className="mt-6 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gradient-to-r from-blue-500 to-red-500 transition"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}