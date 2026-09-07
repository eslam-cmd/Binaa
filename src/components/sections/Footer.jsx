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
  FaFacebook,
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
  { 
    label: "Facebook", 
    href: "https://www.facebook.com/profile.php?id=61594218961084", 
    icon: FaFacebook 
  },
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