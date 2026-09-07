"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const QUESTIONS = [
  {
    q: "كم يستغرق بناء SaaS كامل؟",
    a: "حسب التعقيد، بين 3-8 أسابيع للـ MVP و8-16 أسبوع للـ SaaS الكامل. نقدم جدول زمني مفصل قبل البدء.",
  },
  {
    q: "هل بتقدموا دعم بعد التسليم؟",
    a: "نعم، شهر دعم مجاني لإصلاح أي مشكلة + خيار صيانة شهرية بنسبة 10% من قيمة المشروع سنوياً.",
  },
  {
    q: "كيف بتم الدفع؟",
    a: "50% مقدم و 50% بعد التسليم. عبر PayPal أو Wise أو التحويل البنكي. نوفر فواتير رسمية للشركات.",
  },
  {
    q: "شو التقنيات يلي بتستخدموها؟",
    a: "Next.js 15, Express 5, PostgreSQL, Prisma, Redis, Docker, Google Gemini API، TypeScript، Tailwind CSS.",
  },
  {
    q: "كم عدد التعديلات المسموحة؟",
    a: "نقدم جولتين من التعديلات المجانية ضمن نطاق المشروع المتفق عليه. التعديلات الإضافية تحسب بساعات عمل إضافية.",
  },
  {
    q: "هل توفرون استضافة للمشروع؟",
    a: "نعم، نقدم خدمات استضافة على Vercel أو AWS أو خوادم مخصصة حسب احتياجك، مع إدارة كاملة للخادم.",
  },
  {
    q: "ما هي ضمانات الجودة؟",
    a: "نقدم ضماناً لمدة 30 يوماً بعد التسليم لإصلاح أي أخطاء برمجية. نوفر أيضاً تقارير اختبار شاملة للمشروع.",
  },
  {
    q: "هل يمكن دمج الذكاء الاصطناعي في مشروعي؟",
    a: "بالتأكيد! نوفر تكاملات مع Google Gemini، OpenAI، وخدمات AI أخرى لتحليل البيانات، توليد المحتوى، وتوصيات ذكية.",
  },
  {
    q: "كم تكلفة تطوير تطبيق ويب؟",
    a: "تبدأ الأسعار من $500 للـ MVP، وتصل إلى $3000+ للمشاريع الكاملة. نقدم عرض سعر مجاني بناءً على متطلباتك.",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <span className="text-sm">❓</span>
            <span className="text-xs font-medium text-[var(--primary)]">
              الأسئلة الشائعة
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            الأسئلة الشائعة
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            أجوبة لأكثر الأسئلة اللي بتتكرر عن خدماتنا
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
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right group"
                >
                  <span className="text-sm sm:text-base font-medium text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--primary)]">
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

        {/* دعوة للتواصل */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            لم تجد إجابة لسؤالك؟{" "}
            <a
              href="#contact"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-medium"
            >
              تواصل معنا مباشرة
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
