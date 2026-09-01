import { FiBox, FiServer, FiCpu } from "react-icons/fi";

const SERVICES = [
  {
    title: "بناء SaaS كامل",
    description:
      "Frontend + Backend + Database + Auth + Payments + Admin Dashboard + Subscription System",
    icon: FiBox,
    color: "text-blue-400",
    bg: "bg-blue-400/5",
    border: "border-blue-400/20",
  },
  {
    title: "تطوير Backend & APIs",
    description:
      "REST APIs, Database Design, Authentication, Background Jobs, Real-time Processing",
    icon: FiServer,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/20",
  },
  {
    title: "إضافة AI للمنتج",
    description:
      "دمج Google Gemini / OpenAI لتحليل البيانات، توليد المحتوى، وتوصيات ذكية",
    icon: FiCpu,
    color: "text-purple-400",
    bg: "bg-purple-400/5",
    border: "border-purple-400/20",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="w-full py-16 sm:py-24 bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] transition-colors duration-300">
            شو بقدر أعملك
          </h2>
          <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mx-auto mt-2" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            خدماتي المخصصة لمشروعك
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group rounded-xl border ${service.border} ${service.bg} p-5 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all duration-300`}
              >
                <div
                  className={`p-2 rounded-xl ${service.bg} border ${service.border} w-fit group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`text-xl ${service.color}`} />
                </div>
                <h3 className="mt-3 text-[var(--foreground)] font-bold text-base transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
