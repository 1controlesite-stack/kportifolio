import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroVideo from "@/assets/hero-bg.mp4";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background: zoom in + fade out on scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Content: parallax up faster
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Sync video currentTime to scroll
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = v * video.duration;
    }
  });

  // Letter-by-letter reveal for "Kenkya"
  const title = "Kenkya";

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* GIF Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay for WCAG AA contrast */}
      <div className="absolute inset-0 z-[1] bg-black/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 px-4"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo with bounce */}
        <motion.img
          src={logo}
          alt="Kenkya logo"
          className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_25px_hsl(262,83%,66%,0.5)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.2,
          }}
        />

        {/* Subtitle — appears first, smaller */}
        <motion.p
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/90 font-body"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Design & Desenvolvimento Web
        </motion.p>

        {/* Title — massive */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-display font-extrabold leading-none tracking-tight"
            initial="hidden"
            animate="visible"
            aria-label="Kenkya"
          >
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block gradient-text"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                variants={{
                  hidden: { y: "120%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: 0.7 + i * 0.08,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* CTA */}
        <motion.a
          href="#projetos"
          className="mt-6 px-10 py-4 rounded-full gradient-bg text-white font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Ver Projetos
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <ChevronDown className="w-7 h-7 animate-scroll-hint" />
      </motion.div>
    </section>
  );
};

export default Hero;
