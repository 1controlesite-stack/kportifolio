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

  // Flash: tight burst only at impact
  const flashOpacity = useTransform(scrollYProgress, [0.38, 0.4, 0.45], [0, 0.9, 0]);
  const flashScale = useTransform(scrollYProgress, [0.38, 0.45], [0.5, 3.5]);

  // Particles: 0.4–0.6
  const particleProgress = useTransform(scrollYProgress, [0.38, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[50vh] z-20 pointer-events-none"
      style={{ marginTop: "-25vh", marginBottom: "-25vh", backgroundColor: "transparent" }}
    >
      {/* Left beam — fixed 20deg angle, light travels from left edge to center */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[3px]"
        style={{
          width: "60vw",
          marginLeft: "-60vw",
          transformOrigin: "left center",
          rotate: "20deg",
          scaleX: beamScale,
          background:
            "linear-gradient(to right, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)))",
          boxShadow:
            "0 0 8px 2px hsl(var(--kenkya-purple) / 0.6), 0 0 20px 4px hsl(var(--kenkya-blue) / 0.4), 0 0 40px 8px hsl(var(--kenkya-purple) / 0.2)",
        }}
      />

      {/* Right beam — fixed -20deg angle, light travels from right edge to center */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[3px]"
        style={{
          width: "60vw",
          transformOrigin: "right center",
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.95) 0%, hsl(var(--kenkya-blue) / 0.6) 30%, transparent 55%)",
          opacity: flashOpacity,
          scale: flashScale,
        }}
      />

      {/* Impact particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: `hsl(var(${p.color}))`,
            boxShadow: `0 0 6px 2px hsl(var(${p.color}) / 0.6)`,
            x: useTransform(particleProgress, [0, 1], [0, p.x]),
            y: useTransform(particleProgress, [0, 1], [0, p.y]),
            opacity: useTransform(particleProgress, [0, 0.2, 1], [0, 1, 0]),
          }}
        />
      ))}
    </section>
  );
};

export default SectionTransition;
