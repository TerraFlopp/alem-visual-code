import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeader } from "./Skills";
import { Briefcase, Sparkles } from "lucide-react";

type VideoEmbed = {
  id: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok";
  embedUrl: string;
};

async function fetchVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, platform, embed_url, category, display_order")
    .order("display_order", { ascending: true });
  if (error) throw error;
  const map = (rows: typeof data) =>
    (rows ?? []).map((r) => ({
      id: r.id,
      title: r.title,
      platform: r.platform as VideoEmbed["platform"],
      embedUrl: r.embed_url,
    }));
  return {
    serious: map((data ?? []).filter((d) => d.category === "serious")),
    creative: map((data ?? []).filter((d) => d.category === "creative")),
  };
}

function VideoCard({
  video,
  ratio,
}: {
  video: VideoEmbed;
  ratio: "16/9" | "9/16";
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-violet bg-white/[0.02] glow-violet-hover"
    >
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ aspectRatio: ratio }}
      >
        <iframe
          src={video.embedUrl}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-medium text-white truncate">
          {video.title}
        </span>
        <span className="shrink-0 rounded-full border border-violet px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet">
          {video.platform}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Portfolio() {
  const { data } = useQuery({ queryKey: ["videos"], queryFn: fetchVideos });
  const seriousVideos = data?.serious ?? [];
  const creativeVideos = data?.creative ?? [];
  return (
    <section id="portfolio" className="relative section px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Une exécution adaptée à chaque univers."
          description="Du contenu corporate exigeant aux formats verticaux à fort impact."
        />

        <Tabs defaultValue="serious" className="mt-8 sm:mt-12">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Choisis un univers
            </p>
            <TabsList className="h-auto w-full sm:w-auto flex flex-col sm:flex-row gap-2 bg-white/[0.04] border-2 border-violet rounded-2xl sm:rounded-full p-1.5 shadow-[0_0_32px_rgba(149,96,240,0.35)]">
              <TabsTrigger
                value="serious"
                className="w-full sm:w-auto rounded-full px-5 sm:px-7 py-2.5 text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 text-white/70 transition-all hover:text-white data-[state=active]:bg-violet data-[state=active]:text-white data-[state=active]:shadow-[0_0_24px_rgba(149,96,240,0.7)]"
              >
                <Briefcase className="h-4 w-4" />
                Serious & Business
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="w-full sm:w-auto rounded-full px-5 sm:px-7 py-2.5 text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2 text-white/70 transition-all hover:text-white data-[state=active]:bg-violet data-[state=active]:text-white data-[state=active]:shadow-[0_0_24px_rgba(149,96,240,0.7)]"
              >
                <Sparkles className="h-4 w-4" />
                Divertissement & Créa
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="serious" className="mt-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {seriousVideos.map((v) => (
                <VideoCard key={v.id} video={v} ratio="9/16" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative" className="mt-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {creativeVideos.map((v) => (
                <VideoCard key={v.id} video={v} ratio="9/16" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}