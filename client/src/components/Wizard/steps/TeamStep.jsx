"use client";

import { useState } from "react";
import { uploadImage } from "../../../services/api";
import "./Steps.css";

const TeamStep = ({ data, onChange }) => {
  const [uploading, setUploading] = useState({});

  const handleChange = (index, field, value) => {
    const updatedTeam = [...data];
    updatedTeam[index] = { ...updatedTeam[index], [field]: value };
    onChange(updatedTeam);
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading({ ...uploading, [index]: true });

    try {
      const result = await uploadImage(file, "team");
      handleChange(index, "photo", result.imageUrl);
    } catch (error) {
      console.error("Error uploading team photo:", error);
      alert("Failed to upload team photo. Please try again.");
    } finally {
      setUploading({ ...uploading, [index]: false });
    }
  };

  const addTeamMember = () => {
    onChange([...data, { name: "", role: "", bio: "", photo: null }]);
  };

  const removeTeamMember = (index) => {
    const updatedTeam = [...data];
    updatedTeam.splice(index, 1);
    onChange(updatedTeam);
  };

  return (
    <div className="step-container">
      <p className="step-description">
        Add information about your team members. This will help visitors connect
        with the people behind your organization.
      </p>

      {data.map((member, index) => (
        <div key={index} className="team-member-card">
          <h3 className="card-subtitle">Team Member {index + 1}</h3>

          <div className="form-group">
            <label htmlFor={`name-${index}`}>Name</label>
            <input
              type="text"
              id={`name-${index}`}
              className="form-control"
              value={member.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Enter team member's name"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`role-${index}`}>Role / Position</label>
            <input
              type="text"
              id={`role-${index}`}
              className="form-control"
              value={member.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
              placeholder="Enter team member's role or position"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`bio-${index}`}>Bio</label>
            <textarea
              id={`bio-${index}`}
              className="form-control"
              value={member.bio}
              onChange={(e) => handleChange(index, "bio", e.target.value)}
              rows={3}
              placeholder="Enter a brief bio for this team member"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor={`photo-${index}`}>Photo</label>
            <div className="file-upload-container">
              <input
                type="file"
                id={`photo-${index}`}
                className="file-input"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                disabled={uploading[index]}
              />
              <label htmlFor={`photo-${index}`} className="file-label">
                {uploading[index] ? "Uploading..." : "Choose File"}
              </label>
              {member.photo && (
                <div className="image-preview">
                  <img
                    src={member.photo || "/placeholder.svg"}
                    alt={`${member.name} Preview`}
                  />
                </div>
              )}
            </div>
          </div>

          {data.length > 1 && (
            <button
              type="button"
              className="btn btn-danger remove-btn"
              onClick={() => removeTeamMember(index)}
            >
              Remove Team Member
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="btn btn-secondary add-btn"
        onClick={addTeamMember}
      >
        Add Another Team Member
      </button>
    </div>
  );
};

export default TeamStep;
