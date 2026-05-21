
import GlassBox from "../components/HomePage/GlassBox";
import HeroText from "../components/HomePage/HeroText";
import AboutTeacher from "../sections/HomePage/AboutTeacher";
import CardSection from "../sections/HomePage/CardSection";
import JoinClassSection from "../sections/HomePage/JoinClassSection";
import PopularCourses from "../sections/HomePage/PopularCourses";
import ResultCardSection from "../sections/HomePage/ResultCardSection";
import Assets from "../data/AssetLinks";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HomePage() {
  return (
    <>
      <Header backgroundImage={Assets.Hero_Home}/>
      <HeroText />
      
        <GlassBox />
      

      <CardSection />
      <AboutTeacher />
      <ResultCardSection />

      <JoinClassSection />
      <PopularCourses />

      <Footer />
    </>
  );
}

export default HomePage
