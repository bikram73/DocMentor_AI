import React, { useState } from 'react';
import { SymptomCheckResult, DifferentialDiagnosisItem } from '../types';
import { 
  Stethoscope, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  RotateCw, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle,
  FileSpreadsheet,
  HeartPulse,
  Thermometer,
  Percent,
  Clock
} from 'lucide-react';

interface ClinicalSupportProps {
  onRunSymptomCheck: (data: {
    symptoms: string;
    age?: number;
    gender?: string;
    vitals?: any;
  }) => Promise<SymptomCheckResult | null>;
  isProcessing: boolean;
}

export const ClinicalSupport: React.FC<ClinicalSupportProps> = ({
  onRunSymptomCheck,
  isProcessing
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState<number>(52);
  const [gender, setGender] = useState('Female');
  const [heartRate, setHeartRate] = useState<number>(78);
  const [systolicBP, setSystolicBP] = useState<number>(132);
  const [diastolicBP, setDiastolicBP] = useState<number>(84);
  const [bloodSugar, setBloodSugar] = useState<number>(138);

  const [result, setResult] = useState<SymptomCheckResult | null>({
    triagePriority: 'Urgent Care (24h)',
    primarySummary: 'Patient presents with persistent fatigue, increased thirst (polydipsia), nocturnal urination, and mild post-prandial lightheadedness. Symptoms in combination with fasting glycemia >130 mg/dL strongly suggest Metabolic Syndrome and early Type 2 Diabetes Mellitus.',
    recommendedSpecialist: 'Endocrinologist or Primary Care Physician',
    redFlagWarnings: [
      'Chest pain, shortness of breath, or diaphoretic cold sweat',
      'Sudden blurred vision or acute focal neurological weakness',
      'Fruity breath odor with persistent vomiting (Diabetic Ketoacidosis warning)'
    ],
    differentialDiagnoses: [
      {
        condition: 'Type 2 Diabetes Mellitus (Uncontrolled)',
        probabilityScore: 88,
        severity: 'high',
        matchingSymptoms: ['Polyuria (excess urination)', 'Polydipsia (increased thirst)', 'Fatigue', 'Fasting hyperglycemia'],
        recommendedTests: ['HbA1c Blood Test', 'Fasting Lipid Panel', 'Urinary Albumin-to-Creatinine Ratio'],
        clinicalRationale: 'Symptom cluster paired with elevated fasting blood sugar fits core diagnostic benchmarks for Type 2 Diabetes.',
        icd10Code: 'E11.9'
      },
      {
        condition: 'Metabolic Syndrome (ICD-10 E88.81)',
        probabilityScore: 74,
        severity: 'moderate',
        matchingSymptoms: ['Borderline hypertension (132/84)', 'Fasting Glucose 138 mg/dL', 'Central lipid elevation'],
        recommendedTests: ['Fasting Insulin Level', 'Liver Function Panel (ALT/AST)'],
        clinicalRationale: 'Concurrence of elevated blood pressure, dysglycemia, and dyslipidemia satisfies Adult Treatment Panel III criteria.',
        icd10Code: 'E88.81'
      },
      {
        condition: 'Subclinical Hypothyroidism',
        probabilityScore: 42,
        severity: 'low',
        matchingSymptoms: ['Generalized fatigue', 'Mild weight gain', 'Sluggishness'],
        recommendedTests: ['TSH (Thyroid Stimulating Hormone)', 'Free T4'],
        clinicalRationale: 'Non-specific fatigue in middle-aged female warrants baseline TSH screening.',
        icd10Code: 'E03.9'
      }
    ],
    suggestedQuestions: [
      'Should we initiate an oral antihyperglycemic agent like Metformin?',
      'What home blood pressure and blood glucose monitoring schedule do you advise?',
      'Do I need a continuous glucose monitor (CGM) evaluation?'
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms) return;

    const res = await onRunSymptomCheck({
      symptoms,
      age,
      gender,
      vitals: {
        heartRate,
        bp: `${systolicBP}/${diastolicBP}`,
        bloodSugar
      }
    });

    if (res) {
      setResult(res);
    }
  };

  const getUrgencyBadge = (priority: string) => {
    if (priority.includes('Emergency')) {
      return 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse';
    } else if (priority.includes('Urgent')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
    } else {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Clinical Decision Support & Symptom Triage</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Input patient symptoms and vitals to generate evidence-based differential diagnoses, ICD-10 suggestions, and triage priorities.
          </p>
        </div>

        <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
          Model: Gemini 3.6 Flash
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Form Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Patient Symptom Profile
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Symptoms & Chief Complaints
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe current symptoms (e.g. constant fatigue, excessive thirst, nighttime urination, mild morning lightheadedness)..."
                className="w-full h-28 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Biological Sex</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Vitals Inputs */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Current Vital Signs
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-500 dark:text-slate-400 text-[10px] block">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-500 dark:text-slate-400 text-[10px] block">Blood Pressure (mmHg)</label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={systolicBP}
                      onChange={(e) => setSystolicBP(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-1.5 text-slate-800 dark:text-slate-200"
                    />
                    <span className="text-slate-400">/</span>
                    <input
                      type="number"
                      value={diastolicBP}
                      onChange={(e) => setDiastolicBP(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-1.5 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-slate-500 dark:text-slate-400 text-[10px] block">Fasting Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-1.5 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white dark:text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Computing Differential Dx...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Clinical Triage & Differential</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Results Column */}
        <div className="lg:col-span-7 space-y-5">
          {result ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
              
              {/* Urgency Badge Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                    Recommended Triage Level
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-3 py-1 rounded-full font-extrabold uppercase border ${getUrgencyBadge(result.triagePriority)}`}>
                      {result.triagePriority}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Recommended Specialist</span>
                  <span className="text-xs font-bold text-primary dark:text-teal-300">{result.recommendedSpecialist}</span>
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-300">Clinical Evaluation Overview</p>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">{result.primarySummary}</p>
              </div>

              {/* Red Flag Warnings */}
              {result.redFlagWarnings.length > 0 && (
                <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Red Flag Triage Warnings (Seek immediate care if present)</span>
                  </div>
                  <ul className="space-y-1 text-xs text-rose-800 dark:text-rose-200/90 pl-6 list-disc">
                    {result.redFlagWarnings.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Differential Diagnosis Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span>Ranked Differential Diagnoses</span>
                </h4>

                <div className="space-y-3">
                  {result.differentialDiagnoses.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">{item.condition}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-primary dark:text-teal-300 font-mono border border-slate-200 dark:border-slate-700">
                              ICD: {item.icd10Code}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{item.clinicalRationale}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">{item.probabilityScore}%</span>
                          <span className="text-[9px] text-slate-500 block">Match Score</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-primary h-full rounded-full"
                          style={{ width: `${item.probabilityScore}%` }}
                        ></div>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
                        <span className="text-slate-500 dark:text-slate-400 font-semibold">Recommended Tests:</span>
                        {item.recommendedTests.map((t, tidx) => (
                          <span key={tidx} className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Stethoscope className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Enter Symptoms to Begin</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Fill in the patient symptom profile on the left to generate differential diagnoses and triage recommendations.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
