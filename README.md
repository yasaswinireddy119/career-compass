# 🚀 Path Finder  
### AI-Powered Career Guidance & Counseling Platform

---

## 📌 Project Title

**Path Finder – AI-Powered Career Guidance Platform**

---

## 📖 Project Description

Path Finder is a full-stack AI-powered web application designed to help students and professionals explore suitable career paths, connect with counselors, and receive intelligent recommendations based on their skills, interests, and goals.

The platform integrates a modern React-based frontend with a robust Express + PostgreSQL backend. It leverages the OpenAI API to generate personalized, structured, and actionable career guidance.

This project demonstrates expertise in:

- Full-stack development  
- RESTful API design  
- Database modeling  
- AI API integration  
- Environment variable management  
- Production deployment  

---

## ✨ Features

### 👤 User Features
- Create and manage personal profile  
- Add education, skills, interests, and experience  
- Browse career counselors  
- Book and manage sessions  
- Explore job opportunities  
- Access learning resources  
- Participate in discussion forums  
- Create and track career goals  

---

### 🤖 AI-Powered Career Recommendation
- Personalized career suggestions  
- Skill development guidance  
- Career path recommendations  
- Actionable next steps  
- Structured AI-generated output  

---

### 🧑‍💼 Counselor & Session Management
- View counselor listings  
- Book counseling sessions  
- Update session status  
- Track scheduled appointments  

---

### 📊 Goal Tracking System
- Create career goals  
- Update goal progress  
- Monitor completion status  

---

## 🛠 Tech Stack Used

### 🔹 Frontend
- React  
- Vite  
- TypeScript  
- Tailwind CSS  
- ShadCN UI  
- TanStack React Query  

### 🔹 Backend
- Node.js  
- Express.js  
- TypeScript  
- PostgreSQL  
- Drizzle ORM  
- OpenAI API  
- Express Session  

### 🔹 Deployment
- Render (Full-Stack Deployment)

---

## ⚙️ Installation Steps (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yasaswinireddy119/career-compass.git
cd career-compass
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_postgresql_connection_string
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_api_key
```

> ⚠️ Replace the placeholder values with your actual database connection string and OpenAI API key.

### 4️⃣ Push Database Schema

```bash
npm run db:push
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5001
```

---

## 🌐 Deployment Link

🔗 **Live Application:**  
https://career-compass-updated-sax3.onrender.com/

> The application is deployed as a full-stack production service on Render.  
> The backend serves REST APIs while the frontend is served statically through the Express server in production mode.

---

## 🔗 Backend API Link

Since the application is deployed as a full-stack service, backend APIs are served through the same Render deployment.

**Base API URL:**

```
https://career-compass-updated-sax3.onrender.com/api
```

Example endpoint:

```
https://career-compass-updated-sax3.onrender.com/api/jobs
```

---

## 🔐 Login Credentials (If Applicable)

If authentication is enabled:

**Example Test Credentials:**

```
Email: testuser@example.com
Password: test123
```

(Replace with valid credentials if required.)

---

## 📸 Screenshots

### 🏠 Landing Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/03ffa077-650e-4b83-8d6d-4466a3b696b5" />

### 📊 Dashboard Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/3b0998ed-36bb-4425-bfdf-a1e4a2a18dda" />

### 🧑‍💼 Counseling Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/77cc6125-5e87-4d3a-80db-6685715dd962" />

### 📅 Sessions Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/1a0a73ed-b591-4cac-baf4-eed6473c8504" />

### 📚 Resources Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/c2de6cc9-3b98-4011-b9b3-e4696f2f8445" />

### 💼 Job Board
<img width="500" height="500" src="https://github.com/user-attachments/assets/52f65a45-270e-4004-bb3f-59068806e4a3" />

### 🎯 Goals Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/5908186a-786d-4ec3-b094-bcbf495660cf" />

### 👤 Profile Page
<img width="500" height="500" src="https://github.com/user-attachments/assets/37b85036-928c-4a06-831d-eeeb3bc27239" />

---

## 🎥 Video Walkthrough

📹 **Project Demonstration Video:**  
https://drive.google.com/file/d/1gZDOIyo0nqMHpShApLG5PANqWQRKc7Ir/view?usp=sharing

---

## 📘 API Documentation

### 🔹 Profiles
- `GET /api/profiles`
- `GET /api/profiles/:userId`
- `POST /api/profiles`

### 🔹 Sessions
- `GET /api/sessions`
- `POST /api/sessions`
- `PATCH /api/sessions/:id`

### 🔹 Resources
- `GET /api/resources`
- `POST /api/resources`

### 🔹 Jobs
- `GET /api/jobs`
- `POST /api/jobs`

### 🔹 Forum
- `GET /api/forum`
- `GET /api/forum/:id`
- `POST /api/forum`
- `POST /api/forum/:id/reply`

### 🔹 Goals
- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/:id`

### 🔹 AI Recommendation
- `GET /api/ai/career-recommendations`

---

## 🗄 Database Overview

The application uses PostgreSQL with Drizzle ORM.

### Core Tables:
- Users  
- Profiles  
- Sessions  
- Resources  
- Jobs  
- ForumPosts  
- ForumReplies  
- Goals  

### Relationships:
- One User → One Profile  
- One User → Many Sessions  
- One User → Many Goals  
- One Post → Many Replies  

---

## 👩‍💻 Developed By

Yasaswini Reddy  
Full Stack Developer  
AI Enthusiast  

---

## 📄 License

This project is licensed under the MIT License.

