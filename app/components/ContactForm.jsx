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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        const serverMsg = json && json.error ? json.error : '送信に失敗しました。時間をおいて再度お試しください。';
        alert(serverMsg);
        return;
      }

      alert('送信しました！ありがとうございました。');

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
    } catch (err) {
      console.error(err);
      alert('送信中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {!isConfirm ? (
          <>
      <h2 className="text-2xl font-bold mb-6 text-center">Contact us</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* 名前 */}
              <div>
                <label className="block mb-1 font-medium">名前（必須）</label>
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
                <label className="block mb-1 font-medium">メールアドレス（必須）</label>
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
                <label className="block mb-1 font-medium">会社名（任意）</label>
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
                <label className="block mb-1 font-medium">電話番号（任意）</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                />
              </div>

              {/* お問い合わせ内容 */}
              <div>
                <label className="block mb-1 font-medium">お問い合わせ内容</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
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
                  送信するには
                  <button
                    type="button"
                    className="underline text-blue-600 mx-1"
                    onClick={() => setIsPrivacyOpen(true)}
                  >
                    プライバシーポリシー
                  </button>
                  に同意が必要です
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
                確認する
              </button>
            </form>
          </>
        ) : (
          <>
            {/* 確認画面 */}
            <h2 className="text-2xl font-bold mb-6 text-center">確認画面</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>名前：</strong> {formData.name}
              </p>
              <p>
                <strong>メール：</strong> {formData.email}
              </p>
              <p>
                <strong>会社名：</strong> {formData.company}
              </p>
              <p>
                <strong>電話番号：</strong> {formData.phone}
              </p>
              <p>
                <strong>お問い合わせ内容：</strong> {formData.message}
              </p>
            </div>

            <div className="flex mt-6 space-x-4">
              <button
                onClick={() => setIsConfirm(false)}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
              >
                訂正する
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-red-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? '送信中...' : '送信する'}
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