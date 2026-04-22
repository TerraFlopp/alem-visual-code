import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeader } from "./Skills";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarUrl?: string;
};

async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("quote, name, role, company, initials, avatar_url, display_order")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    quote: r.quote,
    name: r.name,
    role: r.role,
    company: r.company,
    initials: r.initials,
    avatarUrl: r.avatar_url ?? undefined,
  }));
}

function Avatar({ item }: { item: Testimonial }) {
  if (item.avatarUrl) {
    return (
      <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-violet p-[2px]">
        <img
          src={item.avatarUrl}
          alt={item.name}
          className="h-full w-full rounded-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 22px -3px rgba(149,96,240,0.6)" }}
        />
      </div>
    );
  }
  return (
    <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-violet bg-gradient-to-br from-white/10 to-white/[0.02] p-[2px]">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-black/60 text-sm font-semibold text-white">
        {item.initials}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 22px -3px rgba(149,96,240,0.6)" }}
      />
    </div>
  );
}

export function Testimonials() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
  return (
    <section id="testimonials" className="relative section px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Références"
          title="Ce qu'ils disent du travail."
          description="Retours de clients et collaborateurs — format direct, sans filtre."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-violet bg-white/[0.02] p-6 md:p-8 glow-violet-hover"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(149,96,240,0.35), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="relative flex flex-col h-full">
                <Quote className="h-6 w-6 text-violet/70" aria-hidden />
                <p className="mt-4 text-base md:text-lg leading-relaxed text-white/85">
                  « {item.quote} »
                </p>

                <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                  <Avatar item={item} />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-white/55 truncate">
                      {item.role} — <span className="text-violet">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}