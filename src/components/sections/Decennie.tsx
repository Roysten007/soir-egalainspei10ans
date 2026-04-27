import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";

const stats = [
  { icon: "🎓", value: "10", fr: "Années d'excellence", en: "Years of excellence" },
  { icon: "👨‍🎓", value: "+", fr: "Promotions formées", en: "Cohorts trained" },
  { icon: "🌍", value: "1", fr: "Institution, une fierté nationale", en: "A national pride" },
];

export const Decennie = () => (
  <section id="decennie" className="relative py-28 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
      <Reveal className="text-center flex flex-col items-center gap-6 mb-16">
        <SectionLabel>Une décennie d'excellence</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl">
          <span className="gradient-gold-text">10 ans.</span> Des centaines d'ingénieurs formés.
          <br />
          <span className="font-script italic text-foreground/85">
            Une histoire qui mérite d'être célébrée.
          </span>
        </h2>
        <p className="text-foreground/75 max-w-3xl leading-relaxed text-lg">
          Depuis 10 ans, l'INSPEI forge les futurs ingénieurs du Bénin avec rigueur et passion.
          Ce soir, nous ne faisons pas que fêter une date — nous célébrons chaque étudiant, chaque
          professeur, chaque famille qui a cru en cette institution d'excellence.
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
                <div className="font-script italic text-foreground/50 text-sm mt-1">{s.en}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
