import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const displayImage = project.showcaseImage || project.image;

  return (
    <Link
      to={`/projeto/${project.slug}`}
      className="group block relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] bg-background">
        <img
          src={displayImage}
          alt={project.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-primary-foreground font-display font-bold text-sm">
            Ver projeto
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
