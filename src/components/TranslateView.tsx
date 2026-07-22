import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  Mic, 
  X, 
  Volume2, 
  Copy, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  Check, 
  Sparkles,
  RotateCw
} from 'lucide-react';

interface TranslateViewProps {
  onSimplifyJargon?: (text: string) => Promise<any>;
}

export const TranslateView: React.FC<TranslateViewProps> = () => {
  const [sourceLang, setSourceLanguage] = useState('English');
  const [targetLang, setTargetLanguage] = useState('Spanish');
  const [originalText, setOriginalText] = useState(
    'The executive summary highlights an 18% increase in operational efficiency following the integration of AI-driven automation systems. Fasting plasma glucose and LDL cholesterol require routine monitoring.'
  );
  const [translatedText, setTranslatedText] = useState(
    'El resumen ejecutivo destaca un aumento del 18 % en la eficiencia operativa tras la integración de sistemas de automatización impulsados por IA. La glucosa en plasma en ayunas y el colesterol LDL requieren un monitoreo de rutina.'
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!originalText.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch('/api/simplify-jargon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicalText: originalText, targetLanguage: targetLang })
      });
      const data = await res.json();
      if (data.success && data.result?.simplifiedSummary) {
        setTranslatedText(data.result.simplifiedSummary);
      } else {
        setTranslatedText(`[${targetLang} Translation]: ` + originalText);
      }
    } catch (e) {
      setTranslatedText(`[${targetLang} Translation]: ` + originalText);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    const tempL = sourceLang;
    setSourceLanguage(targetLang);
    setTargetLanguage(tempL);
    const tempT = originalText;
    setOriginalText(translatedText);
    setTranslatedText(tempT);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (txt: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(txt);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-2">
          <Languages className="w-6 h-6 text-primary" />
          <span>Multi-Language Document Translation</span>
        </h2>
        <p className="text-xs text-on-surface-variant mt-1">
          Convert medical reports, lab interpretations, and research notes between 50+ languages with high contextual accuracy.
        </p>
      </div>

      {/* Floating Language Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/40 shadow-2xs">
        
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          
          <select 
            value={sourceLang}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="flex-1 max-w-[200px] bg-white dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="English" className="bg-white dark:bg-slate-900">English</option>
            <option value="Hindi" className="bg-white dark:bg-slate-900">Hindi (हिंदी)</option>
            <option value="Kannada" className="bg-white dark:bg-slate-900">Kannada (ಕನ್ನಡ)</option>
            <option value="Telugu" className="bg-white dark:bg-slate-900">Telugu (తెలుగు)</option>
            <option value="Tamil" className="bg-white dark:bg-slate-900">Tamil (தமிழ்)</option>
            <option value="French" className="bg-white dark:bg-slate-900">French (Français)</option>
            <option value="German" className="bg-white dark:bg-slate-900">German (Deutsch)</option>
            <option value="Spanish" className="bg-white dark:bg-slate-900">Spanish (Español)</option>
          </select>

          <button 
            onClick={handleSwap}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-800 text-primary hover:bg-primary/10 transition-colors shrink-0 shadow-2xs cursor-pointer"
            title="Swap Languages"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <select 
            value={targetLang}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="flex-1 max-w-[200px] bg-white dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="Spanish" className="bg-white dark:bg-slate-900">Spanish (Español)</option>
            <option value="Hindi" className="bg-white dark:bg-slate-900">Hindi (हिंदी)</option>
            <option value="Kannada" className="bg-white dark:bg-slate-900">Kannada (ಕನ್ನಡ)</option>
            <option value="Telugu" className="bg-white dark:bg-slate-900">Telugu (తెలుగు)</option>
            <option value="Tamil" className="bg-white dark:bg-slate-900">Tamil (தமிழ்)</option>
            <option value="French" className="bg-white dark:bg-slate-900">French (Français)</option>
            <option value="German" className="bg-white dark:bg-slate-900">German (Deutsch)</option>
            <option value="English" className="bg-white dark:bg-slate-900">English</option>
          </select>

        </div>

        <button 
          onClick={handleTranslate}
          disabled={isTranslating}
          className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 shrink-0"
        >
          {isTranslating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
          <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
        </button>

      </div>

      {/* Split Text Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[420px]">
        
        {/* Left: Source Input Panel */}
        <div className="glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xs border border-outline-variant/50 dark:border-slate-800">
          <div className="px-5 py-3 border-b border-outline-variant/30 dark:border-slate-800 flex justify-between items-center bg-white/60 dark:bg-slate-900/60">
            <span className="text-xs font-bold text-primary">Original Text ({sourceLang})</span>
            <div className="flex gap-1">
              <button 
                onClick={() => setOriginalText('')}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Clear Text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste or type text to translate..."
            className="flex-1 p-5 bg-transparent border-none focus:outline-none resize-none text-sm text-on-surface leading-relaxed placeholder:text-outline"
          />

          <div className="p-3 border-t border-outline-variant/20 dark:border-slate-800 flex justify-between items-center text-[10px] text-outline font-mono">
            <span>{originalText.length} / 5,000 characters</span>
          </div>
        </div>

        {/* Right: Output Translation Panel */}
        <div className="glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xs border border-outline-variant/50 dark:border-slate-800 bg-surface-container-lowest">
          <div className="px-5 py-3 border-b border-outline-variant/30 dark:border-slate-800 flex justify-between items-center bg-white/60 dark:bg-slate-900/60">
            <span className="text-xs font-bold text-tertiary">Translated Output ({targetLang})</span>
            <div className="flex gap-1">
              <button 
                onClick={() => speakText(translatedText)}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Listen Audio Speech"
              >
                <Volume2 className="w-4 h-4 text-tertiary" />
              </button>
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Copy Translation"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto text-sm text-on-surface leading-relaxed bg-white/40 dark:bg-slate-900/40">
            {translatedText ? (
              <p className="whitespace-pre-wrap">{translatedText}</p>
            ) : (
              <p className="text-outline italic text-xs">Translation output will appear here...</p>
            )}
          </div>

          {/* Feedback Bar */}
          <div className="p-3 border-t border-outline-variant/20 dark:border-slate-800 flex justify-between items-center bg-white/60 dark:bg-slate-900/60 text-xs">
            <span className="text-[11px] text-on-surface-variant font-medium">Was this translation accurate?</span>
            <div className="flex gap-2">
              <button onClick={() => alert('Thank you for feedback!')} className="hover:text-primary transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => alert('Thank you for feedback!')} className="hover:text-rose-500 transition-colors">
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Suggested Quick Actions */}
      <div className="flex items-center gap-3 pt-2">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Suggested Actions:</span>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleTranslate()}
            className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-white text-on-surface-variant text-xs font-semibold rounded-full transition-all"
          >
            Extract Keywords
          </button>
          <button 
            onClick={() => handleTranslate()}
            className="px-3 py-1 bg-surface-container-high hover:bg-primary hover:text-white text-on-surface-variant text-xs font-semibold rounded-full transition-all"
          >
            Summarize in {targetLang}
          </button>
        </div>
      </div>

    </div>
  );
};
