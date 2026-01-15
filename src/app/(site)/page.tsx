import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Experience from "../../components/sections/Experience";
import Projects from "../../components/sections/Projects";
import Contact from "../../components/sections/Contact";
import TechStack from "../../components/sections/TechStack";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="">
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
