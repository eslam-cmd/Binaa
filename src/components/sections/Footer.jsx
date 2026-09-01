import { SITE } from "@/lib/constants";
import {
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiBriefcase,
  FiSend,
  FiHeart,
  FiCode,
  FiGlobe,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import {
  FaRocket,
  FaStar,
  FaArrowRight,
  FaLaptopCode,
  FaBuilding,
} from "react-icons/fa";

const LINKS = [
  {
    label: "ScanLens",
    href: "https://scan-lens-client.vercel.app",
    icon: FiExternalLink,
  },
  {
    label: "Student Management",
    href: "https://e-school-client.vercel.app",
    icon: FiExternalLink,
  },
  { label: "GitHub", href: SITE.github, icon: FiGithub },
  { label: "LinkedIn", href: SITE.linkedin, icon: FiLinkedin },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full border-t border-[var(--nav-border)] bg-[var(--background)] py-8 transition-colors duration-300 relative overflow-hidden"
    >
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--primary)]/3 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        {/* صف دعوة مزدوجة: توظيف + فريلانسر */}
        <div className="text-center mb-6 pb-6 border-b border-[var(--nav-border)]">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-xs font-medium text-[var(--primary)]">
              <FaBuilding size={12} />
              للتوظيف
            </span>
            <span className="text-[var(--text-muted)] text-xs opacity-30">
              |
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-xs font-medium text-[var(--primary)]">
              <FaLaptopCode size={12} />
              فريلانسر
            </span>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            🔍{" "}
            <span className="text-[var(--foreground)] font-medium">
              للتوظيف:
            </span>{" "}
            اطلع على سيرتي الذاتية
            <br className="sm:hidden" />
            <span className="text-[var(--text-muted)]"> | </span>
            💼{" "}
            <span className="text-[var(--foreground)] font-medium">
              للفريلانسر:
            </span>{" "}
            احصل على خدمة احترافية
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            {/* رابط الموقع الشخصي للتوظيف */}
            <a
              href="https://my-profile-personal-nextjs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--primary)] text-[var(--background)] text-sm font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary)]/30 group"
            >
              <FiFileText size={16} />
              <span>السيرة الذاتية</span>
              <FaArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {/* رابط طلب خدمة فريلانسر */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[var(--nav-border)] text-[var(--text-muted)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)]/5"
            >
              <FiSend size={16} />
              <span>اطلب خدمة</span>
            </a>
          </div>

          <p className="text-[10px] text-[var(--text-muted)] opacity-50 mt-3">
            🏢 للتوظيف • 💼 مشاريع فريلانسر • 🚀 تطوير ويب متكامل
          </p>
        </div>

        {/* الروابط والإشارات */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-all duration-300 hover:gap-2.5 font-medium group"
                >
                  <Icon
                    size={14}
                    className="text-[var(--primary)] group-hover:scale-110 transition-transform duration-300"
                  />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] text-[var(--text-muted)] transition-colors duration-300 flex items-center gap-1">
              © 2026 {SITE.name}
              <span className="mx-1 opacity-30">•</span>
              <FiHeart size={10} className="text-[var(--primary)]" />
            </p>
            <p className="text-[8px] text-[var(--text-muted)] opacity-40 tracking-wider uppercase flex items-center gap-1">
              <FiCode size={9} />
              Next.js
              <span className="mx-1">•</span>
              <FiGlobe size={9} />
              Syria 🇸🇾
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
