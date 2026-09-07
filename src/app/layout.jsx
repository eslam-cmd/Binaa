import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import VisitorTracker from "@/components/VisitorTracker";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Islam Hadaya | Full-Stack Developer",
  description:
    "فريق Full-Stack متخصص ببناء منصات SaaS وتطبيقات الويب باستخدام Next.js و NestJS/Express و PostgreSQL. من حلب، سوريا.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <VisitorTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
