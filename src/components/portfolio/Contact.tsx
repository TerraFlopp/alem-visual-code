import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { personal } from "@/content/portfolio";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative section px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-violet"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white"
        >
          Parlons de votre projet.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-sm sm:text-base text-white/60"
        >
          Réponse sous 48h ouvrées. Pas de réseaux sociaux personnels — uniquement
          email et téléphone.
        </motion.p>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-violet bg-white/[0.02] p-5 text-left glow-violet-hover focus-gold"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet text-violet">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Email
                </p>
                <p className="truncate text-sm font-medium text-white">
                  {personal.email}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-violet bg-white/[0.02] p-5 text-left glow-violet-hover focus-gold"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet text-violet">
                <Phone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Téléphone
                </p>
                <p className="truncate text-sm font-medium text-white">
                  {personal.phone}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10"
        >
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-black glow-gold transition-transform hover:scale-[1.02] focus-gold"
          >
            Envoyer un email
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}