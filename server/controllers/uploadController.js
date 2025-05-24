const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Upload single image
exports.uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const { type } = req.body;
      const originalPath = req.file.path;
      const filename = req.file.filename;

      // Process image based on type
      let processedPath = originalPath;

      try {
        processedPath = await processImage(originalPath, type);

        // Remove original if processed version is different
        if (processedPath !== originalPath) {
          await fs.unlink(originalPath);
        }
      } catch (processError) {
        console.warn("Image processing failed, using original:", processError);
      }

      const imageUrl = `${process.env.BASE_URL}/uploads/${path.basename(
        processedPath
      )}`;

      res.json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl,
        filename: path.basename(processedPath),
        originalName: req.file.originalname,
        size: req.file.size,
        type,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error.message,
      });
    }
  },
];

// Upload multiple images
exports.uploadMultipleImages = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No image files provided",
        });
      }

      const { type } = req.body;
      const uploadedImages = [];

      for (const file of req.files) {
        try {
          const originalPath = file.path;
          const processedPath = await processImage(originalPath, type);

          // Remove original if processed version is different
          if (processedPath !== originalPath) {
            await fs.unlink(originalPath);
          }

          const imageUrl = `${process.env.BASE_URL}/uploads/${path.basename(
            processedPath
          )}`;

          uploadedImages.push({
            imageUrl,
            filename: path.basename(processedPath),
            originalName: file.originalname,
            size: file.size,
          });
        } catch (processError) {
          console.warn(
            `Failed to process image ${file.originalname}:`,
            processError
          );
        }
      }

      res.json({
        success: true,
        message: `${uploadedImages.length} images uploaded successfully`,
        images: uploadedImages,
        type,
      });
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload images",
        error: error.message,
      });
    }
  },
];

// Delete uploaded image
exports.deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }

    const filePath = path.join(__dirname, "../uploads", filename);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);

      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      if (error.code === "ENOENT") {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

// Helper function to process images based on type
async function processImage(imagePath, type) {
  const outputPath = imagePath.replace(/\.[^/.]+$/, "-processed.jpg");

  let sharpInstance = sharp(imagePath);

  switch (type) {
    case "logo":
      sharpInstance = sharpInstance
        .resize(200, 200, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 90 });
      break;

    case "banner":
      sharpInstance = sharpInstance
        .resize(1200, 400, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 85 });
      break;

    case "team":
      sharpInstance = sharpInstance
        .resize(300, 300, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 85 });
      break;

    case "project":
      sharpInstance = sharpInstance
        .resize(600, 400, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 85 });
      break;

    default:
      sharpInstance = sharpInstance
        .resize(800, 600, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 });
  }

  await sharpInstance.toFile(outputPath);
  return outputPath;
}
