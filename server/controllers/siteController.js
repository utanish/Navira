const Site = require("../models/Site");
const siteGenerator = require("../utils/siteGenerator");
const netlifyDeploy = require("../utils/netlifyDeploy");
const path = require("path");
const fs = require("fs").promises;
const archiver = require("archiver");

// Create a new site
exports.createSite = async (req, res) => {
  try {
    const siteData = req.body;

    // Validate required fields
    if (!siteData.organization?.name) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required",
      });
    }

    if (!siteData.contact?.email) {
      return res.status(400).json({
        success: false,
        message: "Contact email is required",
      });
    }

    // Create new site
    const site = new Site(siteData);
    await site.save();

    res.status(201).json({
      success: true,
      message: "Site created successfully",
      site,
    });
  } catch (error) {
    console.error("Error creating site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create site",
      error: error.message,
    });
  }
};

// Get a site by ID
exports.getSite = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.json({
      success: true,
      site,
    });
  } catch (error) {
    console.error("Error fetching site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch site",
      error: error.message,
    });
  }
};

// Update a site
exports.updateSite = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const site = await Site.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.json({
      success: true,
      message: "Site updated successfully",
      site,
    });
  } catch (error) {
    console.error("Error updating site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update site",
      error: error.message,
    });
  }
};

// Delete a site
exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findByIdAndDelete(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    // Clean up generated files
    if (site.generatedPath) {
      try {
        await fs.rmdir(site.generatedPath, { recursive: true });
      } catch (cleanupError) {
        console.warn("Failed to clean up generated files:", cleanupError);
      }
    }

    res.json({
      success: true,
      message: "Site deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete site",
      error: error.message,
    });
  }
};

// Generate preview for a site
exports.generatePreview = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    // Generate static site
    const generatedPath = await siteGenerator.generateSite(site);

    // Update site with generated path
    site.generatedPath = generatedPath;
    site.status = "generated";
    site.previewUrl = `${process.env.BASE_URL}/generated/${path.basename(
      generatedPath
    )}/index.html`;
    await site.save();

    res.json({
      success: true,
      message: "Preview generated successfully",
      previewUrl: site.previewUrl,
      generatedPath,
    });
  } catch (error) {
    console.error("Error generating preview:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate preview",
      error: error.message,
    });
  }
};

// Deploy site to Netlify
exports.deployToNetlify = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    // Generate site if not already generated
    let generatedPath = site.generatedPath;
    if (!generatedPath) {
      generatedPath = await siteGenerator.generateSite(site);
      site.generatedPath = generatedPath;
    }

    // Deploy to Netlify
    const deploymentUrl = await netlifyDeploy.deploy(
      generatedPath,
      site.organization.name
    );

    // Update site with deployment URL
    site.deploymentUrl = deploymentUrl;
    site.status = "deployed";
    await site.save();

    res.json({
      success: true,
      message: "Site deployed successfully",
      url: deploymentUrl,
    });
  } catch (error) {
    console.error("Error deploying site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deploy site",
      error: error.message,
    });
  }
};

// Download site as ZIP
exports.downloadSite = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await Site.findById(id);
    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    // Generate site if not already generated
    let generatedPath = site.generatedPath;
    if (!generatedPath) {
      generatedPath = await siteGenerator.generateSite(site);
      site.generatedPath = generatedPath;
      await site.save();
    }

    // Create ZIP file
    const zipFileName = `${site.organization.name.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}-website.zip`;

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${zipFileName}"`
    );

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(res);
    archive.directory(generatedPath, false);
    await archive.finalize();
  } catch (error) {
    console.error("Error downloading site:", error);
    res.status(500).json({
      success: false,
      message: "Failed to download site",
      error: error.message,
    });
  }
};

// Get all sites with pagination
exports.getAllSites = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sites = await Site.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("organization.name status createdAt deploymentUrl");

    const total = await Site.countDocuments();

    res.json({
      success: true,
      sites,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sites",
      error: error.message,
    });
  }
};
