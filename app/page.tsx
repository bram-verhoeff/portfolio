import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { TechMarquee } from "@/components/marquee/TechMarquee";
import { Work } from "@/components/work/Work";
import { About } from "@/components/about/About";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/contact/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Work />
        <About />
        <TimelineSection />
        <SkillsMatrix />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
