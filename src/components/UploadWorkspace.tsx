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
  ChevronRight,
  Bell
} from 'lucide-react';

interface UploadWorkspaceProps {
  documents: MedicalDocument[];
  onSelectDoc: (doc: MedicalDocument) => void;
  onUploadAndAnalyze: (text: string, type: string, imageBase64?: string) => Promise<void>;
  isAnalyzing: boolean;
  onNavigateTab?: (tab: string) => void;
}

export const UploadWorkspace: React.FC<UploadWorkspaceProps> = ({
  documents,
  onSelectDoc,
  onUploadAndAnalyze,
  isAnalyzing,
  onNavigateTab
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [pasteText, setOriginalText] = useState('');
  const [docType, setDocType] = useState('lab_report');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-on-surface flex flex-col -m-4 sm:-m-6 lg:-m-8">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-2xs flex justify-between items-center w-full px-6 sm:px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <span 
            onClick={() => onNavigateTab && onNavigateTab('landing')}
            className="text-2xl font-black text-primary tracking-tight cursor-pointer"
          >
            DocMentor AI
          </span>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-on-surface-variant">
            <button onClick={() => onNavigateTab && onNavigateTab('landing')} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => onNavigateTab && onNavigateTab('summary')} className="hover:text-primary transition-colors">Features</button>
            <button onClick={() => onNavigateTab && onNavigateTab('upload-workspace')} className="text-primary border-b-2 border-primary pb-0.5">How It Works</button>
            <button onClick={() => onNavigateTab && onNavigateTab('settings')} className="hover:text-primary transition-colors">About</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/50">
            <Search className="w-4 h-4 text-on-surface-variant shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs px-2 w-40 text-on-surface"
            />
          </div>

          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all">
            <Bell className="w-5 h-5" />
          </button>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQEkq4w3-ZnOSStMS6hGfa5u7mZ6cFSdjwUtIz4lk5xAnAqZMAjK8lktQaycobNRoP447GO_JSRo0sfZ9X_2gGWxRzfmZI-fxjnlv5zD9tUNJC7jtE6ITjGG1pjTgvppexq32lhhNFNJbX8LpscW9OouUEDZRJz_ugeSCTDHiAWvxLTEmbMs-Z6lQtQwi1FUNKtkYNDiUHv7muGml8NYfZ_4PJWro43Ge-eaODVfndQpxME8XcQtEK" 
              alt="Researcher Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center px-6 sm:px-10 py-10 gap-12 max-w-6xl mx-auto w-full">
        
        {/* Premium Upload Section */}
        <section className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-on-surface tracking-tight">Upload Documents</h1>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Bring your research to life. Drop your PDFs here and let our AI Mentor provide deep analysis and insights.
            </p>
          </div>

          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full bg-white border-2 border-dashed rounded-[24px] p-8 sm:p-12 flex flex-col items-center justify-center transition-all duration-300 group hover:border-primary/50 cursor-pointer relative overflow-hidden shadow-2xs ${
              dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant/70'
            }`}
          >
            {/* Corner Decorative Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary/5 blur-3xl rounded-full pointer-events-none"></div>

            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.txt,.png,.jpg,.jpeg,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
              className="hidden" 
            />

            <div className="z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-on-surface mb-1">Drag and drop your files</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-6 text-center">
                Upload PDFs, Research Papers, or Technical Docs<br />
                <span className="text-[10px] opacity-60 font-semibold">Maximum file size: 50MB</span>
              </p>

              <button 
                type="button"
                disabled={isAnalyzing}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary/25 hover:translate-y-[-2px] active:scale-95 transition-all"
              >
                {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isAnalyzing ? 'Analyzing File...' : 'Choose File'}</span>
              </button>

              <div className="mt-8 flex items-center gap-6 text-xs text-on-surface-variant opacity-75 font-medium">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>PDF Only</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-tertiary" />
                  <span>Private & Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Direct Paste Option */}
        <section className="w-full max-w-4xl bg-white border border-outline-variant/40 rounded-2xl p-6 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-3">
            <h3 className="text-xs font-bold text-on-surface flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Or Paste Clinical / Report Text Content</span>
            </h3>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-xl px-3 py-1.5 text-xs font-bold text-on-surface focus:outline-none"
            >
              <option value="lab_report">Lab Report (Blood / Lipid Panel)</option>
              <option value="imaging_scan">Radiology Scan (MRI / CT / Ultrasound)</option>
              <option value="discharge_summary">Discharge Summary</option>
              <option value="prescription">Prescription Log</option>
            </select>
          </div>

          <form onSubmit={handleManualAnalyze} className="space-y-3">
            <textarea
              value={pasteText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste raw document text here for real-time analysis..."
              className="w-full h-24 bg-surface-container-low border border-outline-variant/60 rounded-xl p-3 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
            />

            <button
              type="submit"
              disabled={isAnalyzing || !pasteText.trim()}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-40 transition-all shadow-2xs"
            >
              {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Analyze Text</span>
            </button>
          </form>
        </section>

        {/* Recent Uploads Workspace Section */}
        <section className="w-full max-w-6xl space-y-6">
          <div className="flex justify-between items-end px-1">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">Recent Workspace</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Your recently analyzed and active documents</p>
            </div>
            <button 
              onClick={() => onNavigateTab && onNavigateTab('summary')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View All Files
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Active Upload Card Demo */}
            {isAnalyzing && (
              <div className="bg-white border-2 border-primary/40 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-18 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-center shrink-0">
                    <RotateCw className="w-6 h-6 text-primary animate-spin" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-on-surface truncate">Analyzing New Document...</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1">Processing layout & terminology...</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-primary">72%</span>
                        <span className="text-on-surface-variant italic">Analyzing structure...</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full transition-all duration-300" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Static Mock Item 1 */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('summary')}
              className="bg-white border border-outline-variant/50 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-18 bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center bg-primary/5">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-on-surface truncate pr-2 group-hover:text-primary transition-colors">
                      Quantum_Computing.pdf
                    </h4>
                    <MoreVertical className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">1.8 MB • Analyzed 2h ago</p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-bold rounded uppercase tracking-wider">PHYSICS</span>
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[9px] font-bold rounded uppercase tracking-wider">COMPLEX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Mock Item 2 */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('summary')}
              className="bg-white border border-outline-variant/50 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-18 bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center bg-tertiary/5">
                  <FileText className="w-7 h-7 text-tertiary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-on-surface truncate pr-2 group-hover:text-primary transition-colors">
                      Architecture_Trends.pdf
                    </h4>
                    <MoreVertical className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">5.2 MB • Analyzed 1d ago</p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-bold rounded uppercase tracking-wider">DESIGN</span>
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[9px] font-bold rounded uppercase tracking-wider">VISUAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Analyzed Documents */}
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className="bg-white border border-outline-variant/50 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-18 bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center bg-primary/5">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-on-surface truncate pr-2 group-hover:text-primary transition-colors">
                        {doc.title}
                      </h4>
                      <MoreVertical className="w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-1">Uploaded {doc.uploadDate} • Patient: {doc.patientName}</p>
                    <div className="mt-3 flex gap-1.5">
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-bold rounded uppercase tracking-wider">
                        {doc.type.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 text-[9px] font-bold rounded uppercase">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant w-full py-10 flex flex-col items-center gap-4 text-xs text-on-surface-variant font-medium mt-auto">
        <span className="text-xl font-black text-primary">DocMentor AI</span>
        <div className="flex gap-6">
          <button onClick={() => alert('Privacy Policy')} className="hover:underline">Privacy Policy</button>
          <button onClick={() => alert('Terms of Service')} className="hover:underline">Terms of Service</button>
          <button onClick={() => alert('Contact Support')} className="hover:underline">Contact Support</button>
        </div>
        <p className="opacity-60">© 2025 DocMentor AI. All rights reserved.</p>
      </footer>

    </div>
  );
};
