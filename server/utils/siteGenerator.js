const fs = require("fs").promises;
const path = require("path");
const ejs = require("ejs");

class SiteGenerator {
  constructor() {
    this.templatesDir = path.join(__dirname, "../templates");
    this.outputDir = path.join(__dirname, "../generated");
  }

  async generateSite(siteData) {
    try {
      // Create unique directory for this site
      const siteId = siteData._id.toString();
      const sitePath = path.join(this.outputDir, siteId);

      // Ensure directories exist
      await fs.mkdir(sitePath, { recursive: true });
      await fs.mkdir(path.join(sitePath, "css"), { recursive: true });
      await fs.mkdir(path.join(sitePath, "js"), { recursive: true });
      await fs.mkdir(path.join(sitePath, "images"), { recursive: true });

      // Generate HTML files
      await this.generateHTML(siteData, sitePath);

      // Generate CSS
      await this.generateCSS(siteData, sitePath);

      // Generate JavaScript
      await this.generateJS(siteData, sitePath);

      // Copy images
      await this.copyImages(siteData, sitePath);

      return sitePath;
    } catch (error) {
      console.error("Error generating site:", error);
      throw error;
    }
  }

  async generateHTML(siteData, sitePath) {
    const templateData = {
      site: siteData,
      organization: siteData.organization,
      projects: siteData.projects,
      design: siteData.design,
      contact: siteData.contact,
    };

    // Generate index.html
    const indexTemplate = await fs.readFile(
      path.join(this.templatesDir, "index.ejs"),
      "utf-8"
    );
    const indexHTML = ejs.render(indexTemplate, templateData);
    await fs.writeFile(path.join(sitePath, "index.html"), indexHTML);

    console.log("Generated HTML files for site:", siteData._id);
  }

