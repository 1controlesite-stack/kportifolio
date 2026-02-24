import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedShapes from "./AnimatedShapes";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <AnimatedShapes />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Kenkya logo"
          className="w-24 h-24 md:w-32 md:h-32"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Kenkya
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-md text-center font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Design & Desenvolvimento Web — Experiências digitais memoráveis.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#projetos"
          className="mt-4 px-8 py-3 rounded-full gradient-bg text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Ver Projetos
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <ChevronDown className="w-6 h-6 animate-scroll-hint" />
      </motion.div>
    </section>
  );
};

export default Hero;
