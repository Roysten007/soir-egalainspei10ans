import { Link } from "react-router-dom";
import { Smartphone, Mail, Instagram, Facebook, Heart } from "lucide-react";

const socials = [
  { label: "Instagram", path: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6a4 4 0 100 8 4 4 0 000-8zm5.5-1.5a1 1 0 100 2 1 1 0 000-2z" },
  { label: "WhatsApp", path: "M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" },
  { label: "Facebook", path: "M13 22v-8h3l1-4h-4V7.5c0-1.1.5-2 2-2h2V2h-3c-3 0-5 2-5 5v3H6v4h3v8h4z" },
];

export const Footer = () => (
  <footer className="relative bg-background-deep border-t border-gold/15 overflow-hidden">
    <div className="absolute inset-0 bg-floral pointer-events-none" />
    <div className="container mx-auto relative z-10 py-16 px-6">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-display font-black text-background">
              I
            </div>
            <div>
              <div className="font-display text-xl">INSPEI</div>
              <div className="font-script italic text-gold text-sm">Soirée Gala des 10 ans</div>
            </div>
          </div>
          <p className="text-foreground/70 text-sm leading-relaxed font-script font-light">
            Une décennie d'audace, une nuit d'exception pour honorer les bâtisseurs du Bénin de demain.
          </p>
        </div>
 
        {/* Nav */}
        <div>
          <h4 className="font-display text-gold mb-4 text-lg">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {["Accueil", "Programme", "Galerie", "Sponsors", "Réservations"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l === "Réservations" ? "tickets" : l.toLowerCase()}`}
                  className="text-foreground/70 hover:text-gold transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
            <li><Link to="/sponsor" className="text-foreground/70 hover:text-gold">Devenir partenaire</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-gold mb-4 text-lg">Contact</h4>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-gold flex-shrink-0" />
              <span>+229 0191223478<br />+229 0147335455</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold flex-shrink-0" />
              <a href="mailto:ornelquenum388@gmail.com" className="hover:text-gold break-all">
                ornelquenum388@gmail.com
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gold/10 text-center text-xs text-foreground/50 flex items-center justify-center gap-1">
        © 2026 INSPEI — Soirée Gala des 10 ans · Conçu avec <Heart className="w-3 h-3 text-gold fill-gold" /> pour l'excellence
      </div>
    </div>
  </footer>
);
