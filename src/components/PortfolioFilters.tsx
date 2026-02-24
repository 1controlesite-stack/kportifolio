import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import type { Category } from "@/hooks/useAdminCategories";

interface PortfolioFiltersProps {
  categories: Category[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const PortfolioFilters = ({
  categories,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: PortfolioFiltersProps) => {
  const [comboOpen, setComboOpen] = useState(false);

  const exposed = categories.slice(0, 4);
  const overflow = categories.slice(4);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-12">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar projetos..."
          className="w-full h-11 pl-9 pr-8 rounded-full bg-[hsl(var(--sl-input))] border border-[hsl(var(--sl-border))] text-base text-[hsl(var(--sl-fg))] placeholder:text-[hsl(var(--sl-muted))] font-body focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button onClick={() => onCategoryChange("Todos")}
          className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 ${
            activeCategory === "Todos" ? "gradient-bg text-primary-foreground" : "bg-[hsl(var(--sl-input))] text-[hsl(var(--sl-muted))] hover:text-[hsl(var(--sl-fg))] border border-[hsl(var(--sl-border))]"
          }`}>
          Todos
        </button>

        {exposed.map((cat) => (
          <button key={cat.id} onClick={() => onCategoryChange(cat.slug)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 ${
              activeCategory === cat.slug ? "gradient-bg text-primary-foreground" : "bg-[hsl(var(--sl-input))] text-[hsl(var(--sl-muted))] hover:text-[hsl(var(--sl-fg))] border border-[hsl(var(--sl-border))]"
            }`}>
            {cat.name}
          </button>
        ))}

        {overflow.length > 0 && (
          <Popover open={comboOpen} onOpenChange={setComboOpen}>
            <PopoverTrigger asChild>
              <button className={`text-xs px-3.5 py-1.5 rounded-full font-body transition-all duration-300 inline-flex items-center gap-1 ${
                overflow.some((c) => c.slug === activeCategory)
                  ? "gradient-bg text-primary-foreground"
                  : "bg-[hsl(var(--sl-input))] text-[hsl(var(--sl-muted))] hover:text-[hsl(var(--sl-fg))] border border-[hsl(var(--sl-border))]"
              }`}>
                {overflow.find((c) => c.slug === activeCategory)?.name || "Mais"}
                <ChevronDown className="w-3 h-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 bg-popover border-border z-50" align="start" sideOffset={6}>
              <Command className="bg-popover">
                <CommandInput placeholder="Buscar categoria..." className="text-xs" />
                <CommandList>
                  <CommandEmpty className="text-sm py-4">Nenhuma encontrada.</CommandEmpty>
                  <CommandGroup>
                    {overflow.map((cat) => (
                      <CommandItem key={cat.id} value={cat.name}
                        onSelect={() => { onCategoryChange(cat.slug); setComboOpen(false); }}
                        className="text-xs cursor-pointer">
                        {cat.name}
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
