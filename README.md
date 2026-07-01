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

<img width="959" height="220" alt="image" src="https://github.com/user-attachments/assets/b31f1087-7c11-4a7b-9648-4dce4e1134d4" />

1. User pastes an email + selects a desired tone in the React UI.
2. The frontend sends a request to the Spring Boot REST API.
3. The backend builds a prompt and calls the Groq API (LLaMA 3.3 70B).
4. The generated reply is returned to the frontend and displayed to the user.
