import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Awards from "@/components/Awards";
import Metrics from "@/components/Metrics";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <Services />
      <Testimonials />
      <Awards />
      <Metrics />
      <Process />
      <CTA />
    </main>
  );
}