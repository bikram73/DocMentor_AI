import React, { useState, useRef, useEffect } from 'react';
import { MedicalDocument, DoctorPersona, ChatMessage } from '../types';
import { DOCTOR_PERSONAS } from '../data/mockMedicalData';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Bot, 
  User, 
  Sparkles, 
  ThumbsUp, 
  Copy, 
  RotateCw, 
  Search,
  Check,
  FileText
} from 'lucide-react';

interface ChatViewProps {
  document: MedicalDocument | null;
  onSendMessage: (text: string, personaId: string, docContext?: string) => Promise<string>;
}

export const ChatView: React.FC<ChatViewProps> = ({ document, onSendMessage }) => {
  const [selectedPersona, setSelectedPersona] = useState<DoctorPersona>(DOCTOR_PERSONAS[0]);
  const [inputMsg, setInputMsg] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'mentor',
      text: `Hello! I'm ${DOCTOR_PERSONAS[0].name}, your clinical AI guide. I've reviewed your active record: "${document?.title || 'Comprehensive Metabolic Panel'}". How can I help you understand these findings today?`,
      timestamp: '10:24 AM',
      doctorPersonaId: DOCTOR_PERSONAS[0].id,
      suggestedFollowUps: [
        'Explain my lab report results in simple terms',
        'What do my glucose and cholesterol numbers mean?',
        'What questions should I ask my doctor?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsThinking(true);

    try {
      const replyText = await onSendMessage(text, selectedPersona.id, document?.fullText);
      const mentorMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        doctorPersonaId: selectedPersona.id,
        suggestedFollowUps: [
          'What dietary changes help lower LDL cholesterol?',
          'Is Metformin safe for long-term blood sugar control?',
          'When should I re-test my HbA1c?'
        ]
      };
      setMessages(prev => [...prev, mentorMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto bg-surface border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      
      {/* Top Bar: Persona Selector & Active Context */}
      <div className="p-4 bg-white border-b border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
        
        {/* Active Document Indicator */}
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-sm font-bold text-on-surface truncate max-w-xs sm:max-w-md">
              {document?.title || 'Active Document Session'}
            </h3>
            <p className="text-[10px] text-on-surface-variant">Patient: Eleanor Vance • 52 Yrs</p>
          </div>
        </div>

        {/* Doctor Persona Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {DOCTOR_PERSONAS.map(persona => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedPersona.id === persona.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{persona.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Date Separator */}
        <div className="flex justify-center items-center gap-3">
          <div className="h-px flex-1 bg-outline-variant/30"></div>
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Today</span>
          <div className="h-px flex-1 bg-outline-variant/30"></div>
        </div>

        {messages.map((msg, idx) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'mentor' && (
              <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}

            <div className={`max-w-[80%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              <div className={`p-5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none shadow-xs font-medium'
                  : 'ai-bubble-gradient border border-outline-variant/60 text-on-surface rounded-tl-none shadow-xs'
              }`}>
                {msg.sender === 'mentor' && (
                  <p className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">
                    {selectedPersona.title}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {msg.sender === 'mentor' && (
                  <div className="flex items-center gap-2 pt-3 mt-3 border-t border-outline-variant/30 text-[11px] text-on-surface-variant">
                    <span className="px-2 py-0.5 bg-surface-container-high rounded-md font-mono">
                      Ref: Clinical Evidence Guidelines
                    </span>
                  </div>
                )}
              </div>

              {/* Timestamp & Quick Actions */}
              <div className={`flex items-center gap-3 text-[10px] text-outline px-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'mentor' && (
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="hover:text-primary transition-colors"
                      title="Copy Message"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={() => handleSend(msg.text)}
                      className="hover:text-primary transition-colors"
                      title="Regenerate Answer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>

            {msg.sender === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isThinking && (
          <div className="flex justify-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="ai-bubble-gradient border border-outline-variant/60 px-5 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Quick Chips */}
      <div className="px-6 py-2 bg-surface-container-low border-t border-outline-variant/30 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="text-[11px] font-bold text-outline uppercase tracking-wider shrink-0">Suggested:</span>
        {selectedPersona.suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 bg-white dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-800 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-primary/10 hover:text-primary hover:border-primary transition-all shrink-0 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-outline-variant/40 dark:border-slate-800">
        <div className="relative bg-surface-container-low border border-outline-variant/60 rounded-2xl p-2.5 flex items-end gap-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <button 
            onClick={() => alert('Attachment supported: Upload PDF or Scanned Document image.')}
            className="p-2 rounded-xl text-outline hover:bg-surface-container transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Ask ${selectedPersona.name} anything about this report...`}
            rows={1}
            className="flex-1 bg-transparent border-none focus:outline-none text-xs sm:text-sm text-on-surface placeholder:text-outline resize-none min-h-[40px] max-h-[120px] py-2"
          />

          <button 
            onClick={() => handleSend()}
            disabled={!inputMsg.trim() || isThinking}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40 shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-center mt-2 px-2 text-[10px] text-outline font-medium">
          <span>Powered by Gemini 3.6 Flash & Clinical Evidence Engine</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>System Online</span>
          </span>
        </div>
      </div>

    </div>
  );
};
