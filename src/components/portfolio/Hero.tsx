import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personal } from "@/content/portfolio";

export function Hero() {
  const letters = personal.name.split("");

  return (
    <section className="relative min-h-[100svh] flex items-center px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet bg-white/[0.02] px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse" />
          Video Editor & Developer
        </motion.p>

        <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.02] tracking-tight text-white">
          <span className="block">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="block text-white/60 mt-3 text-[clamp(1.25rem,3vw,2.25rem)] font-medium leading-tight"
          >
            <span className="text-white/90">L'ingénierie technique</span>{" "}
            <span className="text-violet">au service</span>{" "}
            <span className="text-white/90">de l'impact visuel.</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed"
        >
          {personal.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black glow-gold transition-all hover:scale-[1.02] focus-gold"
          >
            Voir le portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-violet bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white glow-violet-hover focus-gold"
          >
            <Mail className="h-4 w-4" />
            Me contacter
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}