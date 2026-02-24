import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link
        to={`/projeto/${project.slug}`}
        className="group block relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-colors duration-300"
      >
        <div className="relative overflow-hidden aspect-video">
          <img src={project.image} alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full gradient-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span key={cat.id} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
