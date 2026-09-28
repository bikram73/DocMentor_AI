import React from 'react';
import { 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Languages, 
  Upload, 
  Settings, 
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
    { id: 'summary', label: 'Summary & Insights', icon: FileText },
    { id: 'chat', label: 'Clinical AI Chat', icon: MessageSquare },
    { id: 'explain-terms', label: 'Medical Terms Glossary', icon: BookOpen },
    { id: 'translate', label: 'Language Translator', icon: Languages },
    { id: 'upload-workspace', label: 'My Documents', icon: Upload, badge: `${documentCount}` },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="h-screen w-[280px] fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col p-4 gap-2 z-50 overflow-y-auto">
      
      {/* Primary CTA Upload Button */}
      <button 
        onClick={onOpenUploadModal}
        className="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary/20 mb-3 cursor-pointer"
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
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 my-2 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20 shrink-0">
            EV
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Eleanor Vance</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">52 Yrs • Lab & MRI Active</p>
          </div>
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        </div>
      </div>

    </aside>
  );
};
