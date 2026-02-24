import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import MonitorMockup from "./MonitorMockup";
import { projects } from "@/data/projects";

const TAB_COLORS = ["kenkya-purple", "kenkya-blue", "kenkya-cyan"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ["Todos", ...Array.from(tags)];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    return projects.filter((p) => p.tags.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section id="projetos" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">
            Projetos
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Cada projeto é uma história. Clique para conhecer a jornada completa.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full font-body transition-all duration-300 ${
                activeCategory === cat
                  ? "gradient-bg text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* 3-column grid with overlap */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-[-16px] gap-y-[-24px]"
          style={{
            gap: "0",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              className="relative"
              style={{
                marginTop: i >= 3 ? "-2rem" : "0",
                marginLeft: i % 3 !== 0 ? "-0.75rem" : "0",
                zIndex: filtered.length - i,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ zIndex: 50 }}
            >
              <MonitorMockup
                image={project.image}
                title={project.title}
                slug={project.slug}
                color={TAB_COLORS[i % TAB_COLORS.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
