"use client";

import { useEffect, useRef, useState } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Japan Matcha Select — 海外バイヤー向け 抹茶卸のLP
//
// 読者は海外の小売店・カフェ・レストラン・ホテル・卸/輸入業者・EC事業者。
// 日本語サイト (/) や英語版 (/en) とは商流も読者も別で、
// 「SOMAという支援会社」ではなく「Japan Matcha Selectという商材ブランド」として立てる。
// そのためヘッダー・フッターは共通コンポーネントを使わず、このページ専用に持たせている。
//
// コンバージョンは2本:
//   1. Faireの卸ショップ（主）  … ヘッダー / ヒーロー / Faire節 / 最終CTA / フッター の5箇所
//   2. 直接の卸問い合わせ（従）  … #inquiry のフォーム → /api/sendMail
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Faireショップの公開URL。現在はFaireトップへの仮置き。
// ショップURLが確定したらこの1行を差し替えれば、上記5箇所すべてに反映される。
const FAIRE_URL = "https://www.faire.com/";

// 画像は public/images/japan-matcha-select/ に置く。
// 現在はUnsplash（Unsplash License / 商用可・帰属表示不要）の写真をWebP化したもの。
// 出典URLは public/images/japan-matcha-select/README.txt に記録している。
// 自社撮影の写真に差し替える場合は、同じファイル名で上書きし、
// 下の DIMENSIONS の実寸を更新すること（ズレるとレイアウトシフトが起きる）。
const img = (name) => `/images/japan-matcha-select/${name}.webp`;

