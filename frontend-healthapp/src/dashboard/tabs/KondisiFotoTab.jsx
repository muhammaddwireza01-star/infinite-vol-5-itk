import { useState, useRef } from "react";

const API_BASE = "http://localhost:5000/api";

const KondisiFotoTab = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [historyItems, setHistoryItems] = useState(() => {
    const saved = localStorage.getItem("airwise-history-items");
    return saved ? JSON.parse(saved) : [];
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasPhoto(true);
      setUploadedFile(file);
      setAnalysisResult(null);
      setAnalysisError("");
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewSrc(ev.target.result);
        sessionStorage.setItem("airwise-uploaded-photo", ev.target.result);
        window.dispatchEvent(new Event("airwise-photo-updated"));
      };
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
      sessionStorage.setItem("airwise-photo-analysis-result", JSON.stringify(json.data));
      window.dispatchEvent(new Event("airwise-photo-updated"));

      const now = new Date();
      const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
      const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} • ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      
      const newHistoryItem = {
        id: Date.now(),
        date: dateStr,
        aqi: json.data.aqi,
        status: json.data.status,
        statusBg: json.data.status_bg,
        statusColor: json.data.status_color,
        img: previewSrc
      };

      setHistoryItems(prev => {
        const updated = [newHistoryItem, ...prev];
        localStorage.setItem("airwise-history-items", JSON.stringify(updated));
        return updated;
      });
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

  const deleteHistoryItem = (id) => {
    setHistoryItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("airwise-history-items", JSON.stringify(updated));
      return updated;
    });
  };

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
              {historyItems.length > 0 ? historyItems.map((item) => (
                <div key={item.id} className="history-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <img alt="Thumb" src={item.img} style={{ width: '56px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
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
                  <button 
                    onClick={() => deleteHistoryItem(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}
                    title="Hapus riwayat"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )) : (
                <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8", fontSize: "12px", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                  Belum ada riwayat analisis.<br/>Upload foto untuk mulai menyimpan riwayat.
                </div>
              )}
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

