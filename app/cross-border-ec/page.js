"use client";
import { useState } from "react";
import Link from "next/link";

export default function CrossBorderEcPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: "越境ECを始めるのに初期費用はかかりますか？", a: "SOMAの越境EC運営支援は、初期費用¥0でスタートできます（※適用には条件があります。担当者にご相談ください）。ECサイトの構築・運用にかかる実費や、各プラットフォームの手数料については、ご状況に合わせて最適なプランをご提案します。まずは無料相談でご相談ください。" },
    { q: "英語やECの知識がなくても大丈夫ですか？", a: "はい、問題ありません。SOMAが英語のブランドコンテンツ作成・多言語対応・海外向けの集客までサポートします。EC運営の経験がない企業様でも、戦略設計から実務まで伴走しますのでご安心ください。" },
    { q: "自社ECとAmazon、どちらから始めるべきですか？", a: "狙う市場・ブランドの状況・スピード感によって最適解は変わります。世界観を保ちながらファンを育てたい場合は自社EC（Shopify等）、既存の集客を借りて早く売上を立てたい場合はAmazon等のマーケットプレイスが向いています。無料相談で、貴社に合った組み合わせをご提案します。" },
    { q: "海外クラウドファンディングをやった後でも活用できますか？", a: "はい、むしろ相性が良い組み合わせです。クラファンで得た反応・実績・ファンを、越境ECという「継続的に売れる受け皿」につなげることで、一過性で終わらせずに売上を伸ばしていけます。" },
    { q: "海外への発送・決済はどうすればよいですか？", a: "日本からの国際発送（DHL・FedEx・EMS等）から始めるケースが多く、売上が安定したら現地倉庫（3PL）の活用も可能です。決済も多通貨・海外カード・現地決済手段への対応を含めて設計します。運用全体をSOMAがサポートします。" },
    { q: "どんな商品カテゴリが向いていますか？", a: "アパレル・雑貨・コスメ・食品・ガジェットなど幅広いジャンルで活用されています。特に独自性のあるデザインや日本的なストーリーを持つブランドは、海外の顧客から高い関心を集めやすい傾向があります。まずはお気軽にご相談ください。" },
  ];

  const services = [
    { num: "01", icon: "🧭", title: "戦略・市場設計", text: "狙う国・販売チャネル・価格を整理し、勝ち筋となるロードマップを描きます。", items: ["ターゲット市場・顧客の選定", "販売チャネル設計（自社EC / モール）", "価格・送料・粗利の設計", "競合・ベンチマーク分析"] },
    { num: "02", icon: "🛒", title: "ECサイト構築", text: "Shopify等を用いた多言語・多通貨対応のECサイトを構築します。", items: ["Shopify等でのストア構築", "多言語・多通貨・海外決済対応", "ブランドに合わせたデザイン", "商品ページ・LPの最適化"] },
    { num: "03", icon: "📣", title: "海外向け集客・マーケ", text: "現地の検索・SNS・広告に合わせた集客で、継続的なアクセスを生み出します。", items: ["海外SEO・コンテンツ設計", "SNS・インフルエンサー活用", "広告運用（Meta / Google等）", "メール・CRM施策"] },
    { num: "04", icon: "🌏", title: "モール出店支援", text: "Amazonや各国モールへの出店・運用を代行し、集客力のある販路を確保します。", items: ["Amazon等への出店・最適化", "各国モールへの展開", "商品登録・在庫連携", "レビュー・評価対策"] },
    { num: "05", icon: "🚚", title: "運用・物流・CS", text: "受注からカスタマー対応、国際配送まわりの運用設計をサポートします。", items: ["受注・在庫オペレーション設計", "国際配送・3PL倉庫の活用", "返品・問い合わせ対応の設計", "多言語カスタマーサポート"] },
    { num: "06", icon: "✍️", title: "ローカライゼーション", text: "日本ブランドの魅力を、現地の顧客に最適な形で伝わるよう翻訳・編集します。", items: ["英語・多言語コピーライティング", "ブランドストーリーの再設計", "現地文化に合わせた表現調整", "商品写真・ビジュアル監修"] },
  ];

  const steps = [
    { num: "01", title: "無料相談・ヒアリング", text: "ブランドの現状・目標・リソースを丁寧にヒアリングし、越境ECが最適かを判断します。" },
    { num: "02", title: "戦略立案・プラン提案", text: "狙う市場・チャネル・価格・集客プランを策定し、ロードマップを提示します。" },
    { num: "03", title: "ECサイト構築・準備", text: "ECサイトの構築と多言語コンテンツ作成、物流・決済まわりを並行して整えます。" },
    { num: "04", title: "販売開始・集客", text: "ストアを公開し、海外向けの集客を展開。最初の注文獲得まで伴走します。" },
    { num: "05", title: "継続的な売上拡大", text: "データ分析・改善・チャネル拡大を継続し、安定した海外売上の基盤を構築します。" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif", background: "#fff", color: "#1a1a1a" }}>
      <style>{`
        .ec-nav-links { display: flex; gap: 32px; align-items: center; }
        .ec-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; padding-top: 68px; position: relative; overflow: hidden; }
        .ec-hero-text { display: flex; flex-direction: column; justify-content: center; padding: 80px 64px 80px 60px; background: #fff; position: relative; z-index: 1; }
        .ec-hero-photo { position: relative; overflow: hidden; background-image: url('/images/stock_teamwork.jpg'); background-size: cover; background-position: center; min-height: calc(100vh - 68px); }
        .ec-stats-row { display: flex; gap: 36px; margin-top: 56px; padding-top: 32px; border-top: 1px solid #f0f0f0; }
        .ec-faire-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .ec-forms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ec-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ec-process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; position: relative; }
        .ec-process-line { position: absolute; top: 32px; left: 10%; right: 10%; height: 1px; background: #ddd; }
        .ec-target-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .ec-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ec-footer { display: flex; justify-content: space-between; align-items: flex-end; }
        .ec-section { padding: 120px 60px; }
        .ec-cta-section { padding: 120px 60px; }

        @media (max-width: 768px) {
          .ec-nav-links { display: none; }
          .ec-mobile-cta { display: block !important; }
          .ec-hero { grid-template-columns: 1fr; min-height: auto; }
          .ec-hero-text { padding: 48px 24px 56px; justify-content: flex-start; }
          .ec-hero-photo { display: none; }
          .ec-stats-row { gap: 20px; margin-top: 36px; padding-top: 24px; flex-wrap: wrap; }
          .ec-faire-grid { grid-template-columns: 1fr; gap: 32px; }
          .ec-forms-grid { grid-template-columns: 1fr; }
          .ec-services-grid { grid-template-columns: 1fr; }
          .ec-process-grid { grid-template-columns: 1fr; gap: 0; }
          .ec-process-line { display: none; }
          .ec-process-grid > div { display: flex; gap: 16px; align-items: flex-start; text-align: left; padding: 20px 0; border-bottom: 1px solid #eee; }
          .ec-process-grid > div:last-child { border-bottom: none; }
          .ec-process-grid > div > div:first-child { flex-shrink: 0; margin: 0; }
          .ec-target-grid { grid-template-columns: 1fr; }
          .ec-form-row { grid-template-columns: 1fr; }
          .ec-footer { flex-direction: column; gap: 24px; align-items: flex-start; }
          .ec-section { padding: 72px 24px; }
          .ec-cta-section { padding: 80px 24px; }
          nav { padding: 0 20px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: "68px",
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#1a1a1a", fontWeight: 800, fontSize: "18px", letterSpacing: "0.05em" }}>SOMA</span>
          <span style={{ color: "#999", fontSize: "12px", letterSpacing: "0.06em" }}>× 越境EC</span>
        </Link>
        <div className="ec-nav-links">
          {[["#about", "越境ECとは"], ["#services", "サービス"], ["#process", "流れ"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: "#555", fontSize: "13px", letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#0066FF"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{label}</a>
          ))}
          <a href="#contact" style={{
            background: "#0066FF", color: "white", padding: "10px 24px",
            borderRadius: "100px", fontSize: "13px", fontWeight: 700,
            letterSpacing: "0.05em", textDecoration: "none", minHeight: "auto",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = "#0052cc"}
            onMouseLeave={e => e.target.style.background = "#0066FF"}
          >無料相談する</a>
        </div>
        <a href="#contact" className="ec-mobile-cta" style={{
          display: "none", background: "#0066FF", color: "white", padding: "9px 20px",
          borderRadius: "100px", fontSize: "13px", fontWeight: 700,
          textDecoration: "none", minHeight: "auto",
        }}>無料相談する</a>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="ec-hero">
        <div className="ec-hero-text">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "28px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>SOMA × 越境EC — 海外販路拡大</span>
          </div>
          <h1 style={{
            fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, lineHeight: 1.1,
            color: "#1a1a1a", margin: "0 0 24px", letterSpacing: "-0.02em",
          }}>
            世界の顧客へ、<br />
            <span style={{ color: "#0066FF" }}>EC</span>で<br />直接、売る。
          </h1>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.8, marginBottom: "40px", maxWidth: "440px" }}>
            自社EC・Amazon・各国モールを活用し、日本ブランドの海外販売を、サイト構築から集客・運用まで一気通貫でサポートします。
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              background: "#0066FF", color: "white", padding: "16px 36px",
              borderRadius: "100px", fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.04em", textDecoration: "none", minHeight: "auto",
              transition: "all 0.2s", boxShadow: "0 4px 20px rgba(0,102,255,0.3)",
            }}
              onMouseEnter={e => { e.target.style.background = "#0052cc"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#0066FF"; e.target.style.transform = "translateY(0)"; }}
            >無料相談を予約する</a>
            <a href="#about" style={{ color: "#0066FF", fontSize: "13px", letterSpacing: "0.08em", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", minHeight: "auto", fontWeight: 600 }}>越境ECについて <span>↓</span></a>
          </div>
        </div>

        <div className="ec-hero-photo">
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(255,255,255,0.5) 0%, transparent 25%)",
          }} />
        </div>
      </section>

      {/* ── WHAT IS 越境EC ── */}
      <section id="about" className="ec-section" style={{ background: "#f8f7f4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>What is Cross-border EC</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            海外へ「直接」売る<br /><span style={{ color: "#0066FF" }}>継続的な販路</span>とは
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "560px", marginBottom: "64px" }}>
            越境ECとは、自社ECサイトやAmazon・各国モールを通じて、日本にいながら海外の顧客へ商品を直接販売する仕組みです。現地法人や実店舗を持たずに、世界中へ「売り続けられる」のが特徴です。
          </p>

          <div className="ec-faire-grid">
            <div style={{
              background: "#fff", border: "1px solid #e8e8e8",
              borderRadius: "20px", padding: "48px 40px", textAlign: "center",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "52px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: "16px" }}>越境EC</div>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.9 }}>
                自社ブランドのECサイトや、世界中の顧客が集まるモールを通じて、海外へ直接販売する仕組み。<br /><br />
                展示会や現地出店をせずとも、オンライン上で販売が完結します。
              </p>
              <div style={{
                display: "inline-block", marginTop: "24px",
                border: "1px solid rgba(0,102,255,0.25)", borderRadius: "100px",
                color: "#0066FF", fontSize: "10px", letterSpacing: "0.12em", padding: "8px 20px",
                background: "rgba(0,102,255,0.05)",
              }}>SELL DIRECTLY TO THE WORLD</div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "32px" }}>
              {[
                { num: "01", title: "世界の巨大市場へ直接アクセス", text: "国内市場が縮小するなかでも、海外には広大な購買層が広がっています。ECなら地理的な制約なく、世界中の顧客へ商品を届けられます。" },
                { num: "02", title: "現地拠点なしで低コストに始められる", text: "現地法人や実店舗を構えずに海外販売をスタート。初期投資を抑えながら、海外市場の手応えを確かめて拡大できます。" },
                { num: "03", title: "24時間販売でき、顧客が資産になる", text: "時差に関係なくいつでも購入され、購入データやファンが自社に蓄積。クラファンで得た反応を継続的な売上に変える受け皿になります。" },
              ].map(p => (
                <li key={p.num} style={{ display: "flex", gap: "20px" }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#0066FF", lineHeight: 1, flexShrink: 0, width: "36px" }}>{p.num}</div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>{p.title}</div>
                    <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.9 }}>{p.text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3つの形 ── */}
      <section className="ec-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>3 Approaches</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            代表的な<span style={{ color: "#0066FF" }}>3つの形</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "560px", marginBottom: "56px" }}>
            越境ECには大きく3つのアプローチがあります。ブランドの状況や狙う市場に合わせて、最適な組み合わせを設計します。
          </p>

          <div className="ec-forms-grid">
            {[
              { tag: "OWN STORE", title: "自社EC（Shopify等）", text: "自社ブランドのECサイトを構築・運営。多言語・多通貨に対応でき、顧客データやファンを自社資産として蓄積できます。", fit: "ブランドの世界観を保ちながら、長期的にファンを育てたい" },
              { tag: "MARKETPLACE", title: "マーケットプレイス（Amazon等）", text: "すでに大きな集客のある巨大モールに出品。立ち上げが比較的早く、既存の集客力を借りて販売できます。", fit: "まずは集客のある場所で、早く売上を立てたい" },
              { tag: "LOCAL MALL", title: "各国モール（地域特化）", text: "台湾・東南アジアなど地域に強いモールへ出店。現地の利用習慣や決済に最適化し、特定市場を深掘りできます。", fit: "特定の国・地域で確実に根を張りたい" },
            ].map((c, i) => (
              <div key={i} style={{
                background: "#f8f7f4", padding: "36px 32px", borderRadius: "16px",
                border: "1px solid #eee", transition: "all 0.3s", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f8f7f4"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", display: "block", marginBottom: "12px" }}>{c.tag}</span>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px", lineHeight: 1.5 }}>{c.title}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.9, marginBottom: "20px" }}>{c.text}</div>
                <div style={{ marginTop: "auto", borderTop: "1px solid #e8e8e8", paddingTop: "16px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "#0066FF", fontWeight: 700, flexShrink: 0, fontSize: "12px" }}>向いているケース</span>
                </div>
                <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.8, marginTop: "6px" }}>{c.fit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 初期費用 ¥0 バンド ── */}
      <div style={{ background: "#0066FF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 60px", textAlign: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>Pricing</span>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
            <span style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800 }}>初期費用</span>
            <span style={{ color: "#fff", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", fontSize: "clamp(80px, 13vw, 150px)" }}>¥0</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", lineHeight: 1.9, maxWidth: "520px", margin: "0 auto 12px" }}>
            初期費用¥0で越境ECをスタートできます。まずはお気軽にご相談ください。
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", margin: 0 }}>
            ※適用には条件があります。担当者にご相談ください。
          </p>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="ec-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Our Services</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            SOMAの<span style={{ color: "#0066FF" }}>越境EC</span><br />運営支援サービス
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "560px", marginBottom: "56px" }}>
            サイトをつくって終わり、ではありません。戦略設計から構築・集客・運用・物流まで、海外販売の実務をまるごと伴走します。
          </p>

          <div className="ec-services-grid">
            {services.map(s => (
              <div key={s.num} style={{
                background: "#f8f7f4", padding: "36px 32px", borderRadius: "16px",
                border: "1px solid #eee", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#f8f7f4"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: "28px", display: "block", marginBottom: "16px" }}>{s.icon}</span>
                <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", display: "block", marginBottom: "10px" }}>SERVICE {s.num}</span>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", marginBottom: "10px", lineHeight: 1.5 }}>{s.title}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.9, marginBottom: "16px" }}>{s.text}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {s.items.map(item => (
                    <li key={item} style={{ fontSize: "12px", color: "#888", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ color: "#0066FF", flexShrink: 0, fontWeight: 700 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="ec-section" style={{ background: "#f8f7f4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Our Process</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            ご支援の<span style={{ color: "#0066FF" }}>5ステップ</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "560px", marginBottom: "72px" }}>
            無料相談から販売開始まで、戦略設計と実務を一気通貫で進めます。
          </p>

          <div className="ec-process-grid">
            <div className="ec-process-line" />
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "#0066FF", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", position: "relative", zIndex: 1,
                  fontSize: "16px", fontWeight: 800,
                  boxShadow: "0 4px 16px rgba(0,102,255,0.35)",
                }}>{s.num}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "10px", lineHeight: 1.6 }}>{s.title}</div>
                <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.9 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET ── */}
      <section className="ec-section" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Who is This For</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "56px" }}>
            こんなブランドに<br /><span style={{ color: "#0066FF" }}>ぴったりです</span>
          </h2>
          <div className="ec-target-grid">
            {[
              { title: "こんなブランドに最適", items: ["海外に商品を売りたいが、ECの始め方がわからない", "海外クラウドファンディングの後、継続的な販路をつくりたい", "国内ECや卸は軌道に乗っており、次は海外展開を考えている", "英語でのサイト運営・顧客対応に不安がある", "独自の世界観・ストーリーを持ち、海外でも通用しそうなブランド", "在庫リスクを抑えながら、スモールスタートで海外に挑戦したい"] },
              { title: "開始前の確認ポイント", items: ["海外への輸出・発送が可能な商品であること（食品・化粧品等は規制確認が必要）", "海外向けの価格・送料を踏まえた粗利構造があること", "ブランドの写真・概要など、基本的な素材が準備できること", "継続的な発送・在庫管理に対応できる体制があること", "多言語での顧客対応を整える意志があること", "3〜6ヶ月の中期目線で取り組める体制があること"] },
            ].map(card => (
              <div key={card.title} style={{
                background: "#f8f7f4", borderRadius: "20px",
                border: "1px solid #eee", padding: "44px 40px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a" }}>{card.title}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {card.items.map(item => (
                    <li key={item} style={{ fontSize: "13px", color: "#555", lineHeight: 1.8, paddingLeft: "16px", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#0066FF", fontWeight: 700 }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="ec-section" style={{ background: "#f8f7f4" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>FAQ</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "56px" }}>
            <span style={{ color: "#0066FF" }}>よくある</span>ご質問
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "12px", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", background: "transparent", border: "none", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "22px 28px", textAlign: "left", color: "#1a1a1a", minHeight: "auto",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.6 }}>{faq.q}</span>
                  <span style={{
                    color: "#0066FF", fontSize: "22px", flexShrink: 0, marginLeft: "16px",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.3s", display: "inline-block", lineHeight: 1,
                  }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? "400px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <div style={{ padding: "0 28px 24px", fontSize: "13px", color: "#666", lineHeight: 2.1 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section id="contact" className="ec-cta-section" style={{
        background: "#0066FF",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>Free Consultation</span>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            まず、無料相談から<br />始めませんか。
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 2, marginBottom: "48px" }}>
            ご状況をお聞かせいただいた上で、越境ECが貴社に合うかどうかも含め、正直にアドバイスします。費用・契約の義務は一切ありません。
          </p>

          {submitted ? (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "16px", padding: "48px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>✓</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>送信完了</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>2営業日以内にご連絡いたします。</div>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
              <div className="ec-form-row">
                <input type="text" placeholder="ご担当者名 *" required style={inputStyle} />
                <input type="text" placeholder="会社名・ブランド名 *" required style={inputStyle} />
              </div>
              <div className="ec-form-row">
                <input type="email" placeholder="メールアドレス *" required style={inputStyle} />
                <select style={inputStyle} defaultValue="">
                  <option value="" disabled>お問い合わせ種別</option>
                  <option>越境ECの始め方を相談したい</option>
                  <option>自社EC（Shopify等）について相談したい</option>
                  <option>Amazon・各国モールについて相談したい</option>
                  <option>その他</option>
                </select>
              </div>
              <select style={inputStyle} defaultValue="">
                <option value="" disabled>商品カテゴリを選択してください</option>
                <option>ファッション・アパレル</option>
                <option>アクセサリー・ジュエリー</option>
                <option>ホームグッズ・インテリア</option>
                <option>コスメ・スキンケア</option>
                <option>食品・飲料</option>
                <option>文具・紙製品</option>
                <option>ガジェット・家電</option>
                <option>アート・クラフト</option>
                <option>その他</option>
              </select>
              <select style={inputStyle} defaultValue="">
                <option value="" disabled>越境ECのご経験を教えてください</option>
                <option>これから検討したい</option>
                <option>自社ECはあるが海外販売は未対応</option>
                <option>すでに海外販売しているが伸び悩んでいる</option>
                <option>海外クラファンの経験がある</option>
              </select>
              <textarea placeholder="ご相談内容・現状を簡単にお知らせください（任意）" rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: "auto" }} />
              <button type="submit" style={{
                background: "#1a1a1a", color: "white", border: "none",
                padding: "18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s", minHeight: "auto",
              }}
                onMouseEnter={e => { e.target.style.background = "#000"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "#1a1a1a"; e.target.style.transform = "translateY(0)"; }}
              >無料相談を申し込む →</button>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textAlign: "center", margin: 0 }}>
                通常2営業日以内にご返信いたします。情報は厳重に管理し、第三者に提供することはありません。
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ec-footer" style={{
        background: "#1a1a1a", padding: "56px 60px 40px",
      }}>
        <div>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "white", textDecoration: "none", letterSpacing: "0.05em" }}>SOMA</Link>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>日本のプロダクトを、世界の顧客へ。</div>
          <div style={{ display: "flex", gap: "24px", marginTop: "14px" }}>
            {[["/", "ホーム"], ["/blog", "ブログ"]].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: "12px", color: "#555", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "white"}
                onMouseLeave={e => e.target.style.color = "#555"}
              >{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "11px", color: "#444", letterSpacing: "0.06em" }}>© {new Date().getFullYear()} SOMA株式会社. All rights reserved.</div>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "1px solid rgba(255,255,255,0.4)",
  color: "#1a1a1a",
  padding: "14px 18px",
  borderRadius: "10px",
  fontSize: "13px",
  outline: "none",
  minHeight: "auto",
  fontFamily: "inherit",
};
