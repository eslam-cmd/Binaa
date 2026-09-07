import {
  FiBox,
  FiServer,
  FiCpu,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiLock,
  FiCloud,
  FiDatabase,
} from "react-icons/fi";
import { FaRocket, FaBrain, FaMobileAlt, FaChartLine } from "react-icons/fa";

const SERVICES = [
  {
    title: "بناء SaaS كامل",
    description:
      "منصة متكاملة جاهزة للإطلاق مع Frontend, Backend, Database, Auth, Payments, Subscriptions, ولوحة تحكم متقدمة.",
    icon: FiBox,
    color: "text-blue-400",
    bg: "bg-blue-400/5",
    border: "border-blue-400/20",
    problem: "تشتت الأدوات وعدم وجود منصة موحدة لإدارة عملك",
    solution: "نوفر لك منصة SaaS متكاملة تجمع كل ما تحتاجه في مكان واحد",
  },
  {
    title: "تطوير Backend & APIs",
    description:
      "بناء APIs قوية وآمنة مع تصميم قاعدة بيانات، مصادقة متقدمة، مهام خلفية، ومعالجة فورية للبيانات.",
    icon: FiServer,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/20",
    problem: "تطبيقاتك بطيئة وغير آمنة بسبب Backend ضعيف",
    solution: "نبني لك Backend سريع وآمن يتعامل مع آلاف المستخدمين بسلاسة",
  },
  {
    title: "إضافة AI للمنتج",
    description:
      "دمج Google Gemini و OpenAI لتحليل البيانات، توليد المحتوى التلقائي، وتوصيات ذكية للمستخدمين.",
    icon: FiCpu,
    color: "text-purple-400",
    bg: "bg-purple-400/5",
    border: "border-purple-400/20",
    problem: "منافسوك يستخدمون الذكاء الاصطناعي وأنت متخلف عن الركب",
    solution: "نضيف الذكاء الاصطناعي لمنتجك ليمنحك ميزة تنافسية لا تُقهر",
  },
  {
    title: "أمن وحماية متقدمة",
    description:
      "تأمين تطبيقك ضد الهجمات الإلكترونية، حماية من SQL Injection، XSS، CSRF، و Brute-force attacks.",
    icon: FiShield,
    color: "text-red-400",
    bg: "bg-red-400/5",
    border: "border-red-400/20",
    problem: "بيانات عملائك معرضة للاختراق وتهدد سمعتك",
    solution: "نوفر حماية شاملة لتطبيقك تجعل اختراقه مستحيلاً تقريباً",
  },
  {
    title: "تحسين الأداء والسرعة",
    description:
      "تحسين سرعة تحميل التطبيق، تقليل زمن الاستجابة، وتحسين تجربة المستخدم باستخدام أحدث التقنيات.",
    icon: FiZap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/5",
    border: "border-yellow-400/20",
    problem: "تطبيقك بطيء ويطرد المستخدمين قبل أن يجربوا خدماتك",
    solution: "نحسن أداء تطبيقك ليصبح سريعاً كالبرق ويحتفظ بكل زائر",
  },
  {
    title: "تحليلات وبيانات ذكية",
    description:
      "لوحات تحليلية تفاعلية تعرض أداء تطبيقك، سلوك المستخدمين، وإحصائيات دقيقة تساعدك على اتخاذ القرارات.",
    icon: FiTrendingUp,
    color: "text-cyan-400",
    bg: "bg-cyan-400/5",
    border: "border-cyan-400/20",
    problem: "تتخذ قراراتك بشكل عشوائي دون بيانات حقيقية تدعمها",
    solution: "نوفر لك تحليلات دقيقة تمكنك من فهم عملاءك واتخاذ قرارات مدروسة",
  },
  {
    title: "تصميم تجربة مستخدم فريدة",
    description:
      "تصميم واجهات مستخدم جذابة وسهلة الاستخدام تزيد من تفاعل العملاء وتحسن من معدلات التحويل.",
    icon: FaMobileAlt,
    color: "text-pink-400",
    bg: "bg-pink-400/5",
    border: "border-pink-400/20",
    problem: "تصميمك الحالي يبدو قديماً وغير جذاب للعملاء",
    solution: "نقدم لك تصميم عصري واحترافي يجعل عملاءك يعشقون التطبيق",
  },
  {
    title: "تكامل مع أنظمة خارجية",
    description:
      "ربط تطبيقك مع أنظمة الدفع (Stripe, PayPal)، منصات التواصل، أدوات التسويق، وخدمات خارجية أخرى.",
    icon: FiCloud,
    color: "text-indigo-400",
    bg: "bg-indigo-400/5",
    border: "border-indigo-400/20",
    problem: "أنظمتك الحالية غير متصلة ببعضها مما يضيع الوقت والجهد",
    solution: "نربط كل أنظمتك في منصة واحدة توفر لك الوقت والجهد",
  },
  {
    title: "تطوير تطبيقات الجوال",
    description:
      "بناء تطبيقات جوال native و cross-platform باستخدام React Native و Flutter لتصل لعملائك أينما كانوا.",
    icon: FaMobileAlt,
    color: "text-green-400",
    bg: "bg-green-400/5",
    border: "border-green-400/20",
    problem: "تخدم عملاء سطح المكتب فقط وتفقد شريحة كبيرة من مستخدمي الجوال",
    solution: "نوفر تطبيق جوال يضع خدماتك في جيب كل عميل",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="w-full py-16 sm:py-24 border-t border-[var(--nav-border)] bg-[var(--background)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* العنوان */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-4">
            <FaRocket className="text-[var(--primary)]" size={14} />
            <span className="text-xs font-medium text-[var(--primary)]">
              حلولنا التقنية
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] transition-colors duration-300">
            شو منقدر نقدملك؟
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mx-auto mt-3" />
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
            خدماتنا مصممة لحل مشاكلك التقنية ودفع عملك إلى الأمام
          </p>
        </div>

        {/* البطاقات */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl border ${service.border} ${service.bg} p-6 hover:border-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* أيقونة الخلفية */}
                <div className="absolute -right-4 -top-4 text-7xl opacity-5 text-[var(--text-muted)] select-none">
                  <Icon className="text-7xl" />
                </div>

                <div className="relative">
                  {/* الأيقونة */}
                  <div
                    className={`p-3 rounded-xl ${service.bg} border ${service.border} w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className={`text-2xl ${service.color}`} />
                  </div>

                  {/* العنوان */}
                  <h3 className="mt-4 text-[var(--foreground)] font-bold text-lg transition-colors duration-300 group-hover:text-[var(--primary)]">
                    {service.title}
                  </h3>

                  {/* المشكلة */}
                  <div className="mt-3 flex items-start gap-2">
                    <span className="text-red-400 text-sm mt-0.5">⚠️</span>
                    <p className="text-xs text-red-400/70 leading-relaxed">
                      {service.problem}
                    </p>
                  </div>

                  {/* الحل */}
                  <div className="mt-2 flex items-start gap-2">
                    <span className="text-emerald-400 text-sm mt-0.5">✅</span>
                    <p className="text-xs text-emerald-400/70 leading-relaxed">
                      {service.solution}
                    </p>
                  </div>

                  {/* الوصف */}
                  <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--nav-border)] pt-3">
                    {service.description}
                  </p>

                  {/* خط سفلي متحرك */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                </div>
              </div>
            );
          })}
        </div>

        {/* دعوة للتواصل */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">
            هل لديك تحدٍ تقني؟ نحن هنا لمساعدتك
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[var(--primary)]/25"
          >
            <span>احصل على استشارة مجانية</span>
            <FaRocket size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
