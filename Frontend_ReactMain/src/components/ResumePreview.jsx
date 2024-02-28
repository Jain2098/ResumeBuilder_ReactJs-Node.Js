import React, { useEffect } from "react";
import {BlockEducation, BlockKeyHighlights, BlockWorkExperience, BlockProjects, BlockRefernces, BlockObjective, BlockPersonalInfo} from "./ResumeLayout1";


export default function ResumePreview({ resumeData, filterBlocks }) { 
  useEffect(() => {
    const documentBody = document.querySelector('body');
    documentBody.style.backgroundColor = "black";
    documentBody.style.backgroundImage = "none";
  }, []);
  return (
    <>
    <div style={{position:"relative"}}>
      <div
        className="rounded-bottom"
        style={{backgroundColor: "#f1f1e4"}}
        id="resumePreview"
      >
        {/* personalInfo, objective, keyHighlights, education, workExperience, projects, refernces, */}
        <div className="">
          <BlockPersonalInfo personalInfo={resumeData.personalInfo} />
          <BlockObjective objective={resumeData.objective} />
          <BlockKeyHighlights keyHighlights={resumeData.keyHighlights} />
          <BlockEducation education={resumeData.education} />
          <BlockWorkExperience resumeData={resumeData} />
          <BlockProjects resumeData={resumeData} />
          <BlockRefernces />
        </div>
      </div>


    </div>
          {/* <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={exportAsPicture}>DOwnload</button>
          </div> */}
    </>
  );
}








