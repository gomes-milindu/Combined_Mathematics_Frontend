
import HeroText from "../components/HomePage/HeroText";
import AboutTeacher from "../sections/HomePage/AboutTeacher";
import CardSection from "../sections/HomePage/CardSection";
import JoinClassSection from "../sections/HomePage/JoinClassSection";
import PopularCourses from "../sections/HomePage/PopularCourses";
import ResultCardSection from "../sections/HomePage/ResultCardSection";
import Assets from "../data/AssetLinks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/HomePage/Card";
function HomePage() {
  return (
    <>
      <Header backgroundImage={Assets.Hero_Home}/>
      <HeroText />
      
       <Card />
      
      {/*}
              <div className="w-[88%] justify-center items-c mt-2 px-2">
              <Card />
            </div>*/}
            
      {/*<CardSection />*/}
      <AboutTeacher />
      <ResultCardSection />

      <JoinClassSection />
      <PopularCourses />

      <Footer />
    </>
  );
}

export default HomePage
