import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand justify-content-start" to="/"> Resume Builder </Link>
        <div className="d-flex flex-row justify-content-end align-content-center gap-3">
          <Link className="btn btn-dark" to="/"> Home </Link>
          <Link className="btn btn-warning" to="/resume-list"> Resume List </Link>
          <Link className="btn btn-danger" to="/create-new"> Create New </Link>
        </div>
        </div>
      </nav>
    </Fragment>
  );
}
