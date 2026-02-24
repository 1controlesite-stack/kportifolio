import { motion } from "framer-motion";

const SectionTransition = () => {
  return (
    <section
      className="relative h-[40vh] overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--background)), hsl(228 33% 97%))",
      }}
    >
      {/* Left line */}
      <motion.div
        className="absolute top-1/2 left-0 w-1/2 h-[2px] -translate-y-1/2 origin-left"
        style={{
          background: "linear-gradient(to right, transparent, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)))",
          filter: "blur(0.5px)",
          boxShadow: "0 0 12px 2px hsl(var(--kenkya-purple) / 0.4)",
        }}
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Right line */}
      <motion.div
        className="absolute top-1/2 right-0 w-1/2 h-[2px] -translate-y-1/2 origin-right"
        style={{
          background: "linear-gradient(to left, transparent, hsl(var(--kenkya-cyan)), hsl(var(--kenkya-blue)))",
          filter: "blur(0.5px)",
          boxShadow: "0 0 12px 2px hsl(var(--kenkya-cyan) / 0.4)",
        }}
        initial={{ x: "100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Central flash */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--kenkya-blue) / 0.5), transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 2] }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      />

      {/* Expanding center line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2"
        style={{
          background: "linear-gradient(90deg, hsl(var(--kenkya-purple)), hsl(var(--kenkya-blue)), hsl(var(--kenkya-cyan)))",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
      />
    </section>
  );
};

export default SectionTransition;
