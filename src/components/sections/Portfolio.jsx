"use client";

import { useState } from "react";
import {
  FaCode,
  FaServer,
  FaShieldAlt,
  FaRocket,
  FaGithub,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaLayerGroup,
  FaTools,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaUsers,
  FaClock,
  FaDatabase,
  FaCloud,
  FaChartBar,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiTailwindcss,
  SiExpress,
  SiTypescript,
  SiDocker,
  SiMaterialdesign,
} from "react-icons/si";

const PROJECTS = [
  {
    id: 1,
    name: "ScanLens",
    title: "منصة فحص أمان المواقع بالذكاء الاصطناعي",
    description:
      "منصة متكاملة لفحص أمان المواقع والتطبيقات باستخدام الذكاء الاصطناعي. توفر فحصاً شاملاً للثغرات الأمنية مع تقارير مفصلة وتوصيات للإصلاح.",
    longDescription:
      "ScanLens هي منصة متطورة لفحص أمان المواقع الإلكترونية والتطبيقات باستخدام تقنيات الذكاء الاصطناعي. تم تصميم النظام ليكون سريعاً ودقيقاً مع دعم التوسع الأفقي.\n\n✨ الميزات الرئيسية:\n• فحص تلقائي للثغرات الأمنية الشائعة (OWASP Top 10)\n• تقارير مفصلة مع توصيات للإصلاح\n• نظام اشتراكات متكامل\n• لوحة تحكم متقدمة للمشرفين\n• تكامل مع Google Gemini AI للتحليل الذكي\n• معالجة في الخلفية باستخدام Bull Queue",
    stack: [
      "Next.js 15",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Bull",
      "Google Gemini API",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    demo: "https://scan-lens-client.vercel.app",
    githubClient: "https://github.com/eslam-cmd/ScanLens-client",
    githubServer: "https://github.com/eslam-cmd/ScanLens-server",
    featured: true,
    category: "SaaS",
    tags: ["ذكاء اصطناعي", "أمن سيبراني", "SaaS", "Full-Stack"],

    images: [
      "/scanlens/11.png",
      "/scanlens/22.png",
      "/scanlens/33.png",
      "/scanlens/44.png",
    ],
    screenshots: [
      " واجهة لوحة التحكم الرئيسية للادمن",
      "واجهة فحص الموقع والتقارير",
      "قسم الاشتراكات والخطط",
      "صفحة لحفظ التقارير مع تصديرهم",
    ],
  },
  {
    id: 2,
    name: "Student Management",
    title: "نظام إدارة الطلاب والمؤسسات التعليمية",
    description:
      "نظام متكامل لإدارة الطلاب والمؤسسات التعليمية مع مصادقة آمنة بخطوتين ولوحات تحليلية تفاعلية.",
    longDescription:
      "نظام إدارة طلاب متكامل يوفر حلولاً شاملة للمؤسسات التعليمية. يشمل النظام مصادقة آمنة بخطوتين (OTP)، حماية ضد هجمات القوة العمياء، ولوحات تحليلية تفاعلية.\n\n✨ الميزات الرئيسية:\n• نظام مصادقة بخطوتين (OTP) عبر البريد الإلكتروني\n• حماية متقدمة ضد Brute-force attacks\n• لوحات تحليلية تفاعلية (Recharts)\n• إدارة شاملة للطلاب والمواد والدرجات\n• نظام حضور وغياب متكامل\n• اختبارات نظرية وعملية",
    stack: [
      "Next.js 14",
      "Express 5",
      "PostgreSQL",
      "Material-UI",
      "Recharts",
      "JWT",
      "TypeScript",
      "Tailwind CSS",
    ],
    demo: "https://e-school-client.vercel.app",
    githubClient: "https://github.com/eslam-cmd/e-school-client",
    githubServer: "https://github.com/eslam-cmd/e-school-server",
    featured: false,
    category: "Educational",
    tags: ["تعليم", "أمن", "تحليلات", "لوحة تحكم"],

    images: [
      "/Student-managment/11.png",
      "/Student-managment/22.png",
      "/Student-managment/33.png",
      "/Student-managment/44.png",
    ],
    screenshots: [
      "لوحة تحكم المعلم الرئيسية",
      "إدارة الطلاب والبيانات",
      "التحليلات والإحصائيات التفاعلية",
      "بوابة الطالب الشخصية",
    ],
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const getTechIcon = (tech) => {
    const icons = {
      "Next.js": <SiNextdotjs className="text-white" size={16} />,
      NestJS: <SiNestjs className="text-red-500" size={16} />,
      PostgreSQL: <SiPostgresql className="text-blue-500" size={16} />,
      Prisma: <SiPrisma className="text-emerald-400" size={16} />,
      Redis: <SiRedis className="text-red-600" size={16} />,
      Express: <SiExpress className="text-yellow-400" size={16} />,
      "Tailwind CSS": <SiTailwindcss className="text-cyan-400" size={16} />,
      TypeScript: <SiTypescript className="text-blue-600" size={16} />,
      Docker: <SiDocker className="text-blue-400" size={16} />,
      "Material-UI": <SiMaterialdesign className="text-blue-400" size={16} />,
      Recharts: <FaChartBar className="text-blue-400" size={16} />,
    };
    const key = Object.keys(icons).find((k) => tech.includes(k));
    return key ? (
      icons[key]
    ) : (
      <FaTools className="text-[var(--text-muted)]" size={14} />
    );
  };

  return (
    <section
      id="portfolio"
      className="w-full py-20 sm:py-28 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300 relative overflow-hidden"
    >
      {/* خلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-xs font-medium text-[var(--primary)] tracking-wider uppercase mb-4">
            <FaCode className="text-[var(--primary)]" />
            مشاريعنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] transition-colors duration-300">
            أعمالنا
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent rounded-full mx-auto mt-3" />
          <p className="mt-4 text-sm text-[var(--text-muted)] max-w-md mx-auto">
            مشاريع طورناها من الصفر باستخدام أحدث التقنيات
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg)]/80 backdrop-blur-sm overflow-hidden hover:border-[var(--primary)]/40 hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openModal(project)}
            >
              {/* صورة المشروع */}
              <div className="relative h-56 overflow-hidden bg-[var(--background)]">
                {project.images && project.images.length > 0 ? (
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.images[0]})`,
                      backgroundColor: "var(--background)",
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                    <FaCode />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

                {/* شارة مميزة */}
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg shadow-[var(--primary)]/30 flex items-center gap-1.5 z-10">
                    <FaStar size={10} />
                    مميز
                  </div>
                )}

                <button
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--nav-border)] text-xs font-medium text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                >
                  <FaEye className="inline mr-1.5" size={12} />
                  عرض التفاصيل
                </button>
              </div>

              {/* محتوى البطاقة */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[var(--foreground)] font-bold text-lg transition-colors duration-300">
                      {project.name}
                      {project.category && (
                        <span className="mr-2 text-[10px] font-normal text-[var(--text-muted)] border border-[var(--nav-border)] rounded-full px-2.5 py-0.5">
                          {project.category}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {project.title}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* التقنيات */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)] border border-[var(--nav-border)] rounded-md px-2.5 py-1 transition-all duration-300 hover:border-[var(--primary)]/30 hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[10px] text-[var(--text-muted)] px-2 py-1">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* الروابط */}
                <div className="mt-4 pt-3 border-t border-[var(--nav-border)] flex items-center gap-4 text-sm flex-wrap">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-all duration-300 hover:gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaRocket size={14} />
                    <span className="text-xs">عرض المشروع</span>
                  </a>
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-all duration-300 hover:gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub size={14} />
                    <span className="text-xs">الواجهة الأمامية</span>
                  </a>
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-all duration-300 hover:gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaServer size={13} />
                    <span className="text-xs">الخادم</span>
                  </a>
                </div>
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
            <span>لديك مشروع؟ تواصل معنا</span>
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* مودال التفاصيل */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background)] rounded-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* زر الإغلاق */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
            >
              <FaTimes size={20} />
            </button>

            {/* معرض الصور */}
            <div className="relative h-72 sm:h-96 bg-[var(--background)]">
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <>
                  <div
                    className="w-full h-full bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url(${selectedProject.images[currentImageIndex]})`,
                    }}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <FaChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <FaChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex
                                ? "w-6 bg-white"
                                : "bg-white/50 hover:bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {selectedProject.screenshots && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-white">
                      {selectedProject.screenshots[currentImageIndex] ||
                        `صورة ${currentImageIndex + 1}`}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">
                  <FaCode />
                </div>
              )}
            </div>

            {/* محتوى المودال */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                    {selectedProject.name}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {selectedProject.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {selectedProject.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedProject.featured && (
                  <span className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                    <FaStar size={12} />
                    مميز
                  </span>
                )}
              </div>

              <div className="prose prose-invert max-w-none">
                {selectedProject.longDescription
                  .split("\n\n")
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* إحصائيات المشروع */}
              {selectedProject.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 p-4 rounded-xl bg-[var(--nav-bg)] border border-[var(--nav-border)]">
                  {Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                        {value}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        {key}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* التقنيات */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                  التقنيات المستخدمة
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] border border-[var(--nav-border)] rounded-full px-3 py-1.5 hover:border-[var(--primary)]/30 hover:text-[var(--foreground)] hover:bg-[var(--primary)]/5 transition-all duration-300"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* الروابط */}
              <div className="mt-6 pt-4 border-t border-[var(--nav-border)] flex flex-wrap items-center gap-3">
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <FaRocket />
                  عرض المشروع
                </a>
                <a
                  href={selectedProject.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--nav-border)] text-[var(--text-muted)] text-sm hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
                >
                  <FaGithub />
                  الواجهة الأمامية
                </a>
                <a
                  href={selectedProject.githubServer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--nav-border)] text-[var(--text-muted)] text-sm hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-300"
                >
                  <FaServer />
                  الخادم
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </section>
  );
}
