import { motion } from "framer-motion";

const shapes = [
  { size: 120, x: "10%", y: "20%", delay: 0, color: "var(--kenkya-purple)" },
  { size: 80, x: "80%", y: "15%", delay: 1, color: "var(--kenkya-blue)" },
  { size: 60, x: "70%", y: "70%", delay: 2, color: "var(--kenkya-cyan)" },
  { size: 100, x: "20%", y: "75%", delay: 0.5, color: "var(--kenkya-purple)" },
  { size: 40, x: "50%", y: "50%", delay: 1.5, color: "var(--kenkya-blue)" },
];

const AnimatedShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-[0.07] blur-xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `hsl(${shape.color})`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Geometric triangles */}
      <motion.div
        className="absolute w-0 h-0 opacity-[0.05]"
        style={{
          left: "60%",
          top: "30%",
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "52px solid hsl(var(--kenkya-cyan))",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-0 h-0 opacity-[0.04]"
        style={{
          left: "30%",
          top: "40%",
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: "35px solid hsl(var(--kenkya-purple))",
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default AnimatedShapes;
