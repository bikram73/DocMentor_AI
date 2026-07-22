# 📄 DocMentor AI — AI-Powered Document Assistant

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_3.6_Flash-8E75B2?style=for-the-badge&logo=google-cloud&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bikram73/DocMentor_AI)

<br />

> ### *"Upload. Understand. Learn. Instantly."*

**DocMentor AI** is an intelligent AI-powered document assistant that transforms any uploaded PDF, research paper, contract, report, or study note into an interactive conversational assistant powered by Google Gemini 3.6 Flash.

🔗 **GitHub Repository**: [https://github.com/bikram73/DocMentor_AI](https://github.com/bikram73/DocMentor_AI)

</div>

---

# 📑 Table of Contents

<div align="center">

| **<div align="center">📖 Description</div>** | **<div align="center">🚀 Section</div>** |
|--------------------------------------------------------------|------------------------------------------------|
| <div align="center">**View the project features and capabilities.** 👉</div> | <div align="center"><a href="#features"><img src="https://img.shields.io/badge/✨%20Features-4F46E5?style=for-the-badge" /></a></div> |
| <div align="center">**View the technologies, frameworks, and programming languages used.** 👉</div> | <div align="center"><a href="#tech-stack"><img src="https://img.shields.io/badge/🛠️%20Tech%20Stack-0891B2?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the project's folder and file organization.** 👉</div> | <div align="center"><a href="#file-structure"><img src="https://img.shields.io/badge/📂%20File%20Structure-10B981?style=for-the-badge" /></a></div> |
| <div align="center">**Follow the installation steps and local development setup.** 👉</div> | <div align="center"><a href="#installation"><img src="https://img.shields.io/badge/🚀%20Installation-F97316?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the complete AI document processing pipeline.** 👉</div> | <div align="center"><a href="#architecture"><img src="https://img.shields.io/badge/🏗️%20Architecture-DC2626?style=for-the-badge" /></a></div> |
| <div align="center">**Learn about the AI prompting strategy and anti-hallucination techniques.** 👉</div> | <div align="center"><a href="#prompt-strategy"><img src="https://img.shields.io/badge/🧠%20Prompt%20Strategy-7C3AED?style=for-the-badge" /></a></div> |
| <div align="center">**Understand how confidence scores are calculated and interpreted.** 👉</div> | <div align="center"><a href="#confidence"><img src="https://img.shields.io/badge/📊%20Confidence%20Scores-2563EB?style=for-the-badge" /></a></div> |
| <div align="center">**View all deliverables required for the AI challenge.** 👉</div> | <div align="center"><a href="#deliverables"><img src="https://img.shields.io/badge/📄%20Challenge%20Deliverables-059669?style=for-the-badge" /></a></div> |
| <div align="center">**View the available REST API endpoints and usage examples.** 👉</div> | <div align="center"><a href="#api"><img src="https://img.shields.io/badge/🌐%20API%20Documentation-0EA5E9?style=for-the-badge" /></a></div> |
| <div align="center">**View an overview of the sample documents and extraction results included in this project.** 👉</div> | <div align="center"><a href="#sample-documents"><img src="https://img.shields.io/badge/📄%20Sample%20Documents%20%26%20Extraction%20Results-14B8A6?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the complete system architecture, AI workflow, processing pipeline, data flow, deployment design, and technical decisions.** 👉</div> | <div align="center"><a href="./ARCHITECTURE.md"><img src="https://img.shields.io/badge/🏗️%20Architecture%20Document-DC2626?style=for-the-badge" /></a></div> |
| <div align="center">**Review processing speed, latency, and performance benchmarks.** 👉</div> | <div align="center"><a href="#performance"><img src="https://img.shields.io/badge/⚡%20Performance-F59E0B?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the current limitations and known failure cases of the AI extractor.** 👉</div> | <div align="center"><a href="#limitations"><img src="https://img.shields.io/badge/⚠️%20Known%20Limitations-EF4444?style=for-the-badge" /></a></div> |
| <div align="center">**View the project license information.** 👉</div> | <div align="center"><a href="#license"><img src="https://img.shields.io/badge/📄%20License-6B7280?style=for-the-badge" /></a></div> |

</div>

---

<a name="overview"></a>
## 📌 1. Project Overview

### Problem Statement
Every day, millions of students, researchers, and professionals spend hours reading lengthy PDFs such as study notes, research papers, contracts, resumes, reports, manuals, and documentation. Finding important information inside large documents is time-consuming and frustrating.

Users often need to:
- Summarize long documents quickly
- Understand complex terms and jargon
- Search for specific answers and insights
- Prepare for exams and interviews
- Extract key points and action items
- Generate practice quizzes
- Translate content into native languages

Existing PDF readers only allow viewing static documents—they don't help users interact with or truly comprehend them.

### Solution
**DocMentor AI** transforms any uploaded PDF or image report into an intelligent conversational assistant. Users upload a document, and Gemini 3.6 Flash analyzes its content to enable:
- 💬 **Chat with PDF**: Ask natural language questions with context-bound AI answers.
- 📝 **AI Document Summarizer**: Generate Short, Detailed, or Bullet-point summaries.
- 📌 **Key Points Generator**: Extract important concepts, dates, definitions, and action items.
- 💡 **Explain Difficult Terms**: Plain-language term definitions with Beginner, Intermediate, and Expert depth levels.
- 🎯 **Quiz Generator**: Auto-generate MCQs, True/False, and Short Answer quizzes with 5, 10, or 20 questions.
- 🌐 **Smart Translation**: Translate extracted text into 8 major global & Indian languages (English, Hindi, Kannada, Telugu, Tamil, French, German, Spanish).

---

<a name="features"></a>
## ✨ Features

### 📄 1. Upload PDF & OCR Processing
- **Drag & Drop Upload**: Supports PDF files, scanned image reports (PNG/JPEG), and raw text.
- **Auto Image Optimization**: Client-side canvas compression ensures ultra-fast API uploads under Netlify and Cloud Run payload limits.
- **Multimodal AI Vision Extraction**: Uses Gemini 3.6 Flash vision capabilities to parse tables, dense typography, and diagnostic scans.

### 📝 2. AI Document Summarizer
- **Short Summary**: Executive summary for high-level overviews.
- **Detailed Summary**: Section-by-section breakdown for deep understanding.
- **Bullet Summary**: Concise bulleted key takeaways.

### 💬 3. Chat with PDF Context
- Ask any question regarding the uploaded document.
- Smart auto-scroll, typing indicators, and pre-built starter questions.
- Answers are generated strictly based on document context to prevent hallucinations.

### 📌 4. Key Points Generator
- **Core Concepts**: Fundamental ideas and pillars.
- **Important Dates**: Timeline events, deadlines, and history.
- **Definitions**: Critical terms and acronyms explained.
- **Action Items**: Checklist of recommended follow-ups.

### 💡 5. Explain Difficult Terms
- Search or click any complex term or jargon.
- Switch explanation levels dynamically: **Beginner**, **Intermediate**, **Expert / Clinical**.

### 🎯 6. Interactive Quiz Generator
- Generate practice quizzes from document content.
- Configure length (**5, 10, 20 questions**) and format (**MCQs, True/False, Short Answer**).
- Real-time score counter, option selection validation, and detailed explanation reveals.

### 🌐 7. Smart Multilingual Translation
- Instant translation into 8 languages: **English**, **Hindi (हिंदी)**, **Kannada (ಕನ್ನಡ)**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, **French (Français)**, **German (Deutsch)**, and **Spanish (Español)**.

### 🩺 8. AI Mentor & Specialist Consultation
- Persona-based AI consultation mode with specialist personas (Cardiovascular, Neurology, Pediatrics) for medical report deep dives.

---

<a name="tech-stack"></a>
## 🛠️ Tech Stack & Languages

### 💻 Frontend Architecture
- **Language**: TypeScript 5.8
- **Framework**: React 19 (Vite SPA)
- **Styling**: Tailwind CSS v4, Custom Design Tokens
- **Animations**: Motion (`motion/react`)
- **Icons**: Lucide React (`lucide-react`)
- **Charts & Data Viz**: Recharts

### ⚙️ Backend & API Service
- **Runtime**: Node.js 22
- **Server Framework**: Express.js 4
- **TypeScript Runner**: `tsx` (Dev) / `esbuild` (Production Bundle)
- **Deployment Compatibility**: Native Express server & Netlify Serverless Functions (`serverless-http`)

### 🤖 AI Engine & SDK
- **Model**: Google Gemini 3.6 Flash (`gemini-3.6-flash`)
- **SDK**: Official `@google/genai` SDK
- **Output Validation**: Structured JSON with `responseMimeType: "application/json"` & `responseSchema`

---

<a name="file-structure"></a>
## 📂 File Structure

```
.
├── .env.example               # Environment variables template
├── metadata.json              # App permissions & major capabilities metadata
├── netlify.toml               # Netlify deployment configuration & API rewrites
├── package.json               # Package manifests & scripts
├── server.ts                  # Express API server & Gemini SDK handlers
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript configuration
├── ARCHITECTURE.md            # Deep-dive system architecture document
├── netlify
│   └── functions
│       └── api.ts             # Serverless entry point for Netlify Functions
└── src
    ├── App.tsx                # Main App component & state hub
    ├── main.tsx               # React entry point
    ├── index.css              # Global CSS & Tailwind imports
    ├── types.ts               # Global TypeScript interface definitions
    ├── data
    │   └── mockMedicalData.ts # Default documents, personas, and glossary
    └── components
        ├── AIConsultantChat.tsx   # Specialist Persona Chat
        ├── ChatView.tsx           # Interactive PDF Chat Interface
        ├── ClinicalSupport.tsx    # Symptom Triage & Differential Diagnosis
        ├── DocumentScanner.tsx    # File Scanner & Upload
        ├── ExplainTermsView.tsx   # Difficult Terms Explainer
        ├── JargonTranslator.tsx   # Plain-language Translator
        ├── KeyPointsView.tsx      # Key Points Breakdown
        ├── LandingPage.tsx        # Hero Landing Page
        ├── Navbar.tsx             # Header Navbar with DocMentor logo
        ├── PatientPortal.tsx      # Vitals Dashboard & History
        ├── QuizGeneratorView.tsx  # Quiz Generator System
        ├── SettingsView.tsx       # System Settings & API Status
        ├── Sidebar.tsx            # Navigation Sidebar
        ├── SummaryView.tsx        # Multi-style Summary Canvas
        ├── TranslateView.tsx      # Multilingual Translator
        └── UploadWorkspace.tsx    # Document Workspace
```

---

<a name="installation"></a>
## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ / v22+ recommended)
- **npm**: v9.0.0 or higher
- **Google Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).

