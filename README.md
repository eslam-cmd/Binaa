# Frontend — Freelance Platform (Islam Hadaya)

Next.js 15 (App Router) + JavaScript (JSX) + Tailwind CSS

## تشغيل المشروع

```bash
npm install
cp .env.local.example .env.local   # وعبي NEXT_PUBLIC_API_URL
npm run dev
```

الموقع رح يشتغل على: http://localhost:3000

## هيكل المشروع

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.jsx        # Cairo + Inter fonts, RTL
│   │   ├── page.jsx          # الصفحة الرئيسية (One-Page)
│   │   └── globals.css       # Dark theme + ألوان (#3B82F6 / #10B981)
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   ├── sections/          # كل قسم من النص التوجيهي إله ملف
│   │   │   ├── Hero.jsx
│   │   │   ├── TrustBar.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                # مكونات مشتركة (Button, Card...) — رح نضيفها
│   └── lib/
│       └── constants.js       # بيانات ثابتة (اسم، إيميل، لينكات)
└── .env.local.example
```

## ملاحظات
- كل الأقسام حاليًا Skeleton (فاضية) — جاهزة نبني محتواها قسم قسم.
- الفورم بقسم Contact لازم يبعت POST لـ `${NEXT_PUBLIC_API_URL}/contacts`.
