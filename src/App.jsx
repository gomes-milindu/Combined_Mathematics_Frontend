import './index.css'
import './App.css'
import Header from './components/Header'
import HeroText from './components/HomePage/HeroText'
import GlassBox from './components/HomePage/GlassBox'
import Card from './components/HomePage/Card'
import GridLayout from './components/layout/GridLayout'

function App() {


  return (
    <>
      {/* <GridLayout /> */}
      <Header />
      <HeroText />
      <GlassBox />
      <Card />
    </>
  )
}

export default App
