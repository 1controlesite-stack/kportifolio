import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import { projects } from "@/data/projects";

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
      <div className="max-w-7xl mx-auto">
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

        {/* 4-column grid with horizontal overlap (left over right) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 items-end">
          {filtered.map((project, i) => {
            const col = i % 4;
            const zIndex = 4 - col; // left = higher z

            return (
              <motion.div
                key={project.slug}
                className="relative"
                style={{
                  zIndex,
                  marginLeft: col !== 0 ? "-1.5rem" : "0",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ zIndex: 100, scale: 1.03 }}
              >
                <PortfolioCard project={project} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
