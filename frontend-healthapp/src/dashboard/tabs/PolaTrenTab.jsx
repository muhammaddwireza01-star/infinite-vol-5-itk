import { useEffect, useState } from "react";

const PolaTrenTab = ({ location }) => {
  const [activeFilter, setActiveFilter] = useState("Harian");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = ["Per Jam", "Harian", "Mingguan", "Bulanan"];

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/history?region=${encodeURIComponent(location.city)}`
        );
        const json = await response.json();
        setHistoryData(json.status === "success" ? json.data.data_per_jam : []);
      } catch (error) {
        console.error("Error fetching trend data:", error);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [location.city]);

  const validHistory = historyData.filter((item) => item.aqi !== null);
  const labels = validHistory.map((item) => item.jam);
  const points = validHistory.map((item) => item.aqi);
  const safePoints = points.length > 1 ? points : [0, 0];
  const safeLabels = labels.length > 1 ? labels : ["-", "-"];
  const data = {
    title1: `Tren ISPU ${location.city} (${activeFilter})`,
    labels: safeLabels,
    points: safePoints,
    title3: `Data Historis ${location.city}`,
  };

  const N = data.labels.length;
  // Calculate X positions for Chart 1 and 3 (from x=40 to x=580)
  const chartX = Array.from({ length: N }, (_, i) => 40 + i * (540 / (N - 1)));
  // Helper to convert AQI to Y position
  const getY = (aqi) => 180 - (aqi / 200) * 160;

  const polylinePoints1 = chartX.map((x, i) => `${x},${getY(data.points[i])}`).join(" ");
  const maxPoint = Math.max(...data.points);
  const minPoint = Math.min(...data.points);
  const averagePoint = Math.round(
    data.points.reduce((total, point) => total + point, 0) / data.points.length
  );
  const historyPolyline = chartX.map((x, i) => `${x},${getY(data.points[i])}`).join(" ");

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
            <option>Data Terbaru</option>
          </select>
        </div>
      </div>

      {/* Chart 1: Tren AQI */}
      <div className="airwise-card" style={{ padding: "24px" }}>
        <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>{data.title1}</h3>
        {loading && <p style={{ color: "#64748b", fontSize: "12px" }}>Memuat data {location.city}...</p>}
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
            <polyline fill="none" points={polylinePoints1} stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            {data.points.map((val, i) => (
              <g key={`pt1-${i}`}>
                <circle cx={chartX[i]} cy={getY(val)} r={val === Math.max(...data.points) ? "5.5" : "4.5"} fill={val === Math.max(...data.points) ? "#dc2626" : "#e11d48"} stroke="#fff" strokeWidth={val === Math.max(...data.points) ? "2.5" : "2"} />
                <text x={chartX[i]} y={getY(val) - 10} fill={val === Math.max(...data.points) ? "#dc2626" : "#334155"} fontSize={val === Math.max(...data.points) ? "11" : "10"} fontWeight={val === Math.max(...data.points) ? "800" : "bold"} textAnchor="middle">{val}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="chart-time-labels" style={{ paddingLeft: "24px", paddingRight: "24px", display: "flex", justifyContent: "space-between" }}>
          {data.labels.map((lbl, i) => (
            <span key={i} style={data.points[i] === Math.max(...data.points) ? { color: "#e11d48", fontWeight: 700 } : {}}>{lbl}</span>
          ))}
        </div>
      </div>

      {/* Row: Pola Harian & Stat Cards */}
      <div className="grid-12">
        {/* Pola Harian (Rata-rata 24 jam) - Keep this static or adjust slightly */}
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
              <polyline fill="none" points={historyPolyline} stroke="#f43f5e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              {data.points.map((point, index) => (
                <circle key={`daily-${index}`} cx={chartX[index]} cy={getY(point)} r="3.5" fill="#f43f5e" />
              ))}
            </svg>
          </div>
          <div className="chart-time-labels" style={{ padding: "4px 16px 0", display: "flex", justifyContent: "space-between" }}>
            {data.labels.map((label, index) => <span key={index}>{label}</span>)}
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
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>{data.labels[data.points.indexOf(maxPoint)]}</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#dc2626", marginTop: "2px" }}>
                ISPU Tertinggi: <span style={{ fontWeight: 800 }}>{maxPoint}</span>
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
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>{data.labels[data.points.indexOf(minPoint)]}</h4>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#16a34a", marginTop: "2px" }}>
                Rata-rata ISPU: <span style={{ fontWeight: 800 }}>{averagePoint}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart 3: Perbandingan Tren Antarwilayah */}
      <div className="airwise-card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>{data.title3}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", fontWeight: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f43f5e", display: "inline-block" }} /> {location.city}
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "208px", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 600 170" preserveAspectRatio="none">
            <line x1="30" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="30" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
            <polyline fill="none" points={historyPolyline} stroke="#f43f5e" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
        </div>

        <div className="chart-time-labels" style={{ paddingLeft: "20px", paddingRight: "20px", display: "flex", justifyContent: "space-between" }}>
          {data.labels.map((lbl, i) => (
            <span key={i}>{lbl}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolaTrenTab;

