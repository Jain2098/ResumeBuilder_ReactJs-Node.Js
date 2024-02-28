import React, { Fragment, useEffect, useState } from "react";
import Api from "./Api";
import { useParams } from "react-router-dom";
import appIcons from "./icons/appIconsBarrel";
import ButtonAdd from "./ButtonAdd";
import {BlockEducation, BlockKeyHighlights, BlockWorkExperience, BlockProjects, BlockRefernces, BlockObjective, BlockPersonalInfo} from "./ResumeLayout1";

export default function SinglePreview() {
    const [resumeData, setResumeData] = useState([]);
    const [dataStatus, setDataStatus] = useState(false);
    const { uniqueid } = useParams();
    const [loadingInfo, setLoadingInfo] = useState("Loading...");
    const [filterBlocks, setFilterBlocks] = useState({
        personalInfo: true,
        objective: true,
        keyHighlights: true,
        education: true,
        workExperience: true,
        projects: true,
        refernces: true,
      });
    const [showFilter, setShowFilter] = useState(false);
    useEffect(() => {
        try{
            // get the resume data from the server using endpoint /single/:id
            // if code : "ERR_BAD_REQUEST"
            // then throw error
            const fetchData = async () => {
                try {
                    const response = await Api.get(`/single/?uniqueid=${uniqueid}`);
                    // console.log(response.data)
                    if(response.data.code === "ERR_BAD_REQUEST"){
                        setDataStatus(false);
                        throw new Error(response.data.message);
                    }
                    setResumeData(response.data);
                    setDataStatus(true);
                } catch (error) {
                    setLoadingInfo("No resume found with this id");
                    console.log(error);
                }
            };
            fetchData();
        }catch(error){
            console.log(error);
        }
    }, [uniqueid])
  return (
    <Fragment>
      <div style={{position:"relative", width:"100%"}}>
      <div className="FullResume col-12 col-md-7 mx-auto mt-0 " style={{ maxWidth: "1200px", maxHeight: "100%", }} >
        {/* <h1 className="text-center py-3 h1_modify">Resume Preview</h1> */}
        <div className="rounded-bottom" style={{backgroundColor: "#f1f1e4"}} id="resumePreview" >
        {dataStatus ? 
        <Fragment>
          {filterBlocks.personalInfo && <BlockPersonalInfo personalInfo={resumeData.personalInfo} />}
          {filterBlocks.objective && <BlockObjective objective={resumeData.objective} />}
          {filterBlocks.keyHighlights && <BlockKeyHighlights keyHighlights={resumeData.keyHighlights} />}
          {filterBlocks.education && <BlockEducation education={resumeData.education} />}
          {filterBlocks.workExperience && <BlockWorkExperience resumeData={resumeData} />}
          {filterBlocks.projects && <BlockProjects resumeData={resumeData} />}
          {filterBlocks.refernces && <BlockRefernces />}
        </Fragment>
        : <p className="fs-3 my-5 text-center py-3 text-primary fst-italic">{loadingInfo}</p>}
      </div>
      </div>
      {!showFilter && 
      <div className="d-flex flex-column gap-2 " style={{position:"fixed", bottom:"10px", right:"10px"}}>
        <ButtonAdd 
          handle_onclick_add={()=>setShowFilter(!showFilter)} 
          appIcons={appIcons.filter} 
          isIconPreview={true} 
          defaultcss="btn btn-primary" 
          extracss="" />
        </div>
        }
      {showFilter &&
      <div className="d-flex flex-column gap-2 " style={{position:"fixed", bottom:"10px", right:"10px"}}>
        <ButtonAdd 
          handle_onclick_add={()=>setFilterBlocks({...filterBlocks, personalInfo: !filterBlocks.personalInfo})} 
          appIcons={appIcons.personalInfo} 
          isIconPreview={true} 
          defaultcss="btn btn-primary" 
          extracss={filterBlocks.personalInfo ? "btn-success" : "btn-danger"} />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, objective: !filterBlocks.objective })}
          appIcons={appIcons.objective}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.objective ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, keyHighlights: !filterBlocks.keyHighlights })}
          appIcons={appIcons.keyHighlight}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.keyHighlights ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, education: !filterBlocks.education })}
          appIcons={appIcons.education}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.education ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, workExperience: !filterBlocks.workExperience })}
          appIcons={appIcons.experience}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.workExperience ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, projects: !filterBlocks.projects })}
          appIcons={appIcons.skills}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.projects ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setFilterBlocks({ ...filterBlocks, refernces: !filterBlocks.refernces })}
          appIcons={appIcons.about}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss={filterBlocks.refernces ? "btn-success" : "btn-danger"}
        />
        <ButtonAdd
          handle_onclick_add={() => setShowFilter(!showFilter)}
          appIcons={appIcons.cross}
          isIconPreview={true}
          defaultcss="btn btn-primary"
          extracss="btn-danger"
        />
        </div>
        }
      </div>
    </Fragment>
  );
}
