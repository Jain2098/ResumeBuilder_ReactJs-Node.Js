import React from "react";
import appIcons from "../icons/appIconsBarrel";

export default function BlockPersonalInfo({ personalInfo }) {
  const githubURL = personalInfo.github.startsWith("http://") || personalInfo.github.startsWith("https://") ? personalInfo.github : `https://${personalInfo.github}`;
  const linkdin = personalInfo.linkedin.startsWith("http://") || personalInfo.linkedin.startsWith("https://") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`;
  return (
    <div className="py-2 px-2" style={{ backgroundColor: "rgb(255, 180, 0)" }}>
      <h1 className="text-end mb-2">
        {personalInfo.firstname === "" && personalInfo.lastname === ""
          ? ""
          : personalInfo.firstname + " " + personalInfo.lastname}
      </h1>
      <p className="text-end fw-semibold personalInfocss">
        {personalInfo.address && <span style={{color:"black"}}>
          {appIcons.address} {personalInfo.address}
        </span>}
        <br />
        {personalInfo.phone && <span>
          {appIcons.contact} <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
        </span>}
        <br />
        {personalInfo.email && <span>
          {appIcons.email} <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </span>}
        <br />
        {personalInfo.linkedin && <span>
          {appIcons.linkdin}{" "}
          {(
            <>
              <a href={linkdin} target="_blank" rel="noreferrer">
                {" "}
                {personalInfo.linkedin.replace(/^https?:\/\//, "")}{" "}
              </a>
            </>
          )}
        </span>}
        <br />
        {personalInfo.github && <span>
          {appIcons.github}{" "}
          {personalInfo.linkedin === "" ? (
            "github.com/my-profile"
          ) : (
            <>
              <a href={githubURL} target="_blank" rel="noreferrer">
                {" "}
                {personalInfo.github.replace(/^https?:\/\//, "")}{" "}
              </a>
            </>
          )}
        </span>}
        <br />
      </p>
    </div>
  );
}
