import React, { useState, useRef } from 'react';
import { MedicalDocument } from '../types';
import { 
  Upload, 
  FileText, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  MoreVertical, 
  Plus, 
  FileCheck,
  RotateCw,
  Search,
  ChevronRight
} from 'lucide-react';

interface UploadWorkspaceProps {
  documents: MedicalDocument[];
  onSelectDoc: (doc: MedicalDocument) => void;
  onUploadAndAnalyze: (text: string, type: string, imageBase64?: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const UploadWorkspace: React.FC<UploadWorkspaceProps> = ({
  documents,
  onSelectDoc,
  onUploadAndAnalyze,
  isAnalyzing
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [pasteText, setOriginalText] = useState('');
  const [docType, setDocType] = useState('lab_report');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (file.type.startsWith('image/')) {
        onUploadAndAnalyze(`Scanned Document Image (${file.name})`, docType, content);
      } else {
        onUploadAndAnalyze(content || `Extracted text from ${file.name}`, docType);
      }
    };
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleManualAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteText.trim()) return;
    onUploadAndAnalyze(pasteText, docType);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      
      {/* Upload Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>POWERED BY GEMINI 3.6 FLASH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
          Upload Medical & Technical Documents
        </h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Bring your lab results, radiologic MRI/CT impressions, discharge notes, or research papers to life. Drop your files here for deep AI analysis and plain-language insights.
        </p>
      </div>

      {/* Premium Upload Drop Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`w-full bg-white border-2 border-dashed rounded-[24px] p-8 sm:p-12 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden shadow-2xs ${
          dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant hover:border-primary/50'
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".pdf,.txt,.png,.jpg,.jpeg,.doc,.docx"
          onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
          className="hidden" 
        />

        <div className="z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-primary" />
          </div>

          <h3 className="text-lg font-bold text-on-surface mb-1">Drag and drop your PDF or Image</h3>
          <p className="text-xs text-on-surface-variant mb-6 max-w-sm">
            Upload Laboratory Panels, Brain MRIs, Radiology Summaries, or Clinical Notes.<br />
            <span className="opacity-60 text-[10px]">Maximum file size: 50MB</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
            >
              {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>{isAnalyzing ? 'Analyzing File...' : 'Choose File From Device'}</span>
            </button>
          </div>

          <div className="flex items-center gap-6 text-xs text-on-surface-variant opacity-75 font-medium">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" />
              <span>PDF & Image OCR</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-tertiary" />
              <span>Private & Encrypted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Manual Paste Text Fallback */}
      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
          <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>Or Paste Text Content Directly</span>
          </h3>
          <select 
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="bg-white border border-outline-variant rounded-xl px-3 py-1.5 text-xs font-bold text-on-surface focus:outline-none"
          >
            <option value="lab_report">Lab Report (Blood / Lipid Panel)</option>
            <option value="imaging_scan">Radiology Imaging Scan (MRI / CT / Ultrasound)</option>
            <option value="discharge_summary">Hospital Discharge Summary</option>
            <option value="prescription">Prescription & Pharmacy Log</option>
          </select>
        </div>

        <form onSubmit={handleManualAnalyze} className="space-y-3">
          <textarea
            value={pasteText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste clinical report text here (e.g. 'GLUCOSE, FASTING: 142 mg/dL [HIGH], HbA1c: 6.8%')..."
            className="w-full h-28 bg-white border border-outline-variant/60 rounded-xl p-3 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
          />

          <button
            type="submit"
            disabled={isAnalyzing || !pasteText.trim()}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 transition-all shadow-2xs"
          >
            {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Analyze Text Content</span>
          </button>
        </form>
      </div>

      {/* Recent Workspace Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Recent Workspace Archive</h2>
            <p className="text-xs text-on-surface-variant">Your recently analyzed active documents and reports</p>
          </div>
          <span className="text-xs font-bold text-primary">{documents.length} Active Records</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className="bg-white border border-outline-variant/50 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-14 bg-surface-container-high rounded-xl border border-outline-variant flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-primary font-bold">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">
                    Uploaded: {doc.uploadDate} • Patient: {doc.patientName}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-bold rounded-md uppercase tracking-wider">
                      {doc.type.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[9px] font-bold rounded-md uppercase">
                      Analyzed
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed bg-surface-container-low p-2.5 rounded-xl">
                {doc.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-primary font-bold pt-1">
                <span>Open Analysis View</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
