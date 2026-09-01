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
  },
  {
    name: "Student-management",
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
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            أعمالي
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            مشاريع قمت بتطويرها من الصفر
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="group rounded-xl border border-[var(--nav-border)] bg-[var(--nav-bg)] p-5 flex flex-col hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-[var(--foreground)] font-bold text-lg transition-colors duration-300">
                  {project.name}
                </h3>
                <span className="text-xs text-[var(--text-muted)] px-2 py-0.5 rounded-full border border-[var(--nav-border)]">
                  {project.stack[0]}
                </span>
              </div>

              <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed flex-1 transition-colors duration-300">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(1, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] text-[var(--text-muted)] border border-[var(--nav-border)] rounded-md px-2 py-0.5 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && (
                  <span className="text-[10px] text-[var(--text-muted)] px-2 py-0.5">
                    +{project.stack.length - 5}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--nav-border)] flex items-center gap-4 text-sm flex-wrap">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors duration-200"
                >
                  🚀 الديمو
                </a>
                <a
                  href={project.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                >
                  Frontend
                </a>
                <a
                  href={project.githubServer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                >
                  Backend
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
