import React, { Fragment } from "react";

const BlockWorkExperience = ({resumeData}) => {
    return (
      <div className="p-2">
              <h3 className="text-start mb-2">Work Experience:</h3>
                <hr className="mb-1 mt-0 "/>
                {resumeData.workExperience.map((e) => {
                // workExperience: [{ id: generateId(), company: "Tim Hortons", position: "Supervisor", location: "Etobicoke, ON, Canada", start: "Jan, 2023", end: "Dec, 2025", description: [{term:"", description:"Demonstrated effective multitasking by managing front-end operations and baking responsibilities."}, {term:"", description:"Provided exceptional customer service by resolving customer complaints and ensuring customer satisfaction."}]}],
                return (
                  <ul className="text-start pb-1 list-unstyled px-2 mb-0" key={e.id + "w1"}>
                    <li>
                      <span className="fs-5 fw-semibold">{e.company}</span>
                    </li>
                    <div className="d-flex justify-content-between flex-wrap">
                        <li>
                          <span className="fs-6 fst-italic">
                            {e.position}, {e.location}
                          </span>
                        </li>
                        <li>
                          <span className="fs-6 fst-normal">
                            {e.start} - {e.end}
                          </span>
                        </li>
                    </div>
                    <ul className="text-start py-2 mb-0" style={{ listStyleType: "disc" }}>
                {e.description.map((e) => {
                    return (
                      <Fragment key={e.id}>
                      {(e.term !== "" || e.description !== "") && <li>
                        {e.term && <strong>{e.term}: </strong>}
                        {e.description && e.description}
                      </li>}
                      </Fragment>
                    );
                  
                })}
              </ul>
                  </ul>
                );
              })}
            </div>
    )
  }

  export default BlockWorkExperience;