import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTypescript,
  SiPrisma,
  SiTailwindcss,
  SiGoogle,
} from "react-icons/si";

const STATS = [
  { value: "2", label: "مشاريع SaaS شغالة" },
  { value: "15+", label: "تقنية متقنة" },
  { value: "حلب", label: "سوريا 🇸🇾" },
];

const TECH_STACK = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    bg: "bg-white/5",
    color: "text-white",
    border: "border-white/10",
  },
  {
    name: "NestJS",
    icon: SiNestjs,
    bg: "bg-red-500/10",
    color: "text-red-400",
    border: "border-red-500/20",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    bg: "bg-blue-500/10",
    color: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    name: "Redis",
    icon: SiRedis,
    bg: "bg-red-600/10",
    color: "text-red-500",
    border: "border-red-600/20",
  },
  {
    name: "Docker",
    icon: SiDocker,
    bg: "bg-blue-400/10",
    color: "text-blue-400",
    border: "border-blue-400/20",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    bg: "bg-blue-600/10",
    color: "text-blue-500",
    border: "border-blue-600/20",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    bg: "bg-emerald-400/10",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    bg: "bg-cyan-400/10",
    color: "text-cyan-400",
    border: "border-cyan-400/20",
  },
  {
    name: "Gemini AI",
    icon: SiGoogle,
    bg: "bg-purple-400/10",
    color: "text-purple-400",
    border: "border-purple-400/20",
  },
];

export default function TrustBar() {
  return (
    <section
      id="trust"
      className="w-full border-y border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        {/* الأرقام */}
        {/* <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="group transition-all duration-300">
              <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] transition-colors duration-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}

        {/* شعارات التقنيات */}
       
          <p className="text-center text-xl text-[var(--text-muted)] mb-5 transition-colors duration-300 font-medium tracking-wider uppercase">
            🛠️ التقنيات التي أستخدمها
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TECH_STACK.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl ${tech.bg} border ${tech.border} hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/10 hover:scale-105 transition-all duration-300 cursor-default`}
                >
                  <Icon
                    className={`text-xl ${tech.color} transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                  />
                  <span className="text-[11px] sm:text-xs text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors duration-300 font-medium">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>

      </div>
    </section>
  );
}
