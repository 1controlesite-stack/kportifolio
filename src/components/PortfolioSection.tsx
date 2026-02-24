import { motion } from "framer-motion";
import DeviceMockup from "./DeviceMockup";
import PortfolioGrid from "./PortfolioGrid";

const PortfolioSection = () => {
  return (
    <section id="projetos" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">
            Projetos
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Cada projeto é uma história. Clique para conhecer a jornada completa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DeviceMockup>
            <PortfolioGrid />
          </DeviceMockup>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
