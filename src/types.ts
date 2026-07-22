export type DocumentType = 
  | 'lab_report'
  | 'imaging_scan'
  | 'prescription'
  | 'discharge_summary'
  | 'clinical_note'
  | 'ecg_report'
  | 'pdf_document';

export type RiskLevel = 'normal' | 'low' | 'moderate' | 'high' | 'critical';

export interface AbnormalValue {
  metricName: string;
  measuredValue: string;
  unit: string;
  referenceRange: string;
  riskLevel: RiskLevel;
  clinicalSignificance: string;
}

export interface MedicalDocument {
  id: string;
  title: string;
  type: DocumentType;
  uploadDate: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  status: 'analyzed' | 'processing' | 'pending';
  summary: string;
  laymanExplanation: string;
  keyFindings: string[];
  abnormalValues: AbnormalValue[];
  recommendations: string[];
  questionsForDoctor: string[];
  fullText: string;
  rawImageBase64?: string;
  metadata?: {
    physicianName?: string;
    facility?: string;
    icd10Codes?: string[];
  };
}

export interface DifferentialDiagnosisItem {
  condition: string;
  probabilityScore: number; // 0 to 100
  severity: RiskLevel;
  matchingSymptoms: string[];
  recommendedTests: string[];
  clinicalRationale: string;
  icd10Code: string;
}

export interface SymptomCheckResult {
  triagePriority: 'Emergency (911)' | 'Urgent Care (24h)' | 'Routine Physician Visit' | 'Self Care / Monitoring';
  primarySummary: string;
  differentialDiagnoses: DifferentialDiagnosisItem[];
  redFlagWarnings: string[];
  recommendedSpecialist: string;
  suggestedQuestions: string[];
}

export interface DoctorPersona {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatarUrl: string;
  badge: string;
  bio: string;
  color: string;
  suggestedPrompts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  doctorPersonaId?: string;
  medicalReferences?: { title: string; url?: string }[];
  attachedDocumentId?: string;
  suggestedFollowUps?: string[];
  thinkingSteps?: string[];
}

export interface VitalMetric {
  date: string;
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  bloodSugar: number; // mg/dL
  oxygenSat: number;  // %
  cholesterolLDL: number; // mg/dL
}

export interface MedicalTermDefinition {
  term: string;
  category: string;
  medicalDefinition: string;
  plainLanguage: string;
  clinicalExample: string;
  coreAnalogy?: string;
  practicalApplication?: string;
  relatedConcepts?: string[];
  pageNumber?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

