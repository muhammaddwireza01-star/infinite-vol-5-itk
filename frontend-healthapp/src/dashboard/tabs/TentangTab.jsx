const TentangTab = () => {
  return (
    <div className="tab-section">
      {/* Main Brand Banner */}
      <div className="airwise-card" style={{ padding: "24px 32px" }}>
        <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "18px", marginBottom: "8px" }}>Tentang AIRWISE</h3>
        <p style={{ fontSize: "14px", color: "#475569", maxWidth: "720px", lineHeight: 1.6 }}>
          AIRWISE adalah platform cerdas untuk pemantauan dan analisis kualitas udara yang membantu pengguna memahami kondisi udara di sekitarnya melalui data terintegrasi, analisis visual berbasis AI, dan informasi edukatif.
        </p>

        {/* Brand Illustration */}
        <div
          style={{
            marginTop: "24px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #f0fdf4, #f0fdfa, #e0f2fe)",
            border: "1px solid #bbf7d0",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <img src="/src/assets/logo.jpg" alt="AIRWISE Logo" style={{ width: "100%", height: "100%", borderRadius: "16px" }} />
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a" }}>AIRWISE</h2>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
              Kualitas Udara, Hidup Lebih Sehat
            </p>
          </div>

          {/* Decorative emojis */}
          <div style={{ marginTop: "24px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "24px", opacity: 0.6 }}>
            <span style={{ fontSize: "24px" }}>🌱</span>
            <span style={{ fontSize: "32px" }}>🏙️</span>
            <span style={{ fontSize: "40px" }}>🍃</span>
            <span style={{ fontSize: "32px" }}>🏞️</span>
            <span style={{ fontSize: "24px" }}>🌳</span>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ marginTop: "32px" }}>
          <h4 style={{ fontWeight: 700, color: "#1e293b", fontSize: "14px", marginBottom: "16px" }}>Fitur AIRWISE</h4>
          <div className="features-grid">
            {[
              { emoji: "🧭", label: "Pemantauan", sub: "Kualitas Udara" },
              { emoji: "📷", label: "Analisis Foto", sub: "Kondisi Udara" },
              { emoji: "📈", label: "Pola & Tren", sub: "AQI Interaktif" },
              { emoji: "📗", label: "Edukasi", sub: "Kesehatan Paru" },
              { emoji: "📍", label: "Informasi", sub: "Hotspot Satelit" },
            ].map((f, i) => (
              <div key={i} className="feature-grid-card">
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{f.emoji}</div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block" }}>{f.label}</span>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>{f.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info & Policy Grid */}
      <div className="grid-2">
        {/* Informasi Aplikasi */}
        <div className="airwise-card">
          <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>Informasi Aplikasi</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px" }}>
            {[
              { label: "Versi Aplikasi", value: "1.0.0", bold: true },
              { label: "Sumber Data", value: "BMKG, KLHK, NASA FIRMS" },
              { label: "Metode Analisis", value: "AI Vision & Data Analytics" },
              { label: "Dikembangkan oleh", value: "Tim AIRWISE" },
              { label: "Kontak", value: "airwise.app@gmail.com", isLink: true },
              { label: "Website", value: "www.airwise.id", isLink: true },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 5 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ color: "#64748b" }}>{item.label}</span>
                {item.isLink ? (
                  <a href="#" style={{ fontWeight: 600, color: "#16a34a", textDecoration: "none" }}>
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontWeight: item.bold ? 700 : 600, color: "#1e293b" }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Kebijakan & Bantuan */}
        <div className="airwise-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px", marginBottom: "16px" }}>Kebijakan &amp; Bantuan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: "📄", label: "Kebijakan Privasi" },
                { icon: "⚖️", label: "Syarat & Ketentuan" },
                { icon: "💬", label: "Pusat Bantuan" },
              ].map((item, i) => (
                <a key={i} href="#" className="policy-link">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#64748b" }}>{item.icon}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#334155" }}>{item.label}</span>
                  </div>
                  <svg className="policy-arrow" width="16" height="16" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ paddingTop: "16px", marginTop: "16px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#94a3b8" }}>© 2026 AIRWISE. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TentangTab;
