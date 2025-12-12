import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import StudentDetails from "./components/AdminPage/StudentDetails";
import GridLayout from "./components/layout/GridLayout";

function App() {
  return (
    <>
      
      
      {/* <GridLayout /> */}
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<Admin />} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
