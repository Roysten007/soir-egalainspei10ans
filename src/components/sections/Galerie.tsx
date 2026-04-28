import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { SectionLabel } from "../Reveal";
import { FloralPattern } from "../FloralPattern";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Galerie = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 }
    }
  });

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    setTotal(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000);
    return () => {
      clearInterval(intervalId);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const images = [
    { src: "/gallery/gal-1.jpg", alt: "Couple sur tapis rouge" },
    { src: "/gallery/gal-2.jpg", alt: "Discours sur scène" },
    { src: "/gallery/gal-3.jpg", alt: "Photo souvenir prestige" },
    { src: "/gallery/gal-4.jpg", alt: "Invités d'honneur" },
    { src: "/gallery/gal-5.jpg", alt: "Buffet gastronomique" },
    { src: "/gallery/gal-6.jpg", alt: "Remise de certificat" },
    { src: "/gallery/gal-7.jpg", alt: "Présentation" },
    { src: "/gallery/gal-8.jpg", alt: "Couronnement" },
    { src: "/gallery/gal-9.jpg", alt: "Dégustation" },
    { src: "/gallery/gal-10.jpg", alt: "Danse" },
    { src: "/gallery/gal-11.jpg", alt: "Performance chant" },
    { src: "/gallery/gal-12.jpg", alt: "Duo prestige" },
    { src: "/gallery/gal-13.jpg", alt: "Groupe musical" },
    { src: "/gallery/gal-14.jpg", alt: "Portrait invité" },
    { src: "/gallery/gal-15.jpg", alt: "Style urbain" },
    { src: "/gallery/gal-16.jpg", alt: "Tenue bleue" },
    { src: "/gallery/gal-17.jpg", alt: "Tradition blanc" },
    { src: "/gallery/gal-18.jpg", alt: "Couple assorti" },
    { src: "/gallery/gal-19.jpg", alt: "Couple tapis rouge" },
    { src: "/gallery/gal-20.jpg", alt: "Entrée en scène" },
    { src: "/gallery/gal-21.jpg", alt: "Duo de danseurs" },
    { src: "/gallery/gal-22.jpg", alt: "Performance sur scène" },
    { src: "/gallery/gal-23.jpg", alt: "Groupe d'amis" },
    { src: "/gallery/gal-24.jpg", alt: "Trio prestige" },
    { src: "/gallery/gal-25.jpg", alt: "Portrait élégance" },
    { src: "/gallery/gal-26.jpg", alt: "Chanteur en action" },
    { src: "/gallery/gal-27.jpg", alt: "Chanteuse passion" },
  ];

  return (
    <section id="galerie" className="relative py-28 overflow-hidden">
      <FloralPattern />
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center flex flex-col items-center gap-5 mb-14">
          <SectionLabel>Édition Précédente</SectionLabel>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
          >
            Souvenirs de <span className="gradient-gold-text italic">l'année 2025</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-3xl mx-auto mt-4 leading-relaxed text-lg md:text-xl font-medium"
          >
            Revivez les moments forts de l'édition précédente. Chaque image capture l'élégance et l'excellence qui ont marqué notre Gala 2025.
          </motion.p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {images.map((img, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6">
                  <div className="relative aspect-[4/5] bg-card rounded-3xl border border-gold/15 hover:border-gold/60 transition-all duration-500 overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      width={400}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow buttons — always visible */}
          <button
            onClick={scrollPrev}
            aria-label="Image précédente"
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/70 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all z-20 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Image suivante"
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/70 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all z-20 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Simple counter instead of 27 dots */}
        <div className="text-center mt-8 text-sm text-gold/70 font-medium">
          {current + 1} / {total || images.length}
        </div>
      </div>
    </section>
  );
};
