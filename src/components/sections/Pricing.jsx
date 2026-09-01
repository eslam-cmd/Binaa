"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiInfo,
  FiGift,
  FiShield,
  FiZap,
} from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const autoplayRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // تعريف visibleCount أولاً
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  // تحديث visibleCount عند تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPlans();
  }, []);

  // Autoplay - استخدام visibleCount مباشرة
  useEffect(() => {
    if (isAutoPlaying && plans.length > visibleCount) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [isAutoPlaying, plans.length, visibleCount]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/services`);

      if (!res.ok) {
        throw new Error("فشل في جلب الباقات");
      }

      const data = await res.json();

      if (data.success && data.services) {
        const formattedPlans = data.services.map((service) => ({
          id: service.id,
          emoji: service.emoji || "📦",
          name: service.name,
          price: service.price || "غير محدد",
          features: service.features || [],
          highlighted: service.is_highlighted || false,
          description: service.description || "",
          badge: service.is_highlighted ? "الأكثر طلباً" : null,
        }));

        setPlans(formattedPlans);
        // اختيار الباقة المميزة كافتراضي
        const highlightedIndex = formattedPlans.findIndex((p) => p.highlighted);
        if (highlightedIndex !== -1) {
          setSelectedPlan(highlightedIndex);
        }
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("خطأ في جلب الباقات:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning || plans.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % plans.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, plans.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || plans.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, plans.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, currentIndex],
  );

  // التحكم باللمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    clearInterval(autoplayRef.current);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const getVisiblePlans = () => {
    if (plans.length === 0) return [];

    const count = Math.min(visibleCount, plans.length);
    const items = [];

    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % plans.length;
      items.push({ ...plans[index], displayIndex: i });
    }

    return items;
  };

  const visiblePlans = getVisiblePlans();
  const totalGroups = Math.ceil(plans.length / visibleCount);
  const currentGroup = Math.floor(currentIndex / visibleCount);

  if (loading) {
    return (
      <section className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4 animate-pulse">
              <span className="text-xs font-medium text-[var(--primary)]">
                ⏳ جاري التحميل
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] animate-pulse">
              الباقات
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)] p-6 animate-pulse"
              >
                <div className="w-12 h-12 bg-[var(--nav-border)] rounded-full mb-4" />
                <div className="h-6 bg-[var(--nav-border)] rounded w-3/4 mb-3" />
                <div className="h-8 bg-[var(--nav-border)] rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-[var(--nav-border)] rounded w-full"
                    />
                  ))}
                </div>
                <div className="h-10 bg-[var(--nav-border)] rounded-xl mt-6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || plans.length === 0) {
    return (
      <section className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            الباقات
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-4 text-[var(--text-muted)]">
            {error || "لا توجد باقات متاحة حالياً"}
          </p>
          <button
            onClick={fetchPlans}
            className="mt-4 px-6 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <FiZap className="text-[var(--primary)]" size={14} />
            <span className="text-xs font-medium text-[var(--primary)]">
              اختر الباقة المناسبة لمشروعك
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            الباقات
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mx-auto mt-3" />
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
            خطط مرنة مصممة خصيصاً لتتناسب مع احتياجات مشروعك وميزانيتك
          </p>
        </div>

        {/* حاوية البطاقات */}
        <div
          className="relative px-2 sm:px-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* مؤشر التبديل التلقائي */}
          {plans.length > visibleCount && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
              <span
                className={`transition-opacity duration-300 ${isAutoPlaying ? "opacity-100" : "opacity-30"}`}
              >
                ▶ تشغيل تلقائي
              </span>
              <span className="w-16 h-0.5 bg-[var(--nav-border)] rounded-full overflow-hidden">
                <span
                  className={`block h-full bg-[var(--primary)] rounded-full transition-all duration-[6000ms] ${isAutoPlaying ? "w-full" : "w-0"}`}
                />
              </span>
            </div>
          )}

          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 transition-all duration-500 ease-in-out"
          >
            {visiblePlans.map((plan, idx) => (
              <div
                key={`${plan.id}-${idx}`}
                className={`group relative rounded-2xl p-6 flex flex-col transition-all duration-500 ease-in-out cursor-pointer ${
                  plan.highlighted
                    ? "border-2 border-[var(--primary)] bg-gradient-to-b from-[var(--primary)]/10 to-transparent shadow-2xl shadow-[var(--primary)]/20 scale-[1.02] lg:scale-[1.05]"
                    : "border border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)]/40 hover:shadow-xl hover:shadow-black/10"
                } ${isTransitioning ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}
                style={{
                  transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onClick={() => setSelectedPlan(idx)}
              >
                {/* خلفية متحركة للبطاقة المميزة */}
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-transparent" />
                )}

                {/* شارة الباقة المميزة */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg shadow-[var(--primary)]/30">
                    <FiStar size={12} />
                    الأكثر طلباً
                  </div>
                )}

                {/* رأس الباقة */}
                <div className="flex items-start gap-3">
                  <span className="text-3xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                    {plan.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[var(--foreground)] font-bold text-lg transition-colors duration-300">
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-2">
                        {plan.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* السعر */}
                <div className="mt-4">
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {plan.price}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    ابتداءً من
                  </p>
                </div>

                {/* الميزات */}
                <div className="mt-5 flex-1 space-y-2.5">
                  {plan.features &&
                    plan.features.slice(0, 5).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 transition-all duration-300 group-hover:translate-x-1"
                        style={{ transitionDelay: `${index * 60}ms` }}
                      >
                        <div className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                          <FiCheck className="text-[var(--primary)] text-xs" />
                        </div>
                        <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  {plan.features && plan.features.length > 5 && (
                    <div className="text-xs text-[var(--text-muted)] mt-2 pr-7 flex items-center gap-1">
                      <FiInfo size={12} />+{plan.features.length - 5} ميزات
                      إضافية
                    </div>
                  )}
                </div>

                {/* زر الطلب */}
                <a
                  href="#contact"
                  className={`mt-6 w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/40 hover:scale-[1.02] active:scale-[0.97]"
                      : "border-2 border-[var(--nav-border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5 hover:scale-[1.02] active:scale-[0.97]"
                  }`}
                >
                  <span>اطلب الباقة</span>
                  <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">
                    ←
                  </span>
                </a>

                {/* مزايا إضافية */}
                <div className="mt-4 flex items-center justify-center gap-4 text-[9px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <FiShield size={12} />
                    دعم مجاني
                  </span>
                  <span className="flex items-center gap-1">
                    <FiGift size={12} />
                    تحديثات
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* أزرار التنقل */}
          {plans.length > visibleCount && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[var(--nav-bg)] border-2 border-[var(--nav-border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300 z-10 shadow-lg hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="السابق"
              >
                <FiChevronRight size={22} />
              </button>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[var(--nav-bg)] border-2 border-[var(--nav-border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300 z-10 shadow-lg hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="التالي"
              >
                <FiChevronLeft size={22} />
              </button>
            </>
          )}
        </div>

        {/* نقاط التنقل */}
        {plans.length > visibleCount && (
          <div className="flex items-center justify-center gap-3 mt-8">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * visibleCount)}
                disabled={isTransitioning}
                className={`rounded-full transition-all duration-300 ${
                  currentGroup === index
                    ? "w-10 h-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/30"
                    : "w-2.5 h-2.5 bg-[var(--nav-border)] hover:bg-[var(--text-muted)] hover:scale-125"
                }`}
                aria-label={`الانتقال إلى المجموعة ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* معلومات إضافية */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-sm font-medium text-[var(--foreground)]">
              💳 دفع مرن
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              50% مقدم، 50% عند التسليم
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-sm font-medium text-[var(--foreground)]">
              🛡️ دعم مجاني
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              شهر دعم مجاني بعد التسليم
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-sm font-medium text-[var(--foreground)]">
              ⚡ تسليم سريع
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              تسليم المشروع في الوقت المتفق عليه
            </p>
          </div>
        </div>

        {/* نص ختامي */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            💡 الأسعار ابتدائية وتعتمد على تعقيد المشروع والميزات الإضافية
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            📞 للاستفسارات، تواصل معي مباشرة عبر{" "}
            <span className="text-[var(--primary)] font-medium">واتساب</span> أو{" "}
            <span className="text-[var(--primary)] font-medium">تلجرام</span>
          </p>
        </div>
      </div>
    </section>
  );
}
