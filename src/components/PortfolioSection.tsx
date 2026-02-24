import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Loader2 } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import PortfolioCard from "./PortfolioCard";
import PortfolioFilters from "./PortfolioFilters";
import { useProjects } from "@/hooks/useProjects";
import { useCategories } from "@/hooks/useAdminCategories";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

const PortfolioSection = () => {
  const { data: projects = [], isLoading } = useProjects();
  const { data: categories = [] } = useCategories();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = projects;
    if (activeCategory !== "Todos") {
      result = result.filter((p) => p.categories.some((c) => c.slug === activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categories.some((c) => c.name.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery, projects]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="projetos" className="relative py-24 md:py-32 px-4 section-light overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.4) 40%, hsl(var(--background)) 100%)" }} />

      <div className="relative z-20 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
        <>
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">Projetos</h2>
          <p className="text-[hsl(var(--sl-muted))] max-w-lg mx-auto">
            Cada projeto é uma história. Clique para conhecer a jornada completa.
          </p>
        </motion.div>

        <motion.div className="relative z-[110]" initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <PortfolioFilters
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div className="flex flex-col items-center justify-center text-center py-20"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.div className="relative mb-6" animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center opacity-20" />
              <Rocket className="w-9 h-9 text-accent absolute inset-0 m-auto" />
            </motion.div>
            <h3 className="font-display text-lg font-semibold text-[hsl(var(--sl-fg))] mb-2">Nenhum projeto encontrado</h3>
            <p className="text-[hsl(var(--sl-muted))]/80 font-body text-sm max-w-xs mb-1">Ainda não temos um projeto nesse nicho.</p>
            <p className="text-[hsl(var(--sl-muted))] font-body text-xs mb-6">Mas o seu pode ser o primeiro! 🚀</p>
            <a href={`https://wa.me/5516991962010?text=${encodeURIComponent("Oi! Vi o portfólio de vocês e gostaria de conversar sobre um projeto.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full gradient-bg text-primary-foreground font-body hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              <WhatsAppIcon className="w-4 h-4" /> Chamar no WhatsApp
            </a>
          </motion.div>
        ) : (
          <>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 items-end">
              {paginatedItems.map((project, i) => {
                const col = i % 4;
                const zIndex = 4 - col;
                return (
                  <motion.div key={project.slug} layout className="relative transition-none"
                    style={{ zIndex: hoveredSlug === project.slug ? 100 : zIndex, ...(col === 0 ? { marginRight: "-1.5rem" } : { marginLeft: "-1.5rem" }) }}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ scale: 1.03 }}
                    onHoverStart={() => setHoveredSlug(project.slug)} onHoverEnd={() => setHoveredSlug(null)}>
                    <PortfolioCard project={project} />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div className="mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink isActive={page === currentPage} onClick={() => goToPage(page)} className="cursor-pointer">{page}</PaginationLink>
                        </PaginationItem>
                      );
                    }
                    if (page === 2 && currentPage > 3) return <PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>;
                    if (page === totalPages - 1 && currentPage < totalPages - 2) return <PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>;
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
          </>
        )}
        </>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
