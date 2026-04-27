import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";

export const Galerie = () => (
  <section id="galerie" className="relative py-28 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
      <Reveal className="text-center flex flex-col items-center gap-5 mb-14">
        <SectionLabel>Ils étaient là / They were there</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
          La dernière fois, c'était <span className="gradient-gold-text italic">mémorable</span>
        </h2>
        <p className="font-script italic text-foreground/65 text-xl">The last time was unforgettable</p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 [grid-auto-rows:160px] md:[grid-auto-rows:200px]">
        {[
          "row-span-2",
          "",
          "",
          "",
          "row-span-2",
          "",
        ].map((span, i) => (
          <Reveal key={i} delay={i * 0.08} className={`${span}`}>
            <div className="group relative h-full w-full bg-card rounded-3xl border border-gold/15 hover:border-gold/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-gold overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-foreground/40 group-hover:text-gold transition-colors">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="mt-2 text-xs font-script italic">Photo à venir</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4} className="text-center mt-12">
        <button className="inline-flex items-center gap-2 border border-gold/50 text-gold hover:bg-gold hover:text-background font-medium px-7 py-3.5 rounded-full transition-all">
          Voir toute la galerie
          <span className="font-script italic text-sm opacity-70">/ View full gallery</span>
        </button>
      </Reveal>
    </div>
  </section>
);
