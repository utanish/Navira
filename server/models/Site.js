const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

const designSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: "#4a6fa5",
  },
  secondaryColor: {
    type: String,
    default: "#166088",
  },
  accentColor: {
    type: String,
    default: "#4cb5ae",
  },
  font: {
    type: String,
    default: "Roboto",
  },
  theme: {
    type: String,
    default: "modern",
    enum: ["modern", "classic", "minimal", "bold"],
  },
});

const socialMediaSchema = new mongoose.Schema({
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
});

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  donationLink: {
    type: String,
    trim: true,
  },
  socialMedia: socialMediaSchema,
});

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mission: {
    type: String,
    trim: true,
  },
  vision: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  banner: {
    type: String,
    trim: true,
  },
});

const siteSchema = new mongoose.Schema(
  {
    organization: {
      type: organizationSchema,
      required: true,
    },
    team: [teamMemberSchema],
    projects: [projectSchema],
    design: {
      type: designSchema,
      default: () => ({}),
    },
    contact: {
      type: contactSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "generated", "deployed"],
      default: "draft",
    },
    generatedPath: {
      type: String,
      trim: true,
    },
    deploymentUrl: {
      type: String,
      trim: true,
    },
    previewUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
siteSchema.index({ "organization.name": 1 });
siteSchema.index({ status: 1 });
siteSchema.index({ createdAt: -1 });

// Virtual for site URL
siteSchema.virtual("siteUrl").get(function () {
  return this.deploymentUrl || this.previewUrl;
});

// Transform output
siteSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Site", siteSchema);
