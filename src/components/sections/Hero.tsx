import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Particles } from "../Particles";
import { FloralPattern } from "../FloralPattern";
import { Shirt, MapPin, Calendar, ArrowRight } from "lucide-react";

const Bilingual = ({ fr }: { fr: string; en?: string }) => (
  <span>{fr}</span>
);

export const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    {/* Full Screen Background Image */}
    <div className="absolute inset-0 z-0">
      <img
        src="/hero-main.jpg"
        alt="Gala Background"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
    </div>

    <div className="container mx-auto relative z-10 px-6 text-center flex flex-col items-center justify-center min-h-screen">
      {/* Label style */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-xs sm:text-sm tracking-[0.4em] text-gold uppercase font-bold px-4 py-1.5 border-y border-gold/30">
          GALA INSPEI EDITION 2026 — ABOMEY, BÉNIN
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] max-w-5xl tracking-tight text-white drop-shadow-2xl"
      >
        Une décennie de prestige,
        <br />
        une nuit <span className="text-gold italic">d'exception</span>
      </motion.h1>

      {/* Subhead */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mt-8 max-w-3xl leading-relaxed font-medium"
      >
        Célébrez 10 ans d'excellence et d'ingéniosité. Une soirée pour honorer le passé et bâtir le futur de l'ingénierie.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="flex flex-col sm:flex-row gap-5 mt-12"
      >
        <Link
          to="/reservation"
          className="group inline-flex items-center justify-center gap-2 bg-gold text-black font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform text-sm sm:text-base uppercase tracking-wider shadow-gold"
        >
          Réserver ma place <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/sponsor"
          className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-bold px-10 py-5 rounded-full transition-all text-sm sm:text-base uppercase tracking-wider backdrop-blur-sm"
        >
          Devenir Sponsor
        </Link>
      </motion.div>

      {/* Info pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 flex flex-wrap justify-center gap-4"
      >
        {[
          { i: <Shirt className="w-5 h-5" />, fr: "Tenue Traditionnelle" },
          { i: <MapPin className="w-5 h-5" />, fr: "Lieu à venir" },
          { i: <Calendar className="w-5 h-5" />, fr: "Date à venir" },
        ].map((b) => (
          <span
            key={b.fr}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/40 bg-black/40 backdrop-blur-md text-sm sm:text-base text-white font-medium"
          >
            <span className="text-gold">{b.i}</span>
            <span>{b.fr}</span>
          </span>
        ))}
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold animate-bounce"
    >
      <ArrowRight className="w-6 h-6 rotate-90" />
    </motion.div>
  </section>
);
