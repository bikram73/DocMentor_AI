import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Initialize Google GenAI Server-side Client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing from environment secrets.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "dummy-key-for-init",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Create router for API endpoints to support Express server and Netlify Functions
const apiRouter = express.Router();
apiRouter.use(express.json({ limit: "25mb" }));

// Health Check API
apiRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Document Analysis Endpoint
apiRouter.post("/analyze-document", async (req, res) => {
  try {
    const { textContent, imageBase64, documentType } = req.body;

    if (!textContent && !imageBase64) {
      return res.status(400).json({ error: "Missing document text or image content." });
    }

    const ai = getAiClient();

    const systemInstruction = `You are DocMentor AI, an expert clinical document analyzer and medical AI assistant.
Analyze the provided medical document (lab report, radiologic imaging scan, hospital discharge summary, prescription, or clinical note).
Provide a rigorous clinical analysis alongside an empathetic, easy-to-understand explanation for the patient.
Extract all abnormal values with reference ranges and risk levels.
Always include key findings, actionable clinical recommendations, and intelligent questions the patient should ask their doctor.
Do NOT output raw markdown code fence wrappers if returning JSON.`;

    const promptText = `Analyze this medical document (${documentType || "general medical record"}):
${textContent || "See image attached"}

Provide structured response strictly following the JSON schema:`;

    const contentsParts: Array<any> = [];

    if (imageBase64) {
      let mimeType = "image/png";
      let cleanBase64 = imageBase64;

      const matches = imageBase64.match(/^data:([^;]+);base64,(.*)$/);
      if (matches) {
        mimeType = matches[1];
        cleanBase64 = matches[2];
      } else {
        cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, "");
      }

      contentsParts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    contentsParts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: contentsParts },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Descriptive title of document" },
            type: { type: Type.STRING, description: "Type: lab_report, imaging_scan, discharge_summary, prescription, clinical_note, ecg_report" },
            summary: { type: Type.STRING, description: "Clinical summary for medical professionals" },
            laymanExplanation: { type: Type.STRING, description: "Plain language patient explanation" },
            keyFindings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key findings bullet points"
            },
            abnormalValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  metricName: { type: Type.STRING },
                  measuredValue: { type: Type.STRING },
                  unit: { type: Type.STRING },
                  referenceRange: { type: Type.STRING },
                  riskLevel: { type: Type.STRING, description: "normal, low, moderate, high, critical" },
                  clinicalSignificance: { type: Type.STRING }
                },
                required: ["metricName", "measuredValue", "riskLevel"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            questionsForDoctor: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "summary", "laymanExplanation", "keyFindings", "abnormalValues", "recommendations", "questionsForDoctor"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, analysis: parsedData });

  } catch (error: any) {
    console.error("Document analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze medical document.",
      message: error?.message || String(error)
    });
  }
});

