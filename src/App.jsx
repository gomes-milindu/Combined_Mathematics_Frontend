import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import StudentDetails from "./components/AdminPage/StudentDetails";
import GridLayout from "./components/layout/GridLayout";
import toast, { Toaster } from "react-hot-toast";
import Course from "./pages/Course";
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
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
