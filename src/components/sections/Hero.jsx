"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    // ضبط حجم الكانفاس
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // إنشاء الجسيمات
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        // اللون يتغير حسب الثيم
        const isDark = document.documentElement.className === "dark";
        const color = isDark ? "255, 255, 255" : "59, 130, 246";
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // إنشاء الجسيمات
    const particleCount = Math.min(
      60,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // رسم الخطوط بين الجسيمات القريبة
    function drawLines() {
      const isDark = document.documentElement.className === "dark";
      const color = isDark ? "255, 255, 255" : "59, 130, 246";

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // رسم دوائر متحركة كبيرة
    function drawCircles(time) {
      const isDark = document.documentElement.className === "dark";
      const color = isDark ? "59, 130, 246" : "59, 130, 246";

      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3);
        const y = canvas.height * (0.3 + Math.sin(time / 2000 + i) * 0.1);
        const radius = 80 + Math.sin(time / 3000 + i * 2) * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${color}, ${0.03 + i * 0.01})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // حلقة الأنيميشن
    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // رسم الدوائر المتحركة
      drawCircles(time);

      // تحديث ورسم الجسيمات
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // رسم الخطوط
      drawLines();

      animationId = requestAnimationFrame(animate);
    }

    animate(0);

    // مراقبة تغيير الثيم
    const observer = new MutationObserver(() => {
      // إعادة رسم عند تغيير الثيم
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-20 pb-24 sm:pt-28 sm:pb-32 bg-[var(--background)] transition-colors duration-300 overflow-hidden"
    >
      {/* خلفية الكانفاس */}
      <div className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* محتوى الهيرو */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        {/* شارة صغيرة */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--nav-border)] bg-[var(--nav-bg)]/80 backdrop-blur-sm text-[10px] font-medium text-[var(--text-muted)] tracking-wider uppercase mb-6 transition-colors duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          متاح للعمل
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.1] tracking-tight transition-colors duration-300">
          أبني لك منتجك الرقمي
          <span className="block text-[var(--primary)]">من الصفر</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
          مطور Full-Stack متخصص ببناء منصات SaaS وتطبيقات الويب باستخدام Next.js
          و Express و PostgreSQL. من حلب، سوريا.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40"
          >
            <span>اطلب خدمتك الآن</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[var(--nav-border)] px-6 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-colors duration-200 bg-[var(--nav-bg)]/50 backdrop-blur-sm"
          >
            شوف أعمالي
          </a>
        </div>

        {/* إحصائيات سريعة مع خلفية شفافة */}
        <div className="mt-10 pt-8 border-t border-[var(--nav-border)] flex flex-wrap items-center justify-center gap-8 sm:gap-12 transition-colors duration-300">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              2+
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              مشاريع SaaS
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              15+
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              تقنية متقنة
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              حلب
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              سوريا 🇸🇾
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