### Step 1: Clone Repository
```bash
git clone https://github.com/bikram73/DocMentor_AI.git
cd DocMentor_AI
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Environment Variables
Create `.env` file in the root directory:
```bash
cp .env.example .env
```
Add your API Key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

<a name="architecture"></a>
## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       React 19 Client                       │
│    (Upload Workspace / PDF Chat / Quiz / Summarizer)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend Proxy                    │
│      (Validates inputs, attaches GEMINI_API_KEY securely)   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Server-side @google/genai SDK
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Google Gemini 3.6 Flash Engine                │
│    (Structured JSON Extraction, OCR, Reasoning & Quiz)      │
└──────────────────────────────┴──────────────────────────────┘
```

For full details, read our complete [ARCHITECTURE.md](./ARCHITECTURE.md) document.

---

<a name="prompt-strategy"></a>
## 🧠 Prompt Strategy & Anti-Hallucination

1. **System Instructions**: Pre-conditions force the model to act as an expert document analyzer strictly constrained to the provided text.
2. **Structured Response Schemas**: All AI calls mandate `responseMimeType: "application/json"` and strict `responseSchema` definitions, preventing unstructured output or unexpected keys.
3. **Context Grounding**: Non-document facts are explicitly flagged when missing from uploaded context.

---

<a name="confidence"></a>
## 📊 Confidence Scores & Risk Thresholds

