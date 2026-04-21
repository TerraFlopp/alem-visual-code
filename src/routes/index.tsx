import { createFileRoute } from "@tanstack/react-router";
import { BackgroundBlobs } from "@/components/portfolio/BackgroundBlobs";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { TrustCarousel } from "@/components/portfolio/TrustCarousel";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden text-white">
      <BackgroundBlobs />
      <main className="relative">
        <Hero />
        <Skills />
        <TrustCarousel />
        <Portfolio />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
