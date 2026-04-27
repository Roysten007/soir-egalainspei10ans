import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";

export const Programme = () => (
  <section id="programme" className="relative py-28 bg-background-secondary/40 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-6 mb-14">
        <SectionLabel>Au programme</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
          Une soirée pensée dans les
          <span className="gradient-gold-text italic"> moindres détails</span>
        </h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative rounded-3xl p-10 md:p-16 text-center border-2 border-dashed border-gold/40 bg-card/50 backdrop-blur shadow-elegant overflow-hidden">
          <div className="absolute inset-0 shimmer pointer-events-none" />
          <div className="relative flex flex-col items-center">
            {/* Hourglass */}
            <div className="w-20 h-20 mb-6 text-gold animate-spin-slow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2h14M5 22h14M6 2v4a6 6 0 0012 0V2M6 22v-4a6 6 0 0112 0v4" />
              </svg>
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              Le programme complet sera dévoilé très bientôt
            </h3>
            <p className="font-script italic text-gold-light text-lg mb-6">
              Programme coming soon — Stay tuned
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
            <div className="text-4xl">👘</div>
            <div>
              <div className="font-display text-xl font-bold">Code Vestimentaire : Tenue Traditionnelle</div>
              <div className="font-script italic text-background/80">
                Traditional attire required — celebrate your roots
              </div>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-background text-gold text-sm font-medium whitespace-nowrap">
            Obligatoire / Required
          </span>
        </div>
      </Reveal>
    </div>
  </section>
);
