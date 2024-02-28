import React, { Fragment, useState } from "react";
import ButtonAdd from "./ButtonAdd";
import appIcons from "./icons/appIconsBarrel";
import { v4 as generateId } from "uuid";

export default function FieldWorkExperience({
  resumeData,
  setResumeData,
  handleNew,
  handleDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workData, setWorkData] = useState(resumeData.workExperience);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInformationUpdate = (index, key, newValue) => {
    setWorkData((prevWorks) =>
      prevWorks.map((item, idx) =>
        idx === index ? { ...item, [key]: newValue } : item
      )
    );
  };

  const handleResponsiblityUpdate = (index, sub_index, key, newValue) => {
    setWorkData((prevWorks) =>
      prevWorks.map((item, idx) =>
        idx === index
          ? {
              ...item,
              description: item.description.map((desc, sub_idx) =>
                sub_idx === sub_index ? { ...desc, [key]: newValue } : desc
              ),
            }
          : item
      )
    );
  };

  const handleResponsiblityDelete = (index, sub_index) => {
    setWorkData((prevWorks) =>
      prevWorks.map((item, idx) =>
        idx === index
          ? {
              ...item,
              description: item.description.filter(
                (desc, sub_idx) => sub_idx !== sub_index
              ),
            }
          : item
      )
    );
  }

  const handleUpdateMainResumeData = (workData_Experience) => {
    setResumeData({ ...resumeData, workExperience: workData_Experience });
  };

  const handleNewWorkData = () => {
    handleNew();
    setWorkData(() => [
      ...workData,
      {
        id: generateId(),
        company: "Company Name",
        position: "Position",
        location: "Location",
        start: "Start Date",
        end: "End Date",
        description: [
          {
            id: generateId(),
            term: "Stewardship",
            description:
              "Safeguards the Dragon Balls, preventing them from falling into the wrong hands.",
          },
        ],
      },
    ]);
  };

  const handleNewResponsibility = (index) => {
    setWorkData((prevWorks) =>
      prevWorks.map((item, idx) =>
        idx === index
          ? {
              ...item,
              description: [
                ...item.description,
                { id: generateId(), term: "", description: "" },
              ],
            }
          : item
      )
    );
  }

  const handleDeleteWorkData = (currentworkid) => {
    setWorkData((prevWorks) =>
      prevWorks.filter((item) => item.id !== currentworkid)
    );
    handleDelete("workExperience", currentworkid);
  };

  return (
    <Fragment>
      {resumeData.workExperience.length > 10 ? (
        ""
      ) : (
        <ButtonAdd
          handle_onclick_add={handleNewWorkData}
          appIcons={appIcons.add}
        />
      )}
      {workData.map((work, index) => {
        // console.log(work);
        return (
          <div
            className="container p-1 mb-2 mt-3"
            key={work.id}
            style={{ position: "relative" }}
          >
            {isEditing || editingIndex === index ? (
              <Fragment>
                <EditEachWorkExperience
                  work={work}
                  index={index}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  workData={workData}
                  inputType="text"
                  inputLabel="company"
                  inputPlaceholder="Company"
                  handleInformationUpdate={handleInformationUpdate}
                  handleResponsiblityUpdate={handleResponsiblityUpdate}
                  handleUpdateMainResumeData={handleUpdateMainResumeData}
                  setEditingIndex={setEditingIndex}
                  handleNewResponsibility={handleNewResponsibility}
                  handleResponsiblityDelete={handleResponsiblityDelete}
                />
              </Fragment>
            ) : (
              <Fragment>
                <ViewEachWorkExperience
                  work={work}
                  index={index}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateData={setWorkData}
                />
                <div className="d-flex ">
                  {!isEditing && (
                    <ButtonAdd 
                    handle_onclick_add={() => { setIsEditing(true); setEditingIndex(index); }}
                    extracss="btn btn-warning w-100" 
                    text={"Edit"} 
                    isIconPreview={false} 
                    defaultcss={""} />
                  )}
                  {workData.length > 1 && (
                    <ButtonAdd 
                    handle_onclick_add={() => { handleDeleteWorkData(work.id); }}
                    extracss="btn btn-danger w-100" 
                    text={"Delete"} 
                    isIconPreview={false} 
                    defaultcss={""} />
                  )}
                </div>
              </Fragment>
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

//   [{
//     id: generateId(),
//     company: "Tim Hortons",
//     position: "Supervisor",
//     location: "Etobicoke, ON, Canada",
//     start: "Jan, 2023",
//     end: "Dec, 2025",
//         description: [
//             {term:"", description:"Demonstrated effective multitasking by managing front-end operations and baking responsibilities."},
//             {term:"", description:"Demonstrated effective multitasking by managing front-end operations and baking responsibilities."},
//         ]
// }],

function ViewEachWorkExperience({
  work,
  index,
  isEditing,
  setIsEditing,
  updateData,
}) {
  //   console.log(work);
  return (
    <Fragment>
      {isEditing ? (
        ""
      ) : (
        <Fragment>
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center fs-5">
                <strong>{work.company}</strong>
              </li>
              <li className="list-group-item">
                <strong>Location: </strong>
                {work.location}
              </li>
              <li className="list-group-item">
                <strong>Position: </strong>
                {work.position}
              </li>
            </ul>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="card-link">
                    <strong>From: </strong>
                    {work.start}
                  </span>
                </div>
                <div className="col">
                  <span className="card-link">
                    <strong>To: </strong>
                    {work.end}
                  </span>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush fs-5">
              <li className="list-group-item">
                <strong>Responsibilities: </strong>
                <ul className="mt-2 fs-6" style={{ listStyleType: "disc" }}>
                  {work.description.map((duty, index) => {
                    return (
                      <li key={index}>
                        {duty.term && <strong>{duty.term}</strong>}
                        {duty.description && <p>{duty.description}</p>}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

// --------------------------------------------------------- //
// ----------------- EditEachWorkExperience ---------------- //
// --------------------------------------------------------- //

function EditEachWorkExperience({
  work,
  index,
  isEditing,
  setIsEditing,
  setEditingIndex,
  workData,
  inputType,
  inputLabel,
  inputPlaceholder,
  iscenter = false,
  handleInformationUpdate,
  handleResponsiblityUpdate,
  handleUpdateMainResumeData,
  handleNewResponsibility,
  handleResponsiblityDelete
}) {
  //   console.log(work);
  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  return (
    <Fragment>
      {isEditing && (
        <Fragment>
          <div className="container">
            <div className="row mb-3">
              <div className="col-12">
                <h2 className="fs-3 fw-semibold w-100 text-center ">
                  Company Information
                </h2>
              </div>
            </div>
            {Object.entries(work).map(([key, value]) => {
              if (key !== "description" && key !== "id") {
                return (
                  <div className="row mb-2" key={key}>
                    <div className="col-3 d-flex align-items-center">
                      <label
                        className="fw-bold text-capitalize"
                        htmlFor={`${work.id}-${key}`}
                      >
                        {formatLabel(key)}
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id={`${work.id}-${key}`}
                        value={value}
                        onChange={(e) =>
                          handleInformationUpdate(index, key, e.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              }
              return null; // For now, we'll handle descriptions separately
            })}
            <div className="container">
              <div className="row my-3">
                <div className="col-12">
                  <h2 className="fs-3 fw-semibold  w-100 text-center ">
                    Responsibilities
                  </h2>
                </div>
              </div>
              {work.description.map((desc, des_index) => (
                <Fragment key={des_index}>
                    <div className="row">
                    <div className="col-11">
                  <div className="row mb-2">
                    <div className="col-3 d-flex align-items-center">
                      <label
                        className="fw-bold text-capitalize"
                        htmlFor={`${work.id}-description-${des_index}-term`}
                      >
                        Name
                      </label>
                    </div>
                    <div className="col-9">
                      <textarea
                        className="form-control"
                        id={`${work.id}-description-${des_index}-term`}
                        rows="1"
                        value={desc.term}
                        onChange={(e) =>
                          handleResponsiblityUpdate(
                            index,
                            des_index,
                            "term",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-3 d-flex align-items-center">
                      <label
                        className="fw-bold text-capitalize"
                        htmlFor={`${work.id}-description-${des_index}-description`}
                      >
                        Description
                      </label>
                    </div>
                    <div className="col-9">
                      <textarea
                        className="form-control"
                        id={`${work.id}-description-${des_index}-description`}
                        rows="3"
                        value={desc.description}
                        onChange={(e) =>
                          handleResponsiblityUpdate(
                            index,
                            des_index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  
                  </div>
                  <div className="col-1 d-flex align-items-center">
                  <div className="d-flex my-2 justify-content-center ">
                    {work.description.length > 0 && (
                        <ButtonAdd
                      extracss="btn btn-success me-2"
                      handle_onclick_add={()=>{handleResponsiblityDelete(index, des_index)}}
                        text={"X"}
                        isIconPreview={false}
                    />
                    )}
                  </div>
				  </div>
                  </div>
                </Fragment>
              ))}
                  <div className="d-flex my-2 w-100 justify-content-center">
                    <ButtonAdd
                      extracss="btn btn-success me-2"
                      handle_onclick_add={() => handleNewResponsibility(index)}
                        text={"New Responsibility"}
                        defaultcss={""}
                        isIconPreview={false}
                    />
                  </div>
            </div>
          </div>

          <div className="d-flex ">
            <ButtonAdd
                handle_onclick_add={() => {
                    setIsEditing(false);
                    setEditingIndex(null);
                    handleUpdateMainResumeData(workData);
                }}
                text={"Save"}
                isIconPreview={false}
                defaultcss={""}
                extracss={"btn btn-primary w-100"}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
