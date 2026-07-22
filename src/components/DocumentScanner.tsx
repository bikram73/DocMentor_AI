import React, { useState } from 'react';
import { MedicalDocument, AbnormalValue } from '../types';
import { 
  FileText, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Eye, 
  FileCheck, 
  RotateCw, 
  Activity, 
  CheckSquare, 
  Square,
  ShieldCheck,
  Building2,
  User,
  ExternalLink
} from 'lucide-react';

interface DocumentScannerProps {
  documents: MedicalDocument[];
  activeDoc: MedicalDocument | null;
  onSelectDoc: (doc: MedicalDocument) => void;
  onUploadAndAnalyze: (text: string, type: string, imageBase64?: string) => Promise<void>;
  isAnalyzing: boolean;
  onConsultAI: (doc: MedicalDocument) => void;
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({
  documents,
  activeDoc,
  onSelectDoc,
  onUploadAndAnalyze,
  isAnalyzing,
  onConsultAI
}) => {
  const [viewMode, setViewMode] = useState<'layman' | 'clinical'>('layman');
  const [inputText, setInputText] = useState('');
  const [docType, setDocType] = useState('lab_report');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isMedia = file.type.startsWith('image/') || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isMedia) {
      if (file.type.startsWith('image/')) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            setUploadedImage(canvas.toDataURL('image/jpeg', 0.85));
          } else {
            const reader = new FileReader();
            reader.onload = (evt) => setUploadedImage(evt.target?.result as string);
            reader.readAsDataURL(file);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          const reader = new FileReader();
          reader.onload = (evt) => setUploadedImage(evt.target?.result as string);
          reader.readAsDataURL(file);
        };
        img.src = url;
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => setUploadedImage(evt.target?.result as string);
        reader.readAsDataURL(file);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleRunAnalysis = async () => {
    if (!inputText && !uploadedImage) return;
    await onUploadAndAnalyze(inputText, docType, uploadedImage || undefined);
    setInputText('');
    setUploadedImage(null);
  };

  const toggleQuestionCheck = (question: string) => {
    setCheckedQuestions(prev => ({ ...prev, [question]: !prev[question] }));
  };

  const getRiskBadge = (risk: AbnormalValue['riskLevel']) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'moderate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Sample Selectors */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Medical Document AI Analyzer</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload blood tests, imaging reports, prescriptions, or discharge summaries for immediate AI extraction.
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">Load Sample Report:</span>
            <div className="flex flex-wrap gap-2">
              {documents.slice(0, 3).map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDoc(doc)}
                  className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${
                    activeDoc?.id === doc.id
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-primary border-blue-200 dark:border-blue-800 ring-2 ring-primary/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {doc.title.split(' ')[0]} {doc.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* File Drop & Direct Input Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <label className="font-semibold text-slate-800 dark:text-slate-200">Paste Medical Report Text or Upload File</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:ring-1 focus:ring-primary"
              >
                <option value="lab_report">Lab Blood Work Report</option>
                <option value="imaging_scan">Imaging (MRI/CT/X-Ray) Report</option>
                <option value="discharge_summary">Hospital Discharge Summary</option>
                <option value="prescription">Prescription / Medication List</option>
                <option value="ecg_report">ECG / Electrocardiogram</option>
              </select>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw lab results or radiologic impression notes here (e.g. Glucose 142 mg/dL, HbA1c 6.8%, LDL 168 mg/dL)..."
              className="w-full h-24 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono resize-none"
            />
          </div>

          <div className="flex flex-col justify-between space-y-3 bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-3 text-center">
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <UploadCloud className="w-8 h-8 text-primary animate-bounce" />
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Drop PDF / Image Document</p>
                <p className="text-[10px] text-slate-400">Supports PNG, JPG, TXT, OCR files</p>
              </div>
              <input
                type="file"
                accept="image/*,text/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="doc-file-upload"
              />
              <label
                htmlFor="doc-file-upload"
                className="cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-medium transition-colors"
              >
                Browse File
              </label>
              {uploadedImage && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Image Attached</p>
              )}
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || (!inputText && !uploadedImage)}
              className="w-full bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Gemini Extracting Metrics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Document with AI</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Active Document Analysis Display */}
      {activeDoc ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs space-y-6">
          
          {/* Active Header Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 border-b border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-primary text-xs font-semibold border border-blue-200 dark:border-blue-800 uppercase">
                  {activeDoc.type.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Uploaded: {activeDoc.uploadDate}
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {activeDoc.title}
              </h1>
              {activeDoc.metadata && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  {activeDoc.metadata.facility && (
                    <span className="flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeDoc.metadata.facility}</span>
                    </span>
                  )}
                  {activeDoc.metadata.physicianName && (
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeDoc.metadata.physicianName}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* View Mode Toggle (Patient vs Clinical) & Chat Button */}
            <div className="flex items-center space-x-3">
              <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('layman')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'layman'
                      ? 'bg-primary text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Patient Explanation
                </button>
                <button
                  onClick={() => setViewMode('clinical')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'clinical'
                      ? 'bg-primary text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Clinical Report
                </button>
              </div>

              <button
                onClick={() => onConsultAI(activeDoc)}
                className="bg-primary hover:opacity-90 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Specialist AI</span>
              </button>
            </div>
          </div>

          {/* Core Content Body */}
          <div className="p-5 space-y-6">
            
            {/* Summary Box */}
            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-primary uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>{viewMode === 'layman' ? 'What This Means For You' : 'Clinical Summary & Pathophysiology'}</span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {viewMode === 'layman' ? activeDoc.laymanExplanation : activeDoc.summary}
              </p>
            </div>

            {/* Abnormal Values Matrix */}
            {activeDoc.abnormalValues.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Flagged Lab Metrics & Reference Ranges ({activeDoc.abnormalValues.length})</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeDoc.abnormalValues.map((metric, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{metric.metricName}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Ref: {metric.referenceRange}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${getRiskBadge(metric.riskLevel)}`}>
                          {metric.riskLevel} Risk
                        </span>
                      </div>

                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metric.measuredValue}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{metric.unit}</span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal bg-white dark:bg-slate-900/80 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80">
                        {metric.clinicalSignificance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Findings List */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Extracted Key Findings</span>
              </h3>
              <ul className="space-y-2">
                {activeDoc.keyFindings.map((finding, idx) => (
                  <li key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations & Action Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Actionable Recommendations</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {activeDoc.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Questions To Ask Your Doctor</span>
                </h4>
                <div className="space-y-2">
                  {activeDoc.questionsForDoctor.map((q, idx) => {
                    const isChecked = !!checkedQuestions[q];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleQuestionCheck(q)}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start space-x-2.5 ${
                          isChecked
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-700/60 text-indigo-900 dark:text-indigo-200 line-through opacity-70'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span>{q}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Original Raw Text View Accordion */}
            <details className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 group">
              <summary className="font-semibold text-slate-800 dark:text-slate-300 cursor-pointer flex items-center justify-between">
                <span>View Original Raw Document Text</span>
                <span className="text-[10px] text-primary group-open:hidden">Expand</span>
              </summary>
              <pre className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg text-[11px] font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto border border-slate-200 dark:border-slate-800">
                {activeDoc.fullText}
              </pre>
            </details>

          </div>

        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Document Selected</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Choose a sample report from the top banner or upload your own lab report to view detailed AI insights.
          </p>
        </div>
      )}

    </div>
  );
};
