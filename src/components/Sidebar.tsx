import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  BookOpen, 
  Languages, 
  Upload, 
  Settings, 
  Moon, 
  Sun, 
  LogOut, 
  Sparkles,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  documentCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenUploadModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  documentCount,
  darkMode,
  setDarkMode,
  onOpenUploadModal
}) => {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'key-points', label: 'Key Points', icon: BarChart3 },
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle },
    { id: 'explain-terms', label: 'Explain Terms', icon: BookOpen },
    { id: 'translate', label: 'Translate', icon: Languages },
    { id: 'upload-workspace', label: 'Recent Workspace', icon: Upload, badge: `${documentCount}` },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="h-screen w-[280px] fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col p-4 gap-2 z-50 overflow-y-auto">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-primary leading-tight tracking-tight">DocMentor AI</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-75">Document & Medical Analysis</p>
        </div>
      </div>

      {/* Primary CTA Upload Button */}
      <button 
        onClick={onOpenUploadModal}
        className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary/20 mb-3"
      >
        <Upload className="w-5 h-5" />
        <span>Upload PDF</span>
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Patient Record Locker Quick Switcher */}
      <div className="bg-white/80 dark:bg-slate-800/90 border border-outline-variant/60 dark:border-slate-700/80 rounded-xl p-3 my-2 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
            EV
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-on-surface truncate">Eleanor Vance</p>
            <p className="text-[10px] text-on-surface-variant">52 Yrs • Lab & MRI Active</p>
          </div>
          <Activity className="w-4 h-4 text-tertiary" />
        </div>
      </div>

      {/* Footer System Actions */}
      <div className="mt-auto pt-3 border-t border-outline-variant flex flex-col gap-1">
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors text-left"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-on-surface-variant" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button 
          onClick={() => alert('DocMentor AI is active. Patient data is securely stored locally.')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-error hover:bg-error-container/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 text-error" />
          <span>Clear Session</span>
        </button>
      </div>

    </aside>
  );
};
