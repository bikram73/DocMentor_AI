import { MedicalDocument, DoctorPersona, VitalMetric, MedicalTermDefinition } from '../types';

export const SAMPLE_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-cmp-001',
    title: 'Comprehensive Metabolic & Lipid Panel',
    type: 'lab_report',
    uploadDate: '2025-02-14',
    patientName: 'Eleanor Vance',
    patientAge: 52,
    patientGender: 'Female',
    status: 'analyzed',
    summary: 'Serum glucose and Fasting LDL cholesterol are significantly elevated above normal diagnostic thresholds. Liver transaminase ALT is mildly elevated, suggesting potential metabolic fatty liver changes.',
    laymanExplanation: 'Your blood work shows higher sugar levels than recommended (fasting blood glucose 142 mg/dL) and elevated bad cholesterol (LDL 168 mg/dL). This indicates early signs of type 2 diabetes and increased cardiovascular risk that can be managed with diet, exercise, and medication.',
    keyFindings: [
      'Fasting Plasma Glucose: 142 mg/dL (High, normal <100 mg/dL)',
      'HbA1c: 6.8% (Indicative of Type 2 Diabetes Mellitus)',
      'LDL Cholesterol: 168 mg/dL (High, optimal <100 mg/dL)',
      'ALT (Alanine Aminotransferase): 58 U/L (Mildly elevated, normal 7-56 U/L)',
      'eGFR: 88 mL/min/1.73m² (Normal renal filtration rate)'
    ],
    abnormalValues: [
      {
        metricName: 'Fasting Blood Glucose',
        measuredValue: '142',
        unit: 'mg/dL',
        referenceRange: '70 - 99 mg/dL',
        riskLevel: 'high',
        clinicalSignificance: 'Fasting glucose >126 mg/dL on repeated testing meets diagnostic criteria for Diabetes Mellitus.'
      },
      {
        metricName: 'HbA1c (Glycated Hemoglobin)',
        measuredValue: '6.8',
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        riskLevel: 'high',
        clinicalSignificance: 'HbA1c ≥6.5% confirms diabetes. Target for most adults with diabetes is <7.0%.'
      },
      {
        metricName: 'LDL Cholesterol',
        measuredValue: '168',
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL',
        riskLevel: 'moderate',
        clinicalSignificance: 'Elevated atherogenic lipoprotein. Statins or dietary lipid lowering indicated.'
      },
      {
        metricName: 'ALT (Alanine Transaminase)',
        measuredValue: '58',
        unit: 'U/L',
        referenceRange: '7 - 56 U/L',
        riskLevel: 'low',
        clinicalSignificance: 'Mild hepatocellular marker elevation; common in metabolic dysfunction-associated steatotic liver disease (MASLD).'
      }
    ],
    recommendations: [
      'Schedule a follow-up consultation with Primary Care Physician (PCP) or Endocrinologist within 2 weeks.',
      'Initiate baseline fasting blood glucose self-monitoring logs twice daily.',
      'Discuss first-line pharmacotherapy options (e.g., Metformin and statin therapy).',
      'Consult a Registered Dietitian for low-glycemic Mediterranean dietary guidance.'
    ],
    questionsForDoctor: [
      'What target HbA1c goal should we set for the next 3 to 6 months?',
      'Is starting Metformin or lifestyle modification first recommended for my profile?',
      'Do I need an ultrasound to evaluate my liver ALT elevation?'
    ],
    metadata: {
      physicianName: 'Dr. Sarah Jenkins, MD',
      facility: 'MetroHealth Diagnostic Pathology Lab',
      icd10Codes: ['E11.9 (Type 2 Diabetes Mellitus)', 'E78.00 (Pure Hypercholesterolemia)']
    },
    fullText: `METROHEALTH DIAGNOSTIC PATHOLOGY REPORT
Patient Name: Eleanor Vance | DOB: 05/12/1973 | Sex: F
Ordering Physician: Dr. Sarah Jenkins, MD | Date Collected: Feb 14, 2025

COMPREHENSIVE METABOLIC PANEL
GLUCOSE, FASTING: 142 mg/dL [HIGH] (Ref: 70-99 mg/dL)
BUN: 16 mg/dL (Ref: 7-20 mg/dL)
CREATININE: 0.85 mg/dL (Ref: 0.5-1.1 mg/dL)
eGFR: 88 mL/min/1.73m2 (Ref: >60 mL/min)
SODIUM: 139 mEq/L (Ref: 135-145 mEq/L)
POTASSIUM: 4.3 mEq/L (Ref: 3.5-5.1 mEq/L)
ALT (SGPT): 58 U/L [HIGH] (Ref: 7-56 U/L)
AST (SGOT): 34 U/L (Ref: 10-40 U/L)

LIPID PANEL
TOTAL CHOLESTEROL: 242 mg/dL [HIGH] (Ref: <200 mg/dL)
TRIGLYCERIDES: 195 mg/dL [HIGH] (Ref: <150 mg/dL)
HDL CHOLESTEROL: 44 mg/dL (Ref: >50 mg/dL)
LDL CHOLESTEROL (CALC): 168 mg/dL [HIGH] (Ref: <100 mg/dL)
HbA1c: 6.8% [HIGH] (Ref: 4.0-5.6%)`
  },
  {
    id: 'doc-mri-002',
    title: 'Brain MRI Radiologic Impression Report',
    type: 'imaging_scan',
    uploadDate: '2025-02-01',
    patientName: 'Eleanor Vance',
    patientAge: 52,
    patientGender: 'Female',
    status: 'analyzed',
    summary: 'Non-contrast Brain MRI demonstrates age-appropriate brain volume with scattered punctate white matter hyperintensities consistent with chronic small vessel ischemic disease. No acute intracranial hemorrhage or mass effect.',
    laymanExplanation: 'The brain scan is overall reassuring. It shows no stroke, tumor, or bleeding. It displays mild wear-and-tear changes in the tiny blood vessels of the brain, which is very common as people age and often related to blood pressure or cholesterol levels.',
    keyFindings: [
      'No acute cerebral infarction, mass effect, or midline shift.',
      'Ventricular system and basal cisterns are within normal limits for age.',
      'Scattered T2/FLAIR hyperintensities in cerebral white matter (Fazekas Grade 1).',
      'Major vascular flow voids intact at skull base.'
    ],
    abnormalValues: [
      {
        metricName: 'White Matter Hyperintensities',
        measuredValue: 'Fazekas Grade 1',
        unit: 'Grade (0-3)',
        referenceRange: 'Grade 0 (Absent)',
        riskLevel: 'low',
        clinicalSignificance: 'Mild chronic microvascular changes; strongly associated with hypertension and aging. Generally benign.'
      }
    ],
    recommendations: [
      'Maintain tight control of systemic blood pressure (<120/80 mmHg target).',
      'Routine neurological evaluation only if new headache or neurological symptoms emerge.'
    ],
    questionsForDoctor: [
      'Do these white matter changes explain my mild headaches or dizziness?',
      'How can I protect my small blood vessels going forward?'
    ],
    metadata: {
      physicianName: 'Dr. Marcus Vance, MD (Neuroradiology)',
      facility: 'Advanced Diagnostic Imaging Center',
      icd10Codes: ['I67.82 (Cerebral Microvascular Disease)', 'G44.209 (Tension Headache)']
    },
    fullText: `ADVANCED DIAGNOSTIC IMAGING CENTER - NEURORADIOLOGY
STUDY: MRI BRAIN WITHOUT CONTRAST
Patient: Eleanor Vance | Date: Feb 01, 2025
Clinical History: Recurrent tension headaches and intermittent mild lightheadedness.

FINDINGS:
Axial T1, T2, FLAIR, and Diffusion-Weighted images acquired.
Brain parenchyma demonstrates no acute diffusion restriction to suggest acute cerebral ischemia. No parenchymal hemorrhage or extra-axial fluid collections.
Subcortical and periventricular cerebral white matter exhibits a few scattered punctate T2/FLAIR hyperintensities. No focal demyelinating lesions.
Ventricular system is age-appropriate. No herniation or mass effect.

IMPRESSION:
1. No acute intracranial process.
2. Mild punctate white matter FLAIR hyperintensities, Fazekas 1, reflective of mild chronic microvascular ischemic changes.`
  },
  {
    id: 'doc-dis-003',
    title: 'Hospital Discharge Summary - Acute Chest Pain Triage',
    type: 'discharge_summary',
    uploadDate: '2025-01-18',
    patientName: 'Eleanor Vance',
    patientAge: 52,
    patientGender: 'Female',
    status: 'analyzed',
    summary: 'Patient admitted via ED for atypical chest pressure. Rule-out MI protocol negative with serial Troponin T <0.01 ng/mL and normal coronary CTA. Discharged stable on adjusted anti-hypertensive regimen.',
    laymanExplanation: 'You were evaluated in the emergency department for chest pressure. Good news: heart attack was ruled out after blood enzyme tests (Troponin) and heart vessel CT scans came back completely normal. You were discharged safely with updated blood pressure medicine.',
    keyFindings: [
      'Serial Troponin T tests: <0.01 ng/mL x3 (Negative for cardiac necrosis)',
      'Coronary CT Angiography: Zero calcium score (Agatston 0), no coronary stenosis',
      'Discharged on Amlodipine 5mg daily for optimized blood pressure control'
    ],
    abnormalValues: [],
    recommendations: [
      'Follow up with outpatient Cardiologist within 7-10 days.',
      'Continue taking Amlodipine 5mg once daily every morning.',
      'Seek emergency medical attention if severe chest pain, shortness of breath, or radiating jaw pain recurs.'
    ],
    questionsForDoctor: [
      'Could my chest tightness have been caused by esophageal reflux or muscle tension?',
      'When is it safe for me to resume moderate exercise routines?'
    ],
    metadata: {
      physicianName: 'Dr. Rajesh Patel, MD (Cardiology)',
      facility: 'St. Jude Memorial Hospital Emergency Dept',
      icd10Codes: ['R07.9 (Chest Pain, Unspecified)', 'I10 (Essential Primary Hypertension)']
    },
    fullText: `ST. JUDE MEMORIAL HOSPITAL DISCHARGE SUMMARY
Admit Date: Jan 16, 2025 | Discharge Date: Jan 18, 2025
Attending Physician: Dr. Rajesh Patel, MD
Primary Diagnosis: Non-cardiac Chest Pain, Essential Hypertension

HOSPITAL COURSE:
52-year-old female presented with retrosternal chest tightness lasting 30 minutes. 
EKG showed normal sinus rhythm without acute ST-segment shifts.
Serial cardiac troponin I levels remained flat at <0.01 ng/mL at 0h, 3h, and 6h.
Coronary CTA demonstrated smooth lumen without non-calcified or calcified plaque.
Patient remained asymptomatic during overnight telemetry monitoring. Blood pressure stabilized to 124/78 mmHg on Amlodipine 5mg.`
  }
];

