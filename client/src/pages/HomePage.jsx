import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Create Beautiful Websites for Your NGO</h1>
          <p className="hero-subtitle">
            No coding required. Generate professional websites in minutes with
            our easy-to-use platform.
          </p>
          <Link to="/create" className="btn btn-primary hero-btn">
            Start Creating Now
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.png" alt="NGO Website Generator" />
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bolt"></i>
            </div>
            <h3>Quick & Easy</h3>
            <p>
              Create a professional website in minutes with our step-by-step
              wizard.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-paint-brush"></i>
            </div>
            <h3>Beautiful Design</h3>
            <p>
              Choose from modern, responsive designs that look great on all
              devices.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>AI-Enhanced Content</h3>
            <p>
              Improve your content with our AI assistant powered by Google
              Gemini.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3>Instant Deployment</h3>
            <p>
              Deploy your website instantly to Netlify or download as a ZIP
              file.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Your NGO Details</h3>
            <p>
              Provide information about your organization, team, projects, and
              contact details.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Customize Your Design</h3>
            <p>
              Choose colors, fonts, and upload images to match your
              organization's branding.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Enhance with AI</h3>
            <p>
              Optionally improve your content with our AI assistant for
              professional results.
            </p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Preview & Deploy</h3>
            <p>
              Preview your website and deploy it instantly or download the
              files.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Create Your NGO Website?</h2>
          <p>
            Get started now and have your professional website up and running in
            minutes.
          </p>
          <Link to="/create" className="btn btn-primary cta-btn">
            Create Your Website
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
