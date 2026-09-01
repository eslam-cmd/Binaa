"use client";

import { useEffect, useState } from "react";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://binaa-server.vercel.app/api";

const PROJECT_TYPES = [
  "MVP",
  "Full-Stack App",
  "SaaS",
  "Backend Only",
  "AI Integration",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  projectType: PROJECT_TYPES[0],
  description: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [focused, setFocused] = useState({});

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setResendCooldown(0);
    }
  }

  function handleFocus(e) {
    setFocused((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleBlur(e) {
    setFocused((prev) => ({ ...prev, [e.target.name]: false }));
  }

  async function handleSendOTP() {
    if (!form.name || !form.email || !form.projectType || !form.description) {
      setStatus("error");
      setErrorMsg("يرجى تعبئة جميع الحقول أولاً قبل إرسال الرمز");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      setErrorMsg("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setSendingOtp(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/requests/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل إرسال رمز التحقق");
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setResendCooldown(60);
      setStatus("success");
      setErrorMsg(data.message || "تم إرسال رمز التحقق إلى بريدك الإلكتروني");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerifyOTP() {
    if (!otp.trim()) {
      setStatus("error");
      setErrorMsg("يرجى إدخال رمز التحقق");
      return;
    }

    setVerifyingOtp(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/requests/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "رمز التحقق غير صحيح");
      }

      setOtpVerified(true);
      setStatus("success");
      setErrorMsg(data.message || "تم التحقق من البريد الإلكتروني بنجاح");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    } finally {
      setVerifyingOtp(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!otpVerified) {
      setStatus("error");
      setErrorMsg("يرجى إرسال وتأكيد رمز التحقق قبل إرسال الطلب");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          description: form.description,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "حدث خطأ في إرسال الطلب");
      }

      setStatus("success");
      setErrorMsg(data.message || "تم إرسال طلبك بنجاح");
      setForm(INITIAL_FORM);
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setResendCooldown(0);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  // أرقام التواصل
  const whatsappNumber = "963932642429";
  const telegramUsername = "EslamCA";
  const email = "hdayaaslam34@gmail.com";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const openTelegram = () => {
    window.open(`https://t.me/${telegramUsername}`, "_blank");
  };

  const openEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section
      id="contact"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <FiMessageCircle className="text-[var(--primary)]" size={14} />
            <span className="text-xs font-medium text-[var(--primary)]">
              تواصل معي الآن
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            خبرني عن مشروعك
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            اترك لي رسالة وسأتواصل معك خلال 24 ساعة
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* الفورم */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* حقل الاسم */}
            <div className="relative">
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-200 ${
                  focused.name || form.name ? "text-[var(--primary)]" : ""
                }`}
              >
                <FiUser size={16} />
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="الاسم"
                required
                className="w-full rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] pl-4 pr-10 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] placeholder:font-light focus:outline-none focus:border-[var(--primary)] transition-colors duration-200"
              />
            </div>

            {/* حقل الإيميل */}
            <div className="relative">
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-200 ${
                  focused.email || form.email ? "text-[var(--primary)]" : ""
                }`}
              >
                <FiMail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="الإيميل"
                required
                className="w-full rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] pl-4 pr-10 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] placeholder:font-light focus:outline-none focus:border-[var(--primary)] transition-colors duration-200"
              />
            </div>

            {!otpVerified && (
              <div className="flex flex-col gap-3 rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[var(--text-muted)]">
                    تأكيد البريد الإلكتروني
                  </span>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={
                      sendingOtp ||
                      resendCooldown > 0 ||
                      !form.email ||
                      !form.name ||
                      !form.projectType ||
                      !form.description
                    }
                    className="rounded-lg bg-[var(--primary)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingOtp
                      ? "جاري الإرسال..."
                      : resendCooldown > 0
                        ? `إعادة الإرسال خلال ${resendCooldown}s`
                        : "إرسال الرمز"}
                  </button>
                </div>

                {otpSent && (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="أدخل رمز التحقق"
                      inputMode="numeric"
                      className="w-full rounded-xl bg-[var(--background)] border border-[var(--nav-border)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={verifyingOtp || !otp.trim()}
                      className="rounded-xl bg-[var(--primary)] px-3 py-2.5 text-xs font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {verifyingOtp ? "جاري التحقق..." : "تحقق"}
                    </button>
                  </div>
                )}

                {otpSent && resendCooldown > 0 && (
                  <p className="text-[10px] text-[var(--text-muted)]">
                    يمكنك إرسال رمز جديد بعد {resendCooldown} ثانية.
                  </p>
                )}
              </div>
            )}

            {/* حقل نوع المشروع */}
            <div className="relative">
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="w-full rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] px-4 py-2.5 text-sm text-[var(--foreground)] appearance-none focus:outline-none focus:border-[var(--primary)] transition-colors duration-200 cursor-pointer"
              >
                {PROJECT_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-[var(--background)] text-[var(--foreground)]"
                  >
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* حقل الوصف */}
            <div className="relative">
              <div
                className={`absolute right-3 top-3 text-[var(--text-muted)] transition-colors duration-200 ${
                  focused.description || form.description
                    ? "text-[var(--primary)]"
                    : ""
                }`}
              >
                <FiMessageSquare size={16} />
              </div>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="وصف مختصر للمشروع"
                required
                minLength={10}
                rows={4}
                className="w-full rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] pl-4 pr-10 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] placeholder:font-light focus:outline-none focus:border-[var(--primary)] resize-none transition-colors duration-200"
              />
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={status === "loading" || !otpVerified}
              className="relative rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>عم يترسل...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {otpVerified ? "أرسل الطلب" : "تأكيد البريد أولاً"}
                    </span>
                    <FiSend className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* رسائل الحالة */}
            {status === "success" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-in slide-in-from-top-4 duration-500">
                <FiCheckCircle className="text-base flex-shrink-0" />
                <p className="text-xs font-medium">
                  تم إرسال طلبك بنجاح، رح نتواصل معك قريبًا
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 animate-in slide-in-from-top-4 duration-500">
                <FiAlertCircle className="text-base flex-shrink-0" />
                <p className="text-xs font-medium">{errorMsg}</p>
              </div>
            )}
          </form>

          {/* معلومات التواصل */}
          <div className="flex flex-col gap-4">
            {/* واتساب */}
            <div
              className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] transition-colors duration-300 hover:border-green-500/30 group cursor-pointer"
              onClick={openWhatsApp}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500">
                  <FaWhatsapp size={16} />
                </div>
                <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  واتساب
                </p>
              </div>
              <div className="block text-sm text-[var(--foreground)] group-hover:text-green-500 transition-colors duration-200 font-medium">
                {whatsappNumber}
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-relaxed">
                تواصل معي مباشرة للاستفسار عن المشروع قبل الشراء
              </p>
            </div>

            {/* تلجرام */}
            <div
              className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] transition-colors duration-300 hover:border-blue-500/30 group cursor-pointer"
              onClick={openTelegram}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                  <SiTelegram size={16} />
                </div>
                <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  تلجرام
                </p>
              </div>
              <div className="block text-sm text-[var(--foreground)] group-hover:text-blue-500 transition-colors duration-200 font-medium">
                @{telegramUsername}
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-relaxed">
                للاستفسار ومناقشة تفاصيل مشروعك قبل البدء
              </p>
            </div>

            {/* إيميل */}
            <div
              className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)] transition-colors duration-300 hover:border-[var(--primary)]/30 group cursor-pointer"
              onClick={openEmail}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <FiMail size={16} />
                </div>
                <p className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  البريد الإلكتروني
                </p>
              </div>
              <div className="block text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-200 font-medium">
                {email}
              </div>
              <p className="mt-1.5 text-[10px] text-[var(--text-muted)] leading-relaxed">
                راسلني عبر البريد الإلكتروني للاستفسارات الرسمية
              </p>
            </div>

            {/* نصيحة */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 border border-[var(--nav-border)] transition-colors duration-300">
              <div className="flex items-start gap-2.5">
                <span className="text-lg">💡</span>
                <div>
                  <p className="text-xs font-medium text-[var(--foreground)] mb-0.5">
                    استشرني قبل الشراء
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                    تواصل معي لمناقشة متطلبات مشروعك بالتفصيل، وسأقدم لك استشارة
                    مجانية حول أفضل الحلول التقنية التي تناسب احتياجاتك
                    وميزانيتك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