// 各画像の実寸。width / height 属性に入れて読み込み前の領域を確保する
const DIMENSIONS = {
  "hero-matcha": [1067, 1600],
  "ceremonial-matcha": [900, 1200],
  "cafe-matcha": [800, 1200],
  "culinary-matcha": [1200, 686],
  "retail-matcha": [1200, 857],
  "japanese-tea-field": [1600, 1200],
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#matcha", label: "Matcha" },
  { href: "#process", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#inquiry", label: "Wholesale Inquiry" },
];

const PRODUCTS = [
  {
    n: "01",
    image: "ceremonial-matcha",
    alt: "A tea ceremony host preparing ceremonial-grade matcha in a traditional Japanese room",
    title: "Ceremonial Matcha",
    body: "Premium-grade matcha ideal for traditional preparation, specialty tea shops, and premium retail.",
    fit: "Tea Shops / Premium Retail / Gifts",
  },
  {
    n: "02",
    image: "cafe-matcha",
    alt: "A matcha latte with latte art served in a café",
    title: "Café & Latte Matcha",
    body: "Balanced matcha designed for cafés, restaurants, matcha lattes, smoothies, and desserts.",
    fit: "Cafés / Restaurants / Beverage Shops",
  },
  {
    n: "03",
    image: "culinary-matcha",
    alt: "A matcha dessert with matcha powder, prepared for pastry and confectionery use",
    title: "Culinary Matcha",
    body: "Matcha suitable for baking, confectionery, desserts, food production, and commercial recipes.",
    fit: "Bakeries / Food Brands / Restaurants",
  },
  {
    n: "04",
    image: "retail-matcha",
    alt: "Consumer-ready Japanese matcha packaging on a retail display",
    title: "Retail Matcha Products",
    body: "Consumer-ready Japanese matcha products designed for retail shelves and gifting.",
    fit: "Retailers / Gift Stores / E-commerce",
  },
];

const BUYERS = [
  "Specialty Retailers",
  "Japanese Grocery Stores",
  "Tea Shops",
  "Cafés",
  "Restaurants",
  "Hotels",
  "Gift Stores",
  "Distributors",
  "Importers",
  "E-commerce Retailers",
];

const STEPS = [
  { n: "01", title: "Discover", body: "Explore selected Japanese matcha products." },
  { n: "02", title: "Choose", body: "Find the matcha products that match your business." },
  { n: "03", title: "Order", body: "Purchase through Faire or contact us directly." },
  { n: "04", title: "Grow", body: "Bring authentic Japanese matcha to your customers." },
];

// FAQの文言を変えたら layout.js の FAQPage 構造化データも同時に直すこと。
const FAQS = [
  {
    q: "Do you ship internationally?",
    a: "Yes. International shipping availability depends on the product and destination.",
  },
  {
    q: "Can I purchase small wholesale quantities?",
    a: "Minimum order quantities vary by product. Please check Faire listings or contact us.",
  },
  {
    q: "Do you offer café-grade matcha?",
    a: "Yes. We offer matcha suitable for cafés, matcha lattes, desserts, and food service.",
  },
  {
    q: "Can distributors contact you?",
    a: "Yes. We welcome inquiries from distributors and importers.",
  },
  {
    q: "Can you source specific Japanese matcha products?",
    a: "Depending on your requirements, we may be able to introduce suitable Japanese producers and products.",
  },
];

const BUSINESS_TYPES = [
  "Retailer",
  "Café",
  "Restaurant",
  "Distributor",
  "Importer",
  "Hotel",
  "E-commerce",
  "Other",
];

export default function JapanMatchaSelectPage() {
  const rootRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [year, setYear] = useState(2026);

  useEffect(() => setYear(new Date().getFullYear()), []);

  // スクロール出現。prefers-reduced-motion では最終状態を直接与える
  useEffect(() => {
    const items = rootRef.current?.querySelectorAll(".reveal");
    if (!items?.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // モバイルメニューは Esc でも閉じる
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e) => e.key === "Escape" && setNavOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.state === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const value = (key) => (fd.get(key) || "").toString().trim();

    const company = value("company");
    const name = value("name");
    const email = value("email");

    // 日本語で運用しているメール受信側で読めるよう、件名相当の見出しを先頭に置く
    const message = [
      "【Japan Matcha Select — Wholesale Inquiry】",
      `Country: ${value("country") || "-"}`,
      `Website: ${value("website") || "-"}`,
      `Business type: ${value("business_type") || "-"}`,
      `Interested products: ${value("products") || "-"}`,
      `Estimated quantity: ${value("quantity") || "-"}`,
      "",
      value("message"),
    ].join("\n");

    setStatus({ state: "sending", message: "Sending your inquiry…" });
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) {
        console.error("Japan Matcha Select inquiry failed", json);
        setStatus({
          state: "error",
          message:
            "We could not send your inquiry. Please try again later, or email us through soma-jp.net/contact/.",
        });
        return;
      }
      form.reset();
      setStatus({
        state: "ok",
        message:
          "Thank you. Your wholesale inquiry has been sent. We will reply within 2 business days (Japan time).",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        state: "error",
        message:
          "A network error occurred. Please check your connection and try again.",
      });
    }
  };

  const statusClass =
    status.state === "error"
      ? "status status--error"
      : status.state === "ok"
        ? "status status--ok"
        : "status";

  return (
    // ルートレイアウトの <html lang="ja"> は変更できないため、
    // 英語のみで構成されるこのLPの範囲にだけ lang="en" を宣言する。
    // スクリーンリーダーの読み上げ言語とブラウザ翻訳の判定はこれで正しくなる。
    <div className="jms-scope" ref={rootRef} id="top" lang="en">
      {/* .reveal は既定で opacity:0。JSが動かない環境では本文が丸ごと
          見えなくなってしまうので、その場合だけ最終状態を上書きする。 */}
      <noscript>
        <style>{`.jms-scope .reveal{opacity:1;transform:none}`}</style>
      </noscript>

      <a className="skip" href="#main">
        Skip to main content
      </a>

      <header className="header">
        <div className="container header__inner">
          <a className="logo" href="#top" aria-label="Japan Matcha Select home">
            Japan Matcha Select
          </a>
          <button
            className="menu"
            type="button"
            aria-expanded={navOpen}
            aria-controls="jms-nav"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            id="jms-nav"
            className={navOpen ? "nav is-open" : "nav"}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setNavOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              className="btn btn--small"
              href={FAIRE_URL}
              target="_blank"
              rel="noopener"
              onClick={() => setNavOpen(false)}
            >
              Shop on Faire
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ── ヒーロー ── */}
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy reveal">
              <p className="eyebrow">Authentic Japanese Matcha for Global Buyers</p>
              <p className="overline">Japan Matcha Select</p>
              <h1>
                Premium Matcha,
                <br />
                Selected from Japan.
              </h1>
              <p>
                Discover exceptional matcha from carefully selected Japanese producers.
                Japan Matcha Select connects international retailers, cafés, restaurants,
                and distributors with authentic Japanese matcha.
              </p>
              <div className="actions">
                <a className="btn" href={FAIRE_URL} target="_blank" rel="noopener">
                  Shop Wholesale on Faire ↗
                </a>
                <a className="btn btn--outline" href="#inquiry">
                  Wholesale Inquiry
                </a>
              </div>
              <ul className="trust">
                <li>Selected in Japan</li>
                <li>Wholesale Ready</li>
                <li>Global Buyers Welcome</li>
              </ul>
            </div>
            <div className="hero__image reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img("hero-matcha")}
                alt="Hands whisking matcha in a Japanese tea bowl with a bamboo whisk"
                width={DIMENSIONS["hero-matcha"][0]}
                height={DIMENSIONS["hero-matcha"][1]}
                fetchPriority="high"
              />
              <span>
                Selected
                <br />
                in Japan
              </span>
            </div>
          </div>
        </section>

        {/* ── ブランド紹介 ── */}
        <section className="section" id="about">
          <div className="container">
            <div className="heading heading--center reveal">
              <p className="eyebrow">From Japan to the World</p>
              <h2>Discover Authentic Japanese Matcha</h2>
              <p className="lead">Japan is home to some of the world&apos;s finest matcha.</p>
              <p>
                Japan Matcha Select introduces carefully selected matcha products from
                producers across Japan, making it easier for international buyers to
                discover authentic Japanese matcha for their stores, cafés, restaurants,
                and businesses.
              </p>
            </div>
            <div className="features">
              <article className="feature reveal">
                <i aria-hidden="true">茶</i>
                <h3>Authentic Japanese Matcha</h3>
                <p>
                  Sourced from Japanese producers with a focus on quality, craftsmanship,
                  and authenticity.
                </p>
              </article>
              <article className="feature reveal">
                <i aria-hidden="true">◇</i>
                <h3>Curated Selection</h3>
                <p>
                  We carefully select matcha products suitable for international wholesale
                  buyers.
                </p>
              </article>
              <article className="feature reveal">
                <i aria-hidden="true">◎</i>
                <h3>Easy Wholesale Access</h3>
                <p>
                  International buyers can purchase through Faire or contact us directly
                  for wholesale opportunities.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── 商品カテゴリ ── */}
        <section className="section products" id="matcha">
          <div className="container">
            <div className="heading reveal">
              <p className="eyebrow">Our Selection</p>
              <h2>
                Find the Right Matcha
                <br />
                for Your Business
              </h2>
              <p>
                From premium ceremonial matcha to café and culinary applications, explore
                Japanese matcha suited to your business.
              </p>
            </div>
            <div className="products__grid">
              {PRODUCTS.map((product) => (
                <article className="product reveal" key={product.n}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img(product.image)}
                    alt={product.alt}
                    width={DIMENSIONS[product.image][0]}
                    height={DIMENSIONS[product.image][1]}
                    loading="lazy"
                  />
                  <div>
                    <small>{product.n}</small>
                    <h3>{product.title}</h3>
                    <p>{product.body}</p>
                    <b>{product.fit}</b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── なぜ日本の抹茶か ── */}
        <section className="section story">
          <div className="container story__grid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="reveal"
              src={img("japanese-tea-field")}
              alt="Tea fields beneath Mount Fuji in Japan, where matcha leaves are cultivated"
              width={DIMENSIONS["japanese-tea-field"][0]}
              height={DIMENSIONS["japanese-tea-field"][1]}
              loading="lazy"
            />
            <div className="reveal">
              <p className="eyebrow">Rooted in Craft</p>
              <h2>Why Buyers Choose Japanese Matcha</h2>
              <p>
                Japanese matcha is recognized worldwide for its vibrant color, refined
                flavor, and long tradition of tea craftsmanship.
              </p>
              <p>
                Its popularity continues to grow across cafés, specialty food stores,
                restaurants, premium retail, and modern food culture around the world.
              </p>
              <p>
                Japan Matcha Select helps international buyers discover carefully selected
                Japanese matcha products from Japan.
              </p>
            </div>
          </div>
        </section>

        {/* ── 想定バイヤー ── */}
        <section className="section buyers">
          <div className="container">
            <div className="heading heading--center reveal">
              <p className="eyebrow">Built for Business</p>
              <h2>Made for Global Wholesale Buyers</h2>
            </div>
            <ul className="tags reveal">
              {BUYERS.map((buyer) => (
                <li key={buyer}>{buyer}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 購入の流れ ── */}
        <section className="section process" id="process">
          <div className="container">
            <div className="heading reveal">
              <p className="eyebrow">How It Works</p>
              <h2>Simple Wholesale Purchasing</h2>
            </div>
            <ol>
              {STEPS.map((step) => (
                <li className="reveal" key={step.n}>
                  <span>{step.n}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Faire誘導（第一コンバージョン） ── */}
        <section className="faire">
          <div className="container reveal">
            <p className="eyebrow">Wholesale Marketplace</p>
            <h2>Shop Japan Matcha Select on Faire</h2>
            <p>
              Discover Japanese matcha for your store, café, restaurant, or business
              through our wholesale collection on Faire.
            </p>
            <a className="btn btn--light" href={FAIRE_URL} target="_blank" rel="noopener">
              Shop Wholesale on Faire ↗
            </a>
          </div>
        </section>

        {/* ── 直接問い合わせ（第二コンバージョン） ── */}
        <section className="section inquiry" id="inquiry">
          <div className="container inquiry__grid">
            <div className="reveal">
              <p className="eyebrow">Direct Wholesale</p>
              <h2>Looking for Japanese Matcha?</h2>
              <p>
                If you are looking for specific matcha products, larger quantities,
                distributor opportunities, or products not currently listed on Faire,
                contact us.
              </p>
              <p>
                Our team can help you explore suitable Japanese matcha options for your
                business.
              </p>
              <small>Fields marked * are required.</small>
            </div>
            <form className="form reveal" onSubmit={handleSubmit} noValidate={false}>
              <label>
                Company Name *
                <input name="company" autoComplete="organization" required />
              </label>
              <label>
                Name *
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Country *
                <input name="country" autoComplete="country-name" required />
              </label>
              <label>
                Email *
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Website
                <input name="website" type="url" placeholder="https://" autoComplete="url" />
              </label>
              <label>
                Business Type
                <select name="business_type" defaultValue="">
                  <option value="">Select your business type</option>
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label>
                Interested Products
                <input name="products" />
              </label>
              <label>
                Estimated Quantity
                <input name="quantity" />
              </label>
              <label className="full">
                Message *
                <textarea name="message" rows={6} required />
              </label>
              <div className="full">
                <button
                  className="btn"
                  type="submit"
                  disabled={status.state === "sending"}
                >
                  {status.state === "sending" ? "Sending…" : "Send Wholesale Inquiry"}
                </button>
                <p className={statusClass} aria-live="polite">
                  {status.message}
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* ── 日本の生産者向け ──
            このブロックだけは読者が日本の茶農家・メーカーなので日本語を併記する。
            ページ全体は lang="en" のため、和文には lang="ja" を明示する
            （読み上げ・ブラウザ翻訳が英語として処理されるのを防ぐ）。 */}
        <section className="producer">
          <div className="container reveal">
            <div>
              <p className="eyebrow">Partnerships in Japan</p>
              <h2>For Japanese Matcha Producers</h2>
              <p className="ja ja--title" lang="ja">
                日本の抹茶生産者・メーカーの皆様へ
              </p>
              <p>
                Are you a Japanese matcha producer interested in expanding overseas? Japan
                Matcha Select supports Japanese producers seeking international wholesale
                opportunities.
              </p>
              <p className="ja" lang="ja">
                海外への販路開拓をお考えの抹茶の生産者・メーカー様を、Japan Matcha
                Select が支援しています。海外バイヤーへのご紹介から卸取引まで、
                まずはお気軽にご相談ください。
              </p>
            </div>
            <a href="https://www.soma-jp.net/#contact">
              Partner With Japan Matcha Select →
              <span className="ja" lang="ja">
                パートナーシップのご相談はこちら
              </span>
            </a>
          </div>
        </section>

        {/* ── 運営者(SOMA)紹介 ── */}
        <section className="section about">
          <div className="container reveal">
            <p className="eyebrow">About Us</p>
            <div>
              <h2>Connecting Japanese Matcha with the World</h2>
              <p>Japan Matcha Select is operated by SOMA Inc. in Japan.</p>
              <p>
                We support Japanese brands and manufacturers expanding into international
                markets through overseas wholesale, crowdfunding, and cross-border
                commerce.
              </p>
              <p>
                Through Japan Matcha Select, we introduce carefully selected Japanese
                matcha products to buyers around the world.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section faq" id="faq">
          <div className="container faq__grid">
            <div className="heading reveal">
              <p className="eyebrow">Common Questions</p>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="accordion reveal">
              {FAQS.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div className="faq-item" key={faq.q}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`jms-faq-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                      >
                        {faq.q}
                        <i aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="panel"
                      id={`jms-faq-${i}`}
                      role="region"
                      hidden={!open}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 最終CTA ── */}
        <section className="final">
          <div className="container reveal">
            <p className="eyebrow">Your Matcha Collection Starts Here</p>
            <h2>Bring Authentic Japanese Matcha to Your Customers</h2>
            <p>
              Discover carefully selected matcha from Japan and find the right products
              for your business.
            </p>
            <div className="actions">
              <a className="btn" href={FAIRE_URL} target="_blank" rel="noopener">
                Shop Wholesale on Faire ↗
              </a>
              <a className="btn btn--outline" href="#inquiry">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer__grid">
          <div>
            <a className="logo" href="#top">
              Japan Matcha Select
            </a>
            <p>
              Operated by SOMA Inc.
              <br />
              Japan
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <a href={FAIRE_URL} target="_blank" rel="noopener">
              Faire
            </a>
            <a href="#inquiry">Wholesale Inquiry</a>
            <a href="https://www.soma-jp.net/">About SOMA</a>
            <a href="https://www.soma-jp.net/privacy">Privacy Policy</a>
            <a href="https://www.soma-jp.net/#contact">Contact</a>
          </nav>
        </div>
        <div className="container copyright">
          © {year} Japan Matcha Select. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
