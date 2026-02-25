import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import NetworkParticles from "./NetworkParticles";

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div className="h-full flex items-center justify-center overflow-hidden">
        {/* Particle background */}
        <NetworkParticles />

        {/* Tech frame */}
        <motion.div
          className="absolute inset-6 md:inset-10 z-[2] pointer-events-none border border-white/10 rounded-sm"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-[hsl(var(--kenkya-purple))]" />
          <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-[hsl(var(--kenkya-cyan))]" />
          <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-[hsl(var(--kenkya-cyan))]" />
          <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-[hsl(var(--kenkya-purple))]" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={logo}
            alt="Kenkya logo"
            className="w-14 h-14 md:w-20 md:h-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />

          <motion.p
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/70 font-body font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Design & Desenvolvimento Web
          </motion.p>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-light text-white leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            aria-label="Kenkya"
          >
            Kenkya
          </motion.h1>

          <motion.button
            onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 px-10 py-3.5 rounded-full border border-white/30 text-white/90 font-body font-light text-xs tracking-[0.3em] uppercase hover:border-white/60 hover:text-white transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Ver Projetos
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <ChevronDown className="w-6 h-6 animate-scroll-hint" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
