# Navira – AI-Powered NGO Website Generator

Navira is a full-stack SaaS application that enables NGOs to effortlessly generate and deploy modern websites through a question-based flow. It leverages Gemini AI to enhance content and integrates with Netlify for one-click deployment.

---

##  Live URLs

* **Frontend**: [https://navira.onrender.com](https://navira.onrender.com)
* **Backend**: [https://navira-backend.onrender.com](https://navira-backend.onrender.com)

---

##  Tech Stack

* **Frontend**: React (Vite), Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose)
* **AI Integration**: Gemini 1.5 Flash / Gemini Pro via Google Generative AI SDK
* **Deployment**: Render (Frontend), Render (Backend)

---

##  Installation

### Backend Setup

```bash
git clone https://github.com/utanish/Navira.git
cd Navira/server
npm install
```

Create a `.env` file in the `server` directory with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
BASE_URL=https://navira-backend.onrender.com
ALLOWED_ORIGINS=https://navira.onrender.com,http://localhost:5173
```

Run the backend:

```bash
npm start
```

### Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in `client`:

```env
VITE_API_URL=https://navira-backend.onrender.com/api
```

Run the frontend:

```bash
npm run dev
```

---

## Project Frontend 

###  Home Page 

<img width="1671" alt="image" src="https://github.com/user-attachments/assets/b46aab6c-fd54-48c9-9b04-e3cddd75e098" />

###  Home Page II 

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/76b69751-1a07-40f2-bcba-12965f562038" />

###  Website Details Form 

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/48e71d6c-c1b3-48bb-bc56-6028ccce16be" />

---

##  Folder Structure

```
Navira/
├── client/       # React frontend
├── server/       # Express backend
└── README.md
```

---

##  API Reference

| Endpoint                       | Method | Description                             |
| ------------------------------ | ------ | --------------------------------------- |
| `/api/sites`                   | POST   | Create a new site entry                 |
| `/api/sites/:id`               | GET    | Get site details by ID                  |
| `/api/sites/:id`               | PUT    | Update site details                     |
| `/api/sites/:id/preview`       | GET    | Generate preview HTML for the site      |
| `/api/sites/:id/deploy`        | POST   | Deploy site to Netlify                  |
| `/api/sites/:id/download`      | GET    | Download zipped site files              |
| `/api/ai/enhance`              | POST   | Enhance a content field using Gemini AI |
| `/api/ai/suggest`              | POST   | Get field suggestions via Gemini AI     |
| `/api/ai/status`               | GET    | Check AI service health                 |
| `/api/upload`                  | POST   | Upload single image                     |
| `/api/upload/delete/:filename` | DELETE | Delete uploaded image                   |

---






---

##  Author

* **Tanish Upadhyay**
  [GitHub](https://github.com/utanish) | [LinkedIn](https://www.linkedin.com/in/tanish-upadhyay/)


