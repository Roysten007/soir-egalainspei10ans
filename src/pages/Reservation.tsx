import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloralPattern } from "@/components/FloralPattern";

const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide").max(200),
  whatsapp: z.string().trim().min(6, "Numéro requis").max(20),
  spots: z.number().min(1, "Min. 1 place").max(20),
});

const allowedFile = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

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

const Confetti = () => (
  <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <span
        key={i}
        className="absolute top-0 w-2 h-3 animate-confetti"
        style={{
          left: `${Math.random() * 100}%`,
          background: i % 2 ? "hsl(41 100% 50%)" : "hsl(41 100% 70%)",
          animationDelay: `${Math.random() * 0.6}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
          borderRadius: "2px",
        }}
      />
    ))}
  </div>
);

const Reservation = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ fullName: "", email: "", whatsapp: "", spots: 1 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);

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

  const submit = () => {
    if (!file) {
      toast.error("Veuillez uploader votre reçu");
      return;
    }
    if (!allowedFile.includes(file.type)) {
      toast.error("Format invalide (JPG, PNG ou PDF uniquement)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 5MB)");
      return;
    }
    setStep(3);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
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
              Réserve ta <span className="gradient-gold-text italic">place</span>
            </h1>
            <p className="font-script italic text-foreground/65 text-xl">Reserve your spot</p>
          </motion.div>

          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between mb-3 text-xs font-medium tracking-widest uppercase text-foreground/60">
              <span className={step >= 1 ? "text-gold" : ""}>Identité</span>
              <span className={step >= 2 ? "text-gold" : ""}>Paiement</span>
              <span className={step >= 3 ? "text-gold" : ""}>Confirmation</span>
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
                  <h2 className="font-display text-2xl mb-2">Identité <span className="font-script italic text-gold-light text-lg">/ Identity</span></h2>
                  <Field label="Nom complet" hint="Full name" error={errors.fullName}>
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
                  <Field label="Numéro WhatsApp" hint="WhatsApp number" error={errors.whatsapp}>
                    <input
                      type="tel"
                      className={inputCls}
                      value={data.whatsapp}
                      onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                      placeholder="+229 ..."
                    />
                  </Field>
                  <Field label="Nombre de places" hint="Number of spots" error={errors.spots}>
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
                    className="w-full bg-gradient-gold text-background font-medium px-6 py-4 rounded-full shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    Suivant <span className="font-script italic text-sm opacity-80">/ Next</span> →
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
                  <h2 className="font-display text-2xl">Paiement <span className="font-script italic text-gold-light text-lg">/ Payment</span></h2>

                  <div className="rounded-2xl border border-gold/20 bg-background-secondary/60 p-5">
                    <div className="text-xs uppercase tracking-widest text-gold mb-3">Récapitulatif</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <span className="text-foreground/60">Nom</span><span>{data.fullName}</span>
                      <span className="text-foreground/60">Places</span><span>{data.spots}</span>
                      <span className="text-foreground/60">Prix</span>
                      <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold text-xs w-fit">TBA / Coming soon</span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Effectuez votre paiement via Mobile Money au numéro ci-dessous, puis uploadez votre reçu.
                  </p>

                  <div className="rounded-2xl border-2 border-gold/40 bg-gold/5 p-5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gold">Mobile Money</div>
                        <div className="font-display text-lg">+229 0191223478 / 0147335455</div>
                      </div>
                    </div>
                  </div>

                  <label
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={onDrop}
                    className={`block rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                      drag ? "border-gold bg-gold/10" : "border-gold/40 hover:border-gold/70 hover:bg-gold/5"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <div className="text-3xl mb-2">📎</div>
                    <div className="font-medium">
                      {file ? file.name : "Uploader votre reçu de paiement"}
                    </div>
                    <div className="font-script italic text-foreground/50 text-sm mt-1">
                      Upload payment receipt (JPG, PNG, PDF — max 5MB)
                    </div>
                  </label>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-full border border-gold/30 text-foreground hover:bg-gold/5 transition-colors"
                    >
                      ← Retour
                    </button>
                    <button
                      onClick={submit}
                      className="flex-1 bg-gradient-gold text-background font-medium px-6 py-4 rounded-full shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                      Soumettre <span className="font-script italic text-sm opacity-80">/ Submit</span>
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
                  <Confetti />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative w-28 h-28 rounded-full bg-gradient-gold mx-auto mb-6 flex items-center justify-center shadow-gold-glow"
                  >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="hsl(0 100% 5%)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display text-3xl md:text-4xl mb-2">
                    🎉 Votre réservation est <span className="gradient-gold-text">enregistrée !</span>
                  </h2>
                  <p className="font-script italic text-gold-light text-lg mb-4">
                    Your reservation has been recorded!
                  </p>
                  <p className="text-foreground/70 max-w-md mx-auto mb-8">
                    Nous vous contacterons via WhatsApp pour confirmer.
                    <br />
                    <span className="font-script italic text-foreground/55">We'll contact you via WhatsApp to confirm.</span>
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

export default Reservation;
