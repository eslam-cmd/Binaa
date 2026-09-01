"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiMessageCircle,
  FiCode,
  FiAperture,
  FiRocket,
  FiCheckCircle,
  FiArrowRight,
  FiSend,
  FiMonitor,
  FiCheckSquare,
  FiPackage,
} from "react-icons/fi";

// بدائل FiRocket:
// - FiRocket (موجود) ✅
// - FiSend (للإرسال)
// - FiMonitor (للشاشة)
// - FiCheckSquare (للتحقق)
// - FiPackage (للتسليم)

const STEPS = [
  {
    title: "تواصل",
    description: "نحدد المتطلبات والميزات",
    icon: FiMessageCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    progress: "25%",
    detail: "جلسة استشارية مجانية لفهم احتياجاتك",
  },
  {
    title: "تطوير",
    description: "أبني المشروع بتحديثات أسبوعية",
    icon: FiCode,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    progress: "50%",
    detail: "تطوير متواصل مع تقارير أسبوعية",
  },
  {
    title: "اختبار",
    description: "أتأكد إن كل شي شغال 100%",
    icon: FiCheckSquare, // بدلاً من FiAperture
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    progress: "75%",
    detail: "اختبار شامل لجميع الوظائف والميزات",
  },
  {
    title: "تسليم",
    description: "أنقل المشروع لإلك + دعم شهر مجاني",
    icon: FiPackage, // بدلاً من FiRocket (أو استخدم FiRocket إذا كان موجود)
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    progress: "100%",
    detail: "تسليم المشروع مع دعم فني لمدة شهر",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <span className="text-sm">🚀</span>
            <span className="text-xs font-medium text-[var(--primary)]">
              عملية عمل شفافة ومنظمة
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            طريقة الشغل
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
            من الفكرة إلى التسليم في 4 خطوات واضحة، مع تواصل مستمر وتحديثات
            دورية
          </p>
        </div>

        {/* خط تقدم أفقي */}
        <div className="relative mb-10 hidden sm:block">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--nav-border)] -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] -translate-y-1/2 transition-all duration-1000"
            style={{ width: isInView ? "100%" : "0%" }}
          />
          <div className="relative flex justify-between">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    isInView
                      ? "bg-[var(--primary)] text-white scale-100"
                      : "bg-[var(--nav-border)] text-[var(--text-muted)] scale-75"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {index + 1}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-2 whitespace-nowrap">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* البطاقات */}
        <div className="grid sm:grid-cols-4 gap-5">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const delay = index * 100;

            return (
              <div
                key={step.title}
                className={`group relative rounded-2xl p-5 transition-all duration-500 cursor-pointer ${
                  isActive
                    ? `border-2 ${step.border} ${step.bg} shadow-xl shadow-[var(--primary)]/5 scale-[1.02]`
                    : "border border-[var(--nav-border)] bg-[var(--nav-bg)] hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-black/5"
                }`}
                style={{ transitionDelay: `${delay}ms` }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* أيقونة الخلفية */}
                <div className="absolute -right-4 -top-4 text-8xl opacity-5 text-[var(--text-muted)] select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* الرقم والأيقونة */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl ${step.bg} ${step.color} border ${step.border} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-xl" />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--nav-border)] px-2 py-1 rounded-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* العنوان */}
                <h3 className="text-[var(--foreground)] font-bold text-lg transition-colors duration-300 group-hover:text-[var(--primary)]">
                  {step.title}
                </h3>

                {/* الوصف */}
                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed transition-colors duration-300">
                  {step.description}
                </p>

                {/* تفاصيل إضافية (تظهر عند التمرير) */}
                <div
                  className={`mt-3 overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-[var(--primary)] bg-[var(--primary)]/5 px-3 py-2 rounded-lg">
                    <FiCheckCircle size={14} />
                    <span>{step.detail}</span>
                  </div>
                </div>

                {/* مؤشر التقدم */}
                <div className="mt-4 w-full h-1 bg-[var(--nav-border)] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-1000 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    style={{ width: isActive ? step.progress : "0%" }}
                  />
                </div>

                {/* سهم ارتباط */}
                {index < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <FiArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* إحصائية سريعة */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-2xl font-bold text-[var(--foreground)]">100%</p>
            <p className="text-xs text-[var(--text-muted)]">تسليم في الوقت</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-2xl font-bold text-[var(--foreground)]">24/7</p>
            <p className="text-xs text-[var(--text-muted)]">تواصل مستمر</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-2xl font-bold text-[var(--foreground)]">شهر</p>
            <p className="text-xs text-[var(--text-muted)]">دعم مجاني</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
            <p className="text-2xl font-bold text-[var(--foreground)]">✓</p>
            <p className="text-xs text-[var(--text-muted)]">ضمان الجودة</p>
          </div>
        </div>
      </div>
    </section>
  );
}
