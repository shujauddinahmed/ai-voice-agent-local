# 🎙️ Local AI Voice Agent (STT → LLM → TTS)

This project is a **local-first AI Voice Agent prototype** that can:
- Listen via microphone
- Convert speech to text
- Understand intent using an LLM
- Respond naturally in Hinglish
- Speak back using human-like voice

The goal of this project is **educational and exploratory** — to demonstrate how an end-to-end AI calling agent can be built **locally** without relying on expensive hosted AI services.

---

## ✨ What This Prototype Can Do

- 🎧 Microphone input from browser
- 🧠 Speech-to-Text using Whisper (Python)
- 🤖 AI reasoning using LLaMA (via Ollama)
- 🎙️ Text-to-Speech using Edge Neural Voices
- 🗣️ Natural Hinglish conversation flow
- 📞 Basic sales-style call logic:
  - Greeting
  - Pitch
  - Interest detection
  - Polite call ending

---

## 🧩 Architecture Overview

Browser Mic
↓
Speech-to-Text (Whisper)
↓
LLM Reasoning (Ollama / LLaMA)
↓
Text-to-Speech (edge-tts)
↓
AI Voice Response


Everything runs **locally** on your machine.

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS (Bootstrap)
- JavaScript (MediaRecorder API)

**Backend**
- Node.js
- Express
- Multer

**AI / ML**
- Whisper (Speech-to-Text)
- Ollama + LLaMA (LLM)
- edge-tts (Text-to-Speech)

---

## ⚙️ System Requirements

- Windows / macOS / Linux
- Node.js (v18+ recommended)
- Python (v3.10 – v3.13 supported)
- Internet (for first-time model downloads)
- Microphone access

> ⚠️ Note: This project runs locally and may be slow on CPU-only systems.

---

## 🚀 Step-by-Step Setup Guide

### 1️⃣ Install Node.js
Download from:
https://nodejs.org

Verify:
```bash
node --version
npm --version

2️⃣ Install Python

Download from:
https://www.python.org

⚠️ During install, check “Add Python to PATH”

Verify:
python --version

3️⃣ Install FFmpeg (Required for Whisper)

Download Windows build from:
https://www.gyan.dev/ffmpeg/builds/

Add bin folder to PATH.

Verify:

ffmpeg -version
4️⃣ Install Ollama (LLM Runtime)

Download from:
https://ollama.com

Verify:

ollama --version


Pull the model:

ollama pull llama3

5️⃣ Install Python Dependencies
pip install openai-whisper edge-tts

6️⃣ Install Node.js Dependencies

From project root:

npm install

7️⃣ Start the Backend Server
node server.js


You should see:

AI Call Server running at http://localhost:3000

8️⃣ Open the Voice UI

Open mic.html in your browser.

Allow microphone access.

Click Start → Speak → Stop

You should hear the AI respond.

🧪 Suggested Test Phrases

Try saying:

“Hello”

“Busy hoon”

“Interested hoon”

“Not interested”

Observe how the AI:

Responds naturally

Changes conversation flow

Ends calls politely

⚠️ Known Limitations

Runs locally only (no cloud hosting)

CPU-based speech recognition (can be slow)

Single-user demo (no session handling)

Not production-ready

This project is intended for learning, demos, and experimentation.
