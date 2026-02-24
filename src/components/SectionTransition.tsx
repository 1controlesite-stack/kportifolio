import { motion } from "framer-motion";

const particles = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * 80,
    y: Math.sin(angle) * 80,
    color: ["--kenkya-purple", "--kenkya-blue", "--kenkya-cyan"][i % 3],
  };
});

const viewportConfig = { once: true, amount: 0.3 };

const SectionTransition = () => {
  return (
    <section
      className="relative h-[25vh] overflow-hidden"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      {/* Light reveal layer — clip-path circle expanding */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "hsl(228 33% 97%)" }}
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)" }}
        viewport={viewportConfig}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      />

      {/* Left line */}
      <motion.div
        className="absolute top-1/2 left-0 w-1/2 h-[3px] -translate-y-1/2 origin-left"
        style={{
          background: "linear-gradient(to right, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)))",
          boxShadow:
            "0 0 8px 2px hsl(var(--kenkya-purple) / 0.6), 0 0 20px 4px hsl(var(--kenkya-blue) / 0.4), 0 0 40px 8px hsl(var(--kenkya-purple) / 0.2)",
        }}
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={viewportConfig}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Right line */}
      <motion.div
        className="absolute top-1/2 right-0 w-1/2 h-[3px] -translate-y-1/2 origin-right"
        style={{
          background: "linear-gradient(to left, hsl(var(--kenkya-cyan)), hsl(var(--kenkya-blue)))",
          boxShadow:
            "0 0 8px 2px hsl(var(--kenkya-cyan) / 0.6), 0 0 20px 4px hsl(var(--kenkya-blue) / 0.4), 0 0 40px 8px hsl(var(--kenkya-cyan) / 0.2)",
        }}
        initial={{ x: "100%" }}
        whileInView={{ x: "0%" }}
        viewport={viewportConfig}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Central flash */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(var(--kenkya-blue) / 0.5) 40%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: [0, 0.8, 0], scale: [0.3, 2.5, 3] }}
        viewport={viewportConfig}
        transition={{ duration: 0.4, delay: 1.15, ease: "easeOut" }}
      />

      {/* Impact particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            backgroundColor: `hsl(var(${p.color}))`,
            boxShadow: `0 0 6px 2px hsl(var(${p.color}) / 0.6)`,
          }}
          initial={{ x: "-50%", y: "-50%", opacity: 0 }}
          whileInView={{
            x: ["-50%", `calc(-50% + ${p.x}px)`],
            y: ["-50%", `calc(-50% + ${p.y}px)`],
            opacity: [0, 1, 0],
          }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        />
      ))}

      {/* Expanding center line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)), hsl(var(--kenkya-cyan)))",
          boxShadow: "0 0 8px 1px hsl(var(--kenkya-blue) / 0.4)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportConfig}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
      />
    </section>
  );
};

export default SectionTransition;
