import { ArrowUp } from "lucide-react";
import { personal } from "@/content/portfolio";

export function Footer() {
  return (
    <footer className="relative px-6 md:px-12 lg:px-20 pb-10 pt-16">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {personal.name}. Tous droits réservés.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-violet focus-gold"
        >
          Retour en haut
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}