import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import ThreeParticlesBackground from "@/components/ThreeParticlesBackground";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <ThreeParticlesBackground />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
