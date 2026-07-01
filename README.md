# ✨ Features

- 🧠 Generates smart, context-aware email replies using Groq API (LLaMA 3.3 70B)
- 🎭 Multiple tone options (e.g. professional, friendly, concise) for the same email
- ⚡ Fast inference thanks to Groq's LPU-based API
- 🌐 Clean React UI for pasting an email and getting an instant draft reply
- 🐳 Dockerized backend for consistent, reproducible deployment
- ☁️ Live deployment: backend on Render, frontend on Vercel


# 🛠️  Tech Stack

- Backend     ->    Java, Spring Boot, REST APIs
- Frontend    ->    React.js
- AI/LLM      ->    Groq API — LLaMA 3.3 70B
- Deployment  ->    Docker, Render (backend), Vercel (frontend)


# 📐 Architecture

![Architecture](assets/replymate-architecture.svg)

1. User pastes an email + selects a desired tone in the React UI.
2. The frontend sends a request to the Spring Boot REST API.
3. The backend builds a prompt and calls the Groq API (LLaMA 3.3 70B).
4. The generated reply is returned to the frontend and displayed to the user.
