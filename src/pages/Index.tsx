import Hero from "@/components/Hero";
import SectionTransition from "@/components/SectionTransition";
import PortfolioSection from "@/components/PortfolioSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  return (
    <>
      <main>
        <Hero />
        <SectionTransition />
        <PortfolioSection />
        <ContactFooter />
      </main>
    </>
  );
};

export default Index;
