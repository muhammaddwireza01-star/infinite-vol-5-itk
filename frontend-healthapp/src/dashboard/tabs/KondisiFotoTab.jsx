import { useState, useRef } from "react";

const KondisiFotoTab = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSupportedPhoto, setIsSupportedPhoto] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasPhoto(true);
      const supportedPhoto = !/(dalam|indoor|ruang|interior)/i.test(file.name);
      setIsSupportedPhoto(supportedPhoto);
      sessionStorage.setItem("airwise-photo-analysis-ready", String(supportedPhoto));
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewSrc(ev.target.result);
      reader.readAsDataURL(file);
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
                <h5 style={{ fontSize: "14px", fontWeight: 700 }}>Siap dianalisis AIRWISE</h5>
              </div>
            </div>
          ) : (
            <div className="photo-empty-state">
              <span>◎</span>
              <strong>Belum ada foto</strong>
              <small>Pilih foto kondisi langit untuk memulai analisis.</small>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results & History */}
      <div className="grid-12">
        {/* Hasil Analisis */}
        <div className="airwise-card col-span-5" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {hasPhoto && isSupportedPhoto ? <div>
            <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>Hasil Analisis</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "13px" }}>Indeks Polusi / AQI</span>
                <span className="badge badge-red">126</span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "13px" }}>Visibilitas</span>
                <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "13px" }}>Rendah</span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "13px" }}>Kejernihan Langit</span>
                <span style={{ fontWeight: 600, color: "#dc2626", fontSize: "13px" }}>Buruk</span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "13px" }}>Warna Langit</span>
                <span style={{ fontWeight: 600, color: "#92400e", fontSize: "13px" }}>Kecokelatan</span>
              </div>
              <div className="info-row">
                <span style={{ color: "#64748b", fontSize: "13px" }}>Status</span>
                <span className="badge badge-amber-pill">Perlu Waspada</span>
              </div>
            </div>
          <div className="recommendation-box recommendation-box-warning">
            <p style={{ fontSize: "11px", color: "#78350f", fontWeight: 500 }}>
              ⚠️ <span style={{ fontWeight: 700 }}>Rekomendasi:</span> Hindari aktivitas luar ruangan terutama bagi kelompok sensitif. Gunakan masker bila mendesak bepergian.
            </p>
          </div>
          </div> : hasPhoto ? <div className="analysis-empty-state">
            <strong>Foto belum sesuai</strong>
            <p>Foto dalam ruangan atau tanpa kondisi langit tidak dapat digunakan untuk analisis kualitas udara.</p>
            <button type="button" onClick={triggerUpload}>Pilih Foto Lain</button>
          </div> : <div className="analysis-empty-state">
            <strong>Hasil analisis belum tersedia</strong>
            <p>Upload foto kondisi langit terlebih dahulu. Data AQI akan muncul setelah foto berhasil diproses.</p>
          </div>}
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
    </div>
  );
};

export default KondisiFotoTab;
