import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundBlobs } from "@/components/portfolio/BackgroundBlobs";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { TrustCarousel } from "@/components/portfolio/TrustCarousel";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terraflopp — Monteur & Community Manager" },
      {
        name: "description",
        content:
          "Portfolio de Terraflopp : montage vidéo, création de contenu et gestion de communauté. Des vidéos claires, rythmées et impactantes.",
      },
      {
        property: "og:title",
        content: "Terraflopp — Monteur & Community Manager",
      },
      {
        property: "og:description",
        content:
          "Montage vidéo, création de contenu et gestion de communauté. Portfolio premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const key = "visit_tracked_session";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    supabase
      .from("page_visits")
      .insert({
        path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      })
      .then(() => {});
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden text-white">
      <BackgroundBlobs />
      <main className="relative">
        <Hero />
        <Skills />
        <TrustCarousel />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
