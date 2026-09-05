import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="landing-nav navbar sticky top-0 z-50">
      <div className="navbar-start flex gap-2">
        <div className="dropdown landing-nav-dropdown">
          <div tabIndex={0} role="button" className="landing-menu-toggle">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="landing-mobile-menu menu menu-sm dropdown-content z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a href="#home">Beranda</a>
            </li>
            <li>
              <a href="#features">Fitur</a>
            </li>
            <li>
              <a href="#solutions">Edukasi</a>
            </li>
            <li>
              <a href="#about">Tentang</a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
          </ul>
        </div>
        <a className="landing-brand" style={{ display: "flex", alignItems: "center" }}>
          <img src="/src/assets/logo.jpg" alt="AIRWISE Logo" style={{ width: 32, height: 32, borderRadius: 8, marginRight: 12 }} />
          AIRWISE
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="landing-menu menu menu-horizontal px-1">
          <li>
            <a href="#home">Beranda</a>
          </li>
          <li>
            <a href="#features">Fitur</a>
          </li>
          <li>
            <a href="#solutions">Edukasi</a>
          </li>
          <li>
            <a href="#about">Tentang</a>
          </li>
          <li>
            <a href="#contact">Kontak</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="landing-auth-actions">
          <Link to="/login" className="landing-login-button">Masuk</Link>
          <Link to="/login" className="landing-nav-button">Daftar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
