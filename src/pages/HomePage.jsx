import Header from "../components/Header";
import GlassBox from "../components/HomePage/GlassBox";
import HeroText from "../components/HomePage/HeroText";
import AboutTeacher from "../sections/HomePage/AboutTeacher";
import CardSection from "../sections/HomePage/cardSection";
import JoinClassSection from "../sections/HomePage/JoinClassSection";
import ResultCardSection from "../sections/HomePage/ResultCardSection";

function HomePage() {
  return (
    <>
      <Header />
      <HeroText />
      <GlassBox />

      <CardSection />
      <AboutTeacher />
      <ResultCardSection />

      <JoinClassSection />
    </>
  );
}

export default HomePage
