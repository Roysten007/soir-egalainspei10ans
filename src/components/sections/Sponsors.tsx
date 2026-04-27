import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";

const benefits = [
  { fr: "Visibilité sur site web et réseaux sociaux", en: "Online & social media visibility" },
  { fr: "Logo sur l'affiche officielle", en: "Logo on official poster" },
  { fr: "Mentions lors de la soirée", en: "Mentions during the event" },
  { fr: "Espace de communication dédié", en: "Dedicated communication space" },
];

export const Sponsors = () => (
  <section id="sponsors" className="relative py-28 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-5 mb-12">
        <SectionLabel>Partenaires de prestige</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] leading-tight max-w-4xl">
          Votre marque au cœur d'une <span className="gradient-gold-text italic">soirée historique</span>
        </h2>
        <p className="font-script italic text-foreground/65 text-xl max-w-3xl">
          Your brand at the heart of a historic evening
        </p>
      </Reveal>

      <Reveal delay={0.15} className="text-center">
        <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4">
          Devenir partenaire du Gala des 10 ans de l'INSPEI, c'est bien plus qu'un logo sur une affiche.
          C'est associer votre image à une institution qui forme les ingénieurs qui bâtiront demain.
          Une visibilité rare, devant une audience de décideurs, de parents et d'étudiants brillants —
          les leaders de demain.
        </p>
        <p className="font-script italic text-foreground/55 max-w-2xl mx-auto leading-relaxed">
          Becoming a partner of the INSPEI 10th Anniversary Gala means aligning your brand with
          excellence, ambition, and the future of engineering in Benin.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-14">
        <div className="relative bg-card rounded-3xl border-2 border-gold/40 p-8 md:p-12 shadow-elegant overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🤝</span>
              <h3 className="font-display text-2xl md:text-3xl">
                Package Partenaire
                <span className="font-script italic text-gold-light text-lg ml-3">/ Partner Package</span>
              </h3>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((b) => (
                <li key={b.fr} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center text-background mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-foreground">{b.fr}</div>
                    <div className="font-script italic text-foreground/50 text-sm">{b.en}</div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/sponsor"
              className="inline-flex items-center gap-2 bg-gradient-gold text-background font-medium px-7 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform"
            >
              Je veux sponsoriser
              <span className="font-script italic text-sm opacity-80">/ I want to sponsor</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:+2290191223478"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/30 bg-card/60 hover:border-gold hover:bg-gold/10 transition-all text-sm"
        >
          <span>📱</span>
          +229 0191223478 / 0147335455
        </a>
        <a
          href="mailto:ornelquenum388@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gold/30 bg-card/60 hover:border-gold hover:bg-gold/10 transition-all text-sm"
        >
          <span>✉️</span>
          ornelquenum388@gmail.com
        </a>
      </Reveal>
    </div>
  </section>
);
