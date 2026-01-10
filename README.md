🎥 StreamVault Frontend

Secure Video Upload, Processing & Streaming UI

This repository contains the frontend application for StreamVault, a secure,
role-based video upload and streaming platform with real-time processing updates.

Built using React, React Router, TailwindCSS, Context API, and Socket.IO and designed
to integrate seamlessly with the StreamVault backend.

🚀 Key Features

🔐 Authentication using HTTP-only cookies

🧩 Role-based UI (Viewer, Editor, Admin)

📤 Secure video uploads with live progress

🔄 Real-time processing updates via Socket.IO

🎬 Controlled video streaming (safe content only)

📊 Admin panel for user management

🌙 Modern, responsive dark UI with TailwindCSS

🧠 Frontend Responsibilities

Handle authentication state & session refresh

Enforce role-based access at UI & route level

Provide real-time feedback during video processing

Display and stream approved videos securely

Maintain a clean, intuitive dashboard experience

🏗️ Application Architecture
src/
├── api/            # Axios instance
├── components/     # UI & layout components
├── context/        # Auth & dashboard state
├── hooks/          # Token refresh & sockets
├── pages/          # Route-level pages
├── routes/         # Protected & role routes
└── styles/         # Tailwind styles

🔐 Authentication & Authorization

Authentication handled via AuthContext

Session restored on app load using /auth/me

Access token refreshed automatically in background

Route protection using:

ProtectedRoute

RoleRoute

🔄 Real-Time Processing

Socket.IO client connects after authentication

Users join private rooms using user ID

Live progress & completion updates during processing

UI reacts instantly to backend events

▶️ Running the Frontend
npm install
npm run dev


Runs locally at:

http://localhost:5173

🔧 Environment Variables
VITE_API_URL=http://localhost:5000/api
📚 Documentation

Detailed technical documentation is available in the /docs folder, including:

Authentication flow

Route protection & RBAC

Dashboard architecture

Upload & streaming flows

Socket.IO events

State management

/docs

🔮 Future Enhancements

UI for admin approval of flagged videos

Video analytics dashboard

Pagination & infinite scrolling

Improved accessibility & keyboard navigation