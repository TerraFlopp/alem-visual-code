import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/content/portfolio";
import { SectionHeader } from "./Skills";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative section px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Parcours"
          title="Une trajectoire singulière."
          description="De l'ingénierie d'infrastructures à la production créative — un fil conducteur : la précision."
        />

        <div ref={containerRef} className="relative mt-10 sm:mt-16">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-px bg-white/10"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 w-px"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(149,96,240,0), rgba(149,96,240,0.9) 30%, rgba(228,201,66,0.9))",
                boxShadow: "0 0 18px rgba(149,96,240,0.6)",
              }}
            />
          </motion.div>

          <ul className="space-y-12 md:space-y-20">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={entry.year + entry.company}
                  className="relative md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Dot */}
                  <span
                    aria-hidden
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 h-4 w-4 rounded-full ring-4 ring-black"
                    style={{
                      backgroundColor: entry.critical ? "#e4c942" : "#9560f0",
                      boxShadow: entry.critical
                        ? "0 0 24px rgba(228,201,66,0.7)"
                        : "0 0 18px rgba(149,96,240,0.6)",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                    className={`pl-12 md:pl-0 ${
                      isLeft
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-2xl border ${
                        entry.critical ? "border-gold" : "border-violet"
                      } bg-white/[0.02] p-5 glow-violet-hover max-w-md`}
                    >
                      <p
                        className={`text-xs uppercase tracking-[0.25em] ${
                          entry.critical ? "text-gold" : "text-violet"
                        }`}
                      >
                        {entry.year}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {entry.company}
                      </h3>
                      <p className="text-sm text-white/70 font-medium">
                        {entry.role}
                      </p>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}