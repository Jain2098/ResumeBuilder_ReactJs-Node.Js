import React, {Fragment} from 'react'

export default function BlockProjects({resumeData}){
    return(
      <div className="p-2">
      <h3 className="text-start mb-2">Projects:</h3>
          <hr className="mb-1 mt-0 "/>
          {resumeData.projects.map((p) => {
            return (
              <Fragment key={p.id + "p1"}>
              {(p.title || p.url || p.description || p.skills) && <><ul className="text-start pb-1 list-unstyled px-2 mb-0">
                {p.title !== "" && <li> <span className="fs-5 fw-semibold">{p.title}</span> </li>}
                <div className="d-flex justify-content-between flex-wrap">
                    {p.url !== "" && <li> <span className="fs-6 fst-italic"> {p.url} </span> </li>}
                    {(p.start !== "" || p.end !== "") && <li> <span className="fs-6 fst-normal"> {p.start && <>{p.start} - </>}{p.end && p.end} </span> </li>}
                </div>
                <p className="text-start p-1">
                  {p.description && p.description}
                  <br />
                  {p.skills && <span className="fw-semibold">Skills: {p.skills}</span>}
                </p>
              </ul></>}
          </Fragment>
            );
          })}
      </div>
    )
  }
