"use client";

import { useState } from "react";
import { FiStar, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TESTIMONIALS = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "مؤسس شركة تقنية",
    content:
      "عملت مع إسلام على تطوير منصة SaaS متكاملة، وكانت النتيجة فوق التوقعات. احترافية عالية والتزام بالمواعيد.",
    rating: 5,
    avatar:
      "https://ui-avatars.com/api/?name=أحمد+محمد&background=3b82f6&color=fff&size=60",
  },
  {
    id: 2,
    name: "سارة خالد",
    role: "مديرة مشاريع",
    content:
      "أسلوب احترافي في التعامل، تواصل مستمر وتحديثات أسبوعية. أنصح بالتعامل معه لأي مشروع تقني.",
    rating: 5,
    avatar:
      "https://ui-avatars.com/api/?name=سارة+خالد&background=10b981&color=fff&size=60",
  },
  {
    id: 3,
    name: "محمد العلي",
    role: "صاحب مشروع ناشئ",
    content:
      "ساعدني في إطلاق مشروعي في وقت قياسي. فهم احتياجاتي بدقة وقدم حلولاً مبتكرة.",
    rating: 5,
    avatar:
      "https://ui-avatars.com/api/?name=محمد+العلي&background=8b5cf6&color=fff&size=60",
  },
  {
    id: 4,
    name: "نورا إبراهيم",
    role: "مديرة تسويق",
    content:
      "مطور محترف يفهم احتياجات العملاء. ساعدنا في تطوير منصة متكاملة بأحدث التقنيات.",
    rating: 5,
    avatar:
      "https://ui-avatars.com/api/?name=نورا+إبراهيم&background=f59e0b&color=fff&size=60",
  },
  {
    id: 5,
    name: "خالد سليمان",
    role: "مدير تقني",
    content:
      "عمل احترافي، كود نظيف ومنظم، وتواصل ممتاز طوال فترة المشروع. أوصي به بشدة.",
    rating: 5,
    avatar:
      "https://ui-avatars.com/api/?name=خالد+سليمان&background=ef4444&color=fff&size=60",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // عرض 3 بطاقات على سطح المكتب، 1 على الموبايل
  const getVisibleTestimonials = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 1 : 3;
    const items = [];
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % TESTIMONIALS.length;
      items.push(TESTIMONIALS[index]);
    }
    return items;
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  // دوال النجوم
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-[var(--text-muted)]"}`}
        size={14}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <span className="text-sm">⭐</span>
            <span className="text-xs font-medium text-[var(--primary)]">
              آراء العملاء
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            ماذا يقولون <span className="text-[var(--primary)]">عن خدمتي</span>
          </h2>
          <div className="w-16 h-1 bg-[var(--primary)] rounded-full mx-auto mt-3" />
          <p className="mt-4 text-[var(--text-muted)] text-sm sm:text-base">
            آراء حقيقية من عملاء سعداء بخدماتي
          </p>
        </div>

        {/* البطاقات */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="group p-6 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/5 transition-all duration-300"
              >
                {/* التقييم */}
                <div className="flex items-center gap-0.5 mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                {/* المحتوى */}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-4 min-h-[80px]">
                  `{testimonial.content}`
                </p>

                {/* معلومات العميل */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--nav-border)]">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full border-2 border-[var(--nav-border)]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--foreground)] truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* أزرار التنقل */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="p-2.5 rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-all duration-300"
              aria-label="السابق"
            >
              <FiChevronRight size={18} />
            </button>

            {/* نقاط التنقل */}
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 bg-[var(--primary)]"
                      : "bg-[var(--nav-border)] hover:bg-[var(--text-muted)]"
                  }`}
                  aria-label={`انتقل إلى التقييم ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="p-2.5 rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-all duration-300"
              aria-label="التالي"
            >
              <FiChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* إحصائية سريعة */}
        <div className="mt-12 pt-8 border-t border-[var(--nav-border)]">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-[var(--foreground)]">5.0</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {renderStars(5)}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                متوسط التقييم
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                {TESTIMONIALS.length}+
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">عميل سعيد</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[var(--foreground)]">
                100%
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">توصية</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
