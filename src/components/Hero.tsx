import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroVideo from "@/assets/hero-bg.mp4";

// Minimum time delta (in seconds) to trigger a new seek — ~1 frame at 30fps
const SEEK_EPSILON = 0.033;

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingProgressRef = useRef<number | null>(null);
  const videoReadyRef = useRef(false);
  const lastSeekedTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const transitionOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Gate: only allow seeks after video metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => { videoReadyRef.current = true; };
    if (video.readyState >= 1) {
      videoReadyRef.current = true;
    } else {
      video.addEventListener("loadedmetadata", onReady, { once: true });
      return () => video.removeEventListener("loadedmetadata", onReady);
    }
  }, []);

  // On-demand seek: schedule a single rAF only when there's a pending update
  const scheduleSeek = useCallback(() => {
    if (rafRef.current !== null) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const progress = pendingProgressRef.current;
      const video = videoRef.current;
      if (progress === null || !video || !videoReadyRef.current || !video.duration) return;

      const clamped = Math.min(1, Math.max(0, progress));
      const targetTime = clamped * video.duration;

      // Anti-jitter: skip seek if delta is smaller than ~1 frame
      if (Math.abs(targetTime - lastSeekedTimeRef.current) < SEEK_EPSILON) return;

      // Use fastSeek for large jumps when available, otherwise currentTime
      if (typeof video.fastSeek === "function" && Math.abs(targetTime - lastSeekedTimeRef.current) > 0.5) {
        video.fastSeek(targetTime);
      } else {
        video.currentTime = targetTime;
      }
      lastSeekedTimeRef.current = targetTime;
      pendingProgressRef.current = null;
    });
  }, []);

  // Cleanup any pending rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    pendingProgressRef.current = v;
    scheduleSeek();
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
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

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/40" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 px-4"
          style={{ y: contentY, opacity: contentOpacity }}
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
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[30vh] z-20 pointer-events-none"
          style={{
            opacity: transitionOpacity,
            background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
