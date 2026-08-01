import HeroText from "../components/HomePage/HeroText";
import AboutTeacher from "../sections/HomePage/AboutTeacher";
import CardSection from "../sections/HomePage/CardSection";
import PopularCourses from "../sections/HomePage/PopularCourses";
import ResultCardSection from "../sections/HomePage/ResultCardSection";
import Assets from "../data/AssetLinks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/HomePage/Card";
import JoinClassSection from "../components/JoinClassSection";

function HomePage() {
  return (
    <>
      <Header
        backgroundImage={Assets.Hero_Home}
        showHomeHero={true}
        heroTitle="Join Our Classes &"
        heroSubtitle="Online | Panadura | Kalutara"
      />
      
      <HeroText /> 

      <Card />
      <AboutTeacher />
      <ResultCardSection />

      <JoinClassSection />
      <PopularCourses />

      <Footer />
    </>
  );
}

export default HomePage;
