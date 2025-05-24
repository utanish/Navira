const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

// Upload single image
router.post("/", uploadController.uploadImage);

// Upload multiple images
router.post("/multiple", uploadController.uploadMultipleImages);

// Delete uploaded image
router.delete("/:filename", uploadController.deleteImage);

module.exports = router;
