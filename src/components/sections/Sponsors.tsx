import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";
import { Handshake, Check, ArrowRight, Phone, Mail } from "lucide-react";

const benefits = [
  { fr: "Visibilité sur site web et réseaux sociaux" },
  { fr: "Logo sur l'affiche officielle" },
  { fr: "Mentions lors de la soirée" },
  { fr: "Espace de communication dédié" },
];

export const Sponsors = () => (
  <section id="sponsors" className="relative py-28 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-5 mb-12">
        <SectionLabel>Partenariats de Prestige</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] leading-tight max-w-4xl">
          Associez votre image à <span className="gradient-gold-text italic">l'excellence de demain</span>
        </h2>
        <p className="font-script text-foreground/65 text-xl max-w-3xl">
          Élevez votre marque au cœur d'une célébration historique
        </p>
      </Reveal>

        <p className="text-foreground/80 max-w-3xl mx-auto leading-relaxed text-center mb-6">
          Devenir partenaire du Gala des 10 ans de l'INSPEI, c'est affirmer votre leadership auprès de l'élite technique béninoise. 
          Offrez à votre marque une visibilité stratégique devant une audience exclusive de décideurs, 
          de leaders d'opinion et de futurs ingénieurs d'exception.
        </p>

      <Reveal delay={0.3} className="mt-14">
        <div className="relative bg-card rounded-3xl border-2 border-gold/40 p-8 md:p-12 shadow-elegant overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl">
                Package Partenaire
              </h3>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((b) => (
                <li key={b.fr} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center text-background mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <div className="text-foreground">{b.fr}</div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/sponsor"
              className="inline-flex items-center gap-2 bg-gradient-gold text-background font-medium px-7 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform"
            >
              <ArrowRight className="w-4 h-4" />
              Je veux sponsoriser
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.4} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:+2290191223478"
          className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full border border-gold/30 bg-card/60 hover:border-gold hover:bg-gold/10 transition-all text-sm group overflow-hidden"
        >
          <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="truncate">+229 0191223478 / 0147335455</span>
        </a>
        <a
          href="mailto:ornelquenum388@gmail.com"
          className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full border border-gold/30 bg-card/60 hover:border-gold hover:bg-gold/10 transition-all text-sm group overflow-hidden"
        >
          <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="truncate">ornelquenum388@gmail.com</span>
        </a>
      </Reveal>
    </div>
  </section>
);
