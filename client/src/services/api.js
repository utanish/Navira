import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Site API calls
export const createSite = async (siteData) => {
  try {
    const response = await api.post("/sites", siteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating site" };
  }
};

export const getSite = async (siteId) => {
  try {
    const response = await api.get(`/sites/${siteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching site" };
  }
};

export const updateSite = async (siteId, siteData) => {
  try {
    const response = await api.put(`/sites/${siteId}`, siteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating site" };
  }
};

// AI enhancement API calls
export const enhanceContent = async (content, options) => {
  try {
    const response = await api.post("/ai/enhance", { content, options });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Error enhancing content with AI" }
    );
  }
};

// File upload API calls
export const uploadImage = async (file, type) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error uploading image" };
  }
};

// Site generation and deployment
export const generatePreview = async (siteId) => {
  try {
    const response = await api.get(`/sites/${siteId}/preview`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error generating preview" };
  }
};

export const deployToNetlify = async (siteId) => {
  try {
    const response = await api.post(`/sites/${siteId}/deploy`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deploying to Netlify" };
  }
};

export const downloadSite = async (siteId) => {
  try {
    const response = await api.get(`/sites/${siteId}/download`, {
      responseType: "blob",
    });

    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ngo-site-${siteId}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
  } catch (error) {
    throw error.response?.data || { message: "Error downloading site" };
  }
};

export default api;
