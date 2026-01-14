import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/sections/Hero";
import Skills from "../../components/sections/Skills";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pb-24">
        <Hero />
        {/* Luego agregamos: About, Experience, Projects, Contact */}
        <Skills />
      </main>
    </>
  );
}
