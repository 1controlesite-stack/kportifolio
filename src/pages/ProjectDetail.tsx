import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Loader2, Quote } from "lucide-react";
import { useProjects, useProject } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(slug);
  const { data: allProjects = [] } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Projeto não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  const index = allProjects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? allProjects[index - 1] : null;
  const next = index < allProjects.length - 1 ? allProjects[index + 1] : null;

  const hasTestimonial = project.testimonial_text || project.testimonial_image || project.testimonial_audio;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full gradient-bg text-primary-foreground hover:opacity-90 transition-opacity">
              Ver ao vivo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </motion.div>

      {/* Hero image */}
      <motion.div className="relative aspect-video max-w-5xl mx-auto mt-8 mx-4 rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <img src={project.showcase_image || project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Title & categories */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold gradient-text inline-block mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {project.title}
        </motion.h1>
        <motion.p className="text-lg text-muted-foreground mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-16">
          {project.categories.map((cat) => (
            <span key={cat.id} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      {hasTestimonial && (
        <div className="max-w-3xl mx-auto px-4 pb-20">
          <motion.div
            className="rounded-xl border border-border bg-card p-8"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Quote className="w-5 h-5 text-primary" /> Depoimento do Cliente
            </h2>

            {project.testimonial_text && (
              <blockquote className="text-muted-foreground italic text-lg leading-relaxed border-l-4 border-primary/30 pl-4 mb-6">
                "{project.testimonial_text}"
              </blockquote>
            )}

            {project.testimonial_image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img src={project.testimonial_image} alt="Depoimento" className="w-full max-h-96 object-contain" />
              </div>
            )}

            {project.testimonial_audio && (
              <div>
                <audio controls src={project.testimonial_audio} className="w-full" />
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center pt-8 border-t border-border">
          {prev ? (
            <Link to={`/projeto/${prev.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {prev.title}
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/projeto/${next.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {next.title} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
