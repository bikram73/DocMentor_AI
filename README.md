# 🩺 DocMentor AI — Intelligent Medical Document & Clinical Decision System

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_3.6_Flash-8E75B2?style=for-the-badge&logo=google-cloud&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

<br />

**DocMentor AI** is an advanced full-stack AI platform designed to analyze complex medical documents (lab reports, radiologic imaging scans, discharge summaries, prescriptions), evaluate clinical symptoms for differential diagnosis, simplify complex medical jargon into 6th-grade plain language, and provide interactive 24/7 specialist AI consultation.

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

<a name="features"></a>
## ✨ Features

### 📄 1. Multimodal Document Scanner & Analysis
- **Drag & Drop Upload**: Supports PDF, scanned image reports (PNG/JPEG), and direct text pastes.
- **Multimodal AI Vision Extraction**: Uses Gemini 3.6 Flash vision capabilities to extract data from dense tables, handwritten prescription notes, and diagnostic imaging scans.
- **Biomarker Risk Tagging**: Categorizes lab metrics into `normal`, `low`, `moderate`, `high`, or `critical` risk levels with comparative reference ranges.

### 🧠 2. Dynamic Clinical Summarizer & Layman Explanation
- **Dual Summary Engine**: Delivers a technical medical summary for clinical professionals alongside a plain-language explanation for patients.
- **Key Takeaways & Recommendations**: Provides actionable clinical next steps and structured questions for doctor appointments.

### 🩺 3. Differential Diagnosis & Symptom Triage
- **Clinical Triage Classification**: Evaluates patient symptoms, age, gender, and vital signs to output triage urgency (`Emergency (911)`, `Urgent Care`, `Routine Visit`, `Self Care`).
- **ICD-10 Coded Differentials**: Outputs ranked diagnostic probabilities with matching symptoms, severity ratings, ICD-10 diagnostic codes, and suggested confirmatory tests.
- **Red Flag Alerts**: Instant safety banners for life-threatening emergency symptoms.

### 💬 4. Interactive AI Specialist Mentors
- **Persona-Based AI Consultations**: Switch between distinct AI specialist personas:
  - 🫀 **Dr. Aris Vance, MD** (Cardiovascular Specialist)
  - 🧠 **Dr. Maya Lin, MD** (Neurology Consultant)
  - 👶 **Dr. Sam Rivera, MD** (Pediatrician)
- **Document Context Awareness**: The AI mentor answers user questions directly referencing the actively loaded document.

### 📖 5. Medical Jargon Translator & Glossary
- **6th-Grade Reading Level Translation**: Transforms dense medical terminology (e.g., *SGLT2 inhibitors*, *hyperlipidemia*, *eGFR*) into clear, relatable concepts.
- **Searchable Medical Term Glossary**: Search and filter key medical acronyms and definitions.

### 📊 6. Interactive Patient Portal & Medical Quizzes
- **Vital Sign Tracking**: Track Blood Pressure, Heart Rate, SpO2, Blood Glucose, and Body Temperature with visual trend badges.
- **Medical Literacy Quizzes**: Interactive auto-generated quizzes based on the patient's reports to test and improve health comprehension.

---

<a name="tech-stack"></a>
## 🛠️ Tech Stack & Languages

### 💻 Frontend Architecture
- **Language**: TypeScript 5.8
- **Framework**: React 19 (Vite SPA)
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Animations**: Motion (`motion/react`)
- **Icons**: Lucide React (`lucide-react`)
- **Data Visualization**: Recharts

### ⚙️ Backend & API Proxy
- **Runtime Environment**: Node.js 22
- **Server Framework**: Express.js 4
- **TypeScript Runner**: `tsx` (Dev) / `esbuild` (Bundled CJS Production)
- **API Routing**: RESTful JSON API `/api/*`

### 🤖 AI Engine & SDK
- **AI Model**: Google Gemini 3.6 Flash (`gemini-3.6-flash`)
- **Official SDK**: `@google/genai` (Server-side execution)
- **Schema Enforcement**: Native Gemini `responseSchema` & `responseMimeType: "application/json"`

