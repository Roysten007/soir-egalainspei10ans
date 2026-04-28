import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloralPattern } from "@/components/FloralPattern";
import { Download, User, Users, ShieldCheck, Lock, Receipt, Trash2, Plus, Calendar, Check } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Payment {
  id: string;
  name: string;
  spots: number;
  date: string;
  amount: number;
}

const AdminTickets = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [guestName, setGuestName] = useState("");
  const [spots, setSpots] = useState(1);
  const [payments, setPayments] = useState<Payment[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Load payments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gala_payments");
    if (saved) {
      setPayments(JSON.parse(saved));
    }
  }, []);

  // Save payments to localStorage
  const savePayments = (newPayments: Payment[]) => {
    setPayments(newPayments);
    localStorage.setItem("gala_payments", JSON.stringify(newPayments));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "INSPEI2026") {
      setIsAuthenticated(true);
    } else {
      toast.error("Mot de passe incorrect");
    }
  };

  const addPayment = () => {
    if (!guestName) return;
    const newPayment: Payment = {
      id: `RECU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: guestName,
      spots: spots,
      date: new Date().toLocaleDateString('fr-FR'),
      amount: spots * 6000
    };
    savePayments([newPayment, ...payments]);
    toast.success("Paiement enregistré dans la liste");
  };

  const deletePayment = (id: string) => {
    if (confirm("Supprimer ce paiement de la liste ?")) {
      savePayments(payments.filter(p => p.id !== id));
    }
  };

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `recu-gala-${guestName.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.click();
      toast.success("Reçu téléchargé !");
    } catch (err) {
      toast.error("Erreur lors de la génération du reçu");
    }
  };

  const totalSpots = payments.reduce((acc, curr) => acc + curr.spots, 0);

  if (!isAuthenticated) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card border border-gold/20 rounded-3xl p-10 text-center shadow-elegant">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl mb-2">Espace Trésorerie</h1>
          <p className="text-foreground/60 text-sm mb-8">Accès réservé aux administrateurs du Gala.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              className="w-full bg-background border border-gold/20 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-gold transition-all text-center tracking-widest"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-gradient-gold text-background font-bold py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform">
              Accéder
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden">
        <FloralPattern />
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Dashboard Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/40 border border-gold/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Places Vendues</p>
                <p className="text-3xl font-display font-bold text-white">{totalSpots}</p>
              </div>
            </div>
            <div className="bg-card/40 border border-gold/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Total Encaissé</p>
                <p className="text-3xl font-display font-bold text-white">{(totalSpots * 6000).toLocaleString()} F</p>
              </div>
            </div>
            <div className="bg-card/40 border border-gold/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">Édition</p>
                <p className="text-2xl font-display font-bold text-white">GALA 2026</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[400px_1fr] gap-12">
            {/* Left: Generation Form */}
            <div className="space-y-8">
              <div className="bg-card/60 backdrop-blur rounded-3xl border border-gold/20 p-8 shadow-elegant">
                <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-gold" />
                  Nouveau Reçu
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2 font-bold">Nom du Client</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                      <input
                        className="w-full bg-background border border-gold/20 rounded-xl pl-12 pr-5 py-3.5 focus:border-gold focus:outline-none text-white font-medium"
                        placeholder="Prénom et Nom"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2 font-bold">Nombre de Places</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                      <input
                        type="number"
                        min={1}
                        className="w-full bg-background border border-gold/20 rounded-xl pl-12 pr-5 py-3.5 focus:border-gold focus:outline-none text-white font-medium"
                        value={spots}
                        onChange={(e) => setSpots(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                      onClick={addPayment}
                      disabled={!guestName}
                      className="bg-background border border-gold/40 text-gold font-bold py-4 rounded-xl hover:bg-gold/5 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-30"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={downloadReceipt}
                      disabled={!guestName}
                      className="bg-gradient-gold text-background font-bold py-4 rounded-xl shadow-gold-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-30"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>

              {/* Receipt Preview Area (Smaller & Cleaner) */}
              <div className="flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-4">Aperçu du reçu officiel</p>
                
                {/* The RECEIPT to capture */}
                <div 
                  ref={receiptRef}
                  className="w-full max-w-[360px] bg-white text-black p-10 flex flex-col shadow-2xl relative border-[1px] border-gray-100"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold/40" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold/40" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold/40" />

                  {/* Watermark Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
                    <div className="text-[220px] font-display font-black">I</div>
                  </div>

                  {/* Header */}
                  <div className="flex flex-col items-center text-center border-b-2 border-black/10 pb-10 mb-8 relative">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center font-display font-black text-white text-2xl mb-4 shadow-xl">
                      I
                    </div>
                    <div className="text-2xl font-display font-black tracking-tighter mb-1">INSPEI</div>
                    <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-500">GALA DU 10ème ANNIVERSAIRE</div>
                    <div className="text-[9px] text-gold font-bold mt-3 italic tracking-widest uppercase bg-black/5 px-3 py-1 rounded-full">
                      ABOMEY · BÉNIN · 2026
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-8 relative z-10">
                    <div className="text-center">
                      <div className="inline-block px-6 py-2 bg-black text-white font-bold text-[11px] uppercase tracking-[0.3em] rounded-sm shadow-sm">
                        Confirmation de Paiement
                      </div>
                      <div className="text-[10px] font-mono text-gray-400 mt-4 tracking-tighter">
                        AUTH-REF: {new Date().getFullYear()}-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 px-2">
                      <div className="flex flex-col border-l-2 border-gold/30 pl-4">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Détenteur du droit d'accès :</span>
                        <span className="text-xl font-display font-bold uppercase text-black">{guestName || "_________________"}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8 pt-2">
                        <div className="flex flex-col border-l-2 border-gold/30 pl-4">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Quantité :</span>
                          <span className="text-lg font-bold text-black">{spots} place(s)</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Date d'émission :</span>
                          <div className="text-xs font-bold text-black">{new Date().toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-10 border-t-[3px] border-black flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-3">Montant Total Réglé</span>
                      <div className="bg-black text-white px-8 py-4 rounded-2xl shadow-lg">
                        <span className="text-3xl font-display font-black tracking-tight">{(spots * 6000).toLocaleString()} F CFA</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer with Seal */}
                  <div className="mt-14 text-center relative z-10">
                    <div className="absolute right-0 -top-8 w-24 h-24 border-2 border-gold/20 rounded-full flex items-center justify-center opacity-40 -rotate-12">
                      <div className="w-20 h-20 border border-gold/20 rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-gold uppercase text-center leading-none">
                        <span>Validé</span>
                        <div className="w-10 h-[1px] bg-gold/20 my-1" />
                        <span>INSPEI</span>
                        <span>2026</span>
                      </div>
                    </div>

                    <div className="text-[9px] font-bold uppercase mb-4 text-gray-400 tracking-widest">Trésorerie Officielle INSPEI</div>
                    <div className="flex justify-center opacity-[0.08] grayscale">
                      <ShieldCheck className="w-16 h-16" />
                    </div>
                    <div className="text-[8px] text-gray-400 mt-12 italic max-w-[220px] mx-auto leading-relaxed">
                      Ce reçu est généré numériquement et constitue une preuve légale d'achat pour le Gala de l'INSPEI.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: List of payments */}
            <div className="bg-card/40 border border-gold/15 rounded-3xl overflow-hidden h-fit">
              <div className="p-6 border-b border-gold/15 flex justify-between items-center">
                <h3 className="font-display text-lg">Liste des Paiements Validés</h3>
                <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-bold">
                  {payments.length} Transaction(s)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gold/60">
                      <th className="px-6 py-4 font-bold">ID</th>
                      <th className="px-6 py-4 font-bold">Nom de l'invité</th>
                      <th className="px-6 py-4 font-bold">Places</th>
                      <th className="px-6 py-4 font-bold">Montant</th>
                      <th className="px-6 py-4 font-bold">Date</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/5">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-20 text-center text-foreground/40 italic">
                          Aucun paiement enregistré pour le moment.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-[10px] text-gold/70">{p.id}</td>
                          <td className="px-6 py-4 font-bold text-white">{p.name}</td>
                          <td className="px-6 py-4">
                            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-gold/20 text-xs">
                              {p.spots}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gold font-medium">{p.amount.toLocaleString()} F</td>
                          <td className="px-6 py-4 text-foreground/60">{p.date}</td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => deletePayment(p.id)}
                              className="text-red-400/50 hover:text-red-400 transition-colors p-2"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AdminTickets;
