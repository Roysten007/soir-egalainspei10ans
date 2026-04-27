import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Particles } from "./Particles";
import { FloralPattern } from "./FloralPattern";

const Bilingual = ({ fr, en }: { fr: string; en: string }) => (
  <span className="inline-flex flex-wrap items-baseline gap-2">
    <span>{fr}</span>
    <span className="font-script italic text-foreground/60 text-[0.7em]">/ {en}</span>
  </span>
);

export const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
  >
    <div className="absolute inset-0 bg-gradient-hero" />
    <FloralPattern />
    <Particles count={24} />

    {/* radial gold halo */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

    <div className="container mx-auto relative z-10 px-6 text-center flex flex-col items-center">
      {/* Logo + name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-display font-black text-background text-sm">
          I
        </div>
        <span className="text-xs sm:text-sm tracking-[0.3em] text-foreground/80 uppercase">
          Soirée Gala <span className="text-gold">|</span> Étudiants de l'INSPEI
        </span>
      </motion.div>

      {/* Coming soon badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/40 bg-background-secondary/60 backdrop-blur mb-10 shadow-gold-glow"
      >
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse-ring" />
          <span className="relative w-2.5 h-2.5 rounded-full bg-red-500" />
        </span>
        <span className="text-xs sm:text-sm font-medium tracking-[0.25em] text-gold uppercase">
          Coming Soon
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-display font-bold text-[40px] sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] max-w-5xl tracking-tight"
      >
        Une nuit pour célébrer{" "}
        <span className="gradient-gold-text italic">10 ans</span> d'excellence
      </motion.h1>

      {/* Subhead */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-script italic text-gold-light text-2xl sm:text-3xl mt-6 max-w-2xl"
      >
        La fête la plus attendue de l'année se prépare
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="font-script italic text-foreground/60 text-lg mt-3"
      >
        Restez à l'écoute — Stay tuned
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <Link
          to="/reservation"
          className="group inline-flex items-center justify-center gap-2 bg-gradient-gold text-background font-medium px-7 py-4 rounded-full shadow-gold-glow hover:scale-105 active:scale-95 transition-transform"
        >
          <span>→</span>
          <Bilingual fr="Réserver ma place" en="Reserve my spot" />
        </Link>
        <Link
          to="/sponsor"
          className="inline-flex items-center justify-center gap-2 border border-gold/50 text-foreground hover:bg-gold/10 hover:border-gold font-medium px-7 py-4 rounded-full transition-all"
        >
          <span>→</span>
          <Bilingual fr="Devenir Sponsor" en="Become a Sponsor" />
        </Link>
      </motion.div>

      {/* Info pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-3 mt-12 max-w-3xl"
      >
        {[
          { i: "👘", fr: "Tenue Traditionnelle", en: "Traditional Attire" },
          { i: "📍", fr: "Lieu à venir", en: "Venue TBA" },
          { i: "📅", fr: "Date à venir", en: "Date TBA" },
        ].map((b) => (
          <span
            key={b.fr}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-card/40 backdrop-blur text-sm"
          >
            <span>{b.i}</span>
            <span>{b.fr}</span>
            <span className="font-script italic text-foreground/50 text-xs">/ {b.en}</span>
          </span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#decennie"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce-down"
        aria-label="Scroll"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </div>
  </section>
);
