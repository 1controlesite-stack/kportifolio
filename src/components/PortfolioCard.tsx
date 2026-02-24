import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const displayImage = project.showcase_image || project.image;

  return (
    <Link to={`/projeto/${project.slug}`} className="group block relative rounded-lg gradient-border-animated">
      <div className="relative rounded-lg overflow-hidden bg-background">
        <img src={displayImage} alt={project.title}
          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105" loading="lazy" />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex flex-wrap gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
            {project.categories.slice(0, 3).map((cat) => (
              <span key={cat.id}
                className="text-[11px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-border/80 text-foreground/70 font-body">
                {cat.name}
              </span>
            ))}
          </div>

          <h3 className="font-display text-sm font-semibold text-foreground tracking-wide leading-tight mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
            {project.title}
          </h3>

          <p className="text-xs text-foreground/85 font-body leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out mb-3">
            {project.description}
          </p>

          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-accent font-body opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
            Ver projeto
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
