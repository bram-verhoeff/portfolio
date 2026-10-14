import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { TechMarquee } from "@/components/marquee/TechMarquee";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/contact/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden bg-[#05080e] text-white">
      <Navbar />
      <Hero />
      <TechMarquee />
      <BentoGrid />
      <TimelineSection />
      <SkillsMatrix />
      <ContactSection />
      <Footer />
    </main>
  );
}