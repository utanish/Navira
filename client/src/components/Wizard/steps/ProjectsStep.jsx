"use client";

import { useState } from "react";
import { enhanceContent, uploadImage } from "../../../services/api";
import "./Steps.css";

const ProjectsStep = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState({});
  const [enhanceError, setEnhanceError] = useState(null);
  const [uploading, setUploading] = useState({});

  const handleChange = (index, field, value) => {
    const updatedProjects = [...data];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onChange(updatedProjects);
  };

  const handleEnhance = async (index) => {
    const project = data[index];
    if (!project.description || project.description.trim() === "") {
      setEnhanceError("Please enter some project description to enhance.");
      return;
    }

    setIsEnhancing({ ...isEnhancing, [index]: true });
    setEnhanceError(null);

    try {
      const options = {
        field: "projectDescription",
        wordLimit: 150,
        tone: "professional",
      };

      const result = await enhanceContent(project.description, options);
      handleChange(index, "description", result.enhancedContent);
    } catch (error) {
      setEnhanceError(
        error.message || "Failed to enhance project description."
      );
    } finally {
      setIsEnhancing({ ...isEnhancing, [index]: false });
    }
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [index]: true });

    try {
      const result = await uploadImage(file, "project");
      handleChange(index, "image", result.imageUrl);
    } catch (error) {
      console.error("Error uploading project image:", error);
      alert("Failed to upload project image. Please try again.");
    } finally {
      setUploading({ ...uploading, [index]: false });
    }
  };

  const addProject = () => {
    onChange([...data, { title: "", description: "", image: null }]);
  };

  const removeProject = (index) => {
    const updatedProjects = [...data];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
  };

  return (
    <div className="step-container">
      <p className="step-description">
        Add information about your organization's projects or initiatives. This
        will help visitors understand the work you do.
      </p>

      {enhanceError && (
        <div className="alert alert-danger mb-4">{enhanceError}</div>
      )}

      {data.map((project, index) => (
        <div key={index} className="project-card">
          <h3 className="card-subtitle">Project {index + 1}</h3>

          <div className="form-group">
            <label htmlFor={`title-${index}`}>Project Title</label>
            <input
              type="text"
              id={`title-${index}`}
              className="form-control"
              value={project.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Enter project title"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`description-${index}`}>Project Description</label>
            <div className="textarea-with-enhance">
              <textarea
                id={`description-${index}`}
                className="form-control"
                value={project.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                rows={4}
                placeholder="Describe this project, its goals, and its impact"
              ></textarea>
              <button
                type="button"
                className="enhance-btn"
                onClick={() => handleEnhance(index)}
                disabled={isEnhancing[index]}
              >
                {isEnhancing[index] ? "Enhancing..." : "Enhance with AI"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`image-${index}`}>Project Image</label>
            <div className="file-upload-container">
              <input
                type="file"
                id={`image-${index}`}
                className="file-input"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                disabled={uploading[index]}
              />
              <label htmlFor={`image-${index}`} className="file-label">
                {uploading[index] ? "Uploading..." : "Choose File"}
              </label>
              {project.image && (
                <div className="image-preview">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} Preview`}
                  />
                </div>
              )}
            </div>
          </div>

          {data.length > 1 && (
            <button
              type="button"
              className="btn btn-danger remove-btn"
              onClick={() => removeProject(index)}
            >
              Remove Project
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary add-btn"
        onClick={addProject}
      >
        Add Another Project
      </button>
    </div>
  );
};

export default ProjectsStep;