// Symptom Checker & Differential Diagnosis Endpoint
apiRouter.post("/symptom-checker", async (req, res) => {
  try {
    const { symptoms, age, gender, vitals, medicalHistory } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms description is required." });
    }

    const ai = getAiClient();

    const systemPrompt = `You are DocMentor AI Differential Diagnosis & Clinical Decision Support System.
Evaluate patient symptoms, demographic profile, and vital signs.
Provide ranked differential diagnoses with likelihood scores, triage urgency priority, red flag warning signs, and recommended diagnostic tests.
Maintain clinical accuracy while ensuring clear patient safety triage warnings.`;

    const userPrompt = `Patient Profile:
- Age: ${age || "Unspecified"} | Gender: ${gender || "Unspecified"}
- Symptoms: ${symptoms}
- Vitals: ${vitals ? JSON.stringify(vitals) : "None provided"}
- Medical History: ${medicalHistory || "None declared"}

Analyze symptoms and generate clinical decision output strictly adhering to JSON schema:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            triagePriority: { type: Type.STRING, description: "Emergency (911), Urgent Care (24h), Routine Physician Visit, Self Care / Monitoring" },
            primarySummary: { type: Type.STRING },
            recommendedSpecialist: { type: Type.STRING },
            redFlagWarnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            differentialDiagnoses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING },
                  probabilityScore: { type: Type.NUMBER, description: "0 to 100 percentage" },
                  severity: { type: Type.STRING, description: "low, moderate, high, critical" },
                  matchingSymptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
                  recommendedTests: { type: Type.ARRAY, items: { type: Type.STRING } },
                  clinicalRationale: { type: Type.STRING },
                  icd10Code: { type: Type.STRING }
                },
                required: ["condition", "probabilityScore", "severity", "clinicalRationale", "icd10Code"]
              }
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["triagePriority", "primarySummary", "redFlagWarnings", "differentialDiagnoses", "suggestedQuestions", "recommendedSpecialist"]
        }
      }
    });

    const parsedResult = JSON.parse(response.text || "{}");
    res.json({ success: true, result: parsedResult });

  } catch (error: any) {
    console.error("Symptom checker error:", error);
    res.status(500).json({
      error: "Failed to evaluate symptoms.",
      message: error?.message || String(error)
    });
  }
});

// Interactive Mentor & Specialist Chat Endpoint
apiRouter.post("/mentor-chat", async (req, res) => {
  try {
    const { messages, doctorPersonaId, documentContext } = req.body;

    const ai = getAiClient();

    let personaContext = "You are DocMentor AI, an empathetic, highly knowledgeable medical AI advisor.";
    if (doctorPersonaId === 'dr-cardio') {
      personaContext = "You are Dr. Aris Vance, MD, a Senior Cardiovascular Specialist AI. Answer with deep expertise in heart health, lipidology, ECGs, blood pressure, and vascular wellness.";
    } else if (doctorPersonaId === 'dr-neuro') {
      personaContext = "You are Dr. Maya Lin, MD, a Neurology Consultant AI. Answer with expertise in brain imaging, MRI/CT scans, headaches, stroke prevention, and nervous system health.";
    } else if (doctorPersonaId === 'dr-pediatrics') {
      personaContext = "You are Dr. Sam Rivera, MD, a Pediatric Specialist AI. Answer with gentle, evidence-based guidance on child growth, pediatric fevers, and family health.";
    }

    const fullSystemInstruction = `${personaContext}
Your primary mission is to empower patients and clinicians with clear, accurate medical insights.
Context from active medical document:
${documentContext ? documentContext : "No active document attached."}

Always append 2-3 relevant follow-up questions the patient can click to keep exploring.
Include a disclaimer that AI consultation is for educational and informational support and does not replace emergency medical care.`;

    const chatHistory = (messages || []).map((m: any) => `${m.sender === 'user' ? 'Patient' : 'Doctor'}: ${m.text}`).join('\n\n');

    const prompt = `Chat History:\n${chatHistory}\n\nProvide response in structured JSON with response text and follow-up prompts:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: fullSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            replyText: { type: Type.STRING },
            suggestedFollowUps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            medicalReferences: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["replyText", "suggestedFollowUps"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({ success: true, response: parsedData });

  } catch (error: any) {
    console.error("Mentor chat error:", error);
    res.status(500).json({
      error: "Failed to generate chat response.",
      message: error?.message || String(error)
    });
  }
});

// Simplify Medical Jargon Endpoint
apiRouter.post("/simplify-jargon", async (req, res) => {
  try {
    const { medicalText } = req.body;
    if (!medicalText) {
      return res.status(400).json({ error: "Medical text is required." });
    }

    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Translate this clinical report or medical text into clear 6th-grade reading level layman terms:\n\n${medicalText}`,
      config: {
        systemInstruction: "You translate complex medical jargon, lab results, and radiologic reports into simple, encouraging, clear patient-friendly language.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            simplifiedSummary: { type: Type.STRING },
            keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
            glossary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  meaning: { type: Type.STRING }
                }
              }
            },
            actionChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["simplifiedSummary", "keyTakeaways", "glossary", "actionChecklist"]
        }
      }
    });

    res.json({ success: true, result: JSON.parse(response.text || "{}") });

  } catch (error: any) {
    console.error("Simplify jargon error:", error);
    res.status(500).json({
      error: "Failed to simplify medical jargon.",
      message: error?.message || String(error)
    });
  }
});

// Register router under all potential prefixes for local dev and Netlify functions
app.use("/api", apiRouter);
app.use("/.netlify/functions/api", apiRouter);
app.use("/", apiRouter);

export default app;
export { app };

async function startServer() {
  if (process.env.NETLIFY || process.env.LAMBDA_TASK_ROOT) {
    return; // Do not start HTTP server in Netlify serverless execution
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DocMentor AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
