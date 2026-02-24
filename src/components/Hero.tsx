import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroVideo from "@/assets/hero-bg.mp4";

const VIDEO_START = 2.5;

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = VIDEO_START;
    const onLoop = () => { video.currentTime = VIDEO_START; };
    video.addEventListener("seeking", () => {});
    video.addEventListener("timeupdate", () => {
      if (video.currentTime < VIDEO_START && !video.seeking) {
        video.currentTime = VIDEO_START;
      }
    });
    video.addEventListener("seeked", () => {});
    // When video loops back to 0, jump to start offset
    video.addEventListener("play", () => { if (video.currentTime < VIDEO_START) video.currentTime = VIDEO_START; });
    return () => {};
  }, []);
  return (
    <section className="relative h-screen">
      <div className="h-full flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/40" />

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

          <motion.a
            href="#projetos"
            className="mt-8 px-10 py-3.5 rounded-full border border-white/30 text-white/90 font-body font-light text-xs tracking-[0.3em] uppercase hover:border-white/60 hover:text-white transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Ver Projetos
          </motion.a>
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

        {/* Transition gradient to next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30vh] z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
