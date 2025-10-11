"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* 閉じるボタン */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            {/* プライバシーポリシー内容 */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">プライバシーポリシー</h1>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">情報の利用目的</h2>
            <p className="mb-4 text-gray-700">
              当社は、取得した情報を以下の目的で利用します
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
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

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">安全管理のための措置</h2>
            <p className="mb-4 text-gray-700">
              取得した情報の安全管理に関する具体的な措置については、法令に基づき個別にお答えします。
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">第三者提供について</h2>
            <p className="mb-4 text-gray-700">
              当社は、お客様の個人データを第三者に提供することはありません。ただし、以下の場合を除きます。
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>外部委託先への業務委託</li>
              <li>事業譲渡に伴う情報提供</li>
              <li>パートナー企業との共同利用</li>
              <li>法律で認められる場合</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">アクセス解析ツールの利用</h2>
            <p className="mb-4 text-gray-700">
              当社では、サービスの改善および安全管理のために以下のツールを利用しています。
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Google Analytics</strong>：個人を特定しないアクセスログを解析</li>
              <li><strong>Google Search Console</strong>：検索パフォーマンス解析用</li>
              <li><strong>Google reCAPTCHA</strong>：不正アクセス・スパム防止</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">プライバシーポリシーの変更</h2>
            <p className="mb-4 text-gray-700">
              当社は、本ポリシーを必要に応じて変更することがあります。変更後は適切な方法でお知らせします。
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">お問い合わせ</h2>
            <ul className="list-none pl-0 mb-4 text-gray-700">
              <li>連絡先：info@soma-jp.net</li>
              <li>事業者の名称：SOMA株式会社</li>
              <li>代表者氏名：内藤 拓馬</li>
              <li>住所：〒241-0825　神奈川県横浜市旭区中希望が丘 127-9</li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}