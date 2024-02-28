import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-dark py-1 mt-5" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive ? "active text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/create-new"
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive ? "active text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  Add New
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}
