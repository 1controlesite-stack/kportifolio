import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github } from "lucide-react";

const links = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5500000000000",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contato@kenkya.com.br",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/kenkya",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/kenkya",
  },
];

const ContactFooter = () => {
  return (
    <footer className="relative py-20 md:py-28 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-[0.08]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold gradient-text inline-block mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Vamos conversar?
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Tem um projeto em mente? Entre em contato por qualquer canal.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label={label}
            >
              <div className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center group-hover:gradient-bg group-hover:border-transparent transition-all duration-300 group-hover:scale-110">
                <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </a>
          ))}
        </motion.div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kenkya. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
