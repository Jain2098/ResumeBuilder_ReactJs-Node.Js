import React from "react";
import { Fragment } from "react";
import ButtonAdd from "./ButtonAdd";
import ButtonDelete from "./ButtonDelete";
import appIcons from "./icons/appIconsBarrel";

export default function FieldKeyHighlights({
  resumeData,
  setResumeData,
  handleNewkeyHighlights,
  handleDeletekeyHighlights
}) {
  return (
    <Fragment>
      { resumeData.keyHighlights.length > 20 ? "" :
      <ButtonAdd handle_onclick_add={handleNewkeyHighlights} appIcons={appIcons.add} />}
      <div>
      {resumeData.keyHighlights.map((highlight, index) => {
        return (
          <div
            className="container p-1 my-2 "
            key={highlight.id}
            style={{ position: "relative" }}
          >
            <div className="input-group">
              <span
                className="input-group-text"
                // id={highlight.id}
                style={{ width: "20%", minWidth: "100px" }}
              >
                Type:{" "}
              </span>
              <textarea
                className="form-control"
                id={highlight.id + "info"}
                placeholder="Communication"
                rows="1"
                value={highlight.title}
                onChange={(e) => {
                  const newHighlights = resumeData.keyHighlights;
                  newHighlights[index].title = e.target.value;
                  setResumeData({
                    ...resumeData,
                    keyHighlights: newHighlights,
                  });
                }}
              ></textarea>
            </div>
            <div className="input-group">
              <span
                className="input-group-text"
                // id={highlight.id}
                style={{ width: "20%", minWidth: "100px" }}
              >
                Info:{" "}
              </span>
              <textarea
                className="form-control"
                id={highlight.id + "description"}
                placeholder="strong verbal and interpersonal skills"
                rows="3"
                value={highlight.description}
                onChange={(e) => {
                  const newHighlights = resumeData.keyHighlights;
                  newHighlights[index].description = e.target.value;
                  setResumeData({
                    ...resumeData,
                    keyHighlights: newHighlights,
                  });
                  console.log(resumeData.keyHighlights);
                }}
              ></textarea>
            </div>
            {resumeData.keyHighlights.length > 1 ? (
              <div className="d-flex justify-content-center w-100" >
                <ButtonDelete handle_onclick_delete={handleDeletekeyHighlights} highlight={highlight} />
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      </div>
    </Fragment>
  );
}
