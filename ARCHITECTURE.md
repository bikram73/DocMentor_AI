# 🏗️ DocMentor AI — Architecture & Technical Design Document

This document details the complete system architecture, AI workflow pipeline, security design, and engineering trade-offs of **DocMentor AI**.

---

## 📐 1. System Overview & Architecture Diagram

DocMentor AI follows a secure **Full-Stack Proxy Architecture** ensuring that secret keys (such as `GEMINI_API_KEY`) remain strictly isolated on the server side while delivering real-time interactive user interfaces on the client side.

```
+-------------------------------------------------------------------------------+
|                            CLIENT LAYER (React 19 SPA)                         |
|                                                                               |
|  +-------------------+  +--------------------+  +--------------------------+  |
|  | Document Scanner  |  | AI Summary Canvas  |  | Specialist Mentor Chat   |  |
|  +-------------------+  +--------------------+  +--------------------------+  |
|  +-------------------+  +--------------------+  +--------------------------+  |
|  | Symptom Triage    |  | Medical Translator |  | Patient Health Portal    |  |
|  +-------------------+  +--------------------+  +--------------------------+  |
|                                     |                                         |
|                       JSON Payload over REST (HTTP/2)                         |
+-------------------------------------|-----------------------------------------+
                                      v
+-------------------------------------------------------------------------------+
|                        SERVER LAYER (Express + Node.js)                       |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  | Endpoint Handlers & Strict Schema Enforcers                             |  |
|  | - /api/analyze-document                                                 |  |
|  | - /api/symptom-checker                                                  |  |
|  | - /api/mentor-chat                                                      |  |
|  | - /api/simplify-jargon                                                  |  |
|  +-------------------------------------------------------------------------+  |
|                                     |                                         |
|                      Server-side @google/genai SDK                            |
+-------------------------------------|-----------------------------------------+
                                      v
+-------------------------------------------------------------------------------+
|                           AI / MODEL ENGINE                                   |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  | Google Gemini 3.6 Flash Engine                                          |  |
|  | - Strict JSON Schema Generation (`responseSchema`)                      |  |
|  | - System Instructions for Clinical Safety & Triage Guidance             |  |
|  | - Multimodal Processing (OCR + Visual Scan Analysis)                    |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
```

---

## 🔄 2. Complete Document Processing & Analysis Workflow

1. **Upload & Preprocessing**:
   - The user drags and drops a PDF, JPEG, or PNG document or pastes plain text.
   - Images are encoded as clean Base64 byte arrays. Text files are extracted using client-side reader buffers.

2. **Server Route Proxy**:
   - The document is dispatched to `/api/analyze-document` on the Express backend.
   - The Express route constructs multimodal input parts (`inlineData` for image/scan + structured prompt text).

3. **Gemini 3.6 Flash Structured Extraction**:
   - The server triggers Google Gemini with strict `responseSchema` definitions.
   - The model parses medical values, identifies abnormal biomarkers, compares them to clinical reference ranges, and calculates risk levels (`normal`, `low`, `moderate`, `high`, `critical`).

4. **Structured JSON Validation & Client Render**:
   - The server validates the JSON object against required keys before returning it to the client.
   - The client renders key takeaways, visual biomarker risk badges, doctor questions, and plain-language summaries.

---

## 🛡️ 3. Safety, Security & Anti-Hallucination Controls

- **Zero Client-Exposed Keys**: `GEMINI_API_KEY` is loaded strictly via server environment variables.
- **Strict Response Schema**: Utilizes `responseMimeType: "application/json"` and `responseSchema` to guarantee consistent type-safe structural schemas.
- **Triage Safety Flags**: Symptoms indicating acute emergencies (chest pain, stroke signs, dyspnea) trigger immediate high-contrast Red Flag safety alerts urging the user to seek emergency medical evaluation.
- **Clinical Medical Disclaimer**: All views feature persistent notices specifying that DocMentor AI provides educational insights and clinical decision support, but does not replace licensed medical care.

---

## ⚡ 4. Technical Stack Summary

- **Frontend**: React 19, TypeScript 5.8, Tailwind CSS 4, Motion (Framer Motion), Lucide React Icons, Recharts.
- **Backend**: Express 4, Node.js 22, `tsx`, `esbuild`.
- **AI SDK**: `@google/genai` (Official Google GenAI SDK v2.4+).
- **Model**: `gemini-3.6-flash`.
