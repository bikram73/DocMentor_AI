import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DoctorPersona, MedicalDocument } from '../types';
import { DOCTOR_PERSONAS } from '../data/mockMedicalData';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Paperclip, 
  RotateCw, 
  FileText, 
  CheckCircle2, 
  ShieldAlert,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface AIConsultantChatProps {
  activeDoc: MedicalDocument | null;
  onSendMessage: (text: string, doctorPersonaId: string, docContext?: string) => Promise<string>;
}

export const AIConsultantChat: React.FC<AIConsultantChatProps> = ({
  activeDoc,
  onSendMessage
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorPersona>(DOCTOR_PERSONAS[0]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [attachDoc, setAttachDoc] = useState<boolean>(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'mentor',
      text: `Hello! I am ${selectedDoctor.name}. How can I assist with your health queries, document interpretations, or medical guidelines today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      doctorPersonaId: selectedDoctor.id,
      suggestedFollowUps: selectedDoctor.suggestedPrompts
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectDoctor = (doc: DoctorPersona) => {
    setSelectedDoctor(doc);
    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'mentor',
        text: `Switched consult to ${doc.name} (${doc.title}). ${doc.bio}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        doctorPersonaId: doc.id,
        suggestedFollowUps: doc.suggestedPrompts
      }
    ]);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const docContextStr = attachDoc && activeDoc ? activeDoc.fullText : undefined;
      const reply = await onSendMessage(textToSend, selectedDoctor.id, docContextStr);

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'mentor',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        doctorPersonaId: selectedDoctor.id,
        suggestedFollowUps: [
          'Can you clarify what lifestyle changes help most?',
          'What questions should I ask at my next clinic visit?',
          'What are the side effects to watch out for?'
        ]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Doctor Selector Sidebar */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary dark:text-indigo-400" />
            <span>Select AI Medical Specialist</span>
          </h3>

          <div className="space-y-2">
            {DOCTOR_PERSONAS.map((doc) => {
              const isSelected = selectedDoctor.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-slate-800 border-primary ring-2 ring-primary/20 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <img
                    src={doc.avatarUrl}
                    alt={doc.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{doc.name}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary dark:text-indigo-300 font-medium">
                        {doc.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-primary dark:text-indigo-400 font-medium truncate">{doc.specialty}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{doc.bio}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attached Document Snapshot Pill */}
        {activeDoc && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-primary dark:text-teal-400" />
                <span>Attached Active Document</span>
              </span>
              <label className="flex items-center space-x-1 cursor-pointer text-[10px] text-primary dark:text-teal-400 font-semibold">
                <input
                  type="checkbox"
                  checked={attachDoc}
                  onChange={(e) => setAttachDoc(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-0"
                />
                <span>Include Context</span>
              </label>
            </div>
            <p className="font-bold text-slate-900 dark:text-white truncate">{activeDoc.title}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{activeDoc.summary}</p>
          </div>
        )}
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-[650px] shadow-xs overflow-hidden">
        
        {/* Chat Top Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/90 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={selectedDoctor.avatarUrl}
              alt={selectedDoctor.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-primary/30"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{selectedDoctor.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-medium">
                  Active Specialist
                </span>
              </div>
              <p className="text-xs text-primary dark:text-indigo-300 font-medium">{selectedDoctor.title}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">AI Engine</span>
            <span className="text-xs font-mono font-bold text-primary dark:text-teal-300">Gemini 3.6 Flash</span>
          </div>
        </div>

        {/* Message Transcript Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className={`flex items-start space-x-2.5 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary dark:text-indigo-400'
                  }`}>
                    {isUser ? <User className="w-4 h-4 font-bold" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                    isUser
                      ? 'bg-primary text-white rounded-tr-none shadow-xs font-medium'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-xs'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {!isUser && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => handleSpeakText(msg.text)}
                          className="flex items-center space-x-1 text-primary dark:text-indigo-400 hover:opacity-80 font-semibold cursor-pointer"
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow up Prompts */}
                {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="ml-10 flex flex-wrap gap-1.5 pt-1 max-w-[85%]">
                    {msg.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="text-[10px] bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-800 text-primary dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700/80 transition-colors text-left cursor-pointer"
                      >
                        ⚡ {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask ${selectedDoctor.name} a medical question...`}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />

            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="bg-primary hover:bg-primary-container text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSending ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
            DocMentor AI is an AI consultation tool. Educational insights only — consult your licensed physician for emergency triage.
          </p>
        </div>

      </div>

    </div>
  );
};
