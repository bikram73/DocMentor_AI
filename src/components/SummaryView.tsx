import React, { useState } from 'react';
import { MedicalDocument } from '../types';
import { 
  Zap, 
  AlignLeft, 
  ListChecks, 
  Sparkles, 
  Copy, 
  Download, 
  RotateCw, 
  Check, 
  TrendingUp, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { VITAL_HISTORIES } from '../data/mockMedicalData';

interface SummaryViewProps {
  document: MedicalDocument | null;
  onSelectDoc: (doc: MedicalDocument) => void;
  documents: MedicalDocument[];
}

export const SummaryView: React.FC<SummaryViewProps> = ({ document, onSelectDoc, documents }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'detailed' | 'takeaways'>('quick');

  const handleCopy = () => {
    const textToCopy = `${document?.title || 'Document Summary'}\n\nSummary: ${document?.summary}\n\nKey Findings:\n${document?.keyFindings.map(f => `• ${f}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const doc = document || documents[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Analysis Summary</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-semibold text-on-surface-variant px-3 py-1 bg-surface-container-high rounded-full">
              PDF: {doc?.title || 'Annual_Report_2025.pdf'}
            </span>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <span className="text-xs text-on-surface-variant font-medium">Uploaded {doc?.uploadDate || '2 hours ago'}</span>
          </div>
        </div>

        {/* Quick Doc Selector */}
        <div className="flex items-center gap-2">
          <select 
            onChange={(e) => {
              const selected = documents.find(d => d.id === e.target.value);
              if (selected) onSelectDoc(selected);
            }}
            value={doc?.id}
            className="bg-white border border-outline-variant rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Summary Card */}
        <div 
          onClick={() => setActiveTab('quick')}
          className={`glass-card p-6 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group border ${
            activeTab === 'quick' ? 'ring-2 ring-primary border-primary bg-white' : 'hover:-translate-y-1'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary-container/10 text-primary-container rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs font-bold text-tertiary bg-tertiary-fixed/30 px-3 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Quick Summary</h3>
          <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {doc?.laymanExplanation || 'A concise, high-level overview highlighting the core purpose and findings of the document.'}
          </p>
          <div className="mt-4 flex items-center text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>View brief</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Detailed Summary Card */}
        <div 
          onClick={() => setActiveTab('detailed')}
          className={`glass-card p-6 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group border ${
            activeTab === 'detailed' ? 'ring-2 ring-primary border-primary bg-white' : 'hover:-translate-y-1'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-secondary-container/30 text-secondary rounded-xl flex items-center justify-center">
              <AlignLeft className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Detailed Summary</h3>
          <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {doc?.summary || 'A comprehensive clinical breakdown of each chapter and section, maintaining original context and diagnostic flow.'}
          </p>
          <div className="mt-4 flex items-center text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>Explore details</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Key Takeaways Card */}
        <div 
          onClick={() => setActiveTab('takeaways')}
          className={`glass-card p-6 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer group border ${
            activeTab === 'takeaways' ? 'ring-2 ring-primary border-primary bg-white' : 'hover:-translate-y-1'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center">
              <ListChecks className="w-6 h-6 text-tertiary" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-on-surface mb-2">Key Takeaways</h3>
          <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            Structured bullet points optimized for rapid scanning of critical diagnostic facts and action recommendations.
          </p>
          <div className="mt-4 flex items-center text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>Scan bullets</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

      {/* Main AI Summary Canvas */}
      <section className="bg-white rounded-2xl border border-outline-variant/60 shadow-sm overflow-hidden flex flex-col">
        
        {/* Canvas Toolbar */}
        <div className="flex flex-wrap items-center justify-between p-6 border-b border-outline-variant/40 bg-surface-container-lowest gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-on-surface">AI Generated Clinical Summary</h3>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-all text-xs font-bold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button 
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-all text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button 
              onClick={() => alert('Regenerating summary with Gemini 3.6 Flash...')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all text-xs font-bold"
            >
              <RotateCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8">
          
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-on-surface">Executive Overview</h4>
            <p className="text-base text-on-surface-variant leading-relaxed">
              {doc?.summary}
            </p>
          </div>

          {/* Side-by-Side Callout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
            
            <div className="p-5 bg-primary/5 rounded-xl border-l-4 border-primary space-y-2">
              <h5 className="text-xs font-bold text-primary uppercase tracking-wider">Primary Diagnosis / Objective</h5>
              <p className="text-sm font-medium text-on-surface-variant">
                {doc?.laymanExplanation}
              </p>
            </div>

            <div className="p-5 bg-tertiary/5 rounded-xl border-l-4 border-tertiary space-y-2">
              <h5 className="text-xs font-bold text-tertiary uppercase tracking-wider">Critical Action Factor</h5>
              <p className="text-sm font-medium text-on-surface-variant">
                {doc?.recommendations[0] || 'Schedule a follow-up physician consultation within 2 weeks for optimized therapy adjustment.'}
              </p>
            </div>

          </div>

          {/* Strategic Milestones / Key Findings Bullets */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-on-surface">Diagnostic Findings & Milestones</h4>
            <ul className="space-y-3">
              {doc?.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-base text-on-surface-variant leading-snug">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Recharts Trajectory Graph */}
          <div className="pt-6 border-t border-outline-variant/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-bold text-on-surface">Patient Trajectory Analytics</h4>
              </div>
              <span className="text-xs font-mono text-outline">Jan - Feb 2025</span>
            </div>

            <div className="h-64 w-full bg-surface-container-low rounded-2xl p-4 border border-outline-variant/40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VITAL_HISTORIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="bloodSugar" name="Fasting Glucose (mg/dL)" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Footer Meta Bar */}
        <div className="p-4 border-t border-outline-variant/40 bg-surface-container-low flex justify-between items-center px-6 text-xs text-on-surface-variant">
          <div className="flex items-center gap-3">
            <span>Summary length: {doc?.fullText.split(' ').length || 350} words</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <span>Confidence score: 98.4%</span>
          </div>
          <button 
            onClick={() => alert(`Full Medical Report:\n\n${doc?.fullText}`)}
            className="text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>View raw source</span>
          </button>
        </div>

      </section>

    </div>
  );
};
