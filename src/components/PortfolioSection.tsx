import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Rocket } from "lucide-react";
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
          className="relative z-[110]"
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
            className="flex flex-col items-center justify-center text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated icon */}
            <motion.div
              className="relative mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center opacity-20" />
              <Rocket className="w-9 h-9 text-accent absolute inset-0 m-auto" />
            </motion.div>

            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-foreground/60 font-body text-sm max-w-xs mb-1">
              Ainda não temos um projeto nesse nicho.
            </p>
            <p className="text-muted-foreground font-body text-xs mb-6">
              Mas o seu pode ser o primeiro! 🚀
            </p>
            <a
              href={`https://wa.me/5516991962010?text=${encodeURIComponent("Oi! Vi o portfólio de vocês e gostaria de conversar sobre um projeto.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full gradient-bg text-primary-foreground font-body hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <MessageCircle className="w-4 h-4" />
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
                  className="relative hover:z-[100] transition-none"
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
                  whileHover={{ scale: 1.03 }}
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
