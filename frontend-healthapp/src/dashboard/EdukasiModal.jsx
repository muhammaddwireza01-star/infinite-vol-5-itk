const EdukasiModal = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "12px",
            borderBottom: "1px solid #f1f5f9",
            marginBottom: "16px",
          }}
        >
          <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>{title}</h4>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "24px" }}>{content}</p>
        <button className="btn-primary-airwise" style={{ width: "100%" }} onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default EdukasiModal;
