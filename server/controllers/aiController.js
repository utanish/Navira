const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Enhance content with AI
exports.enhanceContent = async (req, res) => {
  try {
    const { content, options = {} } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Content is required for enhancement",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "AI service is not configured",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt based on field type and options
    const prompt = createEnhancementPrompt(content, options);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedContent = response.text();

    res.json({
      success: true,
      enhancedContent: enhancedContent.trim(),
      originalContent: content,
      options,
    });
  } catch (error) {
    console.error("Error enhancing content:", error);

    // Fallback response if AI fails
    const { content, options = {} } = req.body; // Declare variables before using them
    res.json({
      success: true,
      enhancedContent: content, // Return original content as fallback
      originalContent: content,
      options,
      fallback: true,
      message:
        "AI enhancement temporarily unavailable, original content returned",
    });
  }
};

// Generate content suggestions
exports.generateSuggestions = async (req, res) => {
  try {
    const { type, context = {} } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Content type is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "AI service is not configured",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = createSuggestionPrompt(type, context);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    res.json({
      success: true,
      suggestions: suggestions.trim(),
      type,
      context,
    });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate suggestions",
      error: error.message,
    });
  }
};

// Check AI service status
exports.getStatus = async (req, res) => {
  try {
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (!hasApiKey) {
      return res.json({
        success: true,
        status: "unavailable",
        message: "AI service is not configured",
      });
    }

    // Test API connection
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Test connection");
    await result.response;

    res.json({
      success: true,
      status: "available",
      message: "AI service is operational",
    });
  } catch (error) {
    console.error("AI service status check failed:", error);
    res.json({
      success: true,
      status: "error",
      message: "AI service is experiencing issues",
    });
  }
};

// Helper function to create enhancement prompts
function createEnhancementPrompt(content, options) {
  const { field, wordLimit = 100, tone = "professional" } = options;

  let basePrompt = `Please enhance and improve the following ${
    field || "content"
  } for an NGO website. `;

  switch (field) {
    case "mission":
      basePrompt +=
        "Make it clear, inspiring, and concise. Focus on the organization's purpose and impact. ";
      break;
    case "vision":
      basePrompt +=
        "Make it aspirational and forward-looking. Focus on the future the organization wants to create. ";
      break;
    case "about":
      basePrompt +=
        "Make it engaging and informative. Include the organization's history, values, and achievements. ";
      break;
    case "projectDescription":
      basePrompt +=
        "Make it compelling and detailed. Focus on the project's goals, impact, and benefits. ";
      break;
    default:
      basePrompt += "Make it more engaging, clear, and professional. ";
  }

  basePrompt += `Keep it ${tone} in tone and limit to approximately ${wordLimit} words. `;
  basePrompt +=
    "Return only the enhanced content without any additional commentary.\n\n";
  basePrompt += `Original content: "${content}"`;

  return basePrompt;
}

// Helper function to create suggestion prompts
function createSuggestionPrompt(type, context) {
  const { organizationName, sector } = context;

  let prompt = "";

  switch (type) {
    case "mission":
      prompt = `Generate 3 different mission statement suggestions for an NGO called "${
        organizationName || "the organization"
      }"`;
      if (sector) prompt += ` working in the ${sector} sector`;
      prompt +=
        ". Each should be 1-2 sentences and focus on purpose and impact.";
      break;

    case "vision":
      prompt = `Generate 3 different vision statement suggestions for an NGO called "${
        organizationName || "the organization"
      }"`;
      if (sector) prompt += ` working in the ${sector} sector`;
      prompt +=
        ". Each should be aspirational and describe the future they want to create.";
      break;

    case "projectIdeas":
      prompt = `Generate 5 project ideas for an NGO called "${
        organizationName || "the organization"
      }"`;
      if (sector) prompt += ` working in the ${sector} sector`;
      prompt +=
        ". Include brief descriptions of each project's goals and impact.";
      break;

    default:
      prompt = `Generate helpful content suggestions for an NGO website.`;
  }

  return prompt;
}
