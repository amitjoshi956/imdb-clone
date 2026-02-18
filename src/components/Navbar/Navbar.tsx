import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-950 text-white shadow-md">
      <NavLink to="/" className="text-2xl font-bold text-amber-400">
        IMDb Clone
      </NavLink>

      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-amber-400 ${isActive ? "text-amber-400" : "text-gray-300"}`
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-amber-400 ${isActive ? "text-amber-400" : "text-gray-300"}`
          }
        >
          Watchlist
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