  async generateCSS(siteData, sitePath) {
    const { design } = siteData;

    // Use user-provided colors or fallback to teal theme
    const primaryColor = design.primaryColor || "#00796B";
    const secondaryColor = design.secondaryColor || "#004D40";
    const accentColor = design.accentColor || "#26A69A";
    const fontFamily = design.font || "Roboto";

    // Helper function to lighten/darken colors
    const adjustColor = (color, amount) => {
      const hex = color.replace("#", "");
      const num = Number.parseInt(hex, 16);

      let r = (num >> 16) + amount;
      let g = ((num >> 8) & 0x00ff) + amount;
      let b = (num & 0x0000ff) + amount;

      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));

      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    };

    // Generate lighter and darker variants
    const primaryLight = adjustColor(primaryColor, 40);
    const primaryDark = adjustColor(primaryColor, -30);

    const cssTemplate = `
/* NGO Website Styles - Custom Theme */
@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      " ",
      "+"
    )}:wght@300;400;500;600;700&display=swap');

:root {
  /* User Colors */
  --primary-color: ${primaryColor};
  --primary-light: ${primaryLight};
  --primary-dark: ${primaryDark};
  --secondary-color: ${secondaryColor};
  --accent-color: ${accentColor};
  
  /* System Colors */
  --text-primary: #212121;
  --text-secondary: #757575;
  --text-light: #FFFFFF;
  --text-muted: #9E9E9E;
  --background-light: #FAFAFA;
  --background-white: #FFFFFF;
  --background-overlay: rgba(0, 0, 0, 0.5);
  --border-color: #E0E0E0;
  --border-light: #F5F5F5;
  --success-color: #4CAF50;
  --warning-color: #FF9800;
  --error-color: #F44336;
  --info-color: #2196F3;
  
  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Typography */
  --font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}

/* Reset and Base Styles */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-family);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  background-color: var(--background-light);
  font-size: var(--font-size-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Header */
.header {
  background-color: var(--background-white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: var(--transition-normal);
}

.header.scrolled {
  box-shadow: var(--shadow-md);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) 0;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  text-decoration: none;
  transition: var(--transition-fast);
}

.logo:hover {
  transform: scale(1.02);
}

.logo img {
  height: 48px;
  width: auto;
  border-radius: var(--radius-lg);
  object-fit: contain;
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.025em;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--space-8);
  align-items: center;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-base);
  position: relative;
  transition: var(--transition-normal);
  padding: var(--space-2) 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition-normal);
}

.nav-link:hover,
.nav-link:focus {
  color: var(--primary-color);
}

.nav-link:hover::after,
.nav-link:focus::after {
  width: 100%;
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  width: 100%;
}

/* Mobile Menu */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.mobile-menu-btn span {
  width: 24px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
  transition: var(--transition-normal);
}

/* Hero Section */
.hero {
  background-color: var(--primary-color);
  color: var(--text-light);
  padding: var(--space-24) 0;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(30, 25, 25, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  
  pointer-events: none;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-out;
}

.hero-content h1 {
  font-size: clamp(var(--font-size-4xl), 5vw, var(--font-size-6xl));
  font-weight: 700;
  margin-bottom: var(--space-6);
  letter-spacing: -0.025em;
  line-height: var(--leading-tight);
}

.hero-content p {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-10);
  opacity: 0.95;
  font-weight: 400;
  line-height: var(--leading-relaxed);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Enhanced Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background-color: var(--background-white);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: var(--radius-xl);
  font-weight: 600;
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
  border: 2px solid transparent;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  min-width: 140px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition-normal);
}

.btn:hover,
.btn:focus {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background-color: var(--accent-color);
  color: var(--text-light);
}

.btn:hover::before,
.btn:focus::before {
  left: 100%;
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--text-light);
  border-color: var(--primary-color);
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover,
.btn-secondary:focus {
  background-color: var(--primary-color);
  color: var(--text-light);
}

/* Loading State */
.btn.loading {
  pointer-events: none;
  opacity: 0.7;
}

.btn.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Sections */
.section {
  padding: var(--space-20) 0;
  position: relative;
}

.section:nth-child(even) {
  background-color: var(--background-white);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: clamp(var(--font-size-3xl), 4vw, var(--font-size-5xl));
  color: var(--primary-color);
  margin-bottom: var(--space-4);
  font-weight: 700;
  letter-spacing: -0.025em;
  position: relative;
  line-height: var(--leading-tight);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: var(--accent-color);
  border-radius: var(--radius-full);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 600px;
  margin: 0 auto;
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.about-text h3 {
  color: var(--primary-color);
  margin-bottom: var(--space-6);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  position: relative;
  padding-left: var(--space-8);
}

.about-text h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: var(--space-8);
  background-color: var(--accent-color);
  border-radius: var(--radius-sm);
}

.about-text p {
  margin-bottom: var(--space-6);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.about-image {
  position: relative;
}

.about-image img {
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: var(--transition-normal);
}

.about-image::before {
  content: '';
  position: absolute;
  top: -var(--space-4);
  left: -var(--space-4);
  right: var(--space-4);
  bottom: var(--space-4);
  background-color: var(--accent-color);
  border-radius: var(--radius-xl);
  z-index: -1;
  opacity: 0.3;
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}

.project-card {
  background-color: var(--background-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
  position: relative;
  border: 1px solid var(--border-color);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transition: var(--transition-normal);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: var(--transition-normal);
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-content {
  padding: var(--space-8);
}

.project-content h4 {
  color: var(--primary-color);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-xl);
  font-weight: 600;
  line-height: var(--leading-tight);
}

.project-content p {
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  font-size: var(--font-size-base);
}

/* Contact Section */
.contact {
  background-color: var(--background-white);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
}

.contact-info h4 {
  color: var(--primary-color);
  margin-bottom: var(--space-8);
  font-size: var(--font-size-2xl);
  font-weight: 600;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  background-color: var(--background-light);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}

.contact-item:hover {
  background-color: var(--primary-color);
  color: var(--text-light);
  transform: translateX(8px);
}

.contact-item i {
  color: var(--accent-color);
  font-size: var(--font-size-xl);
  width: 24px;
  text-align: center;
}

.contact-item:hover i {
  color: var(--text-light);
}

.contact-item span {
  font-weight: 500;
}

.social-links {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--primary-color);
  color: var(--text-light);
  text-decoration: none;
  border-radius: 50%;
  transition: var(--transition-normal);
  font-size: var(--font-size-xl);
}

.social-link:hover {
  background-color: var(--accent-color);
  transform: translateY(-4px) scale(1.1);
  box-shadow: var(--shadow-lg);
}

/* Contact Form */
.contact-form h4 {
  color: var(--primary-color);
  margin-bottom: var(--space-8);
  font-size: var(--font-size-2xl);
  font-weight: 600;
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: var(--transition-normal);
  background-color: var(--background-white);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(${this.hexToRgb(primaryColor)}, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form .btn {
  background-color: var(--primary-color);
  color: var(--text-light);
  border: 2px solid var(--primary-color);
  width: 100%;
  justify-content: center;
}

.contact-form .btn:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

/* Footer */
.footer {
  background-color: var(--secondary-color);
  color: var(--text-light);
  text-align: center;
  padding: var(--space-10) 0;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-color);
}

.footer p {
  font-size: var(--font-size-base);
  opacity: 0.9;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-on-scroll {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-4);
  }

  .nav {
    padding: var(--space-4) 0;
  }

  .logo-text {
    font-size: var(--font-size-xl);
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--background-white);
    flex-direction: column;
    gap: 0;
    box-shadow: var(--shadow-lg);
    border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  }

  .nav-menu.active {
    display: flex;
  }

  .nav-menu li {
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border-color);
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .hero {
    padding: var(--space-16) 0;
  }

  .hero-content h1 {
    font-size: var(--font-size-4xl);
  }

  .hero-content p {
    font-size: var(--font-size-lg);
  }

  .section {
    padding: var(--space-12) 0;
  }

  .section-title {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-8);
  }

  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .project-card {
    margin: 0 auto;
    max-width: 400px;
  }

  .about-text h3 {
    font-size: var(--font-size-xl);
  }

  .contact-item {
    padding: var(--space-3);
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: var(--font-size-3xl);
  }

  .btn {
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-sm);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .about-text h3 {
    font-size: var(--font-size-lg);
    padding-left: var(--space-6);
  }

  .contact-form h4,
  .contact-info h4 {
    font-size: var(--font-size-xl);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto;
  }
}

/* Print styles */
@media print {
  .header,
  .footer,
  .contact-form,
  .social-links {
    display: none;
  }
  
  .section {
    page-break-inside: avoid;
  }
  
  body {
    background: white;
    color: black;
  }
}
`;

    await fs.writeFile(path.join(sitePath, "css", "style.css"), cssTemplate);
    console.log("Generated custom theme CSS for site:", siteData._id);
  }

  // Helper method to convert hex to RGB for rgba values
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(
          result[2],
          16
        )}, ${Number.parseInt(result[3], 16)}`
      : "0, 121, 107";
  }

  async generateJS(siteData, sitePath) {
    const jsContent = `
