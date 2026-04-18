
import GlassBox from "../components/HomePage/GlassBox";
import HeroText from "../components/HomePage/HeroText";
import AboutTeacher from "../sections/HomePage/AboutTeacher";
import CardSection from "../sections/HomePage/CardSection";
import JoinClassSection from "../sections/HomePage/JoinClassSection";
import PopularCourses from "../sections/HomePage/PopularCourses";
import ResultCardSection from "../sections/HomePage/ResultCardSection";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderMobile from "../components/HomePage/HeaderMobile";

function HomePage() {
  return (
    <>
      <Header bgImage="https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/hee.jpg" />
      

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
