# NGO Website Builder

A no-signup, no-code web platform for NGOs to instantly generate professional, static websites. Users fill a guided form, preview their site, generate and customize content with Gemini API, and deploy with one click to Netlify or download as ZIP.

## Features

- Multi-step form for collecting NGO information
- Real-time preview of the website
- Template selection and theme customization
- AI-powered content generation using Gemini API
- One-click deployment to Netlify
- Download as ZIP option

## Tech Stack

- **Frontend**: React (JavaScript)
- **Backend**: Express (Node.js)
- **Database**: MongoDB
- **APIs**: Gemini API for content generation, Netlify API for deployment

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gemini API key
- Netlify API token

### Environment Variables

Create a `.env` file in the server directory with the following variables:

\`\`\`
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NETLIFY_API_TOKEN=your_netlify_api_token
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

3. Start the development servers:

\`\`\`bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm start
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend

1. Deploy the server to a hosting service like Vercel, Heroku, or DigitalOcean
2. Set up the environment variables on your hosting platform

### Frontend

1. Build the React app:

\`\`\`bash
cd client
npm run build
\`\`\`

2. Deploy the build folder to a static hosting service

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Developed by Tanish Upadhyay
# Navira
# Navira
