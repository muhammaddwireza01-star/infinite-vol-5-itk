import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./landing/Landingpage";
import Dashboard from "./dashboard/Dashboard";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation?.type === "reload") {
      sessionStorage.removeItem("airwise-photo-analysis-ready");
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
