import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </main>
  );
}
