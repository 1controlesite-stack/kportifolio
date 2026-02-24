import { useState, useMemo } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

const PortfolioGrid = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const isMobile = useIsMobile();

  const categories = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ["Todos", ...Array.from(tags)];
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" || p.tags.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar projetos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 font-body"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full font-body transition-all duration-300 ${
              activeCategory === cat
                ? "gradient-bg text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
        {filtered.map((project) => (
          <Link
            key={project.slug}
            to={`/projeto/${project.slug}`}
            className="group relative rounded-lg overflow-hidden aspect-video"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <h4 className="text-sm font-display font-bold text-foreground">
                {project.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8 font-body">
          Nenhum projeto encontrado.
        </p>
      )}
    </div>
  );
};

export default PortfolioGrid;
