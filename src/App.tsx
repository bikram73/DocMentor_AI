import React, { useState, useEffect } from 'react';
import { MedicalDocument } from './types';
import { SAMPLE_DOCUMENTS } from './data/mockMedicalData';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { SummaryView } from './components/SummaryView';
import { ChatView } from './components/ChatView';
import { KeyPointsView } from './components/KeyPointsView';
import { QuizGeneratorView } from './components/QuizGeneratorView';
import { ExplainTermsView } from './components/ExplainTermsView';
import { TranslateView } from './components/TranslateView';
import { UploadWorkspace } from './components/UploadWorkspace';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [documents, setDocuments] = useState<MedicalDocument[]>(SAMPLE_DOCUMENTS);
  const [activeDoc, setActiveDoc] = useState<MedicalDocument | null>(SAMPLE_DOCUMENTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Document Upload & Analysis
  const handleUploadAndAnalyze = async (text: string, type: string, imageBase64?: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textContent: text, documentType: type, imageBase64 })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        const newDoc: MedicalDocument = {
          id: `doc-${Date.now()}`,
          title: data.analysis.title || 'Analyzed Clinical Document',
          type: (data.analysis.type as any) || 'lab_report',
          uploadDate: new Date().toISOString().split('T')[0],
          patientName: 'Eleanor Vance',
          patientAge: 52,
          patientGender: 'Female',
          status: 'analyzed',
          summary: data.analysis.summary,
          laymanExplanation: data.analysis.laymanExplanation,
          keyFindings: data.analysis.keyFindings || [],
          abnormalValues: data.analysis.abnormalValues || [],
          recommendations: data.analysis.recommendations || [],
          questionsForDoctor: data.analysis.questionsForDoctor || [],
          fullText: text || 'Scanned Document Image Content'
        };

        setDocuments(prev => [newDoc, ...prev]);
        setActiveDoc(newDoc);
        setActiveTab('summary');
      }
    } catch (err) {
      console.error('Failed to analyze document:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Mentor AI Chat
  const handleSendMessage = async (
    text: string,
    doctorPersonaId: string,
    docContext?: string
  ): Promise<string> => {
    try {
      const response = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ sender: 'user', text }],
          doctorPersonaId,
          documentContext: docContext
        })
      });
      const data = await response.json();
      if (data.success && data.response) {
        return data.response.replyText;
      }
    } catch (err) {
      console.error('Chat error:', err);
    }
    return 'I am processing your inquiry using clinical guidelines and PubMed references. Please ensure your physician reviews all changes.';
  };

  // Landing Page standalone full screen view
  if (activeTab === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setActiveTab('upload-workspace')}
        onNavigateTab={(tab) => setActiveTab(tab)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  // Upload Workspace full width standalone view
  if (activeTab === 'upload-workspace') {
    return (
      <UploadWorkspace
        documents={documents}
        onSelectDoc={(doc) => {
          setActiveDoc(doc);
          setActiveTab('summary');
        }}
        onUploadAndAnalyze={handleUploadAndAnalyze}
        isAnalyzing={isAnalyzing}
        onNavigateTab={(tab) => setActiveTab(tab)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased flex">
      
      {/* Fixed Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentCount={documents.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenUploadModal={() => setActiveTab('upload-workspace')}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 ml-0 md:ml-[280px] min-h-screen flex flex-col min-w-0">
        
        {/* Top Header Navbar */}
        <Navbar
          onNewScan={() => setActiveTab('upload-workspace')}
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Tab Content Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {activeTab === 'summary' && (
            <SummaryView
              document={activeDoc}
              documents={documents}
              onSelectDoc={setActiveDoc}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView
              document={activeDoc}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === 'key-points' && (
            <KeyPointsView />
          )}

          {activeTab === 'quiz' && (
            <QuizGeneratorView />
          )}

          {activeTab === 'explain-terms' && (
            <ExplainTermsView />
          )}

          {activeTab === 'translate' && (
            <TranslateView />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}

        </main>

        {/* Global Footer */}
        <footer className="mt-auto w-full py-6 bg-surface-container-low border-t border-outline-variant/40 flex flex-col items-center gap-2 text-xs text-on-surface-variant">
          <div className="flex gap-6">
            <button onClick={() => alert('Privacy Policy: All document processing is local & secure.')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => alert('Terms of Service: DocMentor AI clinical decision support.')} className="hover:underline">Terms of Service</button>
            <button onClick={() => alert('Contact Support: support@docmentor.ai')} className="hover:underline">Contact Support</button>
          </div>
          <p className="opacity-60">© 2025 DocMentor AI. Powered by Google Gemini 3.6 Flash.</p>
        </footer>

      </div>

    </div>
  );
}
