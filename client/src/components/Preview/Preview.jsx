"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSite, deployToNetlify, downloadSite } from "../../services/api";
import "./Preview.css";

const SuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(deploymentUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (loading) {
    return (
      <div className="preview-page">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
          </div>
          <h2>Preparing your website...</h2>
          <p>This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="preview-page">
        <div className="error-container">
          <div className="error-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h2>Something went wrong</h2>
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
    <div className="preview-page">
      <main className="preview-main">
        <div className="container">
          {/* Success Section - Conditional based on deployment status */}
          {!deploymentUrl ? (
            <section className="success-section">
              <div className="success-badge">
                <span>Website Created Successfully</span>
              </div>

              <div className="success-content">
                <h1>
                  Your {site?.organization?.name || "Your website"} Website is
                  Ready!
                </h1>
                <p>
                  {site?.organization?.name || "Your website"} has been
                  generated successfully. Deploy it now to make it live and
                  accessible to the world.
                </p>
              </div>

              <div className="website-meta">
                <div className="meta-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>
                    Created {new Date(site?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="meta-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Deploy to get sharable link</span>
                </div>
              </div>
            </section>
          ) : (
            /* Deployment Success Section - Moved Above */
            <section className="deployment-success-section">
              <div className="success-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <h1>Website Deployed Successfully!</h1>
              <p>Your NGO website is now live and accessible worldwide</p>
              <div className="deployment-url">
                <div className="url-display">
                  <span className="url-text">{deploymentUrl}</span>
                  <button
                    className="copy-btn"
                    onClick={copyToClipboard}
                    title="Copy URL"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>
                </div>
                <a
                  href={deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Visit Website
                </a>
              </div>
            </section>
          )}

          {/* Action Buttons - Conditional based on deployment status */}
          <section className="action-section">
            {!deploymentUrl ? (
              /* Before Deployment - Show all buttons */
              <div className="action-buttons">
                <button
                  className={`btn btn-primary ${deploying ? "loading" : ""}`}
                  onClick={handleDeploy}
                  disabled={deploying}
                >
                  {deploying ? (
                    <>
                      <div className="btn-spinner"></div>
                      Deploying...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4.5 16.5c-1.5 1.5-1.5 4.5 0 6s4.5 1.5 6 0l1-1" />
                        <path d="M14.5 7.5c1.5-1.5 1.5-4.5 0-6s-4.5-1.5-6 0l-1 1" />
                        <path d="M5.5 13.5 13 6" />
                        <path d="M12 7l5 5" />
                      </svg>
                      Deploy to Netlify
                    </>
                  )}
                </button>

                <button
                  className={`btn btn-secondary ${
                    downloading ? "loading" : ""
                  }`}
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download ZIP
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/create")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Create Another Website
                </button>
              </div>
            ) : (
              /* After Deployment - Hide deploy button, show only download and create another */
              <div className="action-buttons">
                <button
                  className={`btn btn-secondary ${
                    downloading ? "loading" : ""
                  }`}
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download ZIP
                    </>
                  )}
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/create")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Create Another Website
                </button>
              </div>
            )}
          </section>

          {/* Website Preview */}
          <section className="website-preview">
            <div className="preview-card">
              <div className="preview-header-bar">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-url">
                  {site?.organization?.name
                    ?.toLowerCase()
                    .replace(/\s+/g, "") || "your-ngo"}
                  .netlify.app
                </div>
              </div>
              <div className="preview-content">
                <div className="preview-hero">
                  <h3>{site?.organization?.name || "Your NGO"}</h3>
                  <p>Making a difference in the world</p>
                </div>
                <div className="preview-sections">
                  <div className="preview-section"></div>
                  <div className="preview-section"></div>
                  <div className="preview-section"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Minimal Features Section */}
          <section className="features-section">
            <div className="section-header">
              <h2>What's Included</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                <span>Professional Homepage</span>
              </div>

              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Team Showcase</span>
              </div>

              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Project Gallery</span>
              </div>

              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Contact Forms</span>
              </div>

              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Mobile Responsive</span>
              </div>

              <div className="feature-card">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
                <span>Custom Branding</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="currentColor" />
                  <path
                    d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
                    fill="white"
                  />
                </svg>
                <span>Navira</span>
              </div>
              <p className="footer-tagline">Free website generator for NGOs</p>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-creator">
              <p className="creator-label">Created by</p>
              <h3 className="creator-name">Tanish Upadhyay</h3>
              <p className="creator-mission">
                Supporting NGOs with open-source technology
              </p>

              <div className="creator-links">
                <a
                  href="https://github.com/tanishupadhyay"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href="https://tanishupadhyay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/in/tanishupadhyay"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Navira. Open source and free
              forever.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuccessPage;
