import { motion } from "framer-motion";
import { Mail, MessageCircle, Instagram } from "lucide-react";

const links = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5516991962010",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:kenkyasites@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/kenkya_",
  },
];

const ContactFooter = () => {
  return (
    <footer className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 overflow-hidden">
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--kenkya-purple) / 0.4), hsl(var(--kenkya-blue) / 0.5), hsl(var(--kenkya-cyan) / 0.4), transparent)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-24 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, hsl(var(--kenkya-blue) / 0.06) 0%, transparent 70%)",
        }}
      />
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
          Vamos criar algo EXTRAORDINÁRIO?
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
            © {new Date().getFullYear()} Kenkya. Todos os direitos reservados. |{" "}
            Feito por{" "}
            <a
              href="https://kenkya.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors underline underline-offset-2"
            >
              Kenkya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
