"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// S12 Eligibility check フォーム
//
// ★重要な実装上の制約:
//   /api/sendMail は { name, email, company, phone, message } の5つしか処理しない。
//   新しいフィールドをそのままPOSTしても、エラーにならず黙って破棄される。
//   そのため Step 2 の回答は送信直前に message へ構造化テキストとして合成している。
//
//   旧 ContactForm の「選択内容をユーザー編集可能な textarea に流し込む」方式は
//   採っていない。ユーザーが消せてしまい、リード情報が欠落するため。
//   構造化された回答は state に保持し、送信時に組み立てる。
//
// ★電話番号は聞いていない。北米BtoBの初回接触で最も嫌われる項目であり、
//   "No sales call." という約束とも矛盾して見えるため。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CATEGORIES = [
  "EDC & tools",
  "Outdoor",
  "Stationery",
  "Bags & carry",
  "Kitchen & home",
  "Consumer electronics",
  "Food & beverage",
  "Other",
];

// 選択肢の下の補足そのものが専門性のデモになっている
const CONTENTS = [
  {
    value: "Wireless connectivity (Wi-Fi / Bluetooth)",
    hint: "Radio Act (電波法) — Technical Conformity, 技適 / TELEC",
  },
  {
    value: "AC power / mains adapter",
    hint: "Electrical Appliance and Material Safety Act (電気用品安全法) — PSE",
  },
  {
    value: "Lithium battery",
    hint: "DENAN — PSE, plus transport restrictions",
  },
  { value: "None of these", hint: null },
  { value: "Not sure", hint: null },
];

const PRIOR = [
  "Yes, and it funded",
  "Yes",
  "No, this would be our first",
];
const TIMING = ["Within 3 months", "3–6 months", "6–12 months", "Just exploring"];
const VOLUME = ["Yes", "Not yet, but we could", "No", "Not sure"];
const TRADEMARK = ["Yes", "No", "In progress", "I didn't know I needed to"];

const INITIAL = {
  name: "",
  email: "",
  company: "",
  url: "",
  location: "",
  category: "",
  contents: [],
  prior: "",
  campaignUrl: "",
  timing: "",
  volume: "",
  trademark: "",
  notes: "",
};

// 入力欄は16px以上でないと iOS Safari が自動ズームしてレイアウトが崩れる
const inputClass =
  "w-full h-[52px] bg-transparent rounded-none border-0 border-b border-paper-300 px-0 " +
  "text-base text-ink-900 placeholder:text-ink-400 " +
  "focus:outline-none focus:border-ink-900 focus:ring-0 transition-colors";

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1.5 font-semibold text-sm text-ink-800">
        {label}
      </label>
      {hint && <p className="text-xs text-ink-500 mb-1.5">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent-600 flex items-start gap-1.5">
          <span aria-hidden="true"></span>
          {error}
        </p>
      )}
    </div>
  );
}

