import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import PortfolioPreview from '@/components/PortfolioPreview';
import Services from '@/components/Services';
import Skills from '@/components/Skills';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PortfolioPreview />
      <Services />
      <Skills />
      <Contact />
    </>
  );
}
