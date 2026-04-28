import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";
import { Hourglass, Shirt } from "lucide-react";

export const Programme = () => (
  <section id="programme" className="relative py-28 bg-background-secondary/40 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-6 mb-14">
        <SectionLabel>L'Expérience</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
          L'éclat d'une soirée pensée
          <br />
          <span className="gradient-gold-text italic"> dans les moindres détails</span>
        </h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative rounded-3xl p-10 md:p-16 text-center border-2 border-dashed border-gold/40 bg-card/50 backdrop-blur shadow-elegant overflow-hidden">
          <div className="absolute inset-0 shimmer pointer-events-none" />
          <div className="relative flex flex-col items-center">
            {/* Hourglass */}
            <div className="w-16 h-16 mb-8 text-gold animate-spin-slow">
              <Hourglass className="w-full h-full" strokeWidth={1.2} />
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-4">
              L'excellence se dévoile par étapes
            </h3>
            <p className="font-script text-gold-light text-lg mb-8 max-w-md">
              Entre prestige et mystère, le programme complet de cette nuit d'exception vous sera révélé sous peu.
            </p>
            <span className="relative flex w-3 h-3">
              <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
              <span className="relative w-3 h-3 rounded-full bg-gold" />
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-gold text-background rounded-3xl p-7 shadow-gold-glow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">Dress Code : L'Élégance Traditionnelle</div>
              <div className="font-script font-light text-background/90">
                Honorons nos racines avec distinction et raffinement.
              </div>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-background text-gold text-sm font-medium whitespace-nowrap">
            Obligatoire
          </span>
        </div>
      </Reveal>
    </div>
  </section>
);
