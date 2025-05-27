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
      // team: siteData.team,
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

    const cssTemplate = `
/* NGO Website Styles */
:root {
  --primary-color: ${design.primaryColor || "#00796B"};
  --secondary-color: ${design.secondaryColor || "#004D40"};
  --accent-color: ${design.accentColor || "#26A69A"};
  --font-family: '${design.font || "Poppins"}', sans-serif;
  --text-color: #333333;
  --light-bg: #f8f9fa;
  --white: #ffffff;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo img {
  height: 50px;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white);
  padding: 4rem 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: var(--accent-color);
  color: var(--white);
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
}

.btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

/* Section */
.section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

/* About */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-text h3 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.about-text p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.about-image img {
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-content h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

/* Contact */
.contact {
  background-color: var(--white);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h4 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.contact-item i {
  color: var(--accent-color);
  font-size: 1.2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  text-decoration: none;
  transition: var(--transition);
}

.social-link:hover {
  background-color: var(--accent-color);
  transform: scale(1.1);
}

/* Footer */
.footer {
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  padding: 2rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
  }

  .nav-menu {
    display: none;
  }

  .section-title {
    font-size: 2rem;
  }
}
`;

    await fs.writeFile(path.join(sitePath, "css", "style.css"), cssTemplate);
    console.log("Generated default theme CSS for site:", siteData._id);
  }

  async generateJS(siteData, sitePath) {
    const jsContent = `
// NGO Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.project-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Contact form handling (if present)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
});
`;

    await fs.writeFile(path.join(sitePath, "js", "script.js"), jsContent);
    console.log("Generated JavaScript for site:", siteData._id);
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

      // Copy team photos
      // for (let i = 0; i < siteData.team.length; i++) {
      //   const member = siteData.team[i];
      //   if (member.photo) {
      //     await this.copyImageFile(
      //       member.photo,
      //       path.join(imagesDir, `team-${i}.jpg`)
      //     );
      //   }
      // }

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
