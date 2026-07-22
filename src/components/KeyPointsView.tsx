import React, { useState } from 'react';
import { 
  Lightbulb, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Brain, 
  Check, 
  ChevronRight, 
  Sparkles,
  Award
} from 'lucide-react';

export const KeyPointsView: React.FC = () => {
  const [actionItems, setActionItems] = useState([
    { id: 1, text: 'Review fasting glucose trends and set a 3-month target HbA1c < 6.5%.', done: false },
    { id: 2, text: 'Consult physician regarding first-line Metformin and low-dose Statin initiation.', done: false },
    { id: 3, text: 'Maintain tight systemic blood pressure monitoring (< 120/80 mmHg).', done: true },
    { id: 4, text: 'Schedule nutrition session for Mediterranean low-glycemic meal planning.', done: false }
  ]);

  const toggleAction = (id: number) => {
    setActionItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>Key Insights Breakdown</span>
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Structured analysis extracted from medical records, lab findings, and radiologic reports.
          </p>
        </div>
      </div>

      {/* Summary Stats Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Concepts</span>
          <div className="flex items-end justify-between mt-3">
            <span className="text-3xl font-black text-primary">12</span>
            <Lightbulb className="w-6 h-6 text-primary/40" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Milestones</span>
          <div className="flex items-end justify-between mt-3">
            <span className="text-3xl font-black text-tertiary">05</span>
            <Calendar className="w-6 h-6 text-tertiary/40" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Definitions</span>
          <div className="flex items-end justify-between mt-3">
            <span className="text-3xl font-black text-secondary">08</span>
            <BookOpen className="w-6 h-6 text-secondary/40" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between shadow-2xs">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Action Items</span>
          <div className="flex items-end justify-between mt-3">
            <span className="text-3xl font-black text-on-surface">04</span>
            <CheckSquare className="w-6 h-6 text-on-surface/40" />
          </div>
        </div>

      </div>

      {/* Timeline Flow Sections */}
      <div className="space-y-8 pl-4 border-l-2 border-outline-variant/40 relative ml-2">
        
        {/* Important Concepts Section */}
        <div className="relative pl-6">
          <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white ring-4 ring-surface shadow-xs">
            <Brain className="w-4 h-4 text-white" />
          </div>

          <h3 className="text-lg font-bold text-on-surface mb-4">Important Diagnostic Concepts</h3>

          <div className="space-y-4">
            
            <div className="glass-card p-5 rounded-2xl shadow-2xs border-l-4 border-l-primary hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-base font-bold text-primary">Glycated Hemoglobin & Glycemic Load</h4>
                <span className="bg-primary/10 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  High Priority
                </span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                HbA1c measures 3-month mean plasma glucose. At 6.8%, it reflects average serum glucose around 149 mg/dL, indicating early type 2 diabetes responsive to therapy.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl shadow-2xs border-l-4 border-l-primary hover:shadow-md transition-all">
              <h4 className="text-base font-bold text-primary mb-2">Microvascular White Matter Lesions</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Fazekas Grade 1 punctate FLAIR hyperintensities on brain MRI represent benign chronic microvascular changes common with age and mild hypertension.
              </p>
            </div>

          </div>
        </div>

        {/* Important Dates & Schedule */}
        <div className="relative pl-6">
          <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-white ring-4 ring-surface shadow-xs">
            <Calendar className="w-4 h-4 text-white" />
          </div>

          <h3 className="text-lg font-bold text-on-surface mb-4">Important Clinical Dates</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="glass-card p-5 rounded-2xl shadow-2xs border-l-4 border-l-tertiary">
              <div className="flex items-center gap-3">
                <div className="bg-tertiary/10 p-2.5 rounded-xl text-center">
                  <span className="text-xs font-black text-tertiary block font-mono">FEB 28</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">PCP Follow-Up Consultation</h4>
                  <p className="text-xs text-on-surface-variant">Lab review & therapy baseline check.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl shadow-2xs border-l-4 border-l-tertiary">
              <div className="flex items-center gap-3">
                <div className="bg-tertiary/10 p-2.5 rounded-xl text-center">
                  <span className="text-xs font-black text-tertiary block font-mono">MAY 15</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Repeat HbA1c & Lipid Panel</h4>
                  <p className="text-xs text-on-surface-variant">3-month efficacy monitoring.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Items Checklist */}
        <div className="relative pl-6">
          <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-on-surface flex items-center justify-center text-white ring-4 ring-surface shadow-xs">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>

          <h3 className="text-lg font-bold text-on-surface mb-4">Patient Action Plan</h3>

          <div className="space-y-3">
            {actionItems.map(item => (
              <div 
                key={item.id}
                onClick={() => toggleAction(item.id)}
                className="glass-card p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors border-l-4 border-l-slate-800"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  item.done ? 'bg-primary text-white' : 'border-2 border-outline-variant'
                }`}>
                  {item.done && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className={`text-sm flex-1 font-medium ${item.done ? 'line-through text-outline' : 'text-on-surface'}`}>
                  {item.text}
                </span>
                <ChevronRight className="w-4 h-4 text-outline" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
