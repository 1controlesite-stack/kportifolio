import { useState, useMemo } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import type { Project } from "@/data/projects";

interface PortfolioFiltersProps {
  projects: Project[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const PortfolioFilters = ({
  projects,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: PortfolioFiltersProps) => {
  const [comboOpen, setComboOpen] = useState(false);

  // Categories sorted by frequency, top 4 exposed
  const { exposed, overflow } = useMemo(() => {
    const freq = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1)));
    const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
    return {
      exposed: sorted.slice(0, 4),
      overflow: sorted.slice(4),
    };
  }, [projects]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
      {/* Search bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar projetos..."
          className="w-full h-9 pl-9 pr-8 rounded-full bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onCategoryChange("Todos")}
          className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 ${
            activeCategory === "Todos"
              ? "gradient-bg text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground border border-border"
          }`}
        >
          Todos
        </button>

        {exposed.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 ${
              activeCategory === cat
                ? "gradient-bg text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Overflow combobox */}
        {overflow.length > 0 && (
          <Popover open={comboOpen} onOpenChange={setComboOpen}>
            <PopoverTrigger asChild>
              <button
                className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 inline-flex items-center gap-1 ${
                  overflow.includes(activeCategory)
                    ? "gradient-bg text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {overflow.includes(activeCategory) ? activeCategory : "Mais"}
                <ChevronDown className="w-3 h-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 bg-popover border-border z-50" align="start" sideOffset={6}>
              <Command className="bg-popover">
                <CommandInput placeholder="Buscar categoria..." className="text-xs" />
                <CommandList>
                  <CommandEmpty className="text-xs py-4">Nenhuma encontrada.</CommandEmpty>
                  <CommandGroup>
                    {overflow.map((cat) => (
                      <CommandItem
                        key={cat}
                        value={cat}
                        onSelect={() => {
                          onCategoryChange(cat);
                          setComboOpen(false);
                        }}
                        className="text-xs cursor-pointer"
                      >
                        {cat}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default PortfolioFilters;
