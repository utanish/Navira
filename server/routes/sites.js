const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

// Create a new site
router.post("/", siteController.createSite);

// Get a site by ID
router.get("/:id", siteController.getSite);

// Update a site
router.put("/:id", siteController.updateSite);

// Delete a site
router.delete("/:id", siteController.deleteSite);

// Generate preview for a site
router.get("/:id/preview", siteController.generatePreview);

// Deploy site to Netlify
router.post("/:id/deploy", siteController.deployToNetlify);

// Download site as ZIP
router.get("/:id/download", siteController.downloadSite);

// Get all sites (with pagination)
router.get("/", siteController.getAllSites);

module.exports = router;
