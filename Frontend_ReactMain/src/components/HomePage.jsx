import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import rlist from "../img/rlist.jpg";
import addnew from "../img/addnew.jpg";

export default function HomePage() {
  return (
    <Fragment>
      <div
        className="container bg-black px-1 p-0 pb-3 mt-5 rounded d-flex flex-column  justify-content-evenly "
        style={{ minHeight: "500px" }}
      >
        <h1 className="text-center py-3 h1_modify">
          Welcome to Resume Builder.
        </h1>

        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
          <Link to="resume-list" className="btn btn-primary m-3 p-0 border-0">
            <div className="card border-0 p-0 m-0">
              <div className="homeCard">
              <img src={rlist} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <button className="btn btn-primary homeBtn">Resume List</button>
              </div>
            </div>
          </Link>
          <Link to="create-new" className="btn btn-primary m-3 p-0 border-0">
            <div className="card border-0 p-0 m-0">
            <div className="homeCard">
              <img src={addnew} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <button className="btn btn-danger homeBtn">Add New</button>
              </div>
            </div>
          </Link>
        </div>

        <div className="card-body text-light p-4">
          <blockquote className="blockquote mb-0">
            <p>
              This is a simple resume builder app. You can create your resume
              just by entering the Information. View the resume directly and
              Filter the parts which is not needed to display.
            </p>
          </blockquote>
        </div>
      </div>
    </Fragment>
  );
}
