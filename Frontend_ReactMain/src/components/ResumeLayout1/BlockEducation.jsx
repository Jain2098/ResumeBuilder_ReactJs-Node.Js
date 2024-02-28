import React from 'react'

export default function BlockEducation(props) {
  return (
    <div className="p-2">
    <h3 className="text-start mb-2">Education:</h3>
      <hr className="mb-1 mt-0 "/>

    {props.education.map((edu) => {
      // { id: newID, instituteType: "University of California", courseType: "Computer Science", location: "San Francisco, CA", startYear: "2023", endYear: "2025" },
      return (
        <ul className="text-start pb-1 list-unstyled px-2 mb-0" key={edu.id + "e1"}>
          <li>
            <span className="fs-5 fw-semibold">{edu.courseType}</span>
          </li>
          <div className="d-flex justify-content-between flex-wrap">
              <li>
                <span className="fs-6 fst-italic">
                  {edu.instituteType}, {edu.location}
                </span>
              </li>
              <li>
                <span className="fs-6 fst-normal">
                  {edu.startYear} - {edu.endYear}
                </span>
              </li>
          </div>
        </ul>
      );
    })}
  </div>
  )
}
