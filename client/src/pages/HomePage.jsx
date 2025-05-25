import ngo1 from "../components/assets/ngo1.svg";
import ngo2 from "../components/assets/ngo2.svg";
import Logo from "../components/assets/logo.svg";
("use client");

import { Link } from "react-router-dom";
import "./HomePage.css";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Logo" width={200} height={40} />
          </Link>

          <div className="navbar-menu">
            <button
              onClick={() => scrollToSection("features")}
              className="nav-link"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="nav-link"
            >
              How it works
            </button>
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link to="/create" className="btn btn-primary">
              Create Website
            </Link>
          </div>
        </div>
      </nav>

      {/* Redesigned Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-text">Open Source • Free Forever</span>
              </div>

              <h1 className="hero-title">
                Beautiful Websites for
                <span className="title-highlight"> NGOs</span>
              </h1>

              <p className="hero-description">
                Navira empowers non-profit organizations to create professional,
                responsive websites in minutes. No coding required, completely
                free, and designed specifically for charitable organizations.
              </p>

              <div className="hero-actions">
                <Link to="/create" className="btn btn-primary btn-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4v12m6-6H4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Start Building
                </Link>
                <button className="btn btn-outline btn-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      fill="currentColor"
                    />
                  </svg>
                  Watch Demo
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10 min</span>
                  <span className="stat-label">Deployment</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Free</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Organizations</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="illustration-container">
                {/* Two Rectangle NGO Images */}
                <div className="ngo-images">
                  <div className="ngo-image-card image-1">
                    <div className="image-placeholder">
                      <img src={ngo1} alt="" />
                    </div>
                    <div className="image-overlay">
                      <svg
                        className="heart-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="ngo-image-card image-2">
                    <div className="image-placeholder">
                      <img src={ngo2} alt="" />
                    </div>
                    <div className="image-overlay">
                      <svg
                        className="book-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Original SVG Illustration */}
                <svg
                  width="500"
                  height="400"
                  viewBox="0 0 500 400"
                  fill="none"
                  className="main-illustration"
                >
                  {/* Background Elements */}
                  <circle
                    cx="400"
                    cy="80"
                    r="60"
                    fill="#f0fdfa"
                    opacity="0.5"
                  />
                  <circle
                    cx="80"
                    cy="320"
                    r="40"
                    fill="#ecfdf5"
                    opacity="0.7"
                  />

                  {/* Main Website Frame */}
                  <rect
                    x="100"
                    y="120"
                    width="300"
                    height="200"
                    rx="12"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />

                  {/* Browser Header */}
                  <rect
                    x="100"
                    y="120"
                    width="300"
                    height="40"
                    rx="12"
                    fill="#f9fafb"
                  />
                  <circle cx="120" cy="140" r="4" fill="#ef4444" />
                  <circle cx="135" cy="140" r="4" fill="#f59e0b" />
                  <circle cx="150" cy="140" r="4" fill="#10b981" />
                  <rect
                    x="180"
                    y="132"
                    width="180"
                    height="16"
                    rx="8"
                    fill="white"
                    stroke="#e5e7eb"
                  />

                  {/* Website Content */}
                  <rect
                    x="120"
                    y="180"
                    width="260"
                    height="20"
                    rx="4"
                    fill="#14b8a6"
                  />
                  <rect
                    x="120"
                    y="210"
                    width="180"
                    height="8"
                    rx="4"
                    fill="#e5e7eb"
                  />
                  <rect
                    x="120"
                    y="225"
                    width="220"
                    height="8"
                    rx="4"
                    fill="#e5e7eb"
                  />
                  <rect
                    x="120"
                    y="240"
                    width="160"
                    height="8"
                    rx="4"
                    fill="#e5e7eb"
                  />
                  <rect
                    x="120"
                    y="265"
                    width="100"
                    height="24"
                    rx="12"
                    fill="#14b8a6"
                  />

                  {/* Floating Elements */}
                  <g
                    className="floating-element"
                    style={{ transformOrigin: "450px 150px" }}
                  >
                    <circle
                      cx="450"
                      cy="150"
                      r="25"
                      fill="white"
                      stroke="#14b8a6"
                      strokeWidth="2"
                    />
                    <path
                      d="M440 150l6 6 12-12"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <g
                    className="floating-element"
                    style={{
                      transformOrigin: "50px 200px",
                      animationDelay: "1s",
                    }}
                  >
                    <rect
                      x="30"
                      y="180"
                      width="40"
                      height="40"
                      rx="8"
                      fill="white"
                      stroke="#14b8a6"
                      strokeWidth="2"
                    />
                    <path
                      d="M42 195h16m-8-8v16"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>

                  <g
                    className="floating-element"
                    style={{
                      transformOrigin: "420px 280px",
                      animationDelay: "2s",
                    }}
                  >
                    <circle
                      cx="420"
                      cy="280"
                      r="20"
                      fill="white"
                      stroke="#14b8a6"
                      strokeWidth="2"
                    />
                    <path
                      d="M410 280l5 5 10-10"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Code Symbols */}
                  <text
                    x="60"
                    y="100"
                    fill="#14b8a6"
                    fontSize="24"
                    fontFamily="monospace"
                    opacity="0.3"
                  >
                    &lt;/&gt;
                  </text>
                  <text
                    x="420"
                    y="350"
                    fill="#14b8a6"
                    fontSize="20"
                    fontFamily="monospace"
                    opacity="0.3"
                  >
                    {`{}`}
                  </text>

                  {/* Connection Lines */}
                  <path
                    d="M250 120 Q300 80 400 80"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                  <path
                    d="M100 250 Q50 280 80 320"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                </svg>

                {/* Impact Statistics */}
                <div className="impact-stats">
                  <div className="impact-stat stat-1">
                    <span className="stat-number">500K+</span>
                    <span className="stat-label">Lives Impacted</span>
                  </div>
                  <div className="impact-stat stat-2">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2>Everything Your NGO Needs</h2>
            <p>
              Professional tools designed specifically for non-profit
              organizations to create impactful online presence.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>10-Minute Website Creation</h3>
              </div>
              <p>
                Create and deploy your complete NGO website in under 10 minutes.
                Our intuitive wizard guides you through every step, from
                organization details to final deployment.
              </p>
              <div className="feature-highlight">
                <span>⚡ Ready in 10 minutes</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="14,2 14,8 20,8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="13"
                      x2="8"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="17"
                      x2="8"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Fully Customizable Content</h3>
              </div>
              <p>
                Showcase your mission, vision, team members, and projects with
                beautiful layouts. Add photos, descriptions, and tell your
                organization's unique story with complete creative control.
              </p>
              <div className="feature-list">
                <span>✓ Mission & Vision statements</span>
                <span>✓ Team member profiles</span>
                <span>✓ Project galleries</span>
                <span>✓ Custom branding</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21 8L12 2 3 8l9 6 9-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>One-Click Netlify Deployment</h3>
              </div>
              <p>
                Deploy your website instantly to Netlify with a single click.
                Your NGO website will be live on the internet immediately, with
                professional hosting and global CDN included.
              </p>
              <div className="feature-highlight">
                <span>🚀 Instant deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Process</div>
            <h2>From Idea to Website in 5 Simple Steps</h2>
            <p>
              Our streamlined process makes website creation effortless for any
              NGO
            </p>
          </div>

          <div className="process-flow">
            <div className="process-step">
              <div className="step-visual">
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-number">01</div>
              </div>
              <div className="step-content">
                <h3>Organization Details</h3>
                <p>Share your NGO's mission, vision, and story</p>
              </div>
            </div>

            <div className="process-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M1 12h38m-6-6l6 6-6 6"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-visual">
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 21v-2a4 4 0 0 0-3-3.87"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3.13a4 4 0 0 1 0 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-number">02</div>
              </div>
              <div className="step-content">
                <h3>Add Team & Projects</h3>
                <p>Showcase your team members and ongoing projects</p>
              </div>
            </div>

            <div className="process-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M1 12h38m-6-6l6 6-6 6"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-visual">
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="13.5"
                      cy="6.5"
                      r=".5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="17.5"
                      cy="10.5"
                      r=".5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="8.5"
                      cy="7.5"
                      r=".5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="6.5"
                      cy="12.5"
                      r=".5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-number">03</div>
              </div>
              <div className="step-content">
                <h3>Customize Design</h3>
                <p>Choose colors, fonts, and layouts for your brand</p>
              </div>
            </div>

            <div className="process-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M1 12h38m-6-6l6 6-6 6"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-visual">
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-number">04</div>
              </div>
              <div className="step-content">
                <h3>Preview & Perfect</h3>
                <p>See your website live and make final adjustments</p>
              </div>
            </div>

            <div className="process-arrow">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M1 12h38m-6-6l6 6-6 6"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="process-step">
              <div className="step-visual">
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="step-number">05</div>
              </div>
              <div className="step-content">
                <h3>Deploy & Share</h3>
                <p>Launch your website with one click to Netlify</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Amplify Your Impact?</h2>
            <p>
              Join hundreds of NGOs worldwide who trust Navira to tell their
              story online.
            </p>
            <Link to="/create" className="btn btn-primary btn-lg">
              Start Creating Your Website
            </Link>
          </div>
        </div>
      </section>

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
              <p className="creator-label">Designed and Developed by</p>
              <h3 className="creator-name">Tanish Upadhyay</h3>
              <p className="creator-mission">
                Supporting NGOs & iniciatives with No-code solutions
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

export default HomePage;
