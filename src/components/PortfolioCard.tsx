import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const displayImage = project.showcaseImage || project.image;

  return (
    <Link
      to={`/projeto/${project.slug}`}
      className="group block relative rounded-lg overflow-hidden"
    >
      <div className="relative">
        <img
          src={displayImage}
          alt={project.title}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay — always visible at bottom, full on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-400" />

        {/* Content — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground font-body"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title — always visible */}
          <h3 className="font-display text-sm font-light text-foreground tracking-wide leading-tight mb-1">
            {project.title}
          </h3>

          {/* Description — appears on hover */}
          <p className="text-[11px] text-muted-foreground font-body leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-3">
            {project.description}
          </p>

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-accent font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            Ver projeto
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
