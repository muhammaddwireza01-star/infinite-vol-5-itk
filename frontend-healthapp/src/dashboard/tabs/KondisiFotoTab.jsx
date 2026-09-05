import { useState, useRef } from "react";

const API_BASE = "http://localhost:5000/api";

const KondisiFotoTab = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasPhoto(true);
      setUploadedFile(file);
      setAnalysisResult(null);
      setAnalysisError("");
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisError("");
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);

      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Gagal menganalisis foto");
      }

      setAnalysisResult(json.data);
    } catch (err) {
      console.error("Analisis gagal:", err);
      setAnalysisError(
        err.message === "Failed to fetch"
          ? "Tidak dapat terhubung ke server. Pastikan backend Flask sudah berjalan di port 5000."
          : err.message
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const historyItems = [
    {
      date: "28 Mei 2026 • 09:40",
      aqi: 126,
      status: "Perlu Waspada",
      statusBg: "#fef3c7",
      statusColor: "#92400e",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtjC4oEaXn_6sGHaw4htDB-a10E8bnupmyk7spJfcGjqzXhXUGeiwXuwPif5kWNZefATRhDMVdVRS4ZOWAbnnlpjX8MH0vzk5Ov9ptigREh6au4WKwoI8o5djFwF0tCzaTCenAoGGWIzy7n2JXbiuxgA21XEl-3bQZIBpwfFdEG6enz9jn5fHN3FrQfHWUyoH_C-vfrniOLPgBVSsSOHVZkq1V8zSroVoM73BOzAriaD6XMLF3DEWO",
    },
    {
      date: "27 Mei 2026 • 16:30",
      aqi: 104,
      status: "Tidak Sehat bagi Sensitif",
      statusBg: "#fef3c7",
      statusColor: "#92400e",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7bROKBZvpWzCSwZ6bUeVo8KxdvnpKcpzCNewsdQsRpKucSOA0L4Jm-PwT9GzFrW5YQbvDK3fFdldOu7rjAqFLSothNvMezRSdXiBykGQ1d3c0Hhvb_40RbMO4T4tH68tDEbVtmvQDDLdkZDbbbKDn6PlLpo9DqtayOQdQhsXFXKH5fPi9RCGCPwgweKsQ-RTcMBA-AFlldQgY6S-342hRVPRk3d19UMCCUnptsD4KyqEplist7om",
    },
    {
      date: "27 Mei 2026 • 08:15",
      aqi: 82,
      status: "Sedang",
      statusBg: "#fef9c3",
      statusColor: "#854d0e",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp9C3hD_govzawEwrsdomx61jbe6g4_YLKtayAejANrXv3lSCTC-xzWMneUmkqLrDIgIYYz624reYIfU9uqs4b84S4CfPzLt0lHRbUkAwWocxZrVzG_HlO5LK4RMQBTxTIySRW1ovZL0IeagwyPOR87zqdIzqFBDhwq09azSRN7FTrg5QVNGRf84Kd-sYtI8993WrH7UGmDmAvd1175aYRKeDGCbUSEHBIgm4llFgdBkfCmXYhGWXK",
    },
    {
      date: "26 Mei 2026 • 18:30",
      aqi: 58,
      status: "Baik",
      statusBg: "#dcfce7",
      statusColor: "#15803d",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9DI5SCrtWLj-8zuYZTGGH2eCaNgSsmCbmW_Mp_uKpSHLQRbSv8ATG3lnD7uzOv2ruGyfndnlE_VJYyIeIWaG1KUnFbqlhb003eFYc36cRKWDCPiP3Tnyy4iqAc8S0PILOqp8uEZBeOKzwOMXRrHNZGdVfC91rqz26MtbWIXhzQQooezLg4L0V0_KGFPzm0hg1uANr2tfO3UG0pqtmOFcxs-3hby4pOXMjhVA-DU995SeoYXE7ZxFT",
    },
  ];

  // Helper: badge color berdasarkan AQI
  const getAqiBadgeClass = (aqi) => {
    if (aqi <= 50) return "badge badge-green";
    if (aqi <= 100) return "badge badge-yellow";
    if (aqi <= 150) return "badge badge-red";
    return "badge badge-red";
  };

  // Helper: warna teks kejernihan
  const getClarityColor = (label) => {
    switch (label) {
      case "Baik": return "#15803d";
      case "Biasa": return "#854d0e";
      case "Buruk": return "#dc2626";
      default: return "#1e293b";
    }
  };

  // Helper: warna teks warna langit
  const getColorLabelColor = (label) => {
    switch (label) {
      case "Biru": return "#2563eb";
      case "Keabuan": return "#64748b";
      case "Kecokelatan": return "#92400e";
      case "Kekuningan": return "#ca8a04";
      default: return "#1e293b";
    }
  };

  // Helper: recommendation box class
  const getRecommendationClass = (type) => {
    switch (type) {
      case "success": return "recommendation-box";
      case "warning": return "recommendation-box recommendation-box-warning";
      case "danger": return "recommendation-box recommendation-box-warning";
      default: return "recommendation-box";
    }
  };

  return (
    <div className="tab-section">
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.025em" }}>Kondisi Foto</h2>
          <p style={{ fontSize: "14px", color: "#64748b" }}>Unggah atau ambil foto untuk mengetahui kondisi udara saat ini.</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
      </div>

      {/* Upload & Preview Row */}
      <div className="grid-2">
        {/* Drag & Drop Upload */}
        <div className="upload-zone" onClick={triggerUpload}>
          <div className="upload-icon-circle">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px" }}>Unggah Foto</h4>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", maxWidth: "280px" }}>
            Klik atau seret file ke sini<br />(JPG, PNG maks. 5MB)
          </p>
          <span style={{ marginTop: "16px", display: "inline-block", fontSize: "11px", fontWeight: 600, color: "#16a34a", background: "#f0fdf4", padding: "4px 12px", borderRadius: "9999px" }}>
            Pilih dari Perangkat
          </span>
        </div>

        {/* Photo Preview */}
        <div className="airwise-card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px", marginBottom: "12px" }}>Foto yang Diupload</h3>
          {hasPhoto ? (
            <div style={{ position: "relative", flex: 1, minHeight: "220px", borderRadius: "12px", overflow: "hidden", background: "#0f172a" }}>
              <img alt="Preview Foto Udara" src={previewSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent, transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px", color: "white" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#cbd5e1" }}>Foto berhasil dipilih</p>
                <h5 style={{ fontSize: "14px", fontWeight: 700 }}>
                  {analysisResult ? "✅ Analisis selesai" : "Siap dianalisis AIRWISE"}
                </h5>
              </div>
            </div>
          ) : (
            <div className="photo-empty-state">
              <span>◎</span>
              <strong>Belum ada foto</strong>
              <small>Pilih foto kondisi langit untuk memulai analisis.</small>
            </div>
          )}
          {/* Tombol Analisis — muncul setelah foto diupload */}
          {hasPhoto && !analysisResult && (
            <button
              className="btn-primary-airwise"
              onClick={analyzePhoto}
              disabled={isAnalyzing}
              style={{
                width: "100%",
                marginTop: "12px",
                background: isAnalyzing ? "#94a3b8" : "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isAnalyzing && (
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
              {isAnalyzing ? "Menganalisis Foto..." : "🔍 Analisis dengan AI"}
            </button>
          )}
        </div>
      </div>

      {/* Analysis Results & History */}
      <div className="grid-12">
        {/* Hasil Analisis */}
        <div className="airwise-card col-span-5" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* State: Hasil prediksi tersedia */}
          {analysisResult ? (
            <div>
              <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>Hasil Analisis</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="info-row">
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Indeks Polusi / AQI</span>
                  <span className={getAqiBadgeClass(analysisResult.aqi)}>{analysisResult.aqi}</span>
                </div>
                <div className="info-row">
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Visibilitas</span>
                  <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "13px" }}>{analysisResult.visibilitas}</span>
                </div>
                <div className="info-row">
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Kejernihan Langit</span>
                  <span style={{ fontWeight: 600, color: getClarityColor(analysisResult.kejernihan_langit), fontSize: "13px" }}>
                    {analysisResult.kejernihan_langit}
                  </span>
                </div>
                <div className="info-row">
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Warna Langit</span>
                  <span style={{ fontWeight: 600, color: getColorLabelColor(analysisResult.warna_langit), fontSize: "13px" }}>
                    {analysisResult.warna_langit}
                  </span>
                </div>
                <div className="info-row">
                  <span style={{ color: "#64748b", fontSize: "13px" }}>Status</span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      background: analysisResult.status_bg,
                      color: analysisResult.status_color,
                      padding: "2px 10px",
                      borderRadius: "9999px",
                    }}
                  >
                    {analysisResult.status}
                  </span>
                </div>
              </div>
              <div className={getRecommendationClass(analysisResult.rekomendasi_type)}>
                <p style={{ fontSize: "11px", color: "#78350f", fontWeight: 500 }}>
                  <span style={{ fontWeight: 700 }}>Rekomendasi:</span> {analysisResult.rekomendasi}
                </p>
              </div>
              {/* Tombol untuk analisis ulang */}
              <button
                className="btn-primary-airwise"
                onClick={triggerUpload}
                style={{ width: "100%", marginTop: "12px", background: "#475569" }}
              >
                Analisis Foto Lain
              </button>
            </div>
          ) : isAnalyzing ? (
            /* State: Sedang menganalisis */
            <div className="analysis-empty-state" style={{ border: "1px solid #bfdbfe", background: "#eff6ff" }}>
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #bfdbfe",
                  borderTopColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <strong style={{ color: "#1e40af" }}>Menganalisis foto...</strong>
              <p style={{ color: "#60a5fa" }}>Model AI sedang memproses gambar. Harap tunggu beberapa detik.</p>
            </div>
          ) : analysisError ? (
            /* State: Error */
            <div className="analysis-empty-state" style={{ border: "1px solid #fecaca", background: "#fef2f2" }}>
              <strong style={{ color: "#b91c1c" }}>Analisis gagal</strong>
              <p style={{ color: "#dc2626" }}>{analysisError}</p>
              <button type="button" onClick={analyzePhoto}>Coba Lagi</button>
            </div>
          ) : hasPhoto ? (
            /* State: Foto ada tapi belum dianalisis */
            <div className="analysis-empty-state">
              <strong>Foto siap dianalisis</strong>
              <p>Klik tombol "Analisis dengan AI" di atas untuk memulai prediksi kualitas udara dari foto ini.</p>
            </div>
          ) : (
            /* State: Belum ada foto */
            <div className="analysis-empty-state">
              <strong>Hasil analisis belum tersedia</strong>
              <p>Upload foto kondisi langit terlebih dahulu. Data AQI akan muncul setelah foto berhasil diproses.</p>
            </div>
          )}
        </div>

        {/* Riwayat Analisis Foto */}
        <div className="airwise-card col-span-7" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ marginBottom: "12px" }}>
            <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "12px" }}>Riwayat Analisis Foto</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {historyItems.map((item, i) => (
                <div key={i} className="history-item">
                  <img alt="Thumb" src={item.img} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{item.date}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b" }}>AQI {item.aqi}</span>
                      <span style={{ fontSize: "10px", background: item.statusBg, color: item.statusColor, fontWeight: 600, padding: "2px 8px", borderRadius: "4px" }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-primary-airwise" style={{ width: "100%", background: "#1b8a5a", marginTop: "12px" }}>
            Lihat Semua Riwayat
          </button>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default KondisiFotoTab;

