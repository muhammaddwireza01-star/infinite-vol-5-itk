import { useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { cities, defaultCity } from "../data/regions";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(() => {
    const savedDraft = localStorage.getItem("airwise-login-draft");
    return savedDraft
      ? JSON.parse(savedDraft)
      : {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          city: defaultCity,
        };
  });
  const navigate = useNavigate();

  const updateFormValue = (field, value) => {
    const nextValues = { ...formValues, [field]: value };
    setFormValues(nextValues);
    localStorage.setItem("airwise-login-draft", JSON.stringify(nextValues));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const selectedCity = formData.get("city");

    sessionStorage.setItem("airwise-authenticated", "true");
    sessionStorage.setItem("airwise-user-email", email);
    sessionStorage.setItem("airwise-city", selectedCity);
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/" className="auth-back-link">
          <FaArrowLeft /> Kembali ke beranda
        </Link>
        <div className="auth-visual-content">
          <div className="auth-logo-mark">◒</div>
          <strong>AIRWISE</strong>
          <small>Kualitas Udara, Hidup Lebih Sehat</small>
          <h2>
            Kenali udara di sekitarmu,
            <br />
            <em>jaga aktivitasmu.</em>
          </h2>
          <p>
            Pantau kualitas udara dengan lebih mudah dan buat keputusan yang
            lebih sehat.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <span className="auth-eyebrow">AIRWISE</span>
          <h1>{isRegistering ? "Buat Akun Baru" : "Selamat Datang"}</h1>
          <p className="auth-intro">
            {isRegistering
              ? "Daftar untuk mulai memantau kualitas udara di sekitarmu."
              : "Masuk ke akun AIRWISE untuk memantau kualitas udara di sekitarmu."}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegistering && (
              <label>
                Nama Lengkap
                <span className="auth-input">
                  <FaUser />
                  <input
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formValues.name}
                    onChange={(event) =>
                      updateFormValue("name", event.target.value)
                    }
                    required
                  />
                </span>
              </label>
            )}
            <label>
              Email
              <span className="auth-input">
                <FaEnvelope />
                <input
                  name="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={formValues.email}
                  onChange={(event) =>
                    updateFormValue("email", event.target.value)
                  }
                  required
                />
              </span>
            </label>
            <label>
              Password
              <span className="auth-input">
                <FaLock />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formValues.password}
                  onChange={(event) =>
                    updateFormValue("password", event.target.value)
                  }
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  aria-label="Tampilkan password"
                  onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
            </label>
            {!isRegistering && (
              <label>
                Pilih Kota
                <select
                  className="auth-city-select"
                  name="city"
                  value={formValues.city}
                  onChange={(event) =>
                    updateFormValue("city", event.target.value)
                  }
                  required>
                  {cities.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            )}
            {isRegistering && (
              <label>
                Konfirmasi Password
                <span className="auth-input">
                  <FaLock />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Ulangi password"
                    value={formValues.confirmPassword}
                    onChange={(event) =>
                      updateFormValue("confirmPassword", event.target.value)
                    }
                    minLength="6"
                    required
                  />
                </span>
              </label>
            )}

            {!isRegistering && (
              <div className="auth-options">
                <label className="remember-option">
                  <input type="checkbox" /> Ingat saya
                </label>
                <button type="button" className="forgot-link">
                  Lupa password?
                </button>
              </div>
            )}
            <button type="submit" className="auth-submit">
              {isRegistering ? "DAFTAR" : "MASUK"}
            </button>
          </form>

          <p className="auth-switch">
            {isRegistering ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegistering((value) => !value)}>
              {isRegistering ? "Masuk" : "Daftar"}
            </button>
          </p>
          <small className="auth-footer">
            AIRWISE • Kualitas Udara, Hidup Lebih Sehat
          </small>
        </div>
      </section>
    </main>
  );
};

export default Login;
