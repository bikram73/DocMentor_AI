import React from 'react';
import { Search, Bell, Sparkles, Upload, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNewScan: () => void;
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNewScan, 
  activeTab, 
  searchQuery, 
  setSearchQuery,
  darkMode = false,
  setDarkMode
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
      
      {/* Title & Context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary shrink-0" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
            {getTabTitle()}
          </h2>
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
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all flex items-center justify-center border border-slate-200 dark:border-slate-700"
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

