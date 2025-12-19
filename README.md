# 🎙️ Wispr Flow Clone

A real-time push-to-talk speech-to-text desktop application

## 📌 Project Overview

This project is a functional clone of Wispr Flow, focused on implementing the core voice-to-text workflow rather than pixel-perfect UI replication.

The application allows users to press and hold a button (or spacebar) to speak, streams microphone audio in real time to Deepgram, and displays live transcription inside a clean, minimal desktop interface built using Tauri + React.

### The goal of this project is to demonstrate:
* Real-time audio streaming
* Speech-to-text integration
* Cross-platform desktop development
* Clean architecture and maintainable code

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Framework | Tauri |
| Frontend | React + Vite |
| Language | TypeScript |
| Audio Capture | Web Audio API |
| Speech-to-Text | Deepgram Streaming API (WebSocket) |
| OS Support | Windows · macOS · Linux |

## ✨ Core Features Implemented

### ✅ Push-to-Talk Voice Input
* Hold mouse button or Spacebar to start recording
* Release to stop recording
* Visual feedback when recording is active

### ✅ Microphone Access & Audio Capture
* Secure microphone permission handling
* Audio captured using Web Audio API
* Converted to 16-bit PCM for Deepgram compatibility

### ✅ Real-Time Transcription
* Live audio streaming via WebSocket
* Near real-time transcription from Deepgram
* Incremental transcript updates

### ✅ Display & Insert Text
* Transcription displayed in a scrollable text area
* Text can be inserted externally via clipboard copy or file download
* Clean and readable formatting

### ✅ Recording Controls
* Hold-to-talk button
* Spacebar shortcut
* Reset transcription button

### ✅ Utility Tools Panel
* 📋 Copy transcript to clipboard
* 💾 Download transcript as `.txt` file
* ⌨️ Spacebar push-to-talk
* 🎧 Live mic waveform indicator

### ✅ Error Handling
* Microphone access failure handling
* WebSocket error logging
* Safe cleanup on stop/reset

## 📁 Project Structure

```
wispr-flow-clone/
│
├── src/                      # Frontend (React + Vite)
│   ├── assets/
│   │
│   ├── audio/                # 🎧 Audio capture & streaming
│   │   ├── recorder.ts       # Mic access + PCM conversion
│   │   └── stream.ts         # Audio → Deepgram pipeline
│   │
│   ├── deepgram/             # 🌐 Speech-to-text integration
│   │   └── client.ts         # Deepgram WebSocket client
│   │
│   ├── ui/                   # 🧩 UI components
│   │   ├── PushToTalk.tsx    # Push-to-talk control
│   │   └── ToolsPanel.tsx    # Copy / Download / Reset tools
│   │
│   ├── App.tsx               # App layout & state orchestration
│   ├── App.css               # App-level styling
│   ├── index.css             # Global styles (pastel bg, layout)
│   └── main.tsx              # React entry point
│
├── src-tauri/                # 🦀 Tauri (Rust backend)
│   ├── src/
│   │   ├── main.rs           # Tauri app entry
│   │   └── lib.rs            # (optional extensions)
│   ├── icons/
│   ├── capabilities/
│   └── tauri.conf.json       # Tauri configuration
│
├── package.json
├── vite.config.ts
├── .env                      # Environment variables (Deepgram API key)
└── README.md
```

## 🧱 Architecture & Code Quality

### Separation of Concerns

| Layer | Responsibility |
|-------|---------------|
| `ui/` | UI components (PushToTalk, ToolsPanel) |
| `audio/recorder.ts` | Microphone access & PCM audio processing |
| `audio/stream.ts` | Orchestrates audio → Deepgram flow |
| `deepgram/client.ts` | WebSocket connection & transcription handling |

Each module has a single, well-defined responsibility, ensuring clean and maintainable code.

## 🖥️ UI Design

* Pastel pink background
* Two equal-height white cards:
  * Left: Tools Panel
  * Right: Transcription Interface
* Rounded corners, soft shadows
* Minimal, modern aesthetic inspired by Wispr Flow

Focus was on usability and clarity, not pixel-perfect design.

## 🚀 Setup & Run Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/wispr-flow-clone.git
cd wispr-flow-clone
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variable

Create a `.env` file in the project root:

```env
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

### 4️⃣ Run in Development Mode

```bash
npm run tauri:dev
```
## ⚠️ Known Limitations

* No speaker diarization
* No language switching UI
* Basic waveform (not frequency-accurate)
* No production-level optimization

These were intentionally out of scope per assignment instructions.

## 🧠 Design Decisions

* **Deepgram Streaming API** chosen for low latency and accuracy
* **Tauri over Electron** for smaller bundle size and better performance
* **Web Audio API** used for fine-grained audio control
* **Manual audio streaming** instead of pre-recorded blobs for real-time behavior


---

⭐ If you found this project helpful, please consider giving it a star!