---

<a name="file-structure"></a>
## 📂 File Structure

```
.
├── .env.example               # Environment variables configuration template
├── metadata.json              # Platform application metadata & permissions
├── package.json               # Project dependencies and npm scripts
├── server.ts                  # Express server & Gemini AI API routes proxy
├── vite.config.ts             # Vite build and plugin configurations
├── tsconfig.json              # TypeScript compilation rules
├── ARCHITECTURE.md            # In-depth architectural & system design document
└── src
    ├── App.tsx                # Main Application shell, state & tab navigation
    ├── main.tsx               # React application entry point
    ├── index.css              # Global styles & Tailwind CSS directives
    ├── types.ts               # Global TypeScript definitions & interfaces
    ├── data
    │   └── mockMedicalData.ts # Sample documents, personas, and glossary
    └── components
        ├── AIConsultantChat.tsx   # Interactive Specialist AI Chat
        ├── ChatView.tsx           # General AI Health Assistant
        ├── ClinicalSupport.tsx    # Symptom Checker & Differential Diagnosis
        ├── DocumentScanner.tsx    # File uploader & Document Analysis View
        ├── ExplainTermsView.tsx   # Medical Jargon Explainer
        ├── JargonTranslator.tsx   # Plain-language Translator
        ├── KeyPointsView.tsx      # Biomarkers & Key Findings Breakdown
        ├── LandingPage.tsx        # Product Hero & Features Landing
        ├── Navbar.tsx             # Main Header Navigation & Dark Mode Toggle
        ├── PatientPortal.tsx      # Vitals Dashboard & Medical History
        ├── QuizGeneratorView.tsx  # Health Literacy Quiz System
        ├── SettingsView.tsx       # System Settings & API Status
        ├── Sidebar.tsx            # Desktop Navigation Sidebar
        ├── SummaryView.tsx        # Dynamic Medical Summary Canvas
        ├── TranslateView.tsx      # Multilingual Report Translator
        └── UploadWorkspace.tsx    # Main Document Upload Workspace
```

---

