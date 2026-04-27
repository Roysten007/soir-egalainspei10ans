import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloralPattern } from "@/components/FloralPattern";

const schema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(80),
  company: z.string().trim().min(2, "Entreprise requise").max(100),
  phone: z.string().trim().min(6, "Téléphone requis").max(20),
  email: z.string().trim().email("Email invalide").max(200),
  message: z.string().trim().max(1000).optional(),
});

const inputCls =
  "w-full bg-card border border-gold/20 rounded-2xl px-5 py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all";

const Sponsor = () => {
  const [data, setData] = useState({ fullName: "", company: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const eMap: Record<string, string> = {};
      r.error.issues.forEach((i) => (eMap[i.path[0] as string] = i.message));
      setErrors(eMap);
      return;
    }
    setErrors({});
    setDone(true);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloralPattern />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold mb-8 transition-colors"
          >
            <span>←</span> Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-5xl mb-3">
              Devenez <span className="gradient-gold-text italic">Partenaire</span>
            </h1>
            <p className="font-script italic text-foreground/65 text-xl">Become a Partner</p>
          </motion.div>

          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="text-foreground/80 leading-relaxed">
              Devenir partenaire du Gala des 10 ans de l'INSPEI, c'est associer votre image à une
              institution qui forme les ingénieurs qui bâtiront demain.
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur rounded-3xl border border-gold/20 p-6 md:p-10 shadow-elegant">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  className="space-y-5"
                >
                  {[
                    { k: "fullName", label: "Nom complet", hint: "Full name", type: "text" },
                    { k: "company", label: "Entreprise", hint: "Company", type: "text" },
                    { k: "phone", label: "Téléphone / WhatsApp", hint: "Phone", type: "tel" },
                    { k: "email", label: "Email", hint: "Email", type: "email" },
                  ].map((f) => (
                    <label key={f.k} className="block">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm font-medium">
                          {f.label}
                          <span className="ml-2 font-script italic text-foreground/50 text-xs">/ {f.hint}</span>
                        </span>
                        {errors[f.k] && <span className="text-destructive text-xs">{errors[f.k]}</span>}
                      </div>
                      <input
                        type={f.type}
                        className={inputCls}
                        value={(data as any)[f.k]}
                        onChange={(e) => setData({ ...data, [f.k]: e.target.value })}
                      />
                    </label>
                  ))}

                  <label className="block">
                    <div className="mb-2 text-sm font-medium">
                      Message libre
                      <span className="ml-2 font-script italic text-foreground/50 text-xs">/ Free message</span>
                    </div>
                    <textarea
                      rows={5}
                      className={inputCls + " resize-none"}
                      value={data.message}
                      onChange={(e) => setData({ ...data, message: e.target.value })}
                      placeholder="Parlez-nous de votre entreprise et de votre intérêt..."
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-gradient-gold text-background font-medium px-6 py-4 rounded-full shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    Envoyer ma candidature
                    <span className="font-script italic text-sm opacity-80 ml-2">/ Submit my application</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-28 h-28 rounded-full bg-gradient-gold mx-auto mb-6 flex items-center justify-center shadow-gold-glow"
                  >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="hsl(0 100% 5%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display text-3xl mb-2">
                    🤝 Merci de votre <span className="gradient-gold-text">intérêt !</span>
                  </h2>
                  <p className="font-script italic text-gold-light text-lg mb-4">
                    Thank you for your interest!
                  </p>
                  <p className="text-foreground/70 max-w-md mx-auto mb-8">
                    Notre équipe vous contactera très prochainement.
                    <br />
                    <span className="font-script italic text-foreground/55">Our team will reach out soon.</span>
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-gradient-gold text-background font-medium px-7 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform"
                  >
                    ← Retour à l'accueil
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Sponsor;