export const DOCTOR_PERSONAS: DoctorPersona[] = [
  {
    id: 'dr-mentor',
    name: 'DocMentor AI',
    title: 'Chief Medical AI Guide',
    specialty: 'Internal Medicine & Triaging',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
    badge: 'Lead AI System',
    bio: 'Comprehensive medical AI trained on evidence-based clinical guidelines, PubMed literature, and diagnostic protocols.',
    color: 'emerald',
    suggestedPrompts: [
      'Explain my lab report results in simple terms',
      'What are the warning signs of high blood sugar?',
      'How do I prepare for my upcoming physician appointment?'
    ]
  },
  {
    id: 'dr-cardio',
    name: 'Dr. Aris Vance, MD',
    title: 'Senior Cardiologist AI',
    specialty: 'Cardiology & Vascular Health',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
    badge: 'Cardiology Specialist',
    bio: 'Focuses on lipidology, electrocardiography (ECG), hypertension control, coronary risk scores, and preventive cardiac wellness.',
    color: 'indigo',
    suggestedPrompts: [
      'What does elevated LDL cholesterol mean for my heart health?',
      'Is my blood pressure reading of 138/88 considered Stage 1 Hypertension?',
      'What is the difference between Troponin and CK-MB blood tests?'
    ]
  },
  {
    id: 'dr-neuro',
    name: 'Dr. Maya Lin, MD',
    title: 'Neurology Consultant AI',
    specialty: 'Neurology & Brain Imaging',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813571-24a69c100d31?auto=format&fit=crop&q=80&w=250',
    badge: 'Neurology Specialist',
    bio: 'Specialized in MRI/CT neuro-imaging analysis, migraine management, peripheral neuropathies, and cognitive health.',
    color: 'teal',
    suggestedPrompts: [
      'What are Fazekas Grade 1 white matter hyperintensities on brain MRI?',
      'How can I distinguish a tension headache from a migraine with aura?',
      'When should lightheadedness or vertigo prompt urgent imaging?'
    ]
  },
  {
    id: 'dr-pediatrics',
    name: 'Dr. Sam Rivera, MD',
    title: 'Pediatric Specialist AI',
    specialty: 'Pediatrics & Growth',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
    badge: 'Pediatric Specialist',
    bio: 'Expert in pediatric fevers, childhood growth percentiles, vaccination schedules, and pediatric symptom evaluation.',
    color: 'amber',
    suggestedPrompts: [
      'What fever threshold in a toddler requires urgent care?',
      'How do I interpret a pediatric ear infection report?',
      'What are normal respiratory rates for young children?'
    ]
  }
];

