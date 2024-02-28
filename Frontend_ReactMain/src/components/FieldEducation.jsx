import React, { Fragment, useState } from "react";
import ButtonAdd from "./ButtonAdd";
import appIcons from "./icons/appIconsBarrel";

export default function FieldEducation({
  resumeData,
  setResumeData,
  handleNewEducation,
  handleDelete,
}) {
  const updateData = (index, field, value) => {
    const newEducation = resumeData.education;
    newEducation[index][field] = value;
    setResumeData({
      ...resumeData,
      education: newEducation,
    });
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <Fragment>
        { resumeData.keyHighlights.length > 10 ? "" :
      <ButtonAdd handle_onclick_add={handleNewEducation} appIcons={appIcons.add} />}
      {resumeData.education.map((education, index) => {
        return (
          <div
            className="container p-1 mt-3 mb-5 "
            key={education.id}
            style={{ position: "relative" }}
          >
            {!isEditing || editingIndex !== index ? (
                <ViewEducation
                  education={education}
                  index={index}
                  setIsEditing={setIsEditing}
                  setEditingIndex={setEditingIndex}
                  resumeData={resumeData}
                  handleDelete={handleDelete}
                />
            ) : (
              <EditEducation
                education={education}
                index={editingIndex}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                updateData={updateData}
              />
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

// each text field template
function FormInput({
  label,
  field,
  value,
  updateFunction,
  placeholder,
  id,
  index,
  fieldType = "text",
  iscenter = false,
}) {
  return (
    <div className="card">
        <div className="list-group list-group-flush">
        <textarea 
            className={`list-group-item ${iscenter ? "text-center fw-semibold" : ""}`}
            typeof={fieldType}
            id={id + label}
            rows="1"
            value={value}
            placeholder={placeholder}
            onChange={(e) => updateFunction(index, field, e.target.value)}
        />
        </div>
    </div>
  );
}

function EditEducation({
  education,
  index,
  isEditing,
  setIsEditing,
  updateData,
}) {
  return (
    <div>
      {isEditing && (
        <Fragment>
          <FormInput
            label="Course"
            field="courseType"
            value={education.courseType}
            updateFunction={updateData}
            placeholder="Computer Science"
            id={education.id + "courseType"}
            index={index}
            iscenter={true}
          />
          <FormInput
            label="Institute"
            field="instituteType"
            value={education.instituteType}
            updateFunction={updateData}
            placeholder="University of California"
            id={education.id + "instituteType"}
            index={index}
          />

          <FormInput
            label="Location"
            field="location"
            value={education.location}
            updateFunction={updateData}
            placeholder="San Francisco, CA"
            id={education.id + "location"}
            index={index}
          />
          <div className="row">
            <div className="col">
              <FormInput
                label="Start"
                field="startYear"
                value={education.startYear}
                updateFunction={updateData}
                placeholder="2018"
                id={education.id + "startYear"}
                index={index}
                fieldType="number"
              />
            </div>
            <div className="col">
              <FormInput
                label="End"
                field="endYear"
                value={education.endYear}
                updateFunction={updateData}
                placeholder="2022"
                id={education.id + "endYear"}
                index={index}
                fieldType="number"
              />
            </div>
          </div>
          <ButtonAdd 
                  handle_onclick_add={() => { setIsEditing(false); }}
                  extracss="btn btn-primary w-100 " 
                  text={"Save"} 
                  isIconPreview={false} 
                  defaultcss={""} />
        </Fragment>
      )}
    </div>
  );
}

function ViewEducation({
  education,
  index,
  setIsEditing,
  setEditingIndex,
  resumeData,
  handleDelete,
}){
  return (
    <Fragment>
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">
          <strong>
          {education.courseType}
          </strong>
        </li>
        <li className="list-group-item">
          <strong>Institute: </strong>
          {education.instituteType}
        </li>
        <li className="list-group-item">
          <strong>Location: </strong>
          {education.location}
        </li>
      </ul>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <span className="card-link">
              <strong>From: </strong>
              {education.startYear}
            </span>
          </div>
          <div className="col">
            <span className="card-link">
              <strong>To: </strong>
              {education.endYear}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="d-flex ">
    <ButtonAdd 
      handle_onclick_add={() => { setIsEditing(true); setEditingIndex(index);}} 
      extracss="btn btn-warning w-100" 
      text={"Edit"} 
      isIconPreview={false} 
      defaultcss={""} />
    {resumeData.education.length>1 && (
      <ButtonAdd 
      handle_onclick_add={() => handleDelete("education", education.id)}
      extracss="btn btn-danger w-100" 
      text={"Delete"} 
      isIconPreview={false} 
      defaultcss={""} />
    )}
    </div>
  </Fragment>
  )
}