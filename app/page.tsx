import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FoodSection from "@/components/FoodSection";
import Imbizo from "@/components/Imbizo";
import MatchDay from "@/components/MatchDay";
import SoundEnergy from "@/components/SoundEnergy";
import Story from "@/components/Story";
import Visit from "@/components/Visit";
import FinalMoment from "@/components/FinalMoment";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <FoodSection />
        <Imbizo />
        <MatchDay />
        <SoundEnergy />
        <Visit />
      </main>
      <FinalMoment />
    </>
  );
}
