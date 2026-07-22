import React from 'react';
import { Search, Bell, Sparkles, Upload, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNewScan: () => void;
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  onNavigateTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNewScan, 
  activeTab, 
  searchQuery, 
  setSearchQuery,
  darkMode = false,
  setDarkMode,
  onNavigateTab
}) => {
  const getTabTitle = () => {
    switch(activeTab) {
      case 'chat': return 'Chat Session: Annual_Report_2025.pdf';
      case 'summary': return 'Analysis Summary';
      case 'key-points': return 'Key Insights Breakdown';
      case 'quiz': return 'Interactive Quiz Generator';
      case 'explain-terms': return 'Explain Terms & Medical Jargon';
      case 'translate': return 'Multi-Language Translation';
      case 'upload-workspace': return 'Upload Workspace & Files';
      case 'settings': return 'System Settings & Preferences';
      default: return 'DocMentor AI Analysis';
    }
  };

  return (
    <header className="h-[72px] sticky top-0 z-40 flex items-center justify-between px-6 sm:px-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      
      {/* Title & Context Logo */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => onNavigateTab ? onNavigateTab('landing') : undefined}
          className="flex items-center gap-3 cursor-pointer group"
          title="Go to DocMentor AI Home"
        >
          {/* Branded Medical AI Emblem Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-white/20">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M30 25C30 22.2386 32.2386 20 35 20H55L70 35V75C70 77.7614 67.7614 80 65 80H35C32.2386 80 30 77.7614 30 75V25Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="5" strokeLinejoin="round" />
              <path d="M55 20V35H70" stroke="white" strokeWidth="5" strokeLinejoin="round" fill="none" />
              <path d="M50 43V63M40 53H60" stroke="white" strokeWidth="7" strokeLinecap="round" />
              <circle cx="70" cy="28" r="4.5" fill="#FDE047" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black text-primary tracking-wider uppercase leading-none">DocMentor AI</span>
              <span className="text-[9px] px-1.5 py-0.2 font-bold rounded-full bg-primary/10 text-primary border border-primary/20">Pro</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md leading-snug">
              {getTabTitle()}
            </h2>
          </div>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in document or metrics..."
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button 
          onClick={onNewScan}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all border border-primary/20"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>

        {/* Dark / Light Mode Toggle Button */}
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
      </div>

    </header>
  );
};

