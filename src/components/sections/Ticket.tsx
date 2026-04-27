import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";

export const Ticket = () => (
  <section id="tickets" className="relative py-28 bg-background-secondary/40 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-5 mb-16">
        <SectionLabel>Rejoins la fête / Join the party</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
          Assure ta place dans <span className="gradient-gold-text italic">l'histoire</span>
        </h2>
        <p className="font-script italic text-foreground/65 text-xl">Secure your spot in history</p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="relative bg-gradient-ticket rounded-3xl shadow-elegant border border-gold/30 overflow-hidden">
          <div className="absolute inset-0 shimmer pointer-events-none" />
          <FloralPattern />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_280px]">
            {/* Main */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-display font-black text-background">
                  I
                </div>
                <div>
                  <div className="text-xs tracking-[0.25em] text-gold uppercase">INSPEI</div>
                  <div className="font-script italic text-foreground/70 text-sm">Soirée Gala 10 ans</div>
                </div>
              </div>

              <h3 className="font-display text-3xl md:text-4xl mb-3 leading-tight">
                Soirée Gala
                <br />
                <span className="gradient-gold-text">Des 10 ans de l'INSPEI</span>
              </h3>

              <div className="flex flex-wrap gap-2 mt-6 mb-8">
                <span className="text-xs px-3 py-1.5 rounded-full border border-gold/30 bg-background/30">👘 Tenue Traditionnelle</span>
                <span className="text-xs px-3 py-1.5 rounded-full border border-gold/30 bg-background/30">📍 Lieu TBA</span>
                <span className="text-xs px-3 py-1.5 rounded-full border border-gold/30 bg-background/30">📅 Date TBA</span>
              </div>

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-gold text-background shadow-gold-glow">
                <span className="text-xs uppercase tracking-widest">Prix / Price</span>
                <span className="font-display font-bold">Bientôt disponible</span>
              </div>

              <div className="mt-8">
                <Link
                  to="/reservation"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-background font-medium px-7 py-3.5 rounded-full shadow-gold-glow hover:scale-105 transition-transform"
                >
                  Je réserve ma place
                  <span className="font-script italic text-xs opacity-80">/ Reserve my spot</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Dashed divider */}
            <div className="hidden md:flex items-stretch px-2 relative">
              <div className="w-px h-full border-l-2 border-dashed border-gold/40" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background-secondary" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background-secondary" />
            </div>
            <div className="md:hidden h-px border-t-2 border-dashed border-gold/40 mx-8" />

            {/* Stub */}
            <div className="p-8 flex flex-col items-center justify-center gap-4 bg-background-deep/30">
              <div className="text-xs tracking-[0.25em] text-gold uppercase">Admit One</div>
              <div className="w-32 h-32 rounded-2xl bg-foreground p-2 grid grid-cols-8 grid-rows-8 gap-px">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.45 ? "bg-background" : "bg-foreground"} rounded-[1px]`}
                  />
                ))}
              </div>
              <div className="text-center">
                <div className="font-display text-2xl gradient-gold-text font-bold">1 Place</div>
                <div className="font-script italic text-xs text-foreground/60">One Spot</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
