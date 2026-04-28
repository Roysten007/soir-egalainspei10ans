import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";
import { Shirt, MapPin, Calendar, ArrowRight, Ticket as TicketIcon, Check } from "lucide-react";
import { motion } from "framer-motion";

export const Ticket = () => (
  <section id="tickets" className="relative py-28 bg-background-secondary/40 overflow-hidden">
    <FloralPattern />
    <div className="container mx-auto px-6 relative z-10 max-w-5xl">
      <Reveal className="text-center flex flex-col items-center gap-5 mb-12 px-2">
        <SectionLabel>Réservation Exclusive</SectionLabel>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl">
          Marquez votre présence dans <span className="gradient-gold-text italic">l'histoire</span>
        </h2>
        <p className="font-script text-foreground/65 text-lg md:text-xl">Saisissez votre invitation pour la nuit de la décennie</p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="relative bg-card rounded-3xl p-8 md:p-12 border-2 border-gold/40 shadow-elegant overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <TicketIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white">
                Billet d'Invitation
              </h3>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-10">
              {[
                "Accès complet à la soirée",
                "Dîner gastronomique inclus",
                "Cocktail de bienvenue",
                "Placement en zone prestige",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center text-background mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <div className="text-foreground/90 font-medium">{benefit}</div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6 mt-10">
              <Link
                to="/reservation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-gold text-background font-bold px-8 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-transform order-2 sm:order-1 text-sm"
              >
                <ArrowRight className="w-4 h-4" />
                Réserver ma place
              </Link>
              
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0 order-1 sm:order-2">
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">Tarif Unique</span>
                <span className="font-display text-3xl font-bold text-white leading-none sm:mt-2">6000 F</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
