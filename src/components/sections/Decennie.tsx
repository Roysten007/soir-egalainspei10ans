import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";
import { GraduationCap, Users, Award } from "lucide-react";

const stats = [
  { icon: <GraduationCap className="w-10 h-10 text-gold" />, value: "10", fr: "Ans d'Excellence" },
  { icon: <Users className="w-10 h-10 text-gold" />, value: "250+", fr: "Ingénieurs Formés" },
  { icon: <Award className="w-10 h-10 text-gold" />, value: "1", fr: "Référence Nationale" },
];

export const Decennie = () => (
  <section id="decennie" className="relative py-28 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
      <Reveal className="text-center flex flex-col items-center gap-6 mb-16">
        <SectionLabel>Héritage & Vision</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl">
          <span className="gradient-gold-text">10 ans d'audace.</span> Un héritage d'excellence.
          <br />
          <span className="font-script font-light text-foreground/85">
            Une histoire que nous écrivons ensemble.
          </span>
        </h2>
        <p className="text-foreground/75 max-w-3xl leading-relaxed text-lg">
          Depuis une décennie, l'INSPEI forge l'élite technique du Bénin avec une exigence inégalée.
          Ce Gala des 10 ans n'est pas qu'une simple commémoration ; c'est l'hommage vibrant à 
          chaque talent, chaque mentor et chaque partenaire qui propulse notre institution vers les sommets.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.fr} delay={i * 0.15}>
            <div className="group relative h-full bg-card rounded-3xl p-8 border border-gold/15 hover:border-gold/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/5 group-hover:bg-gold/15 transition-colors" />
              <div className="relative">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-display text-7xl gradient-gold-text font-black leading-none mb-3">
                  {s.value}
                </div>
                <div className="text-foreground font-medium">{s.fr}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
