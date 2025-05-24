"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationStep from "./steps/OrganizationStep";
import TeamStep from "./steps/TeamStep";
import ProjectsStep from "./steps/ProjectsStep";
import DesignStep from "./steps/DesignStep";
import ContactStep from "./steps/ContactStep";
import ReviewStep from "./steps/ReviewStep";
import { createSite } from "../../services/api";
import "./Wizard.css";

const steps = [
  { id: "organization", title: "Organization Details" },
  { id: "team", title: "Team Members" },
  { id: "projects", title: "Projects" },
  { id: "design", title: "Design" },
  { id: "contact", title: "Contact & Social" },
  { id: "review", title: "Review & Submit" },
];

const initialState = {
  organization: {
    name: "",
    mission: "",
    vision: "",
    about: "",
    logo: null,
    banner: null,
  },
  team: [{ name: "", role: "", bio: "", photo: null }],
  projects: [{ title: "", description: "", image: null }],
  design: {
    primaryColor: "#4a6fa5",
    secondaryColor: "#166088",
    accentColor: "#4cb5ae",
    font: "Roboto",
    theme: "modern",
  },
  contact: {
    email: "",
    phone: "",
    address: "",
    donationLink: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  },
};

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleChange = (section, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: data,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createSite(formData);
      navigate(`/preview/${response.site._id}`);
    } catch (err) {
      setError(err.message || "An error occurred while creating your site.");
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OrganizationStep
            data={formData.organization}
            onChange={(data) => handleChange("organization", data)}
          />
        );
      case 1:
        return (
          <TeamStep
            data={formData.team}
            onChange={(data) => handleChange("team", data)}
          />
        );
      case 2:
        return (
          <ProjectsStep
            data={formData.projects}
            onChange={(data) => handleChange("projects", data)}
          />
        );
      case 3:
        return (
          <DesignStep
            data={formData.design}
            onChange={(data) => handleChange("design", data)}
          />
        );
      case 4:
        return (
          <ContactStep
            data={formData.contact}
            onChange={(data) => handleChange("contact", data)}
          />
        );
      case 5:
        return (
          <ReviewStep
            data={formData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="wizard-container">
      <h1 className="wizard-title">Create Your NGO Website</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="wizard-progress">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${
              index === currentStep ? "active" : ""
            } ${index < currentStep ? "completed" : ""}`}
            onClick={() => index < currentStep && setCurrentStep(index)}
          >
            <div className="step-indicator">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="wizard-content card">
        <h2 className="step-heading">{steps[currentStep].title}</h2>
        {renderStep()}
      </div>

      <div className="wizard-actions">
        {currentStep > 0 && (
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={isLoading}
          >
            Previous
          </button>
        )}

        {currentStep < steps.length - 1 ? (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Website"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
