import React, { useState } from "react";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <h3 className="logo">
        <a href="/">Star DB</a>
      </h3>

      <button
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>×</button>
        <ul className="nav-links">
          <li onClick={closeMenu}>
            <a href="/persons">People</a>
          </li>
          <li onClick={closeMenu}>
            <a href="/planets">Planets</a>
          </li>
          <li onClick={closeMenu}>
            <a href="/starships">Starships</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
