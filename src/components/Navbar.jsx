import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ loggedInUser, logout }) {
  return (
    <>
      <header>
        <h1>📗 BlueShelf Library</h1>

        <p>
          Welcome, {loggedInUser?.name || "User"}!
        </p>
      </header>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-nav" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "active-nav" : ""
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "active-nav" : ""
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "active-nav" : ""
          }
        >
          Users
        </NavLink>

        <button
          type="button"
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;