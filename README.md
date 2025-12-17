Markdown

# 🗳️ Live Polling System (Real-Time)

A real-time live polling web application where a teacher can create polls and students can participate instantly, view live results, and chat in real-time.

Built using **React**, **Node.js**, **Socket.IO**, and deployed on **Vercel** + **Render**.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://live-polling-delta.vercel.app](https://live-polling-delta.vercel.app)
- **Backend (Render):** [https://live-polling-0eai.onrender.com](https://live-polling-0eai.onrender.com)

---

## 📌 Features

### 👩‍🏫 Teacher
- Create live polls with multiple options.
- Set poll duration and define the correct answer.
- View live poll results as students vote.
- View a list of connected students.
- **Moderation:** Kick students if needed.
- Real-time chat with all students.
- View poll history.

### 👨‍🎓 Student
- Join with a name (no login required).
- Participate in live polls instantly.
- View results immediately after the poll ends.
- Real-time chat with the teacher and other students.
- "Wait for teacher" screen when no poll is active.

### 🔁 Real-Time Capabilities
- Instant updates using **Socket.IO**.
- Single source of truth for chat & poll state.
- Auto-synchronization for students joining late.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **Socket.IO Client**
- **Context API** (State Management)
- **CSS** (Styling)

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO**
- **In-memory state management**

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## 📁 Project Structure

```bash
live-polling/
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── socket/
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── src/
│   │   ├── socket/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
⚙️ Environment Variables
To run this project, you may need to configure environment variables.

Backend (server/.env)

Code snippet

PORT=5000
Frontend The frontend is currently configured to use the deployed backend URL directly: https://live-polling-0eai.onrender.com

🧪 Local Setup
Follow these steps to run the project locally on your machine.

1️⃣ Clone the repository
Bash

git clone [https://github.com/oiiamsaurav78/live-polling.git](https://github.com/oiiamsaurav78/live-polling.git)
cd live-polling
2️⃣ Start Backend
Open a terminal and navigate to the server folder:

Bash

cd server
npm install
npm start
The server will start on port 5000.

3️⃣ Start Frontend
Open a new terminal window and navigate to the client folder:

Bash

cd client
npm install
npm run dev
The application will open in your browser.

🧠 Key Learnings
Implementing Real-time event-driven architecture.

Mastering Socket.IO state synchronization between multiple clients.

Handling edge cases like late-joining clients ensuring they receive current state.

Managing Frontend–Backend deployment separation (Vercel & Render).

Production debugging experiences including CORS configuration, WebSockets over HTTPS, and case-sensitive imports.
