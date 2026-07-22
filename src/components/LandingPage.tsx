import React from 'react';
import { 
  Sparkles, 
  Upload, 
  CheckCircle, 
  FileText, 
  MessageSquare, 
  Brain, 
  Lightbulb, 
  Globe, 
  BookOpen, 
  Layers, 
  Lock, 
  Shield, 
  ArrowRight,
  MoreVertical,
  HelpCircle,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigateTab: (tab: string) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onGetStarted, 
  onNavigateTab,
  darkMode = false,
  setDarkMode
}) => {
  return (
    <div className="bg-surface text-on-surface font-sans selection:bg-primary/20 min-h-screen flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-2xs flex justify-between items-center w-full px-6 sm:px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div 
            onClick={() => onNavigateTab('landing')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-primary tracking-tight">DocMentor AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-on-surface-variant">
            <button onClick={() => onNavigateTab('landing')} className="text-primary border-b-2 border-primary pb-0.5">Home</button>
            <button onClick={() => onNavigateTab('summary')} className="hover:text-primary transition-colors">Features</button>
            <button onClick={() => onNavigateTab('upload-workspace')} className="hover:text-primary transition-colors">How It Works</button>
            <button onClick={() => onNavigateTab('settings')} className="hover:text-primary transition-colors">About</button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all flex items-center justify-center border border-outline-variant/30"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              )}
            </button>
          )}

          <button 
            onClick={onGetStarted}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 relative overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full w-fit text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="uppercase tracking-wider text-[11px]">POWERED BY GEMINI AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-on-surface tracking-tight leading-[1.15]">
                Understand Any <span className="text-primary">PDF</span> with AI
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-xl font-normal">
                Upload your document and instantly summarize it, ask questions, generate quizzes, explain concepts, and translate text using the world's most capable AI.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={onGetStarted}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3 shadow-md shadow-primary/25"
                >
                  <span>Upload PDF</span>
                  <Upload className="w-5 h-5" />
                </button>

                <button 
                  onClick={() => onNavigateTab('summary')}
                  className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-primary/5 transition-all shadow-2xs"
                >
                  View Demo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-on-surface-variant font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="uppercase tracking-wider font-bold text-[10px]">No credit card required</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="uppercase tracking-wider font-bold text-[10px]">Private & Secure</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Interactive Preview Card */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md flex items-center justify-center">
                
                {/* Main Glass Simulation Card */}
                <div className="relative z-10 glass-card p-6 sm:p-8 rounded-[2rem] shadow-xl w-full border border-outline-variant/60 bg-white/90 backdrop-blur-md animate-pulse">
                  <div className="flex items-center gap-3 border-b border-outline-variant/40 pb-4 mb-4">
                    <div className="w-10 h-12 bg-rose-500 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-xs">
                      PDF
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-32 bg-surface-container-high rounded-full"></div>
                      <div className="h-2 w-20 bg-surface-container mt-1.5 rounded-full"></div>
                    </div>
                    <MoreVertical className="w-5 h-5 text-outline" />
                  </div>

                  <div className="space-y-3">
                    <div className="h-3.5 w-full bg-surface-container rounded-full"></div>
                    <div className="h-3.5 w-5/6 bg-surface-container rounded-full"></div>
                    <div className="h-3.5 w-full bg-surface-container rounded-full"></div>
                    <div className="h-3.5 w-3/4 bg-surface-container rounded-full"></div>
                  </div>
                </div>

                {/* Floating AI Chips */}
                <div 
                  onClick={() => onNavigateTab('summary')}
                  className="absolute -top-4 -right-2 z-20 glass-card px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg border border-outline-variant/60 bg-white/95 cursor-pointer hover:scale-105 transition-transform"
                >
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-on-surface">Generate Summary</span>
                </div>

                <div 
                  onClick={() => onNavigateTab('chat')}
                  className="absolute -bottom-4 -left-2 z-20 bg-primary text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span className="text-xs font-bold">Ask anything...</span>
                </div>

                <div 
                  onClick={() => onNavigateTab('quiz')}
                  className="absolute top-1/2 -left-8 z-20 glass-card px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg border border-outline-variant/60 bg-white/95 cursor-pointer hover:scale-105 transition-transform"
                >
                  <Brain className="w-4 h-4 text-tertiary" />
                  <span className="text-xs font-bold text-on-surface">Create Quiz</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Features Bento Grid Section */}
        <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-outline-variant/30">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Everything you need to master your documents
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto font-normal">
              Our Gemini-powered AI works as your personal document mentor, turning static files into interactive knowledge bases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Upload PDF */}
            <div 
              onClick={onGetStarted}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-primary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">Upload PDF</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Support for multi-page documents, scanned PDFs, and complex academic papers. Fast, secure processing.
              </p>
            </div>

            {/* Card 2: AI Summary */}
            <div 
              onClick={() => onNavigateTab('summary')}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-tertiary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-tertiary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">AI Summary</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Get instant executive summaries, key takeaways, and structured outlines of long documents in seconds.
              </p>
            </div>

            {/* Card 3: Chat with PDF */}
            <div 
              onClick={() => onNavigateTab('chat')}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-secondary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">Chat with PDF</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Ask specific questions and get answers with citations. Navigate complex documents through conversation.
              </p>
            </div>

            {/* Card 4: Quiz Generator */}
            <div 
              onClick={() => onNavigateTab('quiz')}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-primary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">Quiz Generator</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Automatically generate multiple-choice quizzes or flashcards to test your comprehension of the material.
              </p>
            </div>

            {/* Card 5: Explain Terms */}
            <div 
              onClick={() => onNavigateTab('explain-terms')}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-tertiary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-tertiary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">Explain Terms</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Don't let jargon slow you down. The AI explains difficult concepts and technical terms in plain language.
              </p>
            </div>

            {/* Card 6: Translate Text */}
            <div 
              onClick={() => onNavigateTab('translate')}
              className="glass-card p-8 rounded-2xl hover:shadow-md transition-all cursor-pointer group border-b-4 border-b-secondary/30 space-y-4 bg-white"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">Translate Text</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Instantly translate the entire document or specific sections into over 50 languages with high accuracy.
              </p>
            </div>

          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="py-16 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 dark:from-slate-900 dark:to-slate-800 border border-blue-500/20 dark:border-slate-700/80 text-white py-16 px-8 rounded-[2.5rem] relative overflow-hidden text-center flex flex-col items-center gap-6 shadow-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to boost your productivity?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal">
              Join thousands of students and professionals who are saving hours of reading every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={onGetStarted}
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md"
              >
                Get Started for Free
              </button>
              <button 
                onClick={() => alert('Contacting Sales Team...')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 w-full py-12 px-6 sm:px-12 flex flex-col items-center gap-8 transition-colors">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <span className="text-2xl font-black text-primary block">DocMentor AI</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
              The intelligent way to process documents. Powered by state-of-the-art Gemini AI technology.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><button onClick={() => onNavigateTab('summary')} className="hover:text-primary transition-colors">Pricing</button></li>
              <li><button onClick={() => onNavigateTab('summary')} className="hover:text-primary transition-colors">Integrations</button></li>
              <li><button onClick={() => onNavigateTab('settings')} className="hover:text-primary transition-colors">API Docs</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><button onClick={() => onNavigateTab('settings')} className="hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => alert('Privacy Policy')} className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => alert('Terms of Service')} className="hover:text-primary transition-colors">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 w-full max-w-6xl pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>© 2025 DocMentor AI. All rights reserved.</span>
          <div className="flex gap-6">
            <button onClick={() => alert('Privacy Policy')} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={() => alert('Terms of Service')} className="hover:text-primary transition-colors">Terms of Service</button>
            <button onClick={() => alert('Contact Support')} className="hover:text-primary transition-colors">Contact Support</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
