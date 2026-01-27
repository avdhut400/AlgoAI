# 🚀 AlgoAI – AI SaaS Platform

AlgoAI is a **full-stack AI-powered SaaS platform** that provides multiple AI utilities such as content generation, image processing, and resume analysis through a single, secure, and scalable web application. The project is built using a **monorepo architecture** with a modern frontend and a production-ready backend.

---

## ✨ Features

- ✍️ AI Article Generation  
- 🏷️ AI Blog Title Generator  
- 🎨 AI Image Generation  
- 🖼️ Image Background Removal  
- ✂️ Image Object Removal  
- 📄 AI Resume Review  
- ⚡ Async Image Upscaling  
- 📊 User Dashboard & Usage Tracking  
- 🔐 Secure Authentication using Clerk  
- 🚀 Production Deployment (Vercel + Render)

---

## 🏗️ Project Structure
```bash

AlgoAI/
│
├── client/ # Frontend (Vite + React)
│ ├── public/ # Static assets (video, images, icons)
│ ├── src/
│ │ ├── assets/ # UI assets
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Application pages
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── vite.config.js
│ ├── tailwind.config.js
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── configs/ # Database & cloud configs
│ ├── controllers/ # Business logic
│ ├── middlewares/ # Auth & custom middleware
│ ├── routes/ # API routes
│ ├── server.js # Express entry file
│ └── package.json
│
├── .gitignore
├── LICENSE
├── README.md

```
---

🛠️ Tech Stack

---

 Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons

 Backend
- Node.js
- Express (v4)
- Clerk Authentication
- Neon PostgreSQL
- Cloudinary
- Multer
- Express Rate Limiter

 AI Services
- Google Gemini API
- Image Processing APIs

 Deployment
- Frontend: **Vercel**
- Backend: **Render**

---

 🔐 Authentication & Security

- Authentication handled using **Clerk**
- Protected API routes using middleware
- CORS configured for production frontend
- Environment variables for sensitive credentials
- Rate limiting applied to AI endpoints

---

 🌍 Live URLs

- **Frontend:** https://algo-ai-zeta.vercel.app  
- **Backend:** https://algoai-1.onrender.com  

---

⚙️ Environment Variables

Frontend 
```env
VITE_BASE_URL=https://algoai-1.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxx
```
---

Backend (server/.env)
```env
NODE_ENV=production
DATABASE_URL=your_neon_database_url
CLERK_SECRET_KEY=sk_test_xxxxxxxxx
GEMINI_API_KEY=xxxxxxxxx
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
FRONTEND_URL=https://algo-ai-zeta.vercel.app
```
How to Run Locally
Clone Repository

```bash
git clone https://github.com/avdhut400/AlgoAI.git
cd AlgoAI
```
---

Start Backend

```bash
cd server
npm install
npm start
```
---
Start Frontend
---
```bash
cd client
npm install
npm run dev
```
---

🧠 Learning Outcomes

Built a production-ready SaaS architecture
Integrated AI APIs into real-world workflows
Implemented secure authentication & authorization
Solved CORS and deployment-related issues
Deployed a full-stack application on cloud platforms

---

👨‍💻 Author

Avdhut Magar
AI & Full Stack Developer
