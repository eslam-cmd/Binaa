"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaRocket,
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Hero() {
  const canvasRef = useRef(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // تتبع حركة الماوس
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // إنشاء الجسيمات
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.originalX = this.x;
        this.originalY = this.y;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulse += 0.02;

        // حركة ناعمة مع نبض
        this.x += this.speedX + Math.sin(this.pulse) * 0.1;
        this.y += this.speedY + Math.cos(this.pulse) * 0.1;

        // التأثير على الجسيمات القريبة من الماوس
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (1 - distance / 150) * 2;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
          }
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const isDark = document.documentElement.className === "dark";
        const color = isDark ? "212, 175, 55" : "24, 110, 150";
        const glow = isDark ? "212, 175, 55" : "24, 110, 150";

        // توهج خارجي
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 4,
        );
        gradient.addColorStop(0, `rgba(${glow}, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${glow}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // الجسيم الأساسي
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.shadowColor = `rgba(${color}, ${this.opacity * 0.5})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // إنشاء الجسيمات
    const particleCount = Math.min(
      80,
      Math.floor((canvas.width * canvas.height) / 12000),
    );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // رسم الخطوط
    function drawLines() {
      const isDark = document.documentElement.className === "dark";
      const color = isDark ? "212, 175, 55" : "24, 110, 150";

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = (1 - distance / 180) * 0.12;
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.shadowColor = `rgba(${color}, ${opacity * 0.3})`;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    // رسم دوائر متحركة
    function drawCircles(time) {
      const isDark = document.documentElement.className === "dark";
      const color = isDark ? "212, 175, 55" : "24, 110, 150";

      const circles = [
        { x: 0.15, y: 0.2, size: 250, speed: 0.001 },
        { x: 0.85, y: 0.3, size: 200, speed: -0.0015 },
        { x: 0.5, y: 0.7, size: 300, speed: 0.0008 },
      ];

      circles.forEach((circle, i) => {
        const x =
          canvas.width * (circle.x + Math.sin(time * circle.speed + i) * 0.05);
        const y =
          canvas.height *
          (circle.y + Math.cos(time * circle.speed * 1.2 + i) * 0.05);
        const radius = circle.size + Math.sin(time * 0.001 + i * 2) * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${color}, ${0.04 + i * 0.01})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${0.02 + i * 0.005})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawCircles(time);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      drawLines();

      animationId = requestAnimationFrame(animate);
    }

    animate(0);

    const observer = new MutationObserver(() => {});
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-20 pb-24 sm:pt-28 sm:pb-32 bg-[var(--background)] transition-colors duration-300 overflow-hidden flex items-center"
    >
      {/* خلفية الكانفاس */}
      <div className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* تأثير توهج إضافي */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent pointer-events-none" />

      {/* محتوى الهيرو */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* شارة احترافية */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 backdrop-blur-sm text-xs font-medium text-[var(--primary)] tracking-wider uppercase mb-6 transition-all duration-300 hover:bg-[var(--primary)]/10 hover:scale-105 cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--primary)]" />
          </span>
          متاح للتعاون الفوري
          <FaStar className="text-[10px] opacity-50" />
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[var(--foreground)] leading-[1.1] tracking-tight transition-colors duration-300">
          أبني لك
          <span className="relative block text-[var(--primary)] mt-1">
            منتجك الرقمي
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30" />
          </span>
          <span className="text-[var(--foreground)] text-2xl sm:text-3xl lg:text-4xl font-light block mt-3 opacity-60">
            من الصفر إلى الإطلاق
          </span>
        </h1>

        {/* الوصف */}
        <p className="mt-6 text-sm sm:text-base lg:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
          مطور{" "}
          <span className="text-[var(--primary)] font-semibold">
            Full-Stack
          </span>{" "}
          متخصص ببناء منصات
          <span className="text-[var(--primary)] font-semibold">
            {" "}
            SaaS
          </span>{" "}
          وتطبيقات الويب باستخدام
          <span className="text-[var(--primary)] font-semibold">
            {" "}
            Next.js
          </span>{" "}
          و<span className="text-[var(--primary)] font-semibold">
            {" "}
            Express
          </span>{" "}
          و
          <span className="text-[var(--primary)] font-semibold">
            {" "}
            PostgreSQL
          </span>
          .
          <br />
          من{" "}
          <span className="text-[var(--primary)] font-semibold">
            حلب، سوريا
          </span>{" "}
          🇸🇾
        </p>

        {/* الأزرار */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 hover:scale-105"
            onMouseEnter={() => setHoveredBtn("primary")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <FaRocket
              className={`transition-transform duration-300 ${hoveredBtn === "primary" ? "rotate-12 scale-110" : ""}`}
            />
            <span>اطلب خدمتك الآن</span>
            <FaArrowRight
              className={`transition-all duration-300 ${hoveredBtn === "primary" ? "translate-x-1 opacity-100" : "opacity-60"}`}
            />
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--nav-border)] px-8 py-3 text-sm font-medium text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 bg-[var(--nav-bg)]/50 backdrop-blur-sm hover:bg-[var(--primary)]/5 hover:scale-105"
            onMouseEnter={() => setHoveredBtn("secondary")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <FaCode
              className={`transition-transform duration-300 ${hoveredBtn === "secondary" ? "rotate-6" : ""}`}
            />
            استعرض أعمالي
          </a>
        </div>

        {/* الإحصائيات المحسنة */}
        <div className="mt-12 pt-8 border-t border-[var(--nav-border)] grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto transition-colors duration-300">
          <div className="group flex flex-col items-center gap-1 p-4 rounded-xl hover:bg-[var(--primary)]/5 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-[var(--primary)] text-lg" />
              <p className="text-2xl font-bold text-[var(--foreground)]">2+</p>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              مشاريع SaaS
            </p>
          </div>
          <div className="group flex flex-col items-center gap-1 p-4 rounded-xl hover:bg-[var(--primary)]/5 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-[var(--primary)] text-lg" />
              <p className="text-2xl font-bold text-[var(--foreground)]">15+</p>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              تقنية متقنة
            </p>
          </div>
          <div className="group flex flex-col items-center gap-1 p-4 rounded-xl hover:bg-[var(--primary)]/5 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[var(--primary)] text-lg" />
              <p className="text-2xl font-bold text-[var(--foreground)]">حلب</p>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              سوريا 🇸🇾
            </p>
          </div>
        </div>

        {/* أيقونات التقنيات السريعة */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-40">
          <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase">
            تقنياتي:
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <FaServer className="text-[var(--primary)] text-sm" /> Next.js
          </span>
          <span className="w-px h-4 bg-[var(--nav-border)]" />
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <FaDatabase className="text-[var(--primary)] text-sm" /> PostgreSQL
          </span>
       
          <span className="w-px h-4 bg-[var(--nav-border)]" />
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <FaShieldAlt className="text-[var(--primary)] text-sm" /> Secure
          </span>
          <span className="w-px h-4 bg-[var(--nav-border)]" />
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <FaBolt className="text-[var(--primary)] text-sm" /> Fast
          </span>
        </div>
      </div>
    </section>
  );
}
