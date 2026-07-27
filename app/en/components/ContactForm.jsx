"use client";
import { useState } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal"; // モーダル用コンポーネント

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [agree, setAgree] = useState(false); // 個人情報同意チェック
  const [isConfirm, setIsConfirm] = useState(false); // 確認画面フラグ
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false); // モーダル開閉
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]); // 選択された問い合わせ項目

  // 問い合わせ項目のリスト
  const inquiryTopics = [
    "I'd like to discuss overseas crowdfunding",
    "I'd like to discuss wholesale sales to overseas retailers",
    "I'd like to know more about pricing and plans",
    "I'd like more details on past projects",
    "I'd like to discuss an overseas expansion strategy",
    "I'd like to discuss logistics and shipping",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // チェックボックスの選択処理
  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) => {
      const newTopics = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic];

      // メッセージ欄を自動更新
      updateMessageFromTopics(newTopics);
      return newTopics;
    });
  };

  // 選択された項目をメッセージ欄に反映
  const updateMessageFromTopics = (topics) => {
    if (topics.length === 0) {
      setFormData((prev) => ({ ...prev, message: "" }));
      return;
    }

    const topicText = topics.map((t, i) => `${i + 1}. ${t}`).join("\n");
    const additionalText = "\n\n[Additional Details / Requests]\n";

    setFormData((prev) => ({
      ...prev,
      message: topicText + additionalText,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // サーバーの API に送信
      const res = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json.ok === false) {
        console.error('send failed', json);
        // サーバー側のエラーコードに基づきユーザー向けメッセージを出す
        const code = json && json.error;
        let serverMsg = "We couldn't send your message. Please wait a moment and try again.";
        if (code === 'smtp_auth_failed') {
          serverMsg = "We're sorry — something went wrong on our end and your message couldn't be sent. Please try again shortly, or contact us directly at info@soma-jp.net if the issue continues.";
        } else if (code === 'smtp_send_failed') {
          serverMsg = "We're sorry, we couldn't send your message right now. Please try again in a few minutes.";
        } else if (code === 'smtp credentials missing' || code === 'mailer not configured') {
          serverMsg = "We're currently unable to process your request. Please try again later, or contact us directly at info@soma-jp.net.";
        }

        alert(serverMsg);
        return;
      }

      alert('Thank you! Your message has been sent successfully.');

      // フォームリセット
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
      setAgree(false);
      setIsConfirm(false);
      setSelectedTopics([]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-gray-50 py-16 px-6">

      {/* 無料相談でわかること */}
      <div className="max-w-2xl mx-auto mb-10 bg-[#EFF6FF] border border-blue-100 rounded-2xl p-7">
        <h3 className="text-base font-bold text-[#0066FF] mb-4">What You&apos;ll Learn From a Free Consultation</h3>
        <ul className="space-y-2">
          {[
            "Whether your product is a good fit for Kickstarter, Indiegogo, or zeczec",
            "Which countries or regions to test first",
            "Expected funding levels, average order value, and ad spend benchmarks",
            "Your potential path from crowdfunding into cross-border e-commerce, Faire, or distributor partnerships",
            "Whether you qualify for our zero-upfront-cost plan",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#0066FF] font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 初期費用0円プランの内訳 */}
      <div className="max-w-2xl mx-auto mb-10 bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-1">About Our Zero-Upfront-Cost Plan</h3>
        <p className="text-xs text-gray-500 mb-4">Because this plan is performance-based, our fee is 5–20% of the total amount raised through crowdfunding.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 font-semibold text-gray-700 border border-gray-100">Item</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700 border border-gray-100">Zero-Upfront-Cost Plan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Strategy & Platform Selection", "Included"],
                ["Page Structure & Copywriting", "Included"],
                ["Translation & English Support", "Included, depending on conditions"],
                ["Advertising Costs", "At Cost"],
                ["Video & Photo Production", "Billed separately depending on scope"],
                ["Logistics & Customs Duties", "At Cost"],
                ["Success Fee", "5–20% of total funds raised"],
              ].map(([item, value], i) => (
                <tr key={item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2 text-gray-700 border border-gray-100">{item}</td>
                  <td className={`px-3 py-2 border border-gray-100 font-medium ${value === "Included" ? "text-[#0066FF]" : "text-gray-600"}`}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {!isConfirm ? (
          <>
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Contact us</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* 名前 */}
              <div>
                <label className="block mb-1 font-medium text-sm md:text-base">Name (Required)</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* メール */}
              <div>
                <label className="block mb-1 font-medium text-sm md:text-base">Email Address (Required)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* 会社名 */}
              <div>
                <label className="block mb-1 font-medium text-sm md:text-base">Company Name (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* 電話番号 */}
              <div>
                <label className="block mb-1 font-medium text-sm md:text-base">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* お問い合わせ内容（チェックボックス） */}
              <div>
                <label className="block mb-2 font-medium text-sm md:text-base">What Would You Like to Discuss? (Select All That Apply)</label>
                <div className="space-y-2 mb-4">
                  {inquiryTopics.map((topic) => (
                    <label key={topic} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* メッセージ欄（自動入力+追記可能） */}
              <div>
                <label className="block mb-1 font-medium text-sm md:text-base">
                  Additional Details or Requests
                  <span className="text-xs md:text-sm text-gray-500 ml-2">(Auto-filled based on your selections above)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="8"
                  placeholder="In addition to your selections above, feel free to add any further details or requests"
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* 個人情報同意チェック */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="mr-2"
                />
                <span className="text-sm">
                  You must agree to our
                  <button
                    type="button"
                    className="underline text-blue-600 mx-1"
                    onClick={() => setIsPrivacyOpen(true)}
                  >
                    Privacy Policy
                  </button>
                  to submit this form
                </span>
              </div>

              {/* 確認するボタン */}
              <button
                type="button"
                onClick={() => setIsConfirm(true)}
                disabled={!formData.name || !formData.email || !formData.message || !agree}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                  !formData.name || !formData.email || !formData.message || !agree
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600"
                }`}
              >
                Review
              </button>
            </form>
          </>
        ) : (
          <>
            {/* 確認画面 */}
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Confirm Your Details</h2>
            <div className="space-y-3 text-sm md:text-base text-gray-700">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Company:</strong> {formData.company}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Message:</strong> {formData.message}
              </p>
            </div>

            <div className="flex mt-6 space-x-4">
              <button
                onClick={() => setIsConfirm(false)}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-red-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </>
        )}

        {/* プライバシーポリシーモーダル */}
        <PrivacyPolicyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    </section>
  );
}
