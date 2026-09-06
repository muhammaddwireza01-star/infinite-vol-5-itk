import { useState, useEffect } from "react";

const DashboardTab = ({ location }) => {
  const [datetime, setDateTime] = useState(new Date());
  const [uploadedPhoto, setUploadedPhoto] = useState(() =>
    sessionStorage.getItem("airwise-uploaded-photo")
  );
  const [photoAnalysis, setPhotoAnalysis] = useState(() => {
    const resultData = sessionStorage.getItem("airwise-photo-analysis-result");
    if (!resultData) return null;

    try {
      return JSON.parse(resultData);
    } catch {
      return null;
    }
  });
  const photoReady = uploadedPhoto !== null;
  const userName = sessionStorage.getItem("airwise-user-name") || "Andi";

  const [aqiData, setAqiData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const handlePhotoUpdate = () => {
      setUploadedPhoto(sessionStorage.getItem("airwise-uploaded-photo"));
      const resultData = sessionStorage.getItem("airwise-photo-analysis-result");
      try {
        setPhotoAnalysis(resultData ? JSON.parse(resultData) : null);
      } catch {
        setPhotoAnalysis(null);
      }
    };
    window.addEventListener("airwise-photo-updated", handlePhotoUpdate);
    return () => window.removeEventListener("airwise-photo-updated", handlePhotoUpdate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aqiRes, histRes] = await Promise.all([
          fetch(`http://localhost:5000/api/get_data_aqi?region=${location.city}`),
          fetch(`http://localhost:5000/api/history?region=${location.city}`)
        ]);
        const aqiJson = await aqiRes.json();
        const histJson = await histRes.json();
        if (aqiJson.status === "success") {
          setAqiData(aqiJson.data);
        }
        if (histJson.status === "success") {
          setHistoryData(histJson.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [location.city]);

  const displayAqi = photoAnalysis?.aqi ?? (aqiData?.aqi_score ?? 126);
  const displayKategori = photoAnalysis?.status_label ?? (aqiData?.status_kategori ?? "Tidak Sehat bagi Kelompok Sensitif");
  const displaySaran = photoAnalysis?.rekomendasi ?? (aqiData?.saran_kesehatan ?? "Hindari aktivitas luar ruangan terutama bagi kelompok sensitif seperti anak-anak dan lansia.");
  const displayVisibilitas = photoAnalysis?.visibilitas ?? (aqiData?.visibilitas ?? "Rendah");
  const displayKejernihan = photoAnalysis?.kejernihan_langit ?? (aqiData?.kejernihan_langit ?? "Buruk");
  const displayStatusAnalisis = photoAnalysis?.status ?? (aqiData?.status_analisis ?? "Perlu Waspada");
  const displayWarna = photoAnalysis?.status_color ?? (aqiData?.kode_warna ?? "#ea580c");

  const mappedPerbandingan = aqiData?.perbandingan?.map(item => ({
    name: item.wilayah,
    value: item.aqi,
    pct: `${Math.min(100, (item.aqi / 200) * 100)}%`,
    color: item.kode_warna,
    textColor: item.kode_warna,
  })) ?? [
      { name: "Samarinda", value: 75, pct: "37.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Tarakan", value: 71, pct: "35.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Bontang", value: 67, pct: "33.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Singkawang", value: 63, pct: "31.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Palangka Raya", value: 63, pct: "31.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Pontianak", value: 62, pct: "31%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Balikpapan", value: 58, pct: "29%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Banjarmasin", value: 55, pct: "27.5%", color: "#eab308", textColor: "#ca8a04" },
      { name: "Banjarbaru", value: 55, pct: "27.5%", color: "#eab308", textColor: "#ca8a04" },
    ];

  const chartData = historyData?.data_per_jam?.filter((item) => item.aqi !== null) ?? [];
  const chartPoints = chartData.length > 1
    ? chartData.map((item) => item.aqi)
    : [86, 92, 110, 126, 118, 104, 90, 86];
  const chartLabels = chartData.length > 1
    ? chartData.map((item) => item.jam)
    : ["02:00", "04:00", "06:00", "09:00", "11:00", "14:00", "16:00", "19:00"];

  const chartX = [40, 100, 165, 230, 295, 360, 420, 470];
  const maxVal = Math.max(150, ...chartPoints);
  const scaleY = (val) => 130 - (val / maxVal) * 110;
  const polylinePoints = chartX.map((x, i) => `${x},${scaleY(chartPoints[i])}`).join(" ");
  const polygonPoints = `${chartX[0]},${scaleY(chartPoints[0])} ` + polylinePoints + ` ${chartX[7]},130 ${chartX[0]},130`;

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${months[date.getMonth()]} ${String(date.getDay()).padStart(2, "0")}, ${String(date.getFullYear()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="tab-section">
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}>
        <div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
            }}>
            Halo, {userName} 👋
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Berikut ringkasan kualitas udara di {location.city}.
          </p>
        </div>
        <div style={{ textAlign: "left" }}>
          <span className="text-sm font-semibold text-[#334155]">
            {formatTime(datetime)}
          </span>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>
            {formatDate(datetime)}
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      {photoAnalysis && (
        <div className="alert-banner">
          <div className="alert-icon">!</div>
          <div>
            <h4 style={{ fontWeight: 700, color: "#78350f", fontSize: "14px" }}>
              KONDISI SAAT INI:{" "}
              <span
                style={{ fontSize: "16px", fontWeight: 800, marginLeft: "4px" }}>
                {displayStatusAnalisis}
              </span>
            </h4>
            <p style={{ fontSize: "13px", color: "#92400e", marginTop: "2px" }}>
              {displaySaran}
            </p>
          </div>
        </div>
      )}

      {/* Grid Row 1: Kondisi Udara & Analisis Foto */}
      {photoReady && <div className="dashboard-top-stack">
        {/* Kondisi Udara di Sekitarmu */}
        <div
          className="airwise-card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}>
            <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>
              Ambil Foto untuk Analisis Udara
            </h3>
            <p className="photo-analysis-hint">
              Ambil foto kondisi langit agar hasil analisis kualitas udara lebih
              akurat.
            </p>
          </div>

          {/* Skyline Image */}
          <div
            className={`skyline-container ${photoReady ? "" : "dashboard-photo-empty"}`}>
            <img
              alt={`Kondisi Skyline ${location.city}`}
              src={uploadedPhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuDEc47AB4hecNNijMeWX3AgLrWXG5fdxKK4X3nDqxI3fTZVbPWkBJ6yB7lQr9ilMzBFLbEsbAyt2i36yyPGiZBao-SiU25N74Hqawim0bvY5_Ka8qaJrRQraVRtosAKQYRnKjh8MdQPspzKpe5F-6rAYlrleMjxVzcVsCTHZ069Rk4HToLhvoyV1KgIOehyJ9btqldsOwOSk3Lk9byJJyP4OWI7YcEOdWqjvYKbCUKxf4jD_Mehqft4"}
            />
            <div className="skyline-overlay">
              <p
                style={{ fontSize: "12px", fontWeight: 500, color: "#cbd5e1" }}>
                28 Mei 2026 • 09:40 WIB
              </p>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.025em",
                }}>
                {location.city} •{" "}
                <span style={{ color: displayWarna, fontWeight: 700 }}>
                  AQI {displayAqi}
                </span>
              </h4>
            </div>
          </div>

        </div>

        {/* Analisis Foto Card */}
        <div
          className="airwise-card dashboard-analysis-card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div>
            <h3
              style={{
                fontWeight: 700,
                color: "#1e293b",
                fontSize: "16px",
                marginBottom: "16px",
              }}>
              Analisis Foto
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                fontSize: "14px",
              }}>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Indeks Polusi / AQI
                </span>
                <span className="badge badge-red" style={{ backgroundColor: displayWarna }}>{displayAqi}</span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Visibilitas
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#1e293b",
                    fontSize: "12px",
                  }}>
                  {displayVisibilitas}
                </span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Kejernihan Langit
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: displayWarna,
                    fontSize: "12px",
                  }}>
                  {displayKejernihan}
                </span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Status
                </span>
                <span className="badge badge-amber-pill" style={{ borderColor: displayWarna, color: displayWarna }}>{displayStatusAnalisis}</span>
              </div>
            </div>
          </div>
          <div className="recommendation-box">
            <p
              style={{
                fontSize: "11px",
                color: "#475569",
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
              💡 <span style={{ fontWeight: 600 }}>Saran Kesehatan:</span>{" "}
              {displaySaran}
            </p>
          </div>
        </div>
      </div>}

      {/* Grid Row 2: Gauge & Line Chart */}
      <div className="dashboard-summary-grid grid-12">
        {/* Gauge Card */}
        <div
          className="airwise-card col-span-5"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
          <h3
            style={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: "16px",
              alignSelf: "flex-start",
              marginBottom: "8px",
            }}>
            Ringkasan Kondisi Udara
          </h3>

          {/* Gauge SVG */}
          <div
            style={{
              position: "relative",
              width: "192px",
              height: "128px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              margin: "8px 0",
            }}>
            <svg width="192" height="128" viewBox="0 0 160 90">
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#e2e8f0"
                strokeLinecap="round"
                strokeWidth="14"
              />
              <path
                className="gauge-fill"
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke={displayWarna}
                strokeDasharray="188.5"
                strokeDashoffset={188.5 - (Math.min(200, displayAqi) / 200) * 188.5}
                strokeLinecap="round"
                strokeWidth="14"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: "4px",
                textAlign: "center",
              }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1,
                }}>
                {displayAqi}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  marginTop: "2px",
                }}>
                AQI
              </span>
            </div>
          </div>

          <p
            style={{
              fontWeight: 700,
              color: displayWarna,
              fontSize: "13px",
              marginTop: "4px",
            }}>
            {displayKategori}
          </p>

          {/* AQI Legend */}
          <div className="aqi-legend">
            <div className="aqi-legend-item">
              <span
                className="aqi-legend-dot"
                style={{ background: "#22c55e" }}
              />{" "}
              Baik (0-50)
            </div>
            <div className="aqi-legend-item">
              <span
                className="aqi-legend-dot"
                style={{ background: "#facc15" }}
              />{" "}
              Sedang (51-100)
            </div>
            <div className="aqi-legend-item">
              <span
                className="aqi-legend-dot"
                style={{ background: "#f59e0b" }}
              />{" "}
              Tdk Sehat (101-150)
            </div>
            <div className="aqi-legend-item">
              <span
                className="aqi-legend-dot"
                style={{ background: "#f43f5e" }}
              />{" "}
              Sngt Tdk Sehat (151-200)
            </div>
            <div className="aqi-legend-item">
              <span
                className="aqi-legend-dot"
                style={{ background: "#7e22ce" }}
              />{" "}
              Berbahaya (201+)
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div
          className="airwise-card col-span-7"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}>
            <div>
              <h3
                style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>
                Kondisi Udara Hari Ini
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                AQI per jam • 28 Mei 2026
              </p>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 8px",
                background: "#f1f5f9",
                borderRadius: "6px",
                color: "#475569",
              }}>
              Interval 3 Jam
            </span>
          </div>

          <div style={{ width: "100%", height: "192px", position: "relative" }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 150"
              preserveAspectRatio="none">
              <line
                x1="20"
                y1="20"
                x2="480"
                y2="20"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="60"
                x2="480"
                y2="60"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="100"
                x2="480"
                y2="100"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="130"
                x2="480"
                y2="130"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <polyline
                fill="none"
                points={polylinePoints}
                stroke="#f97316"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <polygon
                fill="rgba(249, 115, 22, 0.08)"
                points={polygonPoints}
              />
              {/* Data Points dynamically rendered */}
              {chartPoints.map((val, i) => (
                <g key={`pt-${i}`}>
                  <circle
                    cx={chartX[i]}
                    cy={scaleY(val)}
                    r={val === Math.max(...chartPoints) ? "5" : "4"}
                    fill={val === Math.max(...chartPoints) ? "#f97316" : "#ffffff"}
                    stroke={val === Math.max(...chartPoints) ? "#ffffff" : "#f97316"}
                    strokeWidth={val === Math.max(...chartPoints) ? "2" : "2.5"}
                  />
                  <text
                    x={chartX[i]}
                    y={scaleY(val) - 9}
                    fill={val === Math.max(...chartPoints) ? "#ea580c" : "#475569"}
                    fontSize={val === Math.max(...chartPoints) ? "10" : "9"}
                    fontWeight={val === Math.max(...chartPoints) ? "800" : "bold"}
                    textAnchor="middle">
                    {val}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="chart-time-labels">
            {chartLabels.map((label, index) => (
              <span key={label} style={index === chartPoints.indexOf(Math.max(...chartPoints)) ? { color: "#d97706", fontWeight: 700 } : {}}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 3: Perbandingan Wilayah & Hotspot Map */}
      <div className="dashboard-comparison-grid grid-12">
        {/* Progress Bars */}
        <div className="airwise-card col-span-6">
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>
              Perbandingan dengan Wilayah Lain
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              AQI Saat Ini di Sekitar Kaltim
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {mappedPerbandingan.map((item) => (
              <div key={item.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}>
                  <span style={{ color: "#334155" }}>{item.name}</span>
                  <span style={{ color: item.textColor, fontWeight: 700 }}>
                    {item.value}
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: item.pct, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspot Map */}
        <div
          className="airwise-card col-span-6"
          style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}>
            <div>
              <h3
                style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>
                Sebaran Hotspot 7 Hari
              </h3>
              <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                Deteksi titik panas satelit FIRMS
              </p>
            </div>
            <span
              className="badge badge-red-outline"
              style={{ padding: "2px 8px", fontWeight: 700 }}>
              14 Titik Aktif
            </span>
          </div>

          <div className="hotspot-map-container">
            <img
              alt="Peta Satelit Hotspot Kaltim"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4DMB-t-JKHBdiLntKKoVAYFidtSmr20CiMbjAJceOLC51tJ4uyfDGaHnWnmUhQDb1Xdxv-pUtziRJR2B_D_zXzJ6S5UHfzAWJAiGDKRVFI5_lMY4ipwF6bV_qUlQZaDWDarCPnvicDdpdXArMKVELFcDCAup_j9TH7tV-IU_q9ZHi1WJOi0XO2tnFdYZ80f5dd-oyk9FgXXfLABBHMxO4agBspFtDJCe8AvfwV_rFVhQy50QA0xFs"
            />
            {/* Map Markers */}
            <div
              className="map-marker"
              style={{
                top: "33%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  height: "28px",
                  width: "28px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  opacity: 0.75,
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  height: "16px",
                  width: "16px",
                  background: "#dc2626",
                  border: "2px solid white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
            </div>
            <div className="map-marker" style={{ top: "25%", left: "33%" }}>
              <span
                style={{
                  display: "inline-flex",
                  borderRadius: "50%",
                  height: "12px",
                  width: "12px",
                  background: "#f59e0b",
                  border: "1px solid white",
                }}
              />
            </div>
            <div className="map-marker" style={{ bottom: "33%", right: "33%" }}>
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  background: "#fbbf24",
                  opacity: 0.6,
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "inline-flex",
                  borderRadius: "50%",
                  height: "14px",
                  width: "14px",
                  background: "#f59e0b",
                  border: "1px solid white",
                }}
              />
            </div>
            <div className="map-marker" style={{ top: "50%", right: "25%" }}>
              <span
                style={{
                  display: "inline-flex",
                  borderRadius: "50%",
                  height: "12px",
                  width: "12px",
                  background: "#ef4444",
                  border: "1px solid white",
                }}
              />
            </div>
            <div className="map-badge" style={{ left: "8px" }}>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "#cbd5e1",
                }}>
                mapbox
              </span>
            </div>
            <div className="map-badge" style={{ right: "8px" }}>
              Samarinda &amp; Sekitarnya
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
