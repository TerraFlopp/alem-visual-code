import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { creativeVideos, seriousVideos, type VideoEmbed } from "@/content/portfolio";
import { SectionHeader } from "./Skills";

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
  return (
    <section id="portfolio" className="relative section px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Une exécution adaptée à chaque univers."
          description="Du contenu corporate exigeant aux formats verticaux à fort impact."
        />

        <Tabs defaultValue="serious" className="mt-12">
          <TabsList className="h-11 bg-white/[0.04] border border-violet rounded-full p-1">
            <TabsTrigger
              value="serious"
              className="rounded-full px-5 text-sm data-[state=active]:bg-violet data-[state=active]:text-white"
            >
              Serious & Business
            </TabsTrigger>
            <TabsTrigger
              value="creative"
              className="rounded-full px-5 text-sm data-[state=active]:bg-violet data-[state=active]:text-white"
            >
              Divertissement & Créa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="serious" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seriousVideos.map((v) => (
                <VideoCard key={v.id} video={v} ratio="16/9" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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