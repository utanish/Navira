const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const FormData = require("form-data");
const archiver = require("archiver");

class NetlifyDeploy {
  constructor() {
    this.apiKey = process.env.NETLIFY_API_KEY;
    this.baseUrl = "https://api.netlify.com/api/v1";
  }

  async deploy(sitePath, siteName) {
    try {
      if (!this.apiKey) {
        throw new Error("Netlify API key not configured");
      }

      // Create a ZIP file of the site
      const zipPath = await this.createZipFile(sitePath, siteName);

      // Create a new site on Netlify
      const site = await this.createSite(siteName);

      // Deploy the ZIP file
      const deploymentUrl = await this.deployZip(site.id, zipPath);

      // Clean up ZIP file
      await fs.unlink(zipPath);

      return deploymentUrl;
    } catch (error) {
      console.error("Netlify deployment error:", error);
      throw error;
    }
  }

  async createZipFile(sitePath, siteName) {
    const zipPath = path.join(
      __dirname,
      "../temp",
      `${siteName}-${Date.now()}.zip`
    );

    // Ensure temp directory exists
    await fs.mkdir(path.dirname(zipPath), { recursive: true });

    return new Promise((resolve, reject) => {
      const output = require("fs").createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => resolve(zipPath));
      archive.on("error", reject);

      archive.pipe(output);
      archive.directory(sitePath, false);
      archive.finalize();
    });
  }

  async createSite(siteName) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/sites`,
        {
          name: this.sanitizeSiteName(siteName),
          custom_domain: null,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 422) {
        // Site name already exists, try with timestamp
        const uniqueName = `${this.sanitizeSiteName(siteName)}-${Date.now()}`;
        return this.createSite(uniqueName);
      }
      throw error;
    }
  }

  async deployZip(siteId, zipPath) {
    try {
      const zipBuffer = await fs.readFile(zipPath);

      const response = await axios.post(
        `${this.baseUrl}/sites/${siteId}/deploys`,
        zipBuffer,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/zip",
          },
        }
      );

      const deployment = response.data;

      // Wait for deployment to be ready
      await this.waitForDeployment(deployment.id);

      return deployment.ssl_url || deployment.url;
    } catch (error) {
      console.error("Deployment error:", error.response?.data || error.message);
      throw error;
    }
  }

  async waitForDeployment(deploymentId, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/deploys/${deploymentId}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
            },
          }
        );

        const deployment = response.data;

        if (deployment.state === "ready") {
          return deployment;
        }

        if (deployment.state === "error") {
          throw new Error(`Deployment failed: ${deployment.error_message}`);
        }

        // Wait 2 seconds before checking again
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        if (i === maxAttempts - 1) {
          throw error;
        }
      }
    }

    throw new Error("Deployment timeout");
  }

  sanitizeSiteName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 50);
  }
}

module.exports = new NetlifyDeploy();
