import React, { Fragment, useState, useEffect, useCallback } from "react";
import { v4 as generateId } from "uuid";
import PersonalInformation from "./FieldPersonalInformation";
import Objective from "./FieldObjective";
import FieldKeyHighlights from "./FieldKeyHighlights";
import { tabs } from "./MenuFormItems";
import FieldNavItem from "./FieldNavItem";
import ResumePreview from "./ResumePreview";
import FieldEducation from "./FieldEducation";
import FieldWorkExperience from "./FieldWorkExperience";
import FieldProject from "./FieldProject";
import Api from "./Api";
import { useNavigate, useParams } from "react-router-dom";


function FormMain() {
  // console.log("I am Running....");
  const [activeTab, setActiveTab] = useState("Personal Information");
  const handleOnChange = (e) => {
    setActiveTab(e.target.id);
  };
  const navigate = useNavigate();
  const [currentButtonValue, setCurrentButtonValue] = useState("");
  const [mode, setMode] = useState("add");
  const {uniqueid} = useParams();

  // DATA Initial State
  const [resumeData, setResumeData] = useState({
    id: generateId(),
    personalInfo: { firstname: "Himanshu", lastname: "Jain", address: "256, Random Ave", phone: "547-985-9587", email: "random@gmail.com", linkedin: "linkdin.com/my-profile", github: "github.com/my-profile", },
    objective: "My Objective is to work in a company where I can utilize my skills and knowledge to deliver value to the company and grow as a professional.",
    keyHighlights: [{ id: generateId(), title: "Programming Language", description: "Java, Python, MySQL, JavaScript, Kotlin along with ReactJS and Node.js" }],
    education: [ { id: generateId(), instituteType: "Humber College", courseType: "Computer Programming and Analysis", location: "Toronto, ON, Canada", startYear: "2023", endYear: "2025", }, ],
    workExperience: [ { id: generateId(), company: "Tim Hortons", position: "Supervisor", location: "Etobicoke, ON, Canada", start: "2023", end: "2025", description: [ { id: generateId(), term: "Stewardship", description: "Acts as a guardian of Earth, carefully managing the use of his Kryptonian powers to ensure minimal collateral damage and to protect humanity as a whole.", }, ], }, ],
    projects: [ { id: generateId(), title: "Resume Builder App", url: "ResumeBuilder.xyz", description: "This is a simple resume builder app that allows you to create a resume by filling out the form on the left side of the screen. The resume will be displayed on the right side of the screen. You can also save and load your resume using the save/load tab.", start: "Feb 2024", end: "Feb 2024", skills: "HTML, CSS, JavaScript, React.Js, NodeJs", }, ],
  });

  const handleNewkeyHighlights = () => {
    const newID = generateId();
    setResumeData({
      ...resumeData,
      keyHighlights: [
        ...resumeData.keyHighlights,
        { id: newID, title: "", description: "" },
      ],
    });
  };

  const handleDeletekeyHighlights = (id) => {
    setResumeData({
      ...resumeData,
      keyHighlights: resumeData.keyHighlights.filter((highlight) => {
        return highlight.id !== id;
      }),
    });
  };

  const handleNewEducation = () => {
    const newID = generateId();
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: newID,
          instituteType: "University of Toronto",
          courseType: "Course Name",
          location: "Toronto, ON, Canada",
          startYear: "2023",
          endYear: "2025",
        },
      ],
    });
  };

  const handleNewWorkExperience = () => {
    const newID = generateId();
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          id: newID,
          company: "Company Name",
          position: "Position",
          location: "Location",
          start: "Start Date",
          end: "End Date",
          description: [
            {
              id: generateId(),
              term: "",
              description:
                "",
            },
          ],
        },
      ],
    });
  };

  const handleNewProject = () => {
    const newID = generateId();
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newID, title: "Project Name", url: "", description: "", start: "", end: "", skills: "", }
      ],
    });
  };

  const handleDeleteItems = (type, id) => {
    if (!resumeData[type]) {
      console.error(`Error: resumeData[${type}] is undefined.`);
      return;
    }
    setResumeData({
      ...resumeData,
      [type]: resumeData[type].filter((e) => {
        return e.id !== id;
      }),
    });
  };

  // --------------------- MAIN BUTTON SUBMIT ---------------------

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    // console.log(resumeData);
    // if (resumeData.personalInfo.firstname === "" || resumeData.objective === "") {
    //   return alert("Please fill out the required fields.");
    // }
    // Now switch to Backend Validation
    if (mode.toLowerCase() === "add") {
      handleAddNewForm();
    }
    else if (mode.toLowerCase() === "update") {
      handleUpdateExistingData(uniqueid);
    }
  };

  // --------------------- GET EXISTING DATA ---------------------
  const handleFetchExistingData = useCallback(async(uniqueid) => {
    try {
      // console.log("Existing Form Cleared...")
      handleClearForm();
      // console.log("Fetching Data...")
      const response = await Api.get("/single?uniqueid="+uniqueid);
      if (response.status === 200) {
        const data = await response.data;
        setResumeData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // --------------------- UPDATE EXISTING DATA /update?UNIQUEID ---------------------
  const handleUpdateExistingData = async (uniqueid) => {
    // console.log("handleUpdateExistingData: ", uniqueid)
    try {
      // console.log("Updating Data...");
      const response = await Api.put("/update?uniqueid="+uniqueid, resumeData);
      if (response.status === 200) {
        navigate(`/preview/${uniqueid}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // --------------------- ADD NEW FORM ---------------------
  const handleAddNewForm = async() => {
    // Api.post("/create_new", resumeData)
    //   .then((response) => {
    //     // console.log(response);
    //     const uniqueid = response.data.uniqueid;
    //     navigate(`/preview/${uniqueid}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error: Please fill out the required fields.");
    //   });
    try {
      const response = await Api.post("/create_new", resumeData);
      if (response.status === 200) {
        const uniqueid = response.data.uniqueid;
        navigate(`/preview/${uniqueid}`);
      }
    } catch (error) {
      console.log(error);
      alert("Error: Please fill out the required fields.");
    }
  }

  const handleClearForm = () => {
    setResumeData({
      personalInfo: { firstname: "", lastname: "", address: "", phone: "", email: "", linkedin: "", github: "", },
      objective: "",
      keyHighlights: [],
      education: [],
      workExperience: [],
      projects: [],
    });
  }

  const handleDefaultValues = () => {
    setResumeData({
      personalInfo: { firstname: "The", lastname: "Flash", address: "Central City", phone: "647-851-9821", email: "yourEmail@gmail.com", linkedin: "linkedin.com/my-profile", github: "github.com/my-profile", },
      objective: "Primary goal is to protect the citizens of Central City (and sometimes beyond) from those who would do them harm.",
      keyHighlights: [{ id: generateId(), title: "Speedster", description: "Fastest Runner on Earth" }],
      education: [ { id: generateId(), instituteType: "Central City University", courseType: "Physics", location: "Central City", startYear: "2023", endYear: "2025", }, ],
      workExperience: [ { id: generateId(), company: "Central City Police Department", position: "Forensic Scientist", location: "Central City", start: "2023", end: "2025", description: [ { id: generateId(), term: "Stewardship", description: "Acts as a guardian of Earth, carefully managing the use of his Kryptonian powers to ensure minimal collateral damage and to protect humanity as a whole.", }, ], }, ],
      projects: [ { id: generateId(), title: "The Flash", url: "TheFlash.com", description: "Barry Allen, the Flash, pushed the limits of speed in S.T.A.R. Labs. His newest project involved a treadmill built of pure Speed Force energy – volatile and unpredictable. The goal was to reach impossible speeds, but Cisco's warnings echoed in his ears as he stepped onto the glowing platform, ready to disappear in a blur of crimson lightning.", start: "Feb 2024", end: "Feb 2024", skills: "Science, Engineering, Superhuman Speed, Time Travel, Leadership", }, ],
    });
      
  }

    // --------------------- MAIN USE_EFFECT ---------------------
    useEffect(() => {
      if (uniqueid) {
        setMode("update");
        handleFetchExistingData(uniqueid);
      }
      if (currentButtonValue === "clear") {
        handleClearForm();
        setActiveTab("Personal Information");
      } else if (currentButtonValue === "default") {
        handleDefaultValues();
        setActiveTab("Personal Information");
      }
  
    }, [currentButtonValue, uniqueid, handleFetchExistingData]);

  return (
    <Fragment>
      <div className="bg-body-dark" style={{ height: "auto" }}>
        <h1 className="text-center py-3 h1_modify">Resume Builder</h1>
        <div className="container-fluid bg-body-tertiary py-2">
          {/* asd */}

          <div
            className="d-flex flex-row flex-wrap mx-auto"
            style={{ maxWidth: "1500px" }}
          >

            <div
              className="col-12 col-md-6 d-flex flex-row flex-md-column mb-5 m-md-0"
              // style={{position:"relative"}}
            >

              <div className="d-flex flex-row flex-wrap flex-md-nowrap w-100">
                <div
                  className="col-12 col-md-2 p-0 d-flex flex-md-column"
                  style={{}}
                >
                  <div
                    className="d-flex flex-row flex-md-column flex-wrap h-100 mx-auto justify-content-center justify-content-md-start"
                    role="group"
                    aria-label="Vertical radio toggle button group"
                  >
                    {tabs.map((tab) => (
                      <FieldNavItem
                        title={tab.title}
                        icon={tab.icon}
                        id={tab.id}
                        key={tab.id}
                        onChange={handleOnChange}
                        activeTab={activeTab}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-9">
                <center>
              {/* <div className="col-12 col-md-7 d-flex flex-row mb-2 m-md-0"> */}
              <div className="d-flex flex-row flex-wrap justify-content-center gap-3 bg-dark-subtle p-3 mx-auto rounded flex-nowrap overflow-auto mt-2"> 
                <button type="button" onClick={()=> setCurrentButtonValue("clear")} className="btn btn-danger"> Clear </button>
                <button type="button" onClick={()=> setCurrentButtonValue("default")} className="btn btn-warning"> Default </button>
                {mode.toLowerCase() === 'add' && <button type="button" onClick={() => { setCurrentButtonValue("submit"); handleFormSubmit(); }} className="btn btn-primary"> Submit </button>}
                {mode.toLowerCase() === 'update' && <button type="button" onClick={() => { setCurrentButtonValue("update"); handleFormSubmit(); }} className="btn btn-primary"> Update </button>}
                {/* <button type="button" onClick={() => { setCurrentButtonValue("submit"); handleFormSubmit(); }} className="btn btn-primary"> {mode === 'add' ? "Submit":"Update"} </button> */}
              {/* </div> */}
              </div>
            {/* </div> */}
            </center>
                  <h2 className="text-center mb-2 p-3 fw-bold">{activeTab}</h2>
                  <form
                    onSubmit={(e)=>{ e.preventDefault(); }}
                    className="resumepreview my-3"
                    style={{
                      minHeight: "500px",
                      // maxHeight: "500px",
                      overflowY: "auto",
                    }}
                  >
                    {activeTab === "Personal Information" && (
                      <Fragment>
                        <PersonalInformation
                          id="firstname"
                          label="FirstName"
                          type="text"
                          placeholder="FirstName"
                          required={true}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                firstname: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.firstname}
                        />

                        <PersonalInformation
                          id="lastname"
                          label="LastName"
                          type="text"
                          placeholder="LastName"
                          required={true}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                lastname: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.lastname}
                        />
                        <PersonalInformation
                          id="address"
                          label="Address"
                          type="text"
                          placeholder="1234 Main St"
                          required={true}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                address: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.address}
                        />
                        <PersonalInformation
                          id="phone"
                          label="Phone"
                          type="phone"
                          placeholder="123-456-7890"
                          required={true}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                phone: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.phone}
                        />
                        <PersonalInformation
                          id="email"
                          label="Email"
                          type="email"
                          placeholder="example@gmail.com"
                          required={true}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                email: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.email}
                        />
                        <PersonalInformation
                          id="linkedin"
                          label="LinkedIn"
                          type="link"
                          placeholder="linkedin.com/in/your-profile"
                          required={false}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                linkedin: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.linkedin}
                        />
                        <PersonalInformation
                          id="github"
                          label="GitHub"
                          type="link"
                          placeholder="github.com/your-profile"
                          required={false}
                          onchange={(e) =>
                            setResumeData({
                              ...resumeData,
                              personalInfo: {
                                ...resumeData.personalInfo,
                                github: e.target.value,
                              },
                            })
                          }
                          value={resumeData.personalInfo.github}
                        />
                      </Fragment>
                    )}
                    {activeTab === "Objective" && (
                      <Objective
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                      />
                    )}
                    {activeTab === "Key Highlights" && (
                      <FieldKeyHighlights
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        handleNewkeyHighlights={handleNewkeyHighlights}
                        handleDeletekeyHighlights={handleDeletekeyHighlights}
                      />
                    )}
                    {activeTab === "Education" && (
                      <FieldEducation
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        handleNewEducation={handleNewEducation}
                        handleDelete={handleDeleteItems}
                      />
                    )}
                    {activeTab === "Work Experience" && (
                      <FieldWorkExperience
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        handleNew={handleNewWorkExperience}
                        handleDelete={handleDeleteItems}
                      />
                    )}
                    {activeTab === "Projects" && (
                      <FieldProject
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                        handleNew={handleNewProject}
                        handleDelete={handleDeleteItems}
                      />
                    )}
                    {activeTab === "Save/Submit" && (
                        <div className="d-flex flex-row justify-content-center my-2 m-md-5">
                        <button type="button" onClick={handleFormSubmit} className="btn btn-primary"> Submit </button>
                        </div>
                    )}
                    {activeTab === "About" && (
                      <div className="p-2">
                        {/* <h4 className="text-start"></h4> */}
                        <span className="text-start">
                          This is a simple resume builder app that allows you to
                          create a resume by filling out the form on the left
                          side of the screen. The resume will be displayed on
                          the right side of the screen. You can also save and
                          load your resume using the save/load tab.
                        </span>
                        <p className="text-start py-2">
                          <span>
                            <strong>Name:</strong> Resume Builder
                          </span>{" "}
                          <br />
                          <span>
                            <strong>Creator:</strong> Himanshu Jain
                          </span>{" "}
                          <br />
                          <span>
                            <strong>Github:</strong>{" "}
                            <a
                              href="https://github.com/Jain2098"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Visit Now
                            </a>{" "}
                          </span>
                        </p>
                      </div>
                    )}
                    
                  </form>
                </div>
              </div>

            </div>

            {/* Resume View Section */}
            <div
              className="col-12 col-md-6 mx-auto resumepreview border-top-0 resumeprevieadd"
              style={{
                // maxWidth: "1200px",
                // minHeight:"400px", maxHeight:"600px", overflowY:"auto", border: "0.5px solid black",
                // maxHeight: "70vh",
              }}
            >
              {/* <h2 className="text-center">View Resume</h2> */}
              <p className="fs-4 text-center bg-dark p-3 text-white fw-semibold m-0 rounded-top ">
                {" "}
                Resume Preview{" "}
              </p>
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormMain;
