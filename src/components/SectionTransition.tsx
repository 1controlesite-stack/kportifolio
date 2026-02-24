import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const particles = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * 90,
    y: Math.sin(angle) * 90,
    color: ["--kenkya-purple", "--kenkya-blue", "--kenkya-cyan"][i % 3],
  };
});

const SectionTransition = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Beams: scaleX 0→1 over 0–0.4
  const beamScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Flash: opacity bell curve 0.35–0.5
  const flashOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 0.8, 0]);
  const flashScale = useTransform(scrollYProgress, [0.3, 0.5], [0.3, 2.5]);

  // Clip-path reveal: 0.4–0.8
  const clipRadius = useTransform(scrollYProgress, [0.4, 0.8], [0, 150]);

  // Final line: 0.6–0.9
  const lineScale = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  // Particles: 0.4–0.6
  const particleProgress = useTransform(scrollYProgress, [0.38, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] overflow-hidden"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      {/* Light reveal layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: "hsl(228 33% 97%)",
          clipPath: useTransform(clipRadius, (v) => `circle(${v}% at 50% 50%)`),
        }}
      />

      {/* Left beam — V angle: rotate(20deg), origin right center */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[3px] pointer-events-none"
        style={{
          width: "60vw",
          marginLeft: "-60vw",
          transformOrigin: "right center",
          rotate: "20deg",
          scaleX: beamScale,
          background:
            "linear-gradient(to right, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)))",
          boxShadow:
            "0 0 8px 2px hsl(var(--kenkya-purple) / 0.6), 0 0 20px 4px hsl(var(--kenkya-blue) / 0.4), 0 0 40px 8px hsl(var(--kenkya-purple) / 0.2)",
        }}
      />

      {/* Right beam — V angle: rotate(-20deg), origin left center */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[3px] pointer-events-none"
        style={{
          width: "60vw",
          transformOrigin: "left center",
          rotate: "-20deg",
          scaleX: beamScale,
          background:
            "linear-gradient(to left, hsl(var(--kenkya-cyan)), hsl(var(--kenkya-blue)))",
          boxShadow:
            "0 0 8px 2px hsl(var(--kenkya-cyan) / 0.6), 0 0 20px 4px hsl(var(--kenkya-blue) / 0.4), 0 0 40px 8px hsl(var(--kenkya-cyan) / 0.2)",
        }}
      />

      {/* Central flash */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(var(--kenkya-blue) / 0.5) 40%, transparent 70%)",
          opacity: flashOpacity,
          scale: flashScale,
        }}
      />

      {/* Impact particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            backgroundColor: `hsl(var(${p.color}))`,
            boxShadow: `0 0 6px 2px hsl(var(${p.color}) / 0.6)`,
            x: useTransform(particleProgress, [0, 1], [0, p.x]),
            y: useTransform(particleProgress, [0, 1], [0, p.y]),
            opacity: useTransform(particleProgress, [0, 0.2, 1], [0, 1, 0]),
          }}
        />
      ))}

      {/* Expanding center line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)), hsl(var(--kenkya-cyan)))",
          boxShadow: "0 0 8px 1px hsl(var(--kenkya-blue) / 0.4)",
          scaleX: lineScale,
        }}
      />
    </section>
  );
};

export default SectionTransition;