Key document findings and biomarker risk levels are mapped into normalized categories:

| Metric State | Deviation from Reference | Risk Level | Action |
| :--- | :--- | :--- | :--- |
| **Within Limits** | Normal range | `normal` | Standard review |
| **Mild Borderline** | < 15% outside normal | `low` / `moderate` | Lifestyle adjustment / Monitor |
| **Significantly Elevated** | > 15% outside normal | `high` | Follow-up review |
| **Critical Threshold** | > 50% outside normal | `critical` | Immediate doctor attention |

---

<a name="deliverables"></a>
## 📄 Challenge Deliverables Checklist

- [x] **Full-Stack Application**: React 19 SPA with Express backend.
- [x] **Multimodal OCR & Vision Analysis**: Handles PDFs, images, and text notes.
- [x] **Interactive PDF Chat**: Contextual question answering.
- [x] **Multi-Style Summarizer**: Short, Detailed, and Bullet point summaries.
- [x] **Quiz Generator**: Configurable length & question formats.
- [x] **Multilingual Translator**: Support for 8 languages including Indian regional languages.
- [x] **Architecture Documentation**: Comprehensive [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

<a name="api"></a>
## 🌐 API Documentation

### 1. `POST /api/analyze-document`
Analyzes uploaded text or image base64 and outputs structured summaries, key points, and risk metrics.

### 2. `POST /api/symptom-checker`
Evaluates symptoms for triage urgency and differential diagnosis.

### 3. `POST /api/mentor-chat`
Generates contextual answers and mentor advice based on document content.

### 4. `POST /api/simplify-jargon`
Translates complex terms into plain, easy-to-understand language.

---

<a name="sample-documents"></a>
## 📄 Sample Documents & Extraction Results

DocMentor AI comes pre-loaded with sample medical and academic reports:
1. **Comprehensive Metabolic & Lipid Panel**
2. **Lumbar Spine MRI Scan Report**
3. **Inpatient Hospital Discharge Summary**

---

<a name="performance"></a>
## ⚡ Performance Benchmarks

| Operation | Average Latency | Model Used | Output Format |
-| :--- | :--- | :--- | :--- |
| **Document OCR & Analysis** | ~1.8 seconds | Gemini 3.6 Flash | Structured JSON |
| **PDF Chat Response** | ~0.9 seconds | Gemini 3.6 Flash | Text / JSON |
| **Quiz Generation** | ~1.5 seconds | Gemini 3.6 Flash | Structured JSON |
| **Language Translation** | ~0.8 seconds | Gemini 3.6 Flash | Text |

---

<a name="limitations"></a>
## ⚠️ Known Limitations

- **Handwritten Quality**: Very faint or extremely low-resolution physical camera photos may require clearer lighting.
- **Educational Scope**: DocMentor AI is an AI assistant designed to aid study, comprehension, and productivity.

---

<a name="license"></a>
## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.



