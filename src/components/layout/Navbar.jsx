"use client";

import { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "خدماتي", href: "#services" },
  { label: "أعمالي", href: "#portfolio" },
  { label: "المدونة", href: "/blog" },
  { label: "الباقات", href: "#pricing" },
  { label: "الأسئلة الشائعة", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* الشعار + مؤشر التوفر */}
        <a href="#hero" className="flex items-center gap-2.5 shrink-0">
          <span className="font-bold text-[var(--foreground)] text-base transition-colors duration-300">
            إسلام هدايا
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] border-r border-[var(--nav-border]) pr-2.5 mr-0.5 transition-colors duration-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.6 w-1.6 bg-[var(--accent)]" />
            </span>
            متاح للعمل
          </span>
        </a>

        {/* روابط سطح المكتب */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* الأزرار - سطح المكتب */}
        <div className="hidden md:flex items-center gap-2">
          {/* زر تبديل الثيم */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"
            }
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-border)] transition-all duration-200"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)] active:scale-[0.98] transition-all duration-200"
          >
            اطلب خدمتك
          </a>
        </div>

        {/* أزرار الموبايل */}
        <div className="flex items-center gap-1 md:hidden">
          {/* زر تبديل الثيم للموبايل */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"
            }
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-border)] transition-all duration-200"
          >
            {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--nav-border)] transition-all duration-200"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {open && (
        <div className="md:hidden border-t border-[var(--nav-border)] bg-[var(--mobile-menu-bg)] px-5 py-4 flex flex-col gap-3 transition-colors duration-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[var(--text-muted)] text-sm font-medium hover:text-[var(--foreground)] transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-all duration-200"
          >
            اطلب خدمتك
          </a>
        </div>
      )}
    </nav>
  );
}
