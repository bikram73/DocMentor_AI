import React from 'react';
import { Search, Bell, Sparkles, Upload } from 'lucide-react';

interface NavbarProps {
  onNewScan: () => void;
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNewScan, 
  activeTab, 
  searchQuery, 
  setSearchQuery 
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
    <header className="h-[72px] sticky top-0 z-40 flex items-center justify-between px-6 sm:px-8 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/40 shadow-2xs">
      
      {/* Title & Context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-on-surface truncate max-w-xs sm:max-w-md">
            {getTabTitle()}
          </h2>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="w-4 h-4 absolute left-3.5 text-outline pointer-events-none" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in document or metrics..."
          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline"
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

        <button className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>
      </div>

    </header>
  );
};
