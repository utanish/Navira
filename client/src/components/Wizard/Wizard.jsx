"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationStep from "./steps/OrganizationStep";
import ProjectsStep from "./steps/ProjectsStep";
import DesignStep from "./steps/DesignStep";
import ContactStep from "./steps/ContactStep";
import ReviewStep from "./steps/ReviewStep";
import { createSite } from "../../services/api";
import "./Wizard.css";

const steps = [
  {
    id: "organization",
    title: "Organization",
    description: "Tell us about your NGO",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Showcase your initiatives",
  },
  { id: "design", title: "Design", description: "Customize your look" },
  { id: "contact", title: "Contact", description: "Add contact details" },
  { id: "review", title: "Review", description: "Review and create" },
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
  projects: [{ title: "", description: "", image: null }],
  design: {
    primaryColor: "#14b8a6",
    secondaryColor: "#1f2937",
    accentColor: "#f59e0b",
    font: "Outfit",
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

  const handleStepClick = (stepIndex) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
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
          <ProjectsStep
            data={formData.projects}
            onChange={(data) => handleChange("projects", data)}
          />
        );
      case 2:
        return (
          <DesignStep
            data={formData.design}
            onChange={(data) => handleChange("design", data)}
          />
        );
      case 3:
        return (
          <ContactStep
            data={formData.contact}
            onChange={(data) => handleChange("contact", data)}
          />
        );
      case 4:
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

  const getStepStatus = (index) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="wizard">
      <div className="wizard-container">
        <div className="wizard-header">
          <h1>Create Your NGO Website</h1>
          <p>
            Follow these simple steps to build a professional website for your
            organization
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                fill="currentColor"
              />
            </svg>
            {error}
          </div>
        )}

        <div className="wizard-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${getStepStatus(index)}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-indicator">
                {getStepStatus(index) === "completed" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="wizard-main">
          <div className="wizard-content">
            <div className="step-header">
              <h2>{steps[currentStep].title}</h2>
              <p>{steps[currentStep].description}</p>
            </div>

            <div className="step-body">{renderStep()}</div>
          </div>
        </div>

        <div className="wizard-actions">
          <div className="actions-left">
            {currentStep > 0 && (
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11 12l-4-4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </button>
            )}
          </div>

          <div className="actions-right">
            {currentStep < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="spinner"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="31.416"
                        strokeDashoffset="31.416"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          dur="2s"
                          values="0 31.416;15.708 15.708;0 31.416"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-dashoffset"
                          dur="2s"
                          values="0;-15.708;-31.416"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                    Creating Website...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1v14M15 8H1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Create Website
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
