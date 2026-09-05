import { useState, useEffect } from "react";

const DashboardTab = ({ onNavigate }) => {
  const [datetime, setDateTime] = useState(new Date());

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
            Halo, Andi 👋
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Berikut ringkasan kualitas udara di Samarinda, Kalimantan Timur.
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
      <div className="alert-banner">
        <div className="alert-icon">!</div>
        <div>
          <h4 style={{ fontWeight: 700, color: "#78350f", fontSize: "14px" }}>
            KONDISI SAAT INI:{" "}
            <span
              style={{ fontSize: "16px", fontWeight: 800, marginLeft: "4px" }}>
              Perlu Waspada
            </span>
          </h4>
          <p style={{ fontSize: "13px", color: "#92400e", marginTop: "2px" }}>
            Kondisi udara saat ini terasa tidak sehat bagi kelompok sensitif.
            Aktivitas luar ruangan yang berat sebaiknya dikurangi.
          </p>
        </div>
      </div>

      {/* Grid Row 1: Kondisi Udara & Analisis Foto */}
      <div className="grid-12">
        {/* Kondisi Udara di Sekitarmu */}
        <div
          className="airwise-card col-span-8"
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
              Kondisi Udara di Sekitarmu
            </h3>
            <button
              className="btn-amber"
              onClick={() => onNavigate("kondisi-foto")}>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24">
                <path
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ambil Foto Baru
            </button>
          </div>

          {/* Skyline Image */}
          <div className="skyline-container">
            <img
              alt="Kondisi Skyline Samarinda"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEc47AB4hecNNijMeWX3AgLrWXG5fdxKK4X3nDqxI3fTZVbPWkBJ6yB7lQr9ilMzBFLbEsbAyt2i36yyPGiZBao-SiU25N74Hqawim0bvY5_Ka8qaJrRQraVRtosAKQYRnKjh8MdQPspzKpe5F-6rAYlrleMjxVzcVsCTHZ069Rk4HToLhvoyV1KgIOehyJ9btqldsOwOSk3Lk9byJJyP4OWI7YcEOdWqjvYKbCUKxf4jD_Mehqft4"
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
                Samarinda, Kalimantan Timur •{" "}
                <span style={{ color: "#fbbf24", fontWeight: 700 }}>
                  AQI 126
                </span>
              </h4>
            </div>
          </div>

          {/* Sky Condition Tags */}
          <div className="sky-tags-grid">
            <div className="sky-tag">
              <div className="sky-tag-icon" style={{ background: "#bae6fd" }}>
                ☀️
              </div>
              <span className="sky-tag-label">Langit Cerah</span>
            </div>
            <div className="sky-tag">
              <div className="sky-tag-icon" style={{ background: "#e2e8f0" }}>
                ⛅
              </div>
              <span className="sky-tag-label">Berawan</span>
            </div>
            <div className="sky-tag active">
              <div className="sky-tag-icon" style={{ background: "#fef3c7" }}>
                🌫️
              </div>
              <span className="sky-tag-label">Asap</span>
            </div>
            <div className="sky-tag">
              <div className="sky-tag-icon" style={{ background: "#d6d3d1" }}>
                🌁
              </div>
              <span className="sky-tag-label">Asap Tebal</span>
            </div>
            <div className="sky-tag">
              <div className="sky-tag-icon" style={{ background: "#bfdbfe" }}>
                🌧️
              </div>
              <span className="sky-tag-label">Hujan</span>
            </div>
          </div>
        </div>

        {/* Analisis Foto Card */}
        <div
          className="airwise-card col-span-4"
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
                <span className="badge badge-red">126</span>
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
                  Rendah
                </span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Kejernihan Langit
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#dc2626",
                    fontSize: "12px",
                  }}>
                  Buruk
                </span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  Status
                </span>
                <span className="badge badge-amber-pill">Perlu Waspada</span>
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
              Hindari aktivitas luar ruangan terutama bagi kelompok sensitif
              seperti anak-anak dan lansia.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Gauge & Line Chart */}
      <div className="grid-12">
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
                stroke="#ea580c"
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
                126
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
              color: "#b45309",
              fontSize: "13px",
              marginTop: "4px",
            }}>
            Tidak Sehat bagi Kelompok Sensitif
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
                points="40,95 100,85 165,55 230,25 295,40 360,65 420,90 470,95"
                stroke="#f97316"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <polygon
                fill="rgba(249, 115, 22, 0.08)"
                points="40,95 100,85 165,55 230,25 295,40 360,65 420,90 470,95 470,130 40,130"
              />
              {/* Data Points */}
              <circle
                cx="40"
                cy="95"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="40"
                y="86"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                86
              </text>
              <circle
                cx="100"
                cy="85"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="100"
                y="76"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                92
              </text>
              <circle
                cx="165"
                cy="55"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="165"
                y="46"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                110
              </text>
              <circle
                cx="230"
                cy="25"
                r="5"
                fill="#f97316"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x="230"
                y="16"
                fill="#ea580c"
                fontSize="10"
                fontWeight="800"
                textAnchor="middle">
                126
              </text>
              <circle
                cx="295"
                cy="40"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="295"
                y="32"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                118
              </text>
              <circle
                cx="360"
                cy="65"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="360"
                y="56"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                104
              </text>
              <circle
                cx="420"
                cy="90"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="420"
                y="81"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                90
              </text>
              <circle
                cx="470"
                cy="95"
                r="4"
                fill="#ffffff"
                stroke="#f97316"
                strokeWidth="2.5"
              />
              <text
                x="470"
                y="86"
                fill="#475569"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle">
                86
              </text>
            </svg>
          </div>

          <div className="chart-time-labels">
            <span>00:00</span>
            <span>03:00</span>
            <span>06:00</span>
            <span style={{ color: "#d97706", fontWeight: 700 }}>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
            <span>21:00</span>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Perbandingan Wilayah & Hotspot Map */}
      <div className="grid-12">
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
            {[
              {
                name: "Samarinda",
                value: 126,
                pct: "70%",
                color: "#f59e0b",
                textColor: "#d97706",
              },
              {
                name: "Balikpapan",
                value: 92,
                pct: "52%",
                color: "#facc15",
                textColor: "#ca8a04",
              },
              {
                name: "Bontang",
                value: 58,
                pct: "38%",
                color: "#84cc16",
                textColor: "#16a34a",
              },
              {
                name: "Kutai Kartanegara",
                value: 46,
                pct: "28%",
                color: "#22c55e",
                textColor: "#16a34a",
              },
              {
                name: "Berau",
                value: 38,
                pct: "22%",
                color: "#4ade80",
                textColor: "#16a34a",
              },
            ].map((item) => (
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
