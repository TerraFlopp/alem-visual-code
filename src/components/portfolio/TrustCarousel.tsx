import { trustItems, type TrustItem } from "@/content/portfolio";
import { SectionHeader } from "./Skills";

function TrustNode({ item }: { item: TrustItem }) {
  if (item.kind === "logo") {
    return (
      <div className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 transition-all duration-300 hover:border-violet">
        <span className="font-display text-lg font-semibold tracking-wide text-white/80">
          {item.name}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2 min-w-[110px]">
      <div className="relative h-16 w-16 rounded-full border-2 border-violet bg-gradient-to-br from-white/10 to-white/[0.02] p-[2px] transition-all duration-300 hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-black/50 text-sm font-semibold text-white">
          {item.initials}
        </div>
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 25px -3px rgba(149,96,240,0.6)",
          }}
        />
      </div>
      <span className="text-[10px] uppercase tracking-wider text-white/50">
        {item.name}
      </span>
    </div>
  );
}

export function TrustCarousel() {
  // Duplicate the array for a seamless loop
  const loop = [...trustItems, ...trustItems];

  return (
    <section className="relative section px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Confiance"
          title="Ils m'ont fait confiance."
          description="Marques, agences et créateurs avec qui j'ai collaboré."
        />
      </div>

      <div className="relative mt-12 marquee-mask">
        <div className="marquee-track flex items-center gap-8 py-4">
          {loop.map((item, idx) => (
            <TrustNode key={`${item.name}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}