import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Lightbulb, 
  Brain, 
  Copy, 
  Share2, 
  Info, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { MEDICAL_GLOSSARY } from '../data/mockMedicalData';
import { MedicalTermDefinition } from '../types';

interface ExplainTermsProps {
  onSimplifyJargon?: (text: string) => Promise<any>;
}

export const ExplainTermsView: React.FC<ExplainTermsProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<MedicalTermDefinition>(MEDICAL_GLOSSARY[0]);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');

  const filteredTerms = MEDICAL_GLOSSARY.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.plainLanguage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>Explain Medical & Technical Terms</span>
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Demystify complex clinical acronyms, lab values, and radiologic findings into plain English.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search terms (e.g., eGFR, Troponin)..."
            className="w-full bg-white dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-800 rounded-full pl-9 pr-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Split View Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Extracted Terms List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-800 rounded-2xl p-4 flex flex-col shadow-2xs h-[560px]">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40 mb-3">
            <h3 className="text-sm font-bold text-on-surface">Extracted Terms</h3>
            <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {filteredTerms.length} Terms Found
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredTerms.map((item, idx) => {
              const isSelected = selectedTerm.term === item.term;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTerm(item)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-secondary-container/60 border-primary text-on-surface font-semibold shadow-2xs'
                      : 'border-transparent hover:bg-surface-container-low hover:border-outline-variant/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-primary">{item.term}</h4>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-1">
                    {item.plainLanguage}
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[9px] font-bold text-outline uppercase font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Explanation Detail */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Difficulty Level Tabs */}
          <div className="flex items-center justify-between bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/40">
            <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 shadow-2xs">
              <button 
                onClick={() => setDifficulty('beginner')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficulty === 'beginner' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Beginner
              </button>
              <button 
                onClick={() => setDifficulty('intermediate')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficulty === 'intermediate' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setDifficulty('expert')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficulty === 'expert' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Expert / Clinical
              </button>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(`${selectedTerm.term}: ${selectedTerm.plainLanguage}`)}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-800 hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                title="Copy Explanation"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Term Explanation Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs border border-outline-variant/60">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-on-surface">{selectedTerm.term}</h3>
                <p className="text-xs text-on-surface-variant font-medium">Category: {selectedTerm.category}</p>
              </div>
            </div>

            {/* Definition */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Plain Language Definition</span>
              </h4>
              <p className="text-sm text-on-surface leading-relaxed font-medium bg-white dark:bg-slate-900 p-4 rounded-xl border border-outline-variant/40 dark:border-slate-800">
                {difficulty === 'beginner' 
                  ? selectedTerm.plainLanguage 
                  : difficulty === 'expert' 
                  ? selectedTerm.medicalDefinition 
                  : `${selectedTerm.plainLanguage} ${selectedTerm.medicalDefinition}`}
              </p>
            </div>

            {/* Analogy & Practical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-1.5">
                <h5 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Real-World Analogy</span>
                </h5>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "Think of {selectedTerm.term} like a weather gauge for your internal body chemistry, showing sustained readings rather than quick daily spikes."
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-1.5">
                <h5 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-primary" />
                  <span>Clinical Significance</span>
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedTerm.clinicalExample}
                </p>
              </div>

            </div>

            {/* Related Concepts */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Related Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {['Blood Glucose', 'Metabolic Syndrome', 'Lipidology', 'Renal Clearance'].map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Document Context Banner */}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-secondary-container/20 p-4 rounded-xl">
              <div className="flex items-start gap-2.5 text-xs text-on-secondary-container">
                <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  This term appears in your <strong>Comprehensive Metabolic & Lipid Panel</strong> report.
                </span>
              </div>
              <button 
                onClick={() => alert(`Context in report:\n\n"${selectedTerm.clinicalExample}"`)}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all shrink-0"
              >
                View Source Context
              </button>
            </div>

          </div>

          {/* AI Advisor Prompt Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-outline-variant/50 dark:border-slate-800 shadow-2xs flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-on-surface font-medium flex-1">
              Want deeper clarification on how {selectedTerm.term} affects your treatment plan?
            </p>
            <button 
              onClick={() => alert(`Asking AI Mentor about ${selectedTerm.term}...`)}
              className="px-4 py-2 bg-surface-container-high rounded-xl text-xs font-bold text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all shrink-0"
            >
              Ask AI Mentor
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
