import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Accueil", href: "#hero" },
  { label: "Programme", href: "#programme" },
  { label: "Galerie", href: "#galerie" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Réservations", href: "#tickets" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setOpen(false);
    if (!isHome) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-gold/15 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center font-display font-black text-background shadow-gold-glow group-hover:scale-105 transition-transform">
            I
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-pulse-ring" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg text-foreground tracking-wide">INSPEI</span>
            <span className="font-script italic text-[11px] text-gold -mt-1">Gala 10 ans</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleAnchor(l.href)}
              className="px-4 py-2 rounded-full text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <Link
            to="/reservation"
            className="hidden md:inline-flex items-center gap-2 bg-gradient-gold text-background font-medium text-sm px-5 py-2.5 rounded-full shadow-gold-glow hover:scale-105 active:scale-95 transition-transform"
          >
            Réserver ma place
          </Link>

          {/* Hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-11 h-11 rounded-full bg-card border border-gold/20 flex items-center justify-center text-gold transition-all active:scale-90"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-background-secondary/95 backdrop-blur-xl border-t border-gold/15"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleAnchor(l.href)}
                  className="text-left px-4 py-3 rounded-2xl text-foreground/90 hover:bg-gold/10 hover:text-gold transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link
                to="/reservation"
                onClick={() => setOpen(false)}
                className="mt-3 text-center bg-gradient-gold text-background font-medium px-5 py-3 rounded-full"
              >
                Réserver ma place
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay when menu is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[inherit] z-[-1] bg-black/60 backdrop-blur-sm lg:hidden h-screen"
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};
