import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Skills from "../../components/sections/Skills";
import Experience from "../../components/sections/Experience";
import Projects from "../../components/sections/Projects";
import Contact from "../../components/sections/Contact";
import TechStack from "../../components/sections/TechStack";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pb-24">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
