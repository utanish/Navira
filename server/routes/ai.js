const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// Enhance content with AI
router.post("/enhance", aiController.enhanceContent);

// Generate content suggestions
router.post("/suggest", aiController.generateSuggestions);

// Check AI service status
router.get("/status", aiController.getStatus);

module.exports = router;
