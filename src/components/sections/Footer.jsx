import { SITE } from "@/lib/constants";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";

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
      className="w-full border-t border-[var(--nav-border)] bg-[var(--background)] py-8 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5 flex-wrap justify-center">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors duration-200 font-medium"
              >
                <Icon size={14} />
                {link.label}
              </a>
            );
          })}
        </div>

        <p className="text-[10px] text-[var(--text-muted)] transition-colors duration-300">
          © 2026 {SITE.name}
        </p>
      </div>
    </footer>
  );
}
