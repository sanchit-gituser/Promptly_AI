# Promptly AI 

> A full-stack AI chatbot web application powered by Google's Gemini API — built from scratch with a sleek dark-theme UI, persistent chat history, and a real-time typing experience inspired by ChatGPT.

**🔗 Live Demo → [promptly-ai-1.onrender.com](https://promptly-ai-1.onrender.com)**

---

## ✨ Features

- 🧠 **Gemini API Integration** — Real-time AI responses powered by Google's Gemini model
- 💬 **Multi-Thread Chat System** — Create, switch between, and manage multiple independent conversations
- 🕓 **Persistent Chat History** — All conversations saved and dynamically retrieved from the database
- 🗑️ **Chat Deletion** — Delete individual chat threads cleanly
- ⌨️ **Typing Animation** — AI responses stream character by character for a polished, production-feel experience
- 📱 **Fully Responsive UI** — Adapts fluidly across desktop, tablet, and mobile screen sizes
- 🌑 **Dark Theme** — Clean, minimal dark UI inspired by ChatGPT

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI | Google Gemini API |
| Deployment | Render |

---



---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key — get one free at [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repository
```bash
git clone https://github.com/sanchit-gituser/Promptly_AI.git
cd Promptly_AI
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file inside `server/`:
```env
ATLAS_DB=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm start
```

### 3. Set up the frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---


## 💡 How It Works

1. User types a message in the chat input
2. The React frontend sends the message to the Express backend via REST API
3. The backend forwards the prompt to the **Gemini API** and receives a response
4. The response is saved to **MongoDB** and returned to the frontend
5. The frontend renders the reply with a **character-by-character typing animation**
6. The chat thread is stored and retrievable across sessions

---

## 🌐 Deployment

The app is deployed on **Render** (full-stack):
- Backend hosted as a Web Service
- Frontend served via static site hosting
- Environment variables configured securely via Render dashboard

**Live at → [promptly-ai-1.onrender.com](https://promptly-ai-1.onrender.com)**

> ⚠️ Note: The app is on Render's free tier, so it may take 30–50 seconds to wake up on the first load. This is normal — just wait a moment and it'll be live.

---

## 👨‍💻 Author

**Sanchit Jain**
B.Tech Electrical Engineering — NSUT, New Delhi

[![GitHub](https://img.shields.io/badge/GitHub-sanchit--gituser-181717?style=flat&logo=github)](https://github.com/sanchit-gituser)
[![Email](https://img.shields.io/badge/Email-sanchitjain0617@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:sanchitjain0617@gmail.com)

---


<div align="center">
  <sub>Built with curiosity and a lot of console.log() 🚀</sub>
</div>
