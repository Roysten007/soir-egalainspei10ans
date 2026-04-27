import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Decennie } from "@/components/sections/Decennie";
import { Programme } from "@/components/sections/Programme";
import { Galerie } from "@/components/sections/Galerie";
import { Ticket } from "@/components/sections/Ticket";
import { Sponsors } from "@/components/sections/Sponsors";

const Index = () => {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <Decennie />
      <Programme />
      <Galerie />
      <Ticket />
      <Sponsors />
      <Footer />
    </main>
  );
};

export default Index;
