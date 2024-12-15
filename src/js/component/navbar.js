import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light mb-3 px-3">
      {/* Enlace al inicio */}
      <Link to="/" className="navbar-brand mb-0 h1">
        Contact Manager
      </Link>

      {/* Enlaces adicionales */}
      <div className="ml-auto">
        <Link to="/addContact">
          <button className="btn btn-success me-2">
            Add New Contact
          </button>
        </Link>
        <Link to="/contacts">
          <button className="btn btn-primary">View Contacts</button>
        </Link>
      </div>
    </nav>
  );
};
