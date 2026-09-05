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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [location, setLocation] = useState(() => ({
    city: sessionStorage.getItem("airwise-city") || defaultCity,
  }));

  const handleLocationChange = (city) => {
    setLocation({ city });
    sessionStorage.setItem("airwise-city", city);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab location={location} />;
      case "kondisi-foto":
        return <KondisiFotoTab />;
      case "pola-tren":
        return <PolaTrenTab />;
      case "edukasi":
        return <EdukasiTab />;
      case "tentang":
        return <TentangTab />;
      default:
        return <DashboardTab location={location} />;
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        {...location}
        onLocationChange={handleLocationChange}
      />
      <main className="dashboard-main">{renderTab()}</main>
    </div>
  );
};

export default Dashboard;
