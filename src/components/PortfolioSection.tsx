import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import PortfolioFilters from "./PortfolioFilters";
import { projects } from "@/data/projects";

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = projects;
    if (activeCategory !== "Todos") {
      result = result.filter((p) => p.tags.includes(activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

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
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">Projetos</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Cada projeto é uma história. Clique para conhecer a jornada completa.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PortfolioFilters
            projects={projects}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-foreground/70 font-body text-sm mb-1">
              Ainda não temos um projeto nesse nicho...
            </p>
            <p className="text-muted-foreground font-body text-xs mb-5">
              Mas o seu pode ser o primeiro!
            </p>
            <a
              href={`https://wa.me/5516991962010?text=${encodeURIComponent("Oi! Vi o portfólio de vocês e gostaria de conversar sobre um projeto.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full gradient-bg text-primary-foreground font-body hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chamar no WhatsApp
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 items-end">
            {filtered.map((project, i) => {
              const col = i % 4;
              const zIndex = 4 - col;

              return (
                <motion.div
                  key={project.slug}
                  className="relative"
                  style={{
                    zIndex,
                    ...(col === 0
                      ? { marginRight: "-1.5rem" }
                      : { marginLeft: "-1.5rem" }),
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
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
