"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSite,
  generatePreview,
  deployToNetlify,
  downloadSite,
} from "../../services/api";
import "./Preview.css";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSite();
  }, [id]);

  const loadSite = async () => {
    try {
      setLoading(true);
      const response = await getSite(id);
      setSite(response.site);

      // Generate preview
      const previewResponse = await generatePreview(id);
      setPreviewUrl(previewResponse.previewUrl);
    } catch (err) {
      setError(err.message || "Failed to load site");
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    try {
      setDeploying(true);
      const response = await deployToNetlify(id);
      setDeploymentUrl(response.url);
      alert("Website deployed successfully!");
    } catch (err) {
      alert(err.message || "Failed to deploy website");
    } finally {
      setDeploying(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadSite(id);
    } catch (err) {
      alert(err.message || "Failed to download website");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="preview-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <h2>Generating your website...</h2>
          <p>This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="preview-container">
        <div className="error-state">
          <h2>Error Loading Preview</h2>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create")}
          >
            Create New Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Website Preview</h1>
        <p>
          Your NGO website has been generated! Preview it below and deploy when
          ready.
        </p>
      </div>

      <div className="preview-actions">
        <button
          className="btn btn-primary"
          onClick={handleDeploy}
          disabled={deploying}
        >
          {deploying ? "Deploying..." : "Deploy to Netlify"}
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Downloading..." : "Download ZIP"}
        </button>

        <button className="btn btn-accent" onClick={() => navigate("/create")}>
          Create Another Site
        </button>
      </div>

      {deploymentUrl && (
        <div className="deployment-success">
          <h3>🎉 Website Deployed Successfully!</h3>
          <p>Your website is now live at:</p>
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="deployment-link"
          >
            {deploymentUrl}
          </a>
        </div>
      )}

      <div className="site-info">
        <h2>{site?.organization?.name || "NGO Website"}</h2>
        <div className="site-details">
          <div className="detail-item">
            <strong>Created:</strong>{" "}
            {new Date(site?.createdAt).toLocaleDateString()}
          </div>
          <div className="detail-item">
            <strong>Theme:</strong> {site?.design?.theme || "Modern"}
          </div>
          <div className="detail-item">
            <strong>Team Members:</strong> {site?.team?.length || 0}
          </div>
          <div className="detail-item">
            <strong>Projects:</strong> {site?.projects?.length || 0}
          </div>
        </div>
      </div>

      <div className="preview-frame-container">
        <div className="device-frame">
          <div className="device-header">
            <div className="device-buttons">
              <span className="device-button red"></span>
              <span className="device-button yellow"></span>
              <span className="device-button green"></span>
            </div>
            <div className="device-url">
              {previewUrl || "preview.ngo-generator.com"}
            </div>
          </div>

          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="preview-iframe"
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="preview-placeholder">
              <div className="placeholder-content">
                <h3>Preview Generating...</h3>
                <p>Your website preview will appear here shortly</p>
                <div className="spinner"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="preview-features">
        <h3>Your Website Includes:</h3>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🏠</div>
            <div className="feature-text">
              <strong>Homepage</strong>
              <p>Beautiful landing page with your organization's story</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <div className="feature-text">
              <strong>Team Section</strong>
              <p>Showcase your team members and their roles</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <div className="feature-text">
              <strong>Projects</strong>
              <p>Highlight your organization's projects and impact</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📞</div>
            <div className="feature-text">
              <strong>Contact</strong>
              <p>Contact information and social media links</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <div className="feature-text">
              <strong>Mobile Responsive</strong>
              <p>Looks great on all devices and screen sizes</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎨</div>
            <div className="feature-text">
              <strong>Custom Design</strong>
              <p>Personalized colors and fonts matching your brand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
