import React, { Fragment, useState } from 'react';
import ButtonAdd from './ButtonAdd';
import { v4 as generateId } from 'uuid';

export default function FieldProject({
    resumeData,
    setResumeData,
    handleNew,
    handleDelete,
}) {
    const [projects, setProjects] = useState(resumeData.projects);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleUpdateProject = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index] = {...newProjects[index], [field]: value};
        setProjects(newProjects);
    }

    const handleDeleteProject = (id) => {
        console.log(projects)
        console.log("ID: ", id)
        const filteredProjects = projects.filter(project => project.id !== id);
        setProjects(filteredProjects);
        handleDelete("projects", id);
        setIsEditing(false);
    }

    const handleUpdateResumeData = () => {
        setResumeData({...resumeData, "projects": projects});
    }

    const handleNewProject = () => {
        setIsEditing(false);
        const addnewProjects = [...projects];
        addnewProjects.push({
            id: generateId(),
            title: "Project Name",
            url: "",
            description: "",
            start: "",
            end: "",
            skills: "",
        });
        setProjects(addnewProjects);
        handleNew();
    }
    
  return (
    <Fragment>
        {projects.length > 10 ? "" : <ButtonAdd handle_onclick_add={handleNewProject} />}
        {projects.map((project, index) => {
            return (
                <div
                    className="container p-1 mt-3 mb-5 "
                    key={project.id}
                    style={{ position: "relative" }}
                >
                    {!isEditing || editingIndex !== index ? (
                        <ViewProjects
                            project={project}
                            index={index}
                            setIsEditing={setIsEditing}
                            setEditingIndex={setEditingIndex}
                            resumeData={resumeData}
                            handleDeleteProject={handleDeleteProject}
                            projectsLength={projects.length}
                        />
                    ) : (
                        <EditProjects
                            project={project}
                            index={editingIndex}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            updateData={handleUpdateProject}
                            handleUpdateResumeData={handleUpdateResumeData}
                            handleDeleteProject={handleDeleteProject}
                        />
                    )}
                </div>
            );
        })}
    </Fragment>
  )
}

// projects: [ { id: generateId(), title: "", url: "", description: "", start: "", end: "", skills: "", }, ],
function ViewProjects({
    project,
    index,
    setIsEditing,
    setEditingIndex,
    projectsLength,
    handleDeleteProject,
  }){
    return (
      <Fragment>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">
            <strong>
            {project.title}
            </strong>
          </li>
          <li className="list-group-item">
            <strong>URL: </strong>
            {project.url}
          </li>
          <li className="list-group-item">
            <strong>Description: </strong>
            {project.description}
          </li>
          <li className="list-group-item">
            <strong>Skills: </strong>
            {project.skills}
          </li>
        </ul>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <span className="card-link">
                <strong>From: </strong>
                {project.start}
              </span>
            </div>
            <div className="col">
              <span className="card-link">
                <strong>To: </strong>
                {project.end}
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
      {projectsLength>1 && (
        <ButtonAdd
        handle_onclick_add={() => { handleDeleteProject(project.id) }}
        extracss="btn btn-danger w-100" 
        text={"Delete"} 
        isIconPreview={false} 
        defaultcss={""} />
      )}
      </div>
    </Fragment>
    )
  }

function FormInput({
    label,
    field,
    value,
    updateFunction,
    placeholder,
    id,
    index,
    rows = "1",
    // fieldType = "text",
    iscenter = false,
  }) {
    return (
      <div className="card m-2 border-0 ">
          <div className="list-group list-group-flush">
          <textarea 
              className={`list-group-item ${iscenter ? "text-center fw-semibold" : ""}`}
              id={id + label}
              rows={rows}
              value={value}
              placeholder={placeholder}
              onChange={(e) => updateFunction(index, field, e.target.value)}
          />
          </div>
      </div>
    );
  }
  
function EditProjects({
    project,
    index,
    isEditing,
    setIsEditing,
    updateData,
    handleUpdateResumeData,
    handleDeleteProject
  }) {
    return (
      <div>
        {isEditing && (
          <Fragment>
            <FormInput
              label="Title"
              field="title"
              value={project.title}
              updateFunction={updateData}
              placeholder="Your Project Name"
              id={project.id + "title"}
              index={index}
              iscenter={true}
            />
            <FormInput
              label="URL"
              field="url"
              value={project.url}
              updateFunction={updateData}
              placeholder="YourProjectUrl.com"
              id={project.id + "url"}
              index={index}
            />
  
            <FormInput
                label="Description"
                field="description"
                value={project.description}
                updateFunction={updateData}
                placeholder="Give Brief Description of your project."
                id={project.id + "description"}
                index={index}
                rows="5"
            />
            <div className="row p-0 m-0">
              <div className="col-sm-6 p-0">
                <FormInput
                  label="Start"
                  field="start"
                  value={project.start}
                  updateFunction={updateData}
                  placeholder="2023"
                  id={project.id + "start"}
                  index={index}
                  fieldType="number"
                />
              </div>
              <div className="col-sm-6 p-0">
                <FormInput
                  label="End"
                  field="end"
                  value={project.end}
                  updateFunction={updateData}
                  placeholder="2024"
                  id={project.id + "end"}
                  index={index}
                  fieldType="number"
                />
              </div>
            </div>
            <div className="d-flex ">
            <ButtonAdd 
                    handle_onclick_add={() => {
                        handleUpdateResumeData();
                        setIsEditing(false); 
                    }}
                    extracss="btn btn-primary w-100 " 
                    text={"Save"} 
                    isIconPreview={false} 
                    defaultcss={""} />
            <ButtonAdd
                handle_onclick_add={() => {
                    handleDeleteProject(project.id);
                }}
                extracss="btn btn-danger w-100"
                text={"Delete"}
                isIconPreview={false}
                defaultcss={""}

                />
                </div>
          </Fragment>
        )}
      </div>
    );
  }
  