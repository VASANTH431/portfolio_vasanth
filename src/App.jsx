import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeAssistant from './components/HomeAssistant';
import About from './components/About';

import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader done={loaded} />
      {loaded && (
        <>
          <ScrollProgress />
          <Navbar />
          <HomeAssistant />
          <Hero />
          <About />

          <Skills />
          <Projects />
          <Certificates />
          <Resume />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
