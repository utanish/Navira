"use client";
import "./Steps.css";

const ReviewStep = ({ data, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="step-container">
      <p className="step-description">
        Review your information below and click "Create Website" to generate
        your NGO website.
      </p>

      <div className="review-section">
        <h3 className="review-title">Organization Details</h3>
        <div className="review-item">
          <strong>Name:</strong> {data.organization.name || "Not provided"}
        </div>
        <div className="review-item">
          <strong>Mission:</strong>{" "}
          {data.organization.mission || "Not provided"}
        </div>
        <div className="review-item">
          <strong>Vision:</strong> {data.organization.vision || "Not provided"}
        </div>
        <div className="review-item">
          <strong>About:</strong>{" "}
          {data.organization.about
            ? `${data.organization.about.substring(0, 100)}...`
            : "Not provided"}
        </div>
        {data.organization.logo && (
          <div className="review-item">
            <strong>Logo:</strong>{" "}
            <span className="text-success">✓ Uploaded</span>
          </div>
        )}
        {data.organization.banner && (
          <div className="review-item">
            <strong>Banner:</strong>{" "}
            <span className="text-success">✓ Uploaded</span>
          </div>
        )}
      </div>

      <div className="review-section">
        <h3 className="review-title">Projects</h3>
        {data.projects.length > 0 ? (
          data.projects.map((project, index) => (
            <div key={index} className="review-project">
              <strong>{project.title || `Project ${index + 1}`}</strong>
              {project.description && (
                <div className="project-desc">
                  {project.description.substring(0, 100)}...
                </div>
              )}
              {project.image && <span className="text-success"> ✓ Image</span>}
            </div>
          ))
        ) : (
          <div className="review-item">No projects added</div>
        )}
      </div>

      <div className="review-section">
        <h3 className="review-title">Design</h3>
        <div className="design-preview-small">
          <div
            className="color-swatch"
            style={{ backgroundColor: data.design.primaryColor }}
          >
            Primary
          </div>
          <div
            className="color-swatch"
            style={{ backgroundColor: data.design.secondaryColor }}
          >
            Secondary
          </div>
          <div
            className="color-swatch"
            style={{ backgroundColor: data.design.accentColor }}
          >
            Accent
          </div>
        </div>
        <div className="review-item">
          <strong>Font:</strong> {data.design.font}
        </div>
        <div className="review-item">
          <strong>Theme:</strong> {data.design.theme}
        </div>
      </div>

      <div className="review-section">
        <h3 className="review-title">Contact Information</h3>
        <div className="review-item">
          <strong>Email:</strong> {data.contact.email || "Not provided"}
        </div>
        <div className="review-item">
          <strong>Phone:</strong> {data.contact.phone || "Not provided"}
        </div>
        <div className="review-item">
          <strong>Address:</strong> {data.contact.address || "Not provided"}
        </div>
        <div className="review-item">
          <strong>Donation Link:</strong>{" "}
          {data.contact.donationLink || "Not provided"}
        </div>
        <div className="social-links-review">
          {Object.entries(data.contact.socialMedia).map(
            ([platform, url]) =>
              url && (
                <span key={platform} className="social-link-item">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)} ✓
                </span>
              )
          )}
        </div>
      </div>

      <div className="submit-section">
        <button
          className="btn btn-primary btn-large"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating Website..." : "Create Website"}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