function RadioGroup({ name, legend, options, value, onChange, error }) {
  return (
    <fieldset>
      <legend className="mb-2.5 font-semibold text-sm text-ink-800">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const id = `${name}-${opt.replace(/\W+/g, "-")}`;
          const selected = value === opt;
          return (
            <div key={opt}>
              <input
                type="radio"
                id={id}
                name={name}
                value={opt}
                checked={selected}
                onChange={() => onChange(opt)}
                className="sr-only peer"
              />
              <label
                htmlFor={id}
                className={`block cursor-pointer rounded-[2px] border px-4 py-3 text-[14px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent-600 ${
                  selected
                    ? "bg-ink-900 border-ink-900 text-paper-0 font-semibold"
                    : "bg-transparent border-paper-300 text-ink-700 hover:border-ink-900"
                }`}
              >
                {opt}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-accent-600 flex items-start gap-1.5">
          <span aria-hidden="true"></span>
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const set = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleContent = (value) => {
    setData((prev) => ({
      ...prev,
      contents: prev.contents.includes(value)
        ? prev.contents.filter((v) => v !== value)
        : [...prev.contents, value],
    }));
    setErrors((prev) => ({ ...prev, contents: undefined }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Please tell us your name.";
    if (!data.email.trim()) e.email = "We need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      e.email = "That doesn't look like a valid email address.";
    if (!data.company.trim()) e.company = "Please tell us your company or brand.";
    if (!data.url.trim())
      e.url = "A link to the product is the single most useful thing you can give us.";
    if (!data.location.trim()) e.location = "Please tell us where you're based.";
    if (!data.category) e.category = "Please choose the closest category.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (data.contents.length === 0)
      e.contents = "Please select at least one — “Not sure” is a valid answer.";
    if (!data.prior) e.prior = "Please choose one.";
    if (!data.timing) e.timing = "Please choose one.";
    if (!data.volume) e.volume = "Please choose one.";
    if (!data.trademark) e.trademark = "Please choose one.";
    if (!agree) e.agree = "Please agree to the Privacy Policy to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToStep2 = () => {
    if (!validateStep1()) {
      document.getElementById("eligibility-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setStep(2);
    document.getElementById("eligibility-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Step 2 の回答を message に構造化して合成する。
  // API側が5フィールドしか扱えないため、ここで組み立てないと情報が失われる。
  const buildMessage = () => {
    const lines = [
      "[Japan Launch Eligibility Check]",
      "",
      `Website / campaign page : ${data.url}`,
      `Based in                : ${data.location}`,
      `Product category        : ${data.category}`,
      "",
      `What's inside           : ${data.contents.join(", ")}`,
      `Previous crowdfunding   : ${data.prior}`,
    ];
    if (data.campaignUrl.trim()) {
      lines.push(`Previous campaign URL   : ${data.campaignUrl}`);
    }
    lines.push(
      `Target launch           : ${data.timing}`,
      `Few hundred units       : ${data.volume}`,
      `Trademark filed in JP   : ${data.trademark}`
    );
    if (data.notes.trim()) {
      lines.push("", "--- Anything else ---", data.notes.trim());
    }
    return lines.join("\n");
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          message: buildMessage(),
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json.ok === false) {
        setSubmitError(
          "We couldn't send that. Please try again in a moment — or email us directly at info@soma-jp.net and we'll pick it up from there."
        );
        return;
      }
      setSent(true);
    } catch {
      setSubmitError(
        "We couldn't send that. Please try again in a moment — or email us directly at info@soma-jp.net and we'll pick it up from there."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── 送信完了 ──
  if (sent) {
    return (
      <section id="contact" data-bg="#FFFFFF" className="bg-deep-900 px-6 md:px-10 lg:px-16 pt-[132px] pb-[120px] md:pt-[200px] md:pb-[160px] scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div
            role="status"
            aria-live="polite"
            className="border-t-[3px] border-accent-600 pt-10"
          >
            <h2 className="font-medium text-ink-900 text-2xl mb-3">
              Thanks. Here&apos;s what happens next.
            </h2>
            <ol className="mt-7 space-y-6">
              {[
                "Within one business day, Takuma replies personally — not a form letter, and not a junior account manager.",
                "If it would help, a 15-minute call. In English. Only if you want one.",
                "A written Fit Review: category, regulation, what a launch would require, and our honest read on whether it's worth doing.",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-[2px] bg-accent-600 text-white text-xs font-medium">
                    {i + 1}
                  </span>
                  <p className="text-ink-700 text-sm md:text-base leading-relaxed pt-0.5">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" data-bg="#FFFFFF" className="bg-deep-900 px-6 md:px-10 lg:px-16 pt-[132px] pb-[120px] md:pt-[200px] md:pb-[160px] scroll-mt-20">
      <div className="max-w-2xl mx-auto" id="eligibility-form-top">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-medium text-ink-900 leading-[1.02] tracking-[-0.026em] mb-5" style={{ fontSize: "clamp(32px, 4.4vw, 60px)" }}>
            Start with the eligibility check.
          </h2>
          <p className="text-ink-700 text-base leading-relaxed mb-8">
            Tell us what the product is and what&apos;s inside it. You&apos;ll
            get a straight read on whether it can go to Japan, what it would
            need, and whether we think it should.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm font-semibold text-ink-700">
            <li>We reply within one business day (JST).</li>
            <li>We work in English.</li>
            <li>No sales call.</li>
          </ul>
        </motion.div>

        <div className="border-t border-paper-300 pt-10">
          {/* ステップ表示 */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-600">
              Step {step} of 2
            </span>
            <div className="flex-1 h-1 bg-paper-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-600 transition-all duration-500"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <p className="font-semibold text-ink-900 text-lg">About you</p>

              <Field id="name" label="Your name" error={errors.name}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="email" label="Work email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="company" label="Company or brand" error={errors.company}>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  value={data.company}
                  onChange={(e) => set("company", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field
                id="url"
                label="Website or existing campaign page"
                hint="The single most useful thing you can send us — it tells us the category, the price point and most of the regulation."
                error={errors.url}
              >
                <input
                  id="url"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={data.url}
                  onChange={(e) => set("url", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.url}
                  aria-describedby={errors.url ? "url-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="location" label="Where are you based?" error={errors.location}>
                <input
                  id="location"
                  type="text"
                  autoComplete="country-name"
                  placeholder="Country / state"
                  value={data.location}
                  onChange={(e) => set("location", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? "location-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="category" label="Product category" error={errors.category}>
                <select
                  id="category"
                  value={data.category}
                  onChange={(e) => set("category", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.category}
                  aria-describedby={errors.category ? "category-error" : undefined}
                  className={inputClass}
                >
                  <option value="">Select one…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <button
                type="button"
                onClick={goToStep2}
                className="w-full py-3.5 px-5 rounded-[2px] bg-accent-600 text-white font-semibold text-sm hover:bg-accent-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-600"
              >
                Next — about the product</button>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="font-semibold text-ink-900 text-lg">About the product</p>

              {/* 複数選択 */}
              <fieldset>
                <legend className="mb-1 font-semibold text-sm text-ink-800">
                  What&apos;s inside your product?
                </legend>
                <p className="text-xs text-ink-500 mb-3">Select all that apply.</p>
                <div className="space-y-2">
                  {CONTENTS.map((item) => {
                    const id = `content-${item.value.replace(/\W+/g, "-")}`;
                    const checked = data.contents.includes(item.value);
                    return (
                      <div key={item.value}>
                        <input
                          type="checkbox"
                          id={id}
                          checked={checked}
                          onChange={() => toggleContent(item.value)}
                          className="sr-only peer"
                        />
                        <label
                          htmlFor={id}
                          className={`block cursor-pointer border-b px-0 py-4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent-600 ${
                            checked
                              ? "border-ink-900"
                              : "border-paper-200 hover:border-ink-400"
                          }`}
                        >
                          <span className="flex items-start gap-3">
                            <span
                              className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center text-[10px] font-semibold ${
                                checked
                                  ? "bg-accent-600 border-accent-600 text-white"
                                  : "border-ink-400 text-transparent"
                              }`}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span>
                              <span className="block text-sm text-ink-900 font-medium">
                                {item.value}
                              </span>
                              {item.hint && (
                                <span className="block text-[11px] text-ink-500 mt-0.5">
                                  {item.hint}
                                </span>
                              )}
                            </span>
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
                {errors.contents && (
                  <p className="mt-2 text-sm text-accent-600 flex items-start gap-1.5">
                    <span aria-hidden="true"></span>
                    {errors.contents}
                  </p>
                )}
              </fieldset>

              <RadioGroup
                name="prior"
                legend="Have you run a crowdfunding campaign before?"
                options={PRIOR}
                value={data.prior}
                onChange={(v) => set("prior", v)}
                error={errors.prior}
              />

              {/* 経験者にのみ表示 */}
              {data.prior && data.prior !== "No, this would be our first" && (
                <Field id="campaignUrl" label="Campaign URL (optional)">
                  <input
                    id="campaignUrl"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={data.campaignUrl}
                    onChange={(e) => set("campaignUrl", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}

              <RadioGroup
                name="timing"
                legend="When would you want to launch?"
                options={TIMING}
                value={data.timing}
                onChange={(v) => set("timing", v)}
                error={errors.timing}
              />

              <RadioGroup
                name="volume"
                legend="Could you produce and ship a few hundred units?"
                options={VOLUME}
                value={data.volume}
                onChange={(v) => set("volume", v)}
                error={errors.volume}
              />

              <RadioGroup
                name="trademark"
                legend="Have you filed a trademark in Japan?"
                options={TRADEMARK}
                value={data.trademark}
                onChange={(v) => set("trademark", v)}
                error={errors.trademark}
              />

              <Field id="notes" label="Anything else we should know? (optional)">
                <textarea
                  id="notes"
                  rows={4}
                  value={data.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* 同意 */}
              <div>
                <label htmlFor="agree" className="flex items-start gap-3 cursor-pointer">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={() => {
                      setAgree((v) => !v);
                      setErrors((prev) => ({ ...prev, agree: undefined }));
                    }}
                    className="mt-1 w-4 h-4"
                    aria-required="true"
                  />
                  <span className="text-sm text-ink-700 leading-relaxed">
                    I&apos;ve read the{" "}
                    <button
                      type="button"
                      className="underline text-accent-600 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPrivacyOpen(true);
                      }}
                    >
                      Privacy Policy
                    </button>{" "}
                    and agree to SOMA using this information to respond to my
                    enquiry.
                  </span>
                </label>
                {errors.agree && (
                  <p className="mt-2 text-sm text-accent-600 flex items-start gap-1.5">
                    <span aria-hidden="true"></span>
                    {errors.agree}
                  </p>
                )}
              </div>

              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="border border-accent-600 bg-accent-50 rounded-none p-4 text-sm text-accent-600 leading-relaxed"
                >
                  {submitError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="sm:w-auto px-6 py-3.5 rounded-[2px] border border-paper-300 text-ink-700 font-semibold text-sm hover:border-ink-400 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 py-3.5 px-5 rounded-[2px] text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-600 ${
                    isSubmitting
                      ? "bg-ink-400 cursor-not-allowed"
                      : "bg-accent-600 hover:bg-accent-500"
                  }`}
                >
                  {isSubmitting ? "Sending…" : "Send my eligibility check"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </section>
  );
}
