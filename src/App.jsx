import './index.css'
import './App.css'
import Header from './components/Header'
import HeroText from './components/HomePage/HeroText'
import GlassBox from './components/HomePage/GlassBox'
import Card from './components/HomePage/Card'
import GridLayout from './components/layout/GridLayout'
import CardSection from './sections/HomePage/cardSection'
import Topic from './components/HomePage/Topic'
import ResultCard from './components/HomePage/ResultCard'
import ResultCardSection from './sections/HomePage/ResultCardSection'
import image from "../src/assets/image.png"
import JoinClass from './components/HomePage/JoinClass'
import JoinClassSection from './sections/HomePage/JoinClassSection'
import AboutTeacher from './sections/HomePage/AboutTeacher'


function App() {


  return (
    <>
      {/* <GridLayout /> */}
      <Header />
      <HeroText />
      <GlassBox />
      
      <CardSection/>
      <AboutTeacher />
      <ResultCardSection />

      
      <JoinClassSection/>
      
      
    </>
  )
}

export default App
