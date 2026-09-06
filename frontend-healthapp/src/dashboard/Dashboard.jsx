import { useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import DashboardTab from "./tabs/DashboardTab";
import KondisiFotoTab from "./tabs/KondisiFotoTab";
import PolaTrenTab from "./tabs/PolaTrenTab";
import EdukasiTab from "./tabs/EdukasiTab";
import TentangTab from "./tabs/TentangTab";
import { defaultCity } from "../data/regions";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("airwise-active-tab") || "dashboard";
  });
  const [location, setLocation] = useState(() => ({
    city: sessionStorage.getItem("airwise-city") || defaultCity,
  }));

  const handleLocationChange = (city) => {
    setLocation({ city });
    sessionStorage.setItem("airwise-city", city);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    sessionStorage.setItem("airwise-active-tab", tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="dashboard-shell">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} {...location} onLocationChange={handleLocationChange} />
      <main className="dashboard-main">
        <div style={{ display: activeTab === "dashboard" ? "block" : "none" }}>
          <DashboardTab location={location} />
        </div>
        <div style={{ display: activeTab === "kondisi-foto" ? "block" : "none" }}>
          <KondisiFotoTab />
        </div>
        <div style={{ display: activeTab === "pola-tren" ? "block" : "none" }}>
          <PolaTrenTab />
        </div>
        <div style={{ display: activeTab === "edukasi" ? "block" : "none" }}>
          <EdukasiTab />
        </div>
        <div style={{ display: activeTab === "tentang" ? "block" : "none" }}>
          <TentangTab />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
