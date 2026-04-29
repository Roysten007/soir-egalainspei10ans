import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloralPattern } from "@/components/FloralPattern";
import { ArrowLeft, Handshake, Check, Send } from "lucide-react";

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

  const ADMIN_WHATSAPP = "2290191223478";

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
    
    // Redirection WhatsApp
    const message = `Bonjour ! Je souhaite devenir partenaire du Gala INSPEI 2026.

📌 *Détails de ma proposition :*
- *Nom complet :* ${data.fullName}
- *Entreprise :* ${data.company}
- *Téléphone :* ${data.phone}
- *Email :* ${data.email}
- *Message :* ${data.message || "Pas de message supplémentaire"}

Merci de me recontacter pour discuter des modalités de partenariat.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
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
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight">
              Devenez <span className="gradient-gold-text italic">Partenaire</span>
            </h1>
            <p className="font-script font-medium text-foreground/65 text-xl">Soutenez l'élite, bâtissez l'avenir</p>
          </motion.div>

          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-relaxed text-lg">
              Devenir partenaire du Gala des 10 ans de l'INSPEI, c'est associer votre prestige à une institution 
              d'excellence qui forge les leaders technologiques de demain au Bénin.
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
                    { k: "fullName", label: "Nom complet", type: "text" },
                    { k: "company", label: "Entreprise", type: "text" },
                    { k: "phone", label: "Téléphone / WhatsApp", type: "tel" },
                    { k: "email", label: "Email", type: "email" },
                  ].map((f) => (
                    <label key={f.k} className="block">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-sm font-medium">
                          {f.label}
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
                    </div>
                    <textarea
                      rows={5}
                      className={inputCls + " resize-none"}
                      value={data.message}
                      onChange={(e) => setData({ ...data, message: e.target.value })}
                      placeholder="Décrivez votre vision pour ce partenariat..."
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-gradient-gold text-background font-medium px-6 py-4 rounded-full shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Soumettre ma proposition de partenariat
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
                    className="w-28 h-28 rounded-full bg-gradient-gold mx-auto mb-8 flex items-center justify-center shadow-gold-glow"
                  >
                    <Handshake className="w-12 h-12 text-background" />
                  </motion.div>
                  <h2 className="font-display text-3xl mb-2">
                    Merci de votre <span className="gradient-gold-text">intérêt !</span>
                  </h2>
                  <p className="font-script italic text-gold-light text-lg mb-4">
                    Merci pour votre confiance.
                  </p>
                  <p className="text-foreground/70 max-w-md mx-auto mb-8">
                    Notre équipe vous contactera très prochainement pour discuter du partenariat.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-gradient-gold text-background font-medium px-7 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'accueil
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
