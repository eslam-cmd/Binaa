"use client";

import { useState } from "react";
import {
  FaCode,
  FaServer,
  FaCloud,
  FaShieldAlt,
  FaRocket,
  FaGithub,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaLayerGroup,
  FaDatabase,
  FaTools,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
} from "react-icons/si";

const PROJECTS = [
  {
    name: "ScanLens",
    description:
      "منصة فحص أمان مواقع SaaS كاملة، AI-powered vulnerability scanning مع نظام اشتراكات وإدارة مالية آليّة",
    stack: [
      "Next.js 15",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Bull",
      "Google Gemini API",
    ],
    demo: "https://scan-lens-client.vercel.app",
    githubClient: "https://github.com/eslam-cmd/ScanLens-client",
    githubServer: "https://github.com/eslam-cmd/ScanLens-server",
    featured: true,
    category: "SaaS",
  },
  {
    name: "Student Management",
    description: "نظام إدارة طلاب OTP وحماية من Brute-force مع تحليلات تفاعلية",
    stack: [
      "Next.js 14",
      "Express 5",
      "PostgreSQL",
      "Material-UI",
      "Recharts",
      "JWT",
    ],
    demo: "https://e-school-client.vercel.app",
    githubClient: "https://github.com/eslam-cmd/e-school-client",
    githubServer: "https://github.com/eslam-cmd/e-school-server",
    featured: false,
    category: "Educational",
  },
];

// أيقونات التقنيات
const getTechIcon = (tech) => {
  const icons = {
    "Next.js": <SiNextdotjs className="text-[var(--primary)]" size={14} />,
    NestJS: <SiNestjs className="text-[var(--primary)]" size={14} />,
    PostgreSQL: <SiPostgresql className="text-[var(--primary)]" size={14} />,
    Prisma: <SiPrisma className="text-[var(--primary)]" size={14} />,
    Redis: <SiRedis className="text-[var(--primary)]" size={14} />,
    Express: <FaServer className="text-[var(--primary)]" size={14} />,
  };
  const key = Object.keys(icons).find((k) => tech.includes(k));
  return key ? (
    icons[key]
  ) : (
    <FaTools className="text-[var(--text-muted)]" size={12} />
  );
};

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section
      id="portfolio"
      className="w-full py-20 sm:py-28 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300 relative overflow-hidden"
    >
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-xs font-medium text-[var(--primary)] tracking-wider uppercase mb-4">
            <FaCode className="text-[var(--primary)]" />
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] transition-colors duration-300">
            مشاريعي
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent rounded-full mx-auto mt-3" />
          <p className="mt-4 text-sm text-[var(--text-muted)] max-w-md mx-auto">
            مشاريع قمت بتطويرها من الصفر باستخدام أحدث التقنيات
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.name}
              className="group relative rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)]/80 backdrop-blur-sm p-6 flex flex-col hover:border-[var(--primary)]/40 hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* شارة مميزة */}
              {project.featured && (
                <div className="absolute -top-2 -right-2 bg-[var(--primary)] text-[var(--background)] text-[9px] font-bold px-3 py-0.5 rounded-full shadow-lg shadow-[var(--primary)]/30 flex items-center gap-1">
                  <FaStar size={10} />
                  مميز
                </div>
              )}

              {/* رأس البطاقة */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[var(--foreground)] font-bold text-xl transition-colors duration-300 flex items-center gap-2">
                    {project.name}
                    {project.category && (
                      <span className="text-[10px] font-normal text-[var(--text-muted)] border border-[var(--nav-border)] rounded-full px-2.5 py-0.5">
                        {project.category}
                      </span>
                    )}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--primary)]/5 px-2.5 py-1 rounded-full border border-[var(--primary)]/10">
                  <FaCode size={10} />
                  {project.stack[0]}
                </div>
              </div>

              {/* الوصف */}
              <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed flex-1 transition-colors duration-300">
                {project.description}
              </p>

              {/* التقنيات */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(1, 6).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)] border border-[var(--nav-border)] rounded-md px-2.5 py-1 transition-all duration-300 hover:border-[var(--primary)]/30 hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5"
                  >
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
                {project.stack.length > 6 && (
                  <span className="text-[10px] text-[var(--text-muted)] px-2 py-1">
                    +{project.stack.length - 6}
                  </span>
                )}
              </div>

              {/* الروابط */}
              <div className="mt-5 pt-4 border-t border-[var(--nav-border)] flex items-center gap-4 text-sm flex-wrap">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-all duration-300 hover:gap-3"
                >
                  <FaRocket size={14} />
                  <span>عرض المشروع</span>
                  <FaArrowRight
                    size={12}
                    className="opacity-0 group-hover/link:opacity-100 transition-all duration-300 -ml-2 group-hover/link:ml-0"
                  />
                </a>
                <a
                  href={project.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-all duration-300 hover:gap-2.5"
                >
                  <FaGithub size={14} />
                  <span className="text-xs">Frontend</span>
                </a>
                <a
                  href={project.githubServer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-all duration-300 hover:gap-2.5"
                >
                  <FaServer size={13} />
                  <span className="text-xs">Backend</span>
                </a>
              </div>

              {/* أيقونات جودة المشروع */}
              <div className="mt-3 flex items-center gap-3 text-[10px] text-[var(--text-muted)] opacity-60">
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-[var(--primary)]" size={10} />
                  Full-Stack
                </span>
                <span className="flex items-center gap-1">
                  <FaLayerGroup className="text-[var(--primary)]" size={10} />
                  Production Ready
                </span>
                <span className="flex items-center gap-1">
                  <FaShieldAlt className="text-[var(--primary)]" size={10} />
                  Secure
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* دعوة للتواصل */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-all duration-300 hover:gap-3 group"
          >
            <span>لديك مشروع؟ تواصل معي</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
