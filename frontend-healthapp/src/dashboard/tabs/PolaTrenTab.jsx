import { useState } from "react";

const PolaTrenTab = () => {
  const [activeFilter, setActiveFilter] = useState("Harian");
  const filters = ["Per Jam", "Harian", "Mingguan", "Bulanan"];

  return (
    <div className="tab-section">
      {/* Header & Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.025em" }}>Pola &amp; Tren</h2>
          <p style={{ fontSize: "14px", color: "#64748b" }}>Lihat perubahan kualitas udara dari waktu ke waktu.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div className="segmented-control">
            {filters.map((f) => (
              <button key={f} className={`segmented-btn ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <select style={{ fontSize: "12px", fontWeight: 600, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "6px 12px", color: "#334155", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            <option>7 Hari Terakhir</option>
            <option>14 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
          </select>
        </div>
      </div>

      {/* Chart 1: Tren AQI 7 Hari */}
      <div className="airwise-card" style={{ padding: "24px" }}>
        <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>Tren AQI 7 Hari Terakhir</h3>
        <div style={{ width: "100%", height: "224px", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 600 180" preserveAspectRatio="none">
            <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <text x="25" y="24" fill="#94a3b8" fontSize="9" textAnchor="end">200</text>
            <line x1="40" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <text x="25" y="64" fill="#94a3b8" fontSize="9" textAnchor="end">150</text>
            <line x1="40" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <text x="25" y="104" fill="#94a3b8" fontSize="9" textAnchor="end">100</text>
            <line x1="40" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
            <text x="25" y="144" fill="#94a3b8" fontSize="9" textAnchor="end">50</text>
            <polyline fill="none" points="60,111 140,106 225,92 310,79 395,96 480,111 560,117" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <circle cx="60" cy="111" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="60" y="101" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">86</text>
            <circle cx="140" cy="106" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="140" y="96" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">92</text>
            <circle cx="225" cy="92" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="225" y="82" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">110</text>
            <circle cx="310" cy="79" r="5.5" fill="#dc2626" stroke="#fff" strokeWidth="2.5" />
            <text x="310" y="68" fill="#dc2626" fontSize="11" fontWeight="800" textAnchor="middle">126</text>
            <circle cx="395" cy="96" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="395" y="86" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">105</text>
            <circle cx="480" cy="111" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="480" y="101" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">86</text>
            <circle cx="560" cy="117" r="4.5" fill="#e11d48" stroke="#fff" strokeWidth="2" />
            <text x="560" y="107" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">79</text>
          </svg>
        </div>
        <div className="chart-time-labels" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
          <span>Kam, 22 Mei</span>
          <span>Jum, 23 Mei</span>
          <span>Sab, 24 Mei</span>
          <span style={{ color: "#e11d48", fontWeight: 700 }}>Min, 25 Mei</span>
          <span>Sen, 26 Mei</span>
          <span>Sel, 27 Mei</span>
          <span>Rab, 28 Mei</span>
        </div>
      </div>

      {/* Row: Pola Harian & Stat Cards */}
      <div className="grid-12">
        {/* Pola Harian */}
        <div className="airwise-card col-span-8">
          <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "12px" }}>Pola Harian (Rata-rata)</h3>
          <div style={{ width: "100%", height: "176px", position: "relative" }}>
            <svg width="100%" height="100%" viewBox="0 0 500 130" preserveAspectRatio="none">
              <line x1="30" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <text x="20" y="24" fill="#94a3b8" fontSize="8" textAnchor="end">200</text>
              <line x1="30" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <text x="20" y="64" fill="#94a3b8" fontSize="8" textAnchor="end">150</text>
              <line x1="30" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <text x="20" y="104" fill="#94a3b8" fontSize="8" textAnchor="end">100</text>
              <polyline fill="none" points="40,85 100,90 160,88 210,65 270,72 330,55 380,72 440,88 475,98" stroke="#f43f5e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              <circle cx="330" cy="55" r="3.5" fill="#f43f5e" />
            </svg>
          </div>
          <div className="chart-time-labels" style={{ padding: "4px 16px 0" }}>
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Stat Summary Cards */}
        <div className="col-span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
          {/* Stat 1: AQI Tertinggi */}
          <div className="airwise-card stat-card">
            <div className="stat-icon" style={{ background: "#fef2f2", color: "#dc2626" }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>Waktu dengan AQI Tertinggi</p>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>12:00 - 15:00</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", marginTop: "2px" }}>
                AQI Rata-rata: <span style={{ fontWeight: 800 }}>126</span>
              </p>
            </div>
          </div>

          {/* Stat 2: AQI Terbaik */}
          <div className="airwise-card stat-card">
            <div className="stat-icon" style={{ background: "#f0fdf4", color: "#16a34a" }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>Waktu dengan AQI Terbaik</p>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>04:00 - 07:00</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#16a34a", marginTop: "2px" }}>
                AQI Rata-rata: <span style={{ fontWeight: 800 }}>58</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 3: Perbandingan Tren Antarwilayah */}
      <div className="airwise-card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>Perbandingan Tren Antarwilayah (7 Hari Terakhir)</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", fontWeight: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f43f5e", display: "inline-block" }} /> Samarinda
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} /> Balikpapan
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308", display: "inline-block" }} /> Bontang
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} /> Kutai Kartanegara
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "208px", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 600 170" preserveAspectRatio="none">
            <line x1="30" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
            <polyline fill="none" points="50,90 130,85 210,75 300,60 380,72 460,85 550,92" stroke="#f43f5e" strokeLinecap="round" strokeWidth="2.5" />
            <polyline fill="none" points="50,110 130,105 210,102 300,90 380,98 460,105 550,110" stroke="#f59e0b" strokeLinecap="round" strokeWidth="2" />
            <polyline fill="none" points="50,122 130,120 210,118 300,110 380,115 460,120 550,125" stroke="#eab308" strokeLinecap="round" strokeWidth="2" />
            <polyline fill="none" points="50,135 130,132 210,130 300,125 380,128 460,132 550,136" stroke="#10b981" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>

        <div className="chart-time-labels" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <span>Kam, 22 Mei</span>
          <span>Jum, 23 Mei</span>
          <span>Sab, 24 Mei</span>
          <span>Min, 25 Mei</span>
          <span>Sen, 26 Mei</span>
          <span>Sel, 27 Mei</span>
          <span>Rab, 28 Mei</span>
        </div>
      </div>
    </div>
  );
};

export default PolaTrenTab;
