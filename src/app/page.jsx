import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
// import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Portfolio />
      <Pricing />
      <Process />
      {/* <Testimonials />  */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