export const VITAL_HISTORIES: VitalMetric[] = [
  { date: 'Jan 01', heartRate: 72, bpSystolic: 138, bpDiastolic: 88, bloodSugar: 128, oxygenSat: 98, cholesterolLDL: 175 },
  { date: 'Jan 15', heartRate: 75, bpSystolic: 135, bpDiastolic: 85, bloodSugar: 134, oxygenSat: 98, cholesterolLDL: 172 },
  { date: 'Feb 01', heartRate: 70, bpSystolic: 128, bpDiastolic: 82, bloodSugar: 140, oxygenSat: 99, cholesterolLDL: 170 },
  { date: 'Feb 14', heartRate: 68, bpSystolic: 124, bpDiastolic: 78, bloodSugar: 142, oxygenSat: 99, cholesterolLDL: 168 },
  { date: 'Feb 20', heartRate: 66, bpSystolic: 120, bpDiastolic: 76, bloodSugar: 126, oxygenSat: 99, cholesterolLDL: 155 },
];

export const MEDICAL_GLOSSARY: MedicalTermDefinition[] = [
  {
    term: 'eGFR (Estimated Glomerular Filtration Rate)',
    category: 'Nephrology / Lab',
    medicalDefinition: 'A mathematical estimate of renal blood clearance capacity based on serum creatinine, age, and biological sex.',
    plainLanguage: 'A test that measures how well your kidneys filter waste from your blood. Higher numbers (above 60-90) mean healthy kidney function.',
    clinicalExample: 'eGFR >60 mL/min/1.73m² indicates normal or near-normal kidney filtration.'
  },
  {
    term: 'HbA1c (Glycated Hemoglobin)',
    category: 'Endocrinology / Blood Test',
    medicalDefinition: 'Percentage of hemoglobin molecules covalently bonded to glucose, reflecting mean glycemia over the preceding 2 to 3 months.',
    plainLanguage: 'An average of your blood sugar levels over the past 3 months. Below 5.7% is normal; 6.5% or higher indicates diabetes.',
    clinicalExample: 'An HbA1c of 6.8% shows average blood sugar around 149 mg/dL.'
  },
  {
    term: 'Troponin T / I',
    category: 'Cardiology / Biomarker',
    medicalDefinition: 'Regulatory protein complex specific to cardiac muscle cells released into circulation following myocardial cell injury.',
    plainLanguage: 'A protein released into the blood only when heart muscle cells are damaged. Elevated troponin helps doctors spot a heart attack.',
    clinicalExample: 'Serial troponins <0.01 ng/mL rule out acute heart muscle injury.'
  },
  {
    term: 'Fazekas Scale',
    category: 'Neuroradiology',
    medicalDefinition: 'A radiologic grading system quantifying the severity of cerebral white matter hyperintensities on FLAIR MRI sequences.',
    plainLanguage: 'A 0 to 3 score used by radiologists to rate small wear-and-tear spots in brain tissue. Grade 1 is mild and very common with age.',
    clinicalExample: 'Fazekas Grade 1 represents punctate white matter lesions without confluence.'
  },
  {
    term: 'Stenosis',
    category: 'Vascular & Structural',
    medicalDefinition: 'Abnormal narrowing of a blood vessel or tubular organ structure.',
    plainLanguage: 'A narrowing of a blood vessel, valve, or passageway in the body, which can restrict normal fluid or blood flow.',
    clinicalExample: 'Zero coronary stenosis indicates clear heart arteries without dangerous blockages.'
  }
];
