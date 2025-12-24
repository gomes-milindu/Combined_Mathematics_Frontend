import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import StudentDetails from "./components/AdminPage/StudentDetails";
import GridLayout from "./components/layout/GridLayout";
import toast, { Toaster } from "react-hot-toast";
import Course from "./pages/Course";
import Classes from "./pages/Classes";
import About from "./pages/About";
import Contact from "./pages/Contact";
-toast

function App() {
  return (
    <>
      
      
      {/* <GridLayout /> */}
      <BrowserRouter>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/course/*" element={<Course />} />
          <Route path="/classes/*" element={<Classes />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/contact/*" element={<Contact />} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
