import { motion } from "framer-motion";
import { Film, Users, PenLine, type LucideIcon } from "lucide-react";

type Skill = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const skills: Skill[] = [
  {
    icon: Film,
    title: "Post-production",
    description:
      "Adobe Suite (Premiere Pro, After Effects, Photoshop). Montage, motion design, étalonnage, sound design.",
  },
  {
    icon: Users,
    title: "Stratégie & Accompagnement",
    description:
      "J'accompagne des créateurs de A à Z : positionnement, ligne éditoriale et stratégie de publication. Une de mes élèves a dépassé 300 000 vues dès sa première vidéo.",
  },
  {
    icon: PenLine,
    title: "Rédaction de shorts à haute rétention",
    description:
      "Scripts courts pensés pour retenir l'attention : accroche dans les premières secondes, rythme serré, chute qui donne envie de revoir.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative section px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Expertises"
          title="Un profil hybride, exécution premium."
          description="Quatre disciplines maîtrisées qui s'amplifient mutuellement."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-violet bg-white/[0.02] p-6 glow-violet-hover"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(149,96,240,0.35), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet bg-black/40 text-violet">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {skill.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-violet">{eyebrow}</p>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-white/60 text-sm sm:text-base md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}