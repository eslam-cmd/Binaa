"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const QUESTIONS = [
  {
    q: "كم يستغرق بناء SaaS كامل؟",
    a: "حسب التعقيد، بين 3-8 أسابيع للـ MVP و8-16 أسبوع للـ SaaS الكامل.",
  },
  {
    q: "هل بتقدم دعم بعد التسليم؟",
    a: "نعم، شهر دعم مجاني لإصلاح أي مشكلة + خيار صيانة شهرية.",
  },
  {
    q: "كيف بتم الدفع؟",
    a: "50% مقدم و 50% بعد التسليم. عبر PayPal أو Wise أو التحويل البنكي.",
  },
  {
    q: "هل بتعمل مع الزبون المباشر ولا عبر منصة؟",
    a: "الاثنين — خمسات، مستقل، أو تواصل مباشر.",
  },
  {
    q: "شو التقنيات يلي بتستخدمها؟",
    a: "Next.js, Express, PostgreSQL, Prisma, Redis, Docker, Google Gemini API.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            الأسئلة الشائعة
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            أجوبة لأكثر الأسئلة اللي بتتكرر
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)]/30"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="text-sm sm:text-base font-medium text-[var(--foreground)] transition-colors duration-200">
                    {item.q}
                  </span>
                  <span
                    className={`text-[var(--text-muted)] text-lg shrink-0 transition-all duration-200 ${
                      isOpen ? "rotate-180 text-[var(--primary)]" : ""
                    }`}
                  >
                    <FiChevronDown size={20} />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