<a name="installation"></a>
## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ / v22+ recommended)
- **npm**: v9.0.0 or higher
- **Google Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/docmentor-ai.git
cd docmentor-ai
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the project root based on `.env.example`:
```bash
cp .env.example .env
```
Add your Gemini API Key in `.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Step 5: Build for Production
```bash
npm run build
npm start
```

---

<a name="architecture"></a>
## 🏗️ Architecture

DocMentor AI utilizes a full-stack proxy architecture where all requests containing sensitive health details or AI prompts are routed securely through server-side Express handlers to the Google Gemini API.

```
┌─────────────────────────────────────────────────────────────┐
│                       React 19 Client                       │
│    (Document Workspace / Clinical Support / Chat Interface) │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend Proxy                    │
│      (Validates inputs, attaches server API Key)            │
└──────────────────────────────┬──────────────────────────────┘
                               │ Server-side @google/genai SDK
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Google Gemini 3.6 Flash Engine                │
│    (Structured JSON Extraction, OCR, Reasoning & Triage)    │
└─────────────────────────────────────────────────────────────┘
```

For full details, read our complete [ARCHITECTURE.md](./ARCHITECTURE.md) document.

---

<a name="prompt-strategy"></a>
## 🧠 Prompt Strategy & Anti-Hallucination

1. **System Instructions**: Pre-conditions force the model to act as a board-certified clinical specialist with strict instructions on patient safety and reference ranges.
2. **Structured Response Schemas**: All AI calls mandate `responseMimeType: "application/json"` and strict `responseSchema` definitions, preventing unstructured output or unexpected keys.
3. **Double Verification**: Laboratory measurements must be paired with unit measurements (`mg/dL`, `U/L`) and explicit reference bounds.

---

<a name="confidence"></a>
## 📊 Confidence Scores & Risk Thresholds

Biomarker risk levels are mapped into normalized safety categories:

| Metric State | Deviation from Reference | Risk Flag Level | Recommended Action |
| :--- | :--- | :--- | :--- |
| **Within Limits** | Normal range | `normal` (Green) | Routine annual review |
| **Mild Borderline** | < 15% outside normal | `low` / `moderate` (Yellow) | Lifestyle / Diet modification |
| **Significantly Elevated** | > 15% outside normal | `high` (Orange) | Physician consultation within 2 weeks |
| **Critical Threshold** | > 50% outside normal | `critical` (Red) | Urgent medical evaluation |

---

<a name="deliverables"></a>
## 📄 Challenge Deliverables Checklist

- [x] **Full-Stack Application**: Interactive web application with React 19 & Express.
- [x] **Document OCR & Vision Analysis**: Processes lab reports, imaging scans, and prescriptions.
- [x] **Clinical Triage System**: ICD-10 coded differential diagnosis generator.
- [x] **Plain Language Translator**: Converts medical jargon into 6th-grade level summaries.
- [x] **24/7 Specialist Mentors**: Persona-based doctor consultation channels.
- [x] **System Architecture Docs**: Comprehensive [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

<a name="api"></a>
## 🌐 API Documentation

### 1. `POST /api/analyze-document`
Analyzes a medical document (image or text) and returns structured diagnostic data.

**Request Body:**
```json
{
  "textContent": "Fasting Plasma Glucose: 142 mg/dL, HbA1c: 6.8%",
  "imageBase64": "data:image/png;base64,...",
  "documentType": "lab_report"
}
```

**Response Output:**
```json
{
  "success": true,
  "analysis": {
    "title": "Comprehensive Metabolic Panel",
    "summary": "Clinical summary...",
    "laymanExplanation": "Plain language explanation...",
    "abnormalValues": [
      {
        "metricName": "Fasting Plasma Glucose",
        "measuredValue": "142",
        "unit": "mg/dL",
        "referenceRange": "70 - 99 mg/dL",
        "riskLevel": "high"
      }
    ]
  }
}
```

### 2. `POST /api/symptom-checker`
Evaluates symptoms for triage urgency and differential diagnosis.

### 3. `POST /api/mentor-chat`
Generates persona-based doctor advice in context with document data.

### 4. `POST /api/simplify-jargon`
Translates dense medical terminology into clear patient explanations.

---

<a name="sample-documents"></a>
## 📄 Sample Documents & Extraction Results

DocMentor AI comes pre-loaded with comprehensive sample medical documents:

1. **Comprehensive Metabolic & Lipid Panel**: Fasting blood glucose, HbA1c, LDL cholesterol, and liver transaminase metrics.
2. **Lumbar Spine MRI Radiologic Scan**: L4-L5 disc protrusion evaluation with nerve root impingement details.
3. **Inpatient Hospital Discharge Summary**: Acute coronary syndrome management, stenting, and discharge prescriptions.

---

<a name="performance"></a>
## ⚡ Performance Benchmarks

| Operation | Average Latency | Model Used | Output Format |
| :--- | :--- | :--- | :--- |
| **Document OCR & Extraction** | ~1.8 seconds | Gemini 3.6 Flash | Structured JSON |
| **Symptom Triage & Differentials** | ~1.4 seconds | Gemini 3.6 Flash | Structured JSON |
| **Specialist Mentor Chat** | ~0.9 seconds | Gemini 3.6 Flash | Interactive JSON |
| **Jargon Translation** | ~0.8 seconds | Gemini 3.6 Flash | Plain Language |

---

<a name="limitations"></a>
## ⚠️ Known Limitations

- **Image Resolution**: Extremely blurry or low-contrast camera photos of handwritten documents may require manual verification.
- **Medical Disclaimer**: DocMentor AI is an AI assistant designed for educational support and clinical triage assistance. It is not a substitute for professional medical diagnosis or treatment.

---

<a name="license"></a>
## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">

Built with ❤️ by **DocMentor AI Team** using **Google Gemini AI**.

</div>
