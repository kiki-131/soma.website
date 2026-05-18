"use client";
import { useState } from "react";
import Link from "next/link";

export default function FairePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: "Faireへの出品に初期費用はかかりますか？", a: "Faire自体への出品・掲載は無料です。売上が発生した際にFaireの手数料が引かれる仕組みです。SOMAの支援サービスは別途ご相談のうえ、プランによって費用が発生します。まずは無料相談でご状況をお聞かせください。" },
    { q: "英語が得意でなくても大丈夫ですか？", a: "はい、問題ありません。SOMAでは英語でのブランドコンテンツ作成・バイヤーとのコミュニケーション文章作成を支援します。バイヤーとの日常的なやりとりについても、テンプレートや翻訳サポートを提供しますので、英語力がなくても安心してご参加いただけます。" },
    { q: "どんな商品カテゴリが向いていますか？", a: "Faireでは、アパレル・アクセサリー・ホームグッズ・文具・コスメ・食品・おもちゃ・アート等、幅広いカテゴリが活発に取引されています。特に独自性のあるデザインや日本的なストーリーを持つブランドは、米国のセレクトショップバイヤーから高い関心を集める傾向があります。" },
    { q: "初受注まで、どのくらいの期間がかかりますか？", a: "準備状況やブランドの特性によりますが、SOMAの支援のもとで最短1〜3ヶ月での初受注獲得を目標にしています。ブランドの英語コンテンツやサンプルが準備できているほど、スタートダッシュが早くなります。まずは無料相談でリアルなスケジュールをご確認ください。" },
    { q: "米国への発送・物流はどうすればよいですか？", a: "日本からの国際発送（DHL・FedEx・EMS等）から始めるケースが多いですが、売上が安定してきたら米国内の3PLウェアハウス（外部倉庫）を活用することで、配送コストと時間を大幅に削減できます。SOMAでは、ブランドの規模に合わせた最適な物流体制の構築をサポートします。" },
    { q: "すでにFaireアカウントを持っていますが支援を受けられますか？", a: "もちろんです。既存アカウントの診断・改善から入ることも可能です。「アカウントはあるが受注が取れない」「出品はしているがバイヤーからの反応がない」といったご相談も多く承っておりますので、お気軽にご連絡ください。" },
  ];

  const services = [
    { num: "01", icon: "🔧", title: "アカウント設計・立ち上げ", text: "米国バイヤーの購買行動に最適化したプロフィール・商品ページを設計します。", items: ["ブランドストーリーの英語ライティング", "商品写真・説明文の最適化アドバイス", "価格設計・MOQ設定のコンサルティング", "カテゴリ選定・タグ・SEO最適化"] },
    { num: "02", icon: "📣", title: "バイヤー開拓・アウトリーチ戦略", text: "ターゲットとなる小売店を絞り込み、効果的なアプローチで初取引を獲得します。", items: ["ターゲット小売店の調査・リストアップ", "Faire Direct（指名招待）機能の活用", "バイヤー向けパーソナライズドメール作成", "見本市・展示会との連携戦略立案"] },
    { num: "03", icon: "📈", title: "売上最大化・継続支援", text: "初受注後も継続的なデータ分析とPDCAで、リピート注文と売上拡大を追求します。", items: ["月次パフォーマンスレポートと改善提案", "プロモーション・セール戦略の立案", "バイヤーとのリレーション構築サポート", "新商品ローンチ戦略のアドバイス"] },
    { num: "04", icon: "🚢", title: "物流・オペレーション構築", text: "米国への発送方法から倉庫活用まで、運用コストを最小化する物流体制を設計します。", items: ["国際配送パートナーの選定サポート", "米国内3PLウェアハウスの活用提案", "関税・輸入規制に関する基礎情報提供", "発送ルールとFaire要件のすり合わせ"] },
    { num: "05", icon: "⚖️", title: "規制・契約・法務サポート", text: "米国取引に必要な契約・法務・知財に関する基礎知識を提供し、安全な取引環境を整えます。", items: ["卸取引条件・返品ポリシーの設計", "商標・知財の基礎情報提供", "米国消費者安全規制の基礎情報提供", "専門弁護士・会計士へのリファーラル"] },
    { num: "06", icon: "🌐", title: "ブランドローカライゼーション", text: "日本発ブランドの魅力を、米国のバイヤーとエンドユーザーに最適な形で伝えます。", items: ["ブランドポジショニングの再設計", "英語コピーライティング・翻訳サービス", "米国市場に向けたSNS戦略提案", "競合他社ベンチマーク分析"] },
  ];

  const steps = [
    { num: "01", title: "無料相談・ヒアリング", text: "ブランドの現状・目標・リソースを丁寧にヒアリング。Faireが最適かを判断します。" },
    { num: "02", title: "戦略立案・プラン提案", text: "ターゲット市場・価格設計・出品戦略・物流プランを策定し、ロードマップを提示します。" },
    { num: "03", title: "アカウント立ち上げ", text: "Faireアカウントの開設・最適化を実施。英語コンテンツ作成も並行して進めます。" },
    { num: "04", title: "バイヤー開拓・初受注", text: "ターゲット小売店へのアウトリーチを展開。初回サンプル提案から受注獲得まで伴走します。" },
    { num: "05", title: "継続的な売上拡大", text: "データ分析・改善・新バイヤー開拓を継続。安定した卸収益基盤の構築を目指します。" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif", background: "#fff", color: "#1a1a1a" }}>

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
          <span style={{ color: "#999", fontSize: "12px", letterSpacing: "0.06em" }}>× Faire</span>
        </Link>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {[["#about", "Faireとは"], ["#services", "サービス"], ["#process", "流れ"], ["#faq", "FAQ"]].map(([href, label]) => (
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
      </nav>

      {/* ── HERO ── */}
      <section id="top" style={{
        minHeight: "100vh",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        paddingTop: "68px", position: "relative", overflow: "hidden",
      }}>
        {/* 左：テキスト */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px 64px 80px 60px",
          background: "#fff",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ width: "28px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>SOMA × FAIRE — 米国卸販売支援</span>
          </div>
          <h1 style={{
            fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, lineHeight: 1.1,
            color: "#1a1a1a", margin: "0 0 24px", letterSpacing: "-0.02em",
          }}>
            米国の小売市場へ、<br />
            <span style={{ color: "#0066FF" }}>Faire</span>で<br />最速入口を。
          </h1>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.8, marginBottom: "40px", maxWidth: "420px" }}>
            北米最大の卸取引プラットフォームを活用し、日本ブランドの米国展開を一気通貫でサポートします。
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
            <a href="#about" style={{ color: "#0066FF", fontSize: "13px", letterSpacing: "0.08em", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", minHeight: "auto", fontWeight: 600 }}>Faireについて <span>↓</span></a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "36px", marginTop: "56px", paddingTop: "32px", borderTop: "1px solid #f0f0f0" }}>
            {[{ num: "700K+", label: "登録小売店数" }, { num: "$12B", label: "年間流通総額" }, { num: "150+", label: "対応国・地域" }].map(s => (
              <div key={s.num}>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "4px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：写真 */}
        <div style={{
          position: "relative", overflow: "hidden",
          backgroundImage: "url('/images/faire_hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          minHeight: "calc(100vh - 68px)",
        }}>
          {/* 左端だけ白にフェード（テキスト側との境界） */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(255,255,255,0.5) 0%, transparent 25%)",
          }} />
        </div>
      </section>

      {/* ── WHAT IS FAIRE ── */}
      <section id="about" style={{ padding: "120px 60px", background: "#f8f7f4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>What is Faire</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            北米 No.1 卸取引<br /><span style={{ color: "#0066FF" }}>プラットフォーム</span>とは
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "520px", marginBottom: "64px" }}>
            Faireは、世界中のブランドと独立系小売店をつなぐB2B卸売マーケットプレイスです。バイヤーが直接あなたのブランドを発見し、注文が入るまで費用は一切かかりません。
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <div style={{
              background: "#fff", border: "1px solid #e8e8e8",
              borderRadius: "20px", padding: "48px 40px", textAlign: "center",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "52px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", marginBottom: "16px" }}>Faire</div>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.9 }}>
                ブランド・メーカーと、全米の独立系ブティック・セレクトショップ・専門店を直接つなぐプラットフォーム。<br /><br />
                展示会に行かずとも、オンライン上で卸取引が完結します。
              </p>
              <div style={{
                display: "inline-block", marginTop: "24px",
                border: "1px solid rgba(0,102,255,0.25)", borderRadius: "100px",
                color: "#0066FF", fontSize: "10px", letterSpacing: "0.12em", padding: "8px 20px",
                background: "rgba(0,102,255,0.05)",
              }}>NORTH AMERICA'S LEADING B2B MARKETPLACE</div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "32px" }}>
              {[
                { num: "01", title: "初期費用ゼロで始められる", text: "出品・掲載は無料。売上が発生した時だけ手数料が発生するモデルです。低リスクで米国市場に参入できます。" },
                { num: "02", title: "70万以上の小売店にリーチ", text: "北米を中心に世界150カ国以上の小売バイヤーが登録。あなたのブランドを能動的に探しているバイヤーに届きます。" },
                { num: "03", title: "返品・代金回収リスクが低い", text: "Faireが代金回収を保証するオプションがあり、未払いリスクを最小化。米国取引特有の回収トラブルを防げます。" },
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

      {/* ── STATS BAND ── */}
      <div style={{ background: "#0066FF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { num: "700K+", label: "世界中の登録小売店数\n（独立系ブティック・専門店）" },
              { num: "$12B", label: "年間流通総額\n（急速に拡大中）" },
              { num: "150+", label: "対応国・地域数\n（グローバル展開が可能）" },
              { num: "80%", label: "リピート注文率\n（継続的な取引関係）" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "56px 32px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}>
                <div style={{ fontSize: "clamp(36px, 3.5vw, 56px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "12px", letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "120px 60px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Our Services</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            SOMAの<span style={{ color: "#0066FF" }}>Faire</span><br />卸販売支援サービス
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "520px", marginBottom: "56px" }}>
            アカウント開設から初受注、そして継続的な売上成長まで。米国市場の経験豊富なプロフェッショナルが、一気通貫でサポートします。
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
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
      <section id="process" style={{ padding: "120px 60px", background: "#f8f7f4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Our Process</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            ご支援の<span style={{ color: "#0066FF" }}>5ステップ</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, maxWidth: "520px", marginBottom: "72px" }}>
            初回相談から初受注まで、最短3ヶ月を目標に進行します。
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", position: "relative" }}>
            <div style={{ position: "absolute", top: "32px", left: "10%", right: "10%", height: "1px", background: "#ddd" }} />
            {steps.map((s, i) => (
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
      <section style={{ padding: "120px 60px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "2px", background: "#0066FF", borderRadius: "2px" }} />
            <span style={{ color: "#0066FF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Who is This For</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "56px" }}>
            こんなブランドに<br /><span style={{ color: "#0066FF" }}>ぴったりです</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              { title: "こんなブランドに最適", items: ["米国の小売店に商品を置きたいが、何から始めればよいかわからない", "展示会（NY NOW・アメリカンメード等）に出展したが、継続的なバイヤー獲得に苦戦している", "英語でのコミュニケーションや交渉に不安がある", "日本でECや国内卸は軌道に乗っており、次のステップとして海外展開を考えている", "ライフスタイル・ファッション・アクセサリー・ホームグッズ・食品・コスメ等を取り扱っている", "独自の世界観・ストーリーを持つブランドで、セレクトショップとの相性が高い"] },
              { title: "開始前の確認ポイント", items: ["米国への輸出・発送が可能な商品であること（食品・化粧品等は規制確認が必要）", "卸価格での提供が可能な粗利構造があること（目安：上代の40〜50%が卸価格）", "サンプル提供やスモールロットでの初回対応が可能であること", "英語のブランドコミュニケーション素材（写真・概要等）が準備できること", "継続的な輸出・在庫管理体制を整える意志があること", "3〜6ヶ月の中期目線で取り組める体制があること"] },
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
      <section id="faq" style={{ padding: "120px 60px", background: "#f8f7f4" }}>
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
      <section id="contact" style={{
        padding: "120px 60px", background: "#0066FF",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>FREE CONSULTATION</span>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            まず、無料相談から<br />始めませんか。
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 2, marginBottom: "48px" }}>
            ご状況をお聞かせいただいた上で、Faireが貴社に合うかどうかも含め、正直にアドバイスします。費用・契約の義務は一切ありません。
          </p>

          {submitted ? (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "16px", padding: "48px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>✓</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>送信完了</div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>2営業日以内にご連絡いたします。</div>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input type="text" placeholder="ご担当者名 *" required style={inputStyle} />
                <input type="text" placeholder="会社名・ブランド名 *" required style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <input type="email" placeholder="メールアドレス *" required style={inputStyle} />
                <select style={inputStyle} defaultValue="">
                  <option value="" disabled>お問い合わせ種別</option>
                  <option>海外小売店向け卸売販売について相談したい</option>
                  <option>Faire活用について相談したい</option>
                  <option>アカウント改善について相談したい</option>
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
                <option>おもちゃ・キッズ</option>
                <option>アート・クラフト</option>
                <option>その他</option>
              </select>
              <select style={inputStyle} defaultValue="">
                <option value="" disabled>Faireのご経験を教えてください</option>
                <option>Faireを知らなかった</option>
                <option>知っているが未登録</option>
                <option>登録済み・未受注</option>
                <option>登録済み・受注経験あり</option>
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
      <footer style={{
        background: "#1a1a1a", padding: "56px 60px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <Link href="/" style={{ fontSize: "20px", fontWeight: 800, color: "white", textDecoration: "none", letterSpacing: "0.05em" }}>SOMA</Link>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>米国市場への卸販売開拓を、本気で支援します。</div>
          <div style={{ display: "flex", gap: "24px", marginTop: "14px" }}>
            {[["/ ", "ホーム"], ["/blog", "ブログ"]].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: "12px", color: "#555", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "white"}
                onMouseLeave={e => e.target.style.color = "#555"}
              >{label}</Link>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "11px", color: "#444", letterSpacing: "0.06em" }}>© 2024 SOMA株式会社. All rights reserved.</div>
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
