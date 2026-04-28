import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloralPattern } from "@/components/FloralPattern";
import { ArrowLeft, PartyPopper, Check, Info, Smartphone } from "lucide-react";

const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide").max(200),
  whatsapp: z.string().trim().min(6, "Numéro requis").max(20),
  spots: z.number().min(1, "Min. 1 place").max(20),
});

const Field = ({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <div className="mb-2 flex items-baseline justify-between">
      <span className="text-sm font-medium text-foreground">
        {label}
        {hint && <span className="ml-2 font-script italic text-foreground/50 text-xs">/ {hint}</span>}
      </span>
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
    {children}
  </label>
);

const inputCls =
  "w-full bg-card border border-gold/20 rounded-2xl px-5 py-3.5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all";

const Reservation = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ fullName: "", email: "", whatsapp: "", spots: 1 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const PRICE_PER_SPOT = 6000;
  const totalAmount = data.spots * PRICE_PER_SPOT;
  
  // NUMÉRO WHATSAPP DE L'ORGANISATEUR
  const ADMIN_WHATSAPP = "2290191223478"; 

  const next = () => {
    const r = step1Schema.safeParse(data);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => (e[i.path[0] as string] = i.message));
      setErrors(e);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleWhatsAppRedirection = () => {
    const message = `Bonjour ! Je souhaite réserver mes places pour le Gala INSPEI 2026.
    
📌 *Détails de ma réservation :*
- *Nom complet :* ${data.fullName}
- *Email :* ${data.email}
- *Nombre de places :* ${data.spots}
- *Montant total :* ${totalAmount} F CFA

Merci de m'indiquer la procédure pour le paiement Mobile Money.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setStep(3); // On passe à la confirmation après l'ouverture de WhatsApp
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
              Réservez votre <span className="gradient-gold-text italic">invitation</span>
            </h1>
            <p className="font-script font-medium text-foreground/65 text-xl">L'excellence vous attend</p>
          </motion.div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-3 text-xs font-medium tracking-widest uppercase text-foreground/60">
              <span className={step >= 1 ? "text-gold" : ""}>Identité</span>
              <span className={step >= 2 ? "text-gold" : ""}>Validation</span>
              <span className={step >= 3 ? "text-gold" : ""}>Fin</span>
            </div>
            <div className="h-2 rounded-full bg-card overflow-hidden">
              <motion.div
                className="h-full bg-gradient-gold rounded-full"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="bg-card/60 backdrop-blur rounded-3xl border border-gold/20 p-6 md:p-10 shadow-elegant">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-5"
                >
                  <h2 className="font-display text-2xl mb-2">Vos Informations</h2>
                  <Field label="Nom complet" error={errors.fullName}>
                    <input
                      className={inputCls}
                      value={data.fullName}
                      onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      className={inputCls}
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="vous@exemple.com"
                    />
                  </Field>
                  <Field label="Numéro WhatsApp" error={errors.whatsapp}>
                    <input
                      type="tel"
                      className={inputCls}
                      value={data.whatsapp}
                      onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                      placeholder="+229 ..."
                    />
                  </Field>
                  <Field label="Nombre de places" error={errors.spots}>
                    <input
                      type="number"
                      min={1}
                      className={inputCls}
                      value={data.spots}
                      onChange={(e) => setData({ ...data, spots: Number(e.target.value) })}
                    />
                  </Field>
                  <button
                    onClick={next}
                    className="w-full bg-gradient-gold text-background font-bold px-6 py-4 rounded-full shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                  >
                    Vérifier ma commande <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl">Résumé de votre demande</h2>

                  <div className="rounded-2xl border border-gold/20 bg-background-secondary/60 p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold mb-6">
                      <Info className="w-3.5 h-3.5" />
                      Détails de la réservation
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-gold/10 pb-2">
                        <span className="text-foreground/60">Client</span>
                        <span className="font-medium text-white">{data.fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold/10 pb-2">
                        <span className="text-foreground/60">Places</span>
                        <span className="font-medium text-white">{data.spots} x {PRICE_PER_SPOT} F</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-lg font-display text-gold">Total à payer</span>
                        <span className="text-2xl font-display font-bold text-white">{totalAmount} F CFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gold/5 border border-gold/30 p-6 flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Paiement Mobile Money</p>
                      <p className="text-xs text-foreground/70 leading-relaxed">
                        En cliquant sur le bouton ci-dessous, vous allez être redirigé vers <strong>WhatsApp</strong> pour finaliser votre paiement avec l'organisateur. C'est simple, rapide et sans frais supplémentaires.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleWhatsAppRedirection}
                      className="w-full bg-[#25D366] text-white font-bold px-8 py-5 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-2.203 0-4.004 1.812-4.004 4.012 0 .826.26 1.593.71 2.222l-1.129 3.456 3.512-1.112a4.023 4.023 0 001.911.48c2.203 0 4.004-1.812 4.004-4.012s-1.801-4.012-4.004-4.012zm5.451 5.73c-.147.251-.85.801-1.147.94-.3.138-.59.223-.88.138s-.86-.251-1.39-.51c-.53-.258-1.002-.562-1.38-.94-.378-.378-.621-.714-.801-1.002-.18-.288-.135-.555-.045-.81.09-.255.33-.51.48-.69.15-.18.195-.315.3-.525.105-.21.045-.42-.015-.63-.06-.21-.525-1.26-.72-1.74-.195-.48-.39-.405-.57-.405s-.375-.015-.57-.015-.51.075-.78.375c-.27.3-.1.1.1.1" />
                        <path d="M17.472 14.382c-.297.147-.85.801-1.147.94-.3.138-.59.223-.88.138s-.86-.251-1.39-.51c-.53-.258-1.002-.562-1.38-.94-.378-.378-.621-.714-.801-1.002-.18-.288-.135-.555-.045-.81.09-.255.33-.51.48-.69.15-.18.195-.315.3-.525.105-.21.045-.42-.015-.63-.06-.21-.525-1.26-.72-1.74-.195-.48-.39-.405-.57-.405s-.375-.015-.57-.015-.51.075-.78.375c-.27.3-1.035 1.005-1.035 2.445s1.02 2.835 1.17 3.03c.15.195 2.01 3.06 4.86 4.29.675.285 1.2.45 1.62.585.675.21 1.29.18 1.785.105.54-.09 1.62-.66 1.845-1.305.225-.645.225-1.185.15-1.305-.075-.12-.27-.195-.57-.345z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.55 4.12 1.515 5.861L0 24l6.337-1.463C8.06 23.45 10.027 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.717-.506-5.286-1.463l-.375-.221-3.738.863.882-3.619-.24-.401C2.106 15.698 1.5 13.89 1.5 12c0-5.79 4.71-10.5 10.5-10.5S22.5 6.21 22.5 12 17.79 22 12 22z" />
                      </svg>
                      Confirmer via WhatsApp
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full px-6 py-4 rounded-full border border-gold/30 text-foreground/70 hover:text-foreground hover:bg-gold/5 transition-colors text-sm"
                    >
                      Modifier mes informations
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative text-center py-8"
                >
                  <div className="relative w-28 h-28 rounded-full bg-gradient-gold mx-auto mb-8 flex items-center justify-center shadow-gold-glow">
                    <Check className="w-12 h-12 text-background" strokeWidth={3} />
                  </div>
                  <div className="flex justify-center gap-2 mb-6">
                    <PartyPopper className="w-6 h-6 text-gold" />
                    <h2 className="font-display text-3xl md:text-4xl">
                      Presque <span className="gradient-gold-text">terminé !</span>
                    </h2>
                    <PartyPopper className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-foreground/70 max-w-md mx-auto mb-8">
                    Votre message a été envoyé. L'organisateur vous répondra très vite pour valider votre paiement et vous envoyer votre billet.
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

export default Reservation;
