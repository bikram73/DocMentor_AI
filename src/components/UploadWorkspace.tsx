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
  Bell,
  Sun,
  Moon
} from 'lucide-react';

interface UploadWorkspaceProps {
  documents: MedicalDocument[];
  onSelectDoc: (doc: MedicalDocument) => void;
  onUploadAndAnalyze: (text: string, type: string, imageBase64?: string) => Promise<void>;
  isAnalyzing: boolean;
  onNavigateTab?: (tab: string) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export const UploadWorkspace: React.FC<UploadWorkspaceProps> = ({
  documents,
  onSelectDoc,
  onUploadAndAnalyze,
  isAnalyzing,
  onNavigateTab,
  darkMode = false,
  setDarkMode
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

  const compressMediaFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

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
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            resolve(dataUrl);
          } else {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        };
        img.src = url;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelected = async (file: File) => {
    const isMedia = file.type.startsWith('image/') || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (isMedia) {
      try {
        const dataUrl = await compressMediaFile(file);
        await onUploadAndAnalyze(`Uploaded Document (${file.name})`, docType, dataUrl);
      } catch (err) {
        console.error("Failed to read image/PDF file:", err);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        onUploadAndAnalyze(content || `Extracted text from ${file.name}`, docType);
      };
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      
      {/* Top Navigation Bar */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center w-full px-6 sm:px-10 py-4 sticky top-0 z-50 transition-colors">
        <div className="flex items-center gap-8">
          <div 
            onClick={() => onNavigateTab && onNavigateTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-primary tracking-tight">
              DocMentor AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
            <button onClick={() => onNavigateTab && onNavigateTab('landing')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
            <button onClick={() => onNavigateTab && onNavigateTab('summary')} className="hover:text-primary transition-colors cursor-pointer">Features</button>
            <button onClick={() => onNavigateTab && onNavigateTab('upload-workspace')} className="text-primary border-b-2 border-primary pb-0.5 cursor-pointer">How It Works</button>
            <button onClick={() => onNavigateTab && onNavigateTab('settings')} className="hover:text-primary transition-colors cursor-pointer">About</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs px-2 w-40 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all flex items-center justify-center border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>
          )}

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center px-6 sm:px-10 py-10 gap-12 max-w-6xl mx-auto w-full">
        
        {/* Premium Upload Section */}
        <section className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Upload Documents</h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              Bring your research to life. Drop your PDFs here and let our AI Mentor provide deep analysis and insights.
            </p>
          </div>

          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full bg-white dark:bg-slate-900 border-2 border-dashed rounded-[24px] p-8 sm:p-12 flex flex-col items-center justify-center transition-all duration-300 group hover:border-primary/50 cursor-pointer relative overflow-hidden shadow-xs ${
              dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-300 dark:border-slate-700'
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
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 text-primary border border-blue-100 dark:border-blue-900/50 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Drag and drop your files</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 text-center">
                Upload PDFs, Research Papers, or Technical Docs<br />
                <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold">Maximum file size: 50MB</span>
              </p>

              <button 
                type="button"
                disabled={isAnalyzing}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary/25 hover:translate-y-[-2px] active:scale-95 transition-all"
              >
                {isAnalyzing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>{isAnalyzing ? 'Analyzing File...' : 'Choose File'}</span>
              </button>

              <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>PDF Only</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Private & Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Direct Paste Option */}
        <section className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Or Paste Clinical / Report Text Content</span>
            </h3>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
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
              className="w-full h-24 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono"
            />

            <button
              type="submit"
              disabled={isAnalyzing || !pasteText.trim()}
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-40 transition-all shadow-xs"
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Workspace</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your recently analyzed and active documents</p>
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
              <div className="bg-white dark:bg-slate-900 border-2 border-primary/40 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-18 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <RotateCw className="w-6 h-6 text-primary animate-spin" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">Analyzing New Document...</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Processing layout & terminology...</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-primary">72%</span>
                        <span className="text-slate-400 italic">Analyzing structure...</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
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
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-18 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate pr-2 group-hover:text-primary transition-colors">
                      Quantum_Computing.pdf
                    </h4>
                    <MoreVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">1.8 MB • Analyzed 2h ago</p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-[9px] font-bold rounded uppercase tracking-wider">PHYSICS</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[9px] font-bold rounded uppercase tracking-wider">COMPLEX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Mock Item 2 */}
            <div 
              onClick={() => onNavigateTab && onNavigateTab('summary')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-18 bg-emerald-50 dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-slate-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                  <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate pr-2 group-hover:text-primary transition-colors">
                      Architecture_Trends.pdf
                    </h4>
                    <MoreVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">5.2 MB • Analyzed 1d ago</p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-[9px] font-bold rounded uppercase tracking-wider">DESIGN</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[9px] font-bold rounded uppercase tracking-wider">VISUAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Analyzed Documents */}
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-18 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate pr-2 group-hover:text-primary transition-colors">
                        {doc.title}
                      </h4>
                      <MoreVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Uploaded {doc.uploadDate} • Patient: {doc.patientName}</p>
                    <div className="mt-3 flex gap-1.5">
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-[9px] font-bold rounded uppercase tracking-wider">
                        {doc.type.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 text-[9px] font-bold rounded uppercase">
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
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 w-full py-10 flex flex-col items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium mt-auto transition-colors">
        <span className="text-xl font-black text-primary">DocMentor AI</span>
        <div className="flex gap-6">
          <button onClick={() => alert('Privacy Policy')} className="hover:text-primary transition-colors">Privacy Policy</button>
          <button onClick={() => alert('Terms of Service')} className="hover:text-primary transition-colors">Terms of Service</button>
          <button onClick={() => alert('Contact Support')} className="hover:text-primary transition-colors">Contact Support</button>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[11px]">© 2025 DocMentor AI. All rights reserved.</p>
      </footer>

    </div>
  );
};