// NGO Website JavaScript - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
  // Initialize website
  initializeWebsite();

  function initializeWebsite() {
    setupSmoothScrolling();
    setupMobileMenu();
    setupAnimations();
    setupContactForm();
    setupHeaderEffects();
    setupLoadingStates();
    setupAccessibility();
  }

  // Smooth scrolling for navigation links
  function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    });
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
          if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
          } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
          }
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        }
      });

      // Close mobile menu when clicking on a link
      navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
          navMenu.classList.remove('active');
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        }
      });
    }
  }

  // Intersection Observer for animations
  function setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .about-text, .about-image, .contact-info, .contact-form');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.transitionDelay = \`\${index * 0.1}s\`;
    });
  }

  // Contact form handling
  function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
          showNotification('Please fill in all fields.', 'error');
          return;
        }
        
        if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          showNotification('Thank you for your message! We will get back to you soon.', 'success');
          this.reset();
          submitBtn.classList.remove('loading');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });

      // Real-time validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
      });
    }
  }

  // Field validation
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error styling
    field.style.borderColor = '';
    
    if (!value) {
      field.style.borderColor = 'var(--error-color)';
      return false;
    }
    
    if (fieldName === 'email' && !isValidEmail(value)) {
      field.style.borderColor = 'var(--error-color)';
      return false;
    }
    
    field.style.borderColor = 'var(--success-color)';
    return true;
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.innerHTML = \`
      <div class="notification-content">
        <span class="notification-icon">\${getNotificationIcon(type)}</span>
        <span class="notification-message">\${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
      </div>
    \`;
    
    // Add styles
    notification.style.cssText = \`
      position: fixed;
      top: 20px;
      right: 20px;
      background: \${getNotificationColor(type)};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
      font-family: var(--font-family);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    \`;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  function getNotificationIcon(type) {
    switch(type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  }

  function getNotificationColor(type) {
    switch(type) {
      case 'success': return 'var(--success-color)';
      case 'error': return 'var(--error-color)';
      case 'warning': return 'var(--warning-color)';
      default: return 'var(--info-color)';
    }
  }

  // Header scroll effects
  function setupHeaderEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scrolled class for styling
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });

    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${current}\`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Loading states for buttons
  function setupLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        if (this.href && this.href.includes('donate')) {
          // Add loading state for donation buttons
          const originalText = this.textContent;
          this.classList.add('loading');
          this.textContent = 'Redirecting...';
          
          setTimeout(() => {
            this.classList.remove('loading');
            this.textContent = originalText;
          }, 2000);
        }
      });
    });
  }

  // Accessibility enhancements
  function setupAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        // Close mobile menu on escape
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
              span.style.transform = 'none';
              span.style.opacity = '1';
            });
          }
        }

        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => notification.remove(), 300);
        });
      }
    });

    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });

    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = \`
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: var(--text-light);
      padding: 8px 16px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    \`;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Lazy loading for images
  function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Initialize lazy loading
  setupLazyLoading();

  console.log('NGO Website initialized successfully');
});
`;

    await fs.writeFile(path.join(sitePath, "js", "script.js"), jsContent);
    console.log("Generated enhanced JavaScript for site:", siteData._id);
  }

  async copyImages(siteData, sitePath) {
    const imagesDir = path.join(sitePath, "images");

    try {
      // Copy organization logo
      if (siteData.organization.logo) {
        await this.copyImageFile(
          siteData.organization.logo,
          path.join(imagesDir, "logo.jpg")
        );
      }

      // Copy organization banner
      if (siteData.organization.banner) {
        await this.copyImageFile(
          siteData.organization.banner,
          path.join(imagesDir, "banner.jpg")
        );
      }

      // Copy project images
      for (let i = 0; i < siteData.projects.length; i++) {
        const project = siteData.projects[i];
        if (project.image) {
          await this.copyImageFile(
            project.image,
            path.join(imagesDir, `project-${i}.jpg`)
          );
        }
      }

      console.log("Copied images for site:", siteData._id);
    } catch (error) {
      console.warn("Error copying images:", error);
    }
  }

  async copyImageFile(sourceUrl, destPath) {
    try {
      // Extract filename from URL
      const filename = sourceUrl.split("/").pop();
      const sourcePath = path.join(__dirname, "../uploads", filename);

      // Check if source file exists
      await fs.access(sourcePath);

      // Copy file
      await fs.copyFile(sourcePath, destPath);
    } catch (error) {
      console.warn(`Failed to copy image ${sourceUrl}:`, error);
    }
  }
}

module.exports = new SiteGenerator();
