import React, { useState } from 'react';
import { 
  Zap, 
  Palette, 
  User, 
  Languages, 
  HelpCircle, 
  Shield, 
  FileText, 
  Check, 
  ChevronRight, 
  Edit3, 
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ darkMode, setDarkMode }) => {
  const [glassEffects, setGlassEffects] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Gemini 3.6 Flash (Fast)');
  const [appLang, setAppLang] = useState('English (United States)');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          System Settings & Preferences
        </h2>
        <p className="text-xs text-on-surface-variant mt-1">
          Manage your AI model configurations, visual themes, and account security.
        </p>
      </div>

      {/* Gemini API Status Card */}
      <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
              <Zap className="w-5 h-5 text-tertiary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Gemini API Status</h3>
              <p className="text-xs text-on-surface-variant">Configuration for real-time document intelligence.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-tertiary/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Connected & Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant">Server API Integration Key</label>
            <div className="relative">
              <input 
                type="password" 
                value="••••••••••••••••••••••••••••" 
                readOnly
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface font-mono"
              />
              <button 
                onClick={() => alert('Gemini API key is securely managed server-side.')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant">Selected Generative Model</label>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface font-bold focus:outline-none"
            >
              <option value="Gemini 3.6 Flash (Fast)">Gemini 3.6 Flash (Fast - Default)</option>
              <option value="Gemini 1.5 Pro (Standard)">Gemini 1.5 Pro (Clinical Deep Context)</option>
            </select>
          </div>

        </div>
      </section>

      {/* Appearance Section */}
      <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/40">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
            <Palette className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">Appearance & Theme</h3>
            <p className="text-xs text-on-surface-variant">Personalize visual aesthetics and blur effects.</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-amber-500" /> : <Sun className="w-5 h-5 text-on-surface-variant" />}
              <div>
                <p className="text-xs font-bold text-on-surface">Dark Mode Canvas</p>
                <p className="text-[11px] text-on-surface-variant">Toggle dark high-contrast mode.</p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(prev => !prev)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                darkMode ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-bold text-on-surface">Glassmorphism Effects</p>
                <p className="text-[11px] text-on-surface-variant">Subtle backdrop blur styling on cards.</p>
              </div>
            </div>

            <button
              onClick={() => setGlassEffects(prev => !prev)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                glassEffects ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                glassEffects ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

        </div>
      </section>

      {/* Language Grid */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Language Preferences */}
        <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/40">
            <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Languages className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="text-base font-bold text-on-surface">Language & Region Preferences</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface-variant">Interface Language</label>
              <select 
                value={appLang}
                onChange={(e) => setAppLang(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs font-bold text-on-surface focus:outline-none"
              >
                <option value="English (United States)">English (United States)</option>
                <option value="Spanish (Español)">Spanish (Español)</option>
                <option value="French (Français)">French (Français)</option>
              </select>
            </div>
          </div>
        </section>

      </div>

      {/* Help & About */}
      <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/40">
          <div className="w-9 h-9 rounded-xl bg-on-surface-variant/10 flex items-center justify-center text-on-surface-variant">
            <HelpCircle className="w-5 h-5 text-on-surface-variant" />
          </div>
          <h3 className="text-base font-bold text-on-surface">Help & Clinical Guidelines</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
            <Shield className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-xs font-bold text-on-surface">HIPAA & Privacy</h4>
            <p className="text-[11px] text-on-surface-variant">Local sandboxed processing.</p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
            <FileText className="w-5 h-5 text-primary mb-1" />
            <h4 className="text-xs font-bold text-on-surface">Terms of Service</h4>
            <p className="text-[11px] text-on-surface-variant">Clinical Decision Support agreement.</p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
            <Sparkles className="w-5 h-5 text-tertiary mb-1" />
            <h4 className="text-xs font-bold text-on-surface">System Version</h4>
            <p className="text-[11px] text-on-surface-variant">DocMentor AI v2.4.1 (Stable Build)</p>
          </div>
        </div>
      </section>

    </div>
  );
};
