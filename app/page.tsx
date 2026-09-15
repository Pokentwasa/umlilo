import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FoodSection from "@/components/FoodSection";
import Imbizo from "@/components/Imbizo";
import MatchDay from "@/components/MatchDay";
import SoundEnergy from "@/components/SoundEnergy";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Visit from "@/components/Visit";
import FinalMoment from "@/components/FinalMoment";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FoodSection />
        <Imbizo />
        <MatchDay />
        <SoundEnergy />
        <Story />
        <Gallery />
        <Visit />
      </main>
      <FinalMoment />
    </>
  );
}
