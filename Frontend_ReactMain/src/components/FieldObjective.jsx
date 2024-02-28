import React, { Fragment } from "react";

export default function Objective({
    resumeData,
    setResumeData
}) {
  return (
    <Fragment>
      <div className="mb-3">
        <textarea
          className="form-control mt-3"
          id="Objective"
          rows="7"
          value={resumeData.objective}
          onChange={(e) =>
            setResumeData({
              ...resumeData,
              objective: e.target.value,
            })
          }
          placeholder="My Objective is to work in a company where I can utilize my skills and knowledge to deliver value to the company and grow as a professional."
        ></textarea>
      </div>
    </Fragment>
  );
}
