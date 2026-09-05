import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm min-h-20 sticky top-0 z-50 bg-brand-medium">
      <div className="navbar-start flex gap-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Features</a>
            </li>
            <li>
              <a>How It Works</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <a className="text-xl text-gray-950 font-semibold">AppName</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-900">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Features</a>
          </li>
          <li>
            <a>How It Works</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to={"/dashboard"}
          className="btn bg-[#10B1A3] border-none min-w-20">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
