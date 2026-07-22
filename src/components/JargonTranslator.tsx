import React, { useState } from 'react';
import { MEDICAL_GLOSSARY } from '../data/mockMedicalData';
import { 
  BookOpenCheck, 
  Search, 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

interface JargonTranslatorProps {
  onSimplifyJargon: (text: string) => Promise<any>;
  isProcessing: boolean;
}

export const JargonTranslator: React.FC<JargonTranslatorProps> = ({
  onSimplifyJargon,
  isProcessing
}) => {
  const [jargonInput, setJargonInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [simplifiedOutput, setSimplifiedOutput] = useState<any | null>({
    simplifiedSummary: 'Your test results show that your blood sugar levels and bad cholesterol (LDL) are higher than normal. While there is no immediate emergency, these numbers suggest early signs of type 2 diabetes and higher heart risks. With dietary adjustments, daily walk routines, and medication from your doctor, these levels can be brought back into healthy ranges.',
    keyTakeaways: [
      'High fasting glucose (142 mg/dL) means your body is having trouble processing blood sugar.',
      'HbA1c of 6.8% confirms diabetes, which needs regular monitoring.',
      'Mild liver enzyme (ALT 58) elevation is common when blood sugar is high and usually reverses with healthy habits.'
    ],
    glossary: [
      { term: 'Glycated Hemoglobin (HbA1c)', meaning: 'A blood test measuring average sugar levels over 3 months.' },
      { term: 'LDL Cholesterol', meaning: 'The "bad" cholesterol that can build up in artery walls.' },
      { term: 'ALT Transaminase', meaning: 'An enzyme found in liver cells that leaks into blood when the liver works harder.' }
    ],
    actionChecklist: [
      'Bring a written log of your home blood sugar readings to your physician.',
      'Ask your doctor if starting Metformin is right for you.',
      'Cut down on refined sugars and sweetened drinks.'
    ]
  });

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jargonInput.trim()) return;

    const res = await onSimplifyJargon(jargonInput);
    if (res) {
      setSimplifiedOutput(res);
    }
  };

  const filteredGlossary = MEDICAL_GLOSSARY.filter(item =>
    item.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.plainLanguage.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpenCheck className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Medical Jargon Translator & Clinical Glossary</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Convert dense radiologic notes, biopsy summaries, or doctor letters into plain 6th-grade English.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input & Translation Panel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Paste Complex Medical Note</span>
            </h3>

            <form onSubmit={handleTranslate} className="space-y-3">
              <textarea
                value={jargonInput}
                onChange={(e) => setJargonInput(e.target.value)}
                placeholder="Paste complex doctor note (e.g. 'Demonstrates periventricular punctate FLAIR hyperintensities without acute infarction or mass effect')..."
                className="w-full h-32 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none font-mono"
              />

              <button
                type="submit"
                disabled={isProcessing || !jargonInput.trim()}
                className="w-full bg-primary hover:opacity-90 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
              >
                {isProcessing ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Translating to Plain English...</span>
                  </>
                ) : (
                  <>
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Translate into Plain Language</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Simplified Result Output */}
          {simplifiedOutput && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Simplified Explanation</span>
              </h3>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {simplifiedOutput.simplifiedSummary}
              </p>

              {simplifiedOutput.keyTakeaways && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Key Takeaways:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {simplifiedOutput.keyTakeaways.map((take, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-primary dark:text-cyan-400 font-bold">•</span>
                        <span>{take}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Searchable Medical Glossary Column */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Search className="w-4 h-4 text-primary dark:text-teal-400" />
              <span>Interactive Medical Term Glossary</span>
            </h3>

            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search term (e.g. eGFR, HbA1c)..."
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredGlossary.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.term}</h4>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-primary dark:text-teal-400 border border-slate-200 dark:border-slate-800 font-mono">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/60">
                  <span className="font-bold text-primary dark:text-teal-300">In Simple Terms: </span>
                  {item.plainLanguage}
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Clinical Context: {item.clinicalExample}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
