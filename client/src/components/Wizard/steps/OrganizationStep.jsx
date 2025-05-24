"use client";

import { useState } from "react";
import { enhanceContent, uploadImage } from "../../../services/api";
import "./Steps.css";

const OrganizationStep = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState({
    mission: false,
    vision: false,
    about: false,
  });
  const [enhanceError, setEnhanceError] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleEnhance = async (field) => {
    if (!data[field] || data[field].trim() === "") {
      setEnhanceError(`Please enter some ${field} text to enhance.`);
      return;
    }

    setIsEnhancing({ ...isEnhancing, [field]: true });
    setEnhanceError(null);

    try {
      const options = {
        field,
        wordLimit: field === "about" ? 200 : 100,
        tone: "professional",
      };

      const result = await enhanceContent(data[field], options);
      onChange({ ...data, [field]: result.enhancedContent });
    } catch (error) {
      setEnhanceError(error.message || `Failed to enhance ${field}.`);
    } finally {
      setIsEnhancing({ ...isEnhancing, [field]: false });
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "logo") {
      setUploadingLogo(true);
    } else {
      setUploadingBanner(true);
    }

    try {
      const result = await uploadImage(file, type);
      onChange({ ...data, [type]: result.imageUrl });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      alert(`Failed to upload ${type}. Please try again.`);
    } finally {
      if (type === "logo") {
        setUploadingLogo(false);
      } else {
        setUploadingBanner(false);
      }
    }
  };

  return (
    <div className="step-container">
      {enhanceError && (
        <div className="alert alert-danger mb-4">{enhanceError}</div>
      )}

      <div className="form-group">
        <label htmlFor="name">Organization Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mission">Mission Statement</label>
        <div className="textarea-with-enhance">
          <textarea
            id="mission"
            name="mission"
            className="form-control"
            value={data.mission}
            onChange={handleChange}
            rows={3}
            placeholder="Enter your organization's mission statement"
          ></textarea>
          <button
            type="button"
            className="enhance-btn"
            onClick={() => handleEnhance("mission")}
            disabled={isEnhancing.mission}
          >
            {isEnhancing.mission ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
        <small className="form-text text-muted">
          A concise statement describing the purpose of your organization.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="vision">Vision Statement</label>
        <div className="textarea-with-enhance">
          <textarea
            id="vision"
            name="vision"
            className="form-control"
            value={data.vision}
            onChange={handleChange}
            rows={3}
            placeholder="Enter your organization's vision statement"
          ></textarea>
          <button
            type="button"
            className="enhance-btn"
            onClick={() => handleEnhance("vision")}
            disabled={isEnhancing.vision}
          >
            {isEnhancing.vision ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
        <small className="form-text text-muted">
          A statement describing the future your organization seeks to create.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="about">About Your Organization</label>
        <div className="textarea-with-enhance">
          <textarea
            id="about"
            name="about"
            className="form-control"
            value={data.about}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us about your organization, its history, and its impact"
          ></textarea>
          <button
            type="button"
            className="enhance-btn"
            onClick={() => handleEnhance("about")}
            disabled={isEnhancing.about}
          >
            {isEnhancing.about ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
        <small className="form-text text-muted">
          Provide details about your organization's history, achievements, and
          impact.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="logo">Organization Logo</label>
        <div className="file-upload-container">
          <input
            type="file"
            id="logo"
            name="logo"
            className="file-input"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "logo")}
            disabled={uploadingLogo}
          />
          <label htmlFor="logo" className="file-label">
            {uploadingLogo ? "Uploading..." : "Choose File"}
          </label>
          {data.logo && (
            <div className="image-preview">
              <img src={data.logo || "/placeholder.svg"} alt="Logo Preview" />
            </div>
          )}
        </div>
        <small className="form-text text-muted">
          Upload your organization's logo (recommended size: 200x200px).
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="banner">Banner Image</label>
        <div className="file-upload-container">
          <input
            type="file"
            id="banner"
            name="banner"
            className="file-input"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "banner")}
            disabled={uploadingBanner}
          />
          <label htmlFor="banner" className="file-label">
            {uploadingBanner ? "Uploading..." : "Choose File"}
          </label>
          {data.banner && (
            <div className="image-preview banner-preview">
              <img
                src={data.banner || "/placeholder.svg"}
                alt="Banner Preview"
              />
            </div>
          )}
        </div>
        <small className="form-text text-muted">
          Upload a banner image for your website (recommended size: 1200x400px).
        </small>
      </div>
    </div>
  );
};

export default OrganizationStep;
