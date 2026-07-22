import React, { useState } from 'react';
import { 
  Trophy, 
  HelpCircle, 
  Flag, 
  Timer, 
  CheckCircle, 
  Zap, 
  ArrowRight, 
  Sparkles,
  RotateCw,
  Lightbulb
} from 'lucide-react';
import { QuizQuestion } from '../types';

export const QuizGeneratorView: React.FC = () => {
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questionType, setQuestionType] = useState<'all' | 'mcq' | 'tf' | 'short'>('all');

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 1,
      question: 'An HbA1c test result of 6.8% indicates which of the following clinical findings?',
      options: [
        { id: 'A', text: 'Normal, optimal fasting glucose average.' },
        { id: 'B', text: 'Elevated average blood sugar indicative of Type 2 Diabetes.' },
        { id: 'C', text: 'Hypoglycemic emergency requiring immediate dextrose.' },
        { id: 'D', text: 'Acute kidney injury requiring dialysis.' }
      ],
      correctAnswerId: 'B',
      explanation: 'An HbA1c level of 6.5% or higher meets the diagnostic standard for Type 2 Diabetes Mellitus.'
    },
    {
      id: 2,
      question: 'True or False: Fazekas Grade 1 white matter hyperintensities on a brain MRI indicate an acute life-threatening stroke.',
      options: [
        { id: 'A', text: 'True' },
        { id: 'B', text: 'False - It represents benign, age-related microvascular changes.' }
      ],
      correctAnswerId: 'B',
      explanation: 'Fazekas Grade 1 indicates punctate, mild microvascular changes commonly associated with normal aging and mild hypertension.'
    },
    {
      id: 3,
      question: 'What is the primary diagnostic significance of elevated fasting serum glucose above 126 mg/dL on two separate tests?',
      options: [
        { id: 'A', text: 'Fasting glucose >126 mg/dL meets criteria for Diabetes Mellitus.' },
        { id: 'B', text: 'It indicates severe vitamin D deficiency.' },
        { id: 'C', text: 'It confirms normal adrenal gland secretion.' },
        { id: 'D', text: 'It rules out any metabolic disorder.' }
      ],
      correctAnswerId: 'A',
      explanation: 'A fasting plasma glucose equal to or greater than 126 mg/dL confirms a diagnosis of Diabetes Mellitus.'
    },
    {
      id: 4,
      question: 'Which of the following lifestyle interventions is most recommended for early glycemic control?',
      options: [
        { id: 'A', text: 'Increased dietary simple sugars' },
        { id: 'B', text: 'Low-glycemic Mediterranean dietary planning and 150 mins/week exercise' },
        { id: 'C', text: 'Complete fluid restriction' },
        { id: 'D', text: 'Strict bed rest for 14 days' }
      ],
      correctAnswerId: 'B',
      explanation: 'Aerobic exercise and low-glycemic dietary planning significantly improve insulin sensitivity.'
    },
    {
      id: 5,
      question: 'True or False: Glycated hemoglobin (HbA1c) reflects average blood glucose levels over approximately 90 days.',
      options: [
        { id: 'A', text: 'True - Due to the 120-day lifespan of red blood cells.' },
        { id: 'B', text: 'False - It only reflects blood glucose over the last 24 hours.' }
      ],
      correctAnswerId: 'A',
      explanation: 'Because glucose binds non-enzymatically to hemoglobin, HbA1c measures glucose exposure across the 3-month lifespan of erythrocytes.'
    }
  ]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(750);

  const q = questions[currentQIndex];

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption === q.correctAnswerId) {
      setScore(prev => prev + 100);
    }
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCurrentQIndex(0); // loop
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Quiz Generator
          </h2>
          <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-md text-[10px] font-bold uppercase tracking-wider">
            AI Powered
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-on-surface-variant font-medium block">Current Progress</span>
            <span className="text-sm font-bold text-primary">Question {currentQIndex + 1} of {questions.length}</span>
          </div>
        </div>
      </div>

      {/* Quiz Controls & Configuration Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/40 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Question Count:</span>
          {[5, 10, 20].map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                questionCount === count
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border border-outline-variant/50 text-on-surface hover:bg-surface-container'
              }`}
            >
              {count} Questions
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Type:</span>
          {[
            { id: 'all', label: 'All Format' },
            { id: 'mcq', label: 'MCQs' },
            { id: 'tf', label: 'True / False' },
            { id: 'short', label: 'Short Answer' }
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setQuestionType(fmt.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                questionType === fmt.id
                  ? 'bg-secondary text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border border-outline-variant/50 text-on-surface hover:bg-surface-container'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Score Bar */}
      <div className="w-full bg-white dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-xl text-on-surface">{score} <span className="text-xs font-semibold text-on-surface-variant">pts</span></span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant">Topic: Medical Record Diagnostics & Biomarkers</span>
        </div>
        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Question Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
            
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">
                Multiple Choice
              </span>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <Flag className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-on-surface leading-snug">
              {q.question}
            </h3>

            {/* Choices List */}
            <div className="space-y-3">
              {q.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = showAnswer && opt.id === q.correctAnswerId;
                const isWrong = showAnswer && isSelected && opt.id !== q.correctAnswerId;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full p-4 text-left border rounded-xl transition-all flex items-center gap-4 ${
                      isCorrect 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-900 font-bold'
                        : isWrong
                        ? 'bg-rose-500/10 border-rose-500 text-rose-900'
                        : isSelected
                        ? 'border-primary bg-primary/5 shadow-2xs font-semibold'
                        : 'border-outline-variant hover:border-primary/50 hover:bg-surface-container-low'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'border-primary bg-primary text-white' : 'border-outline-variant text-on-surface-variant'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {showAnswer && (
              <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-1">
                <span className="text-xs font-bold text-primary uppercase">Rationale:</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">{q.explanation}</p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button 
                onClick={() => setShowAnswer(prev => !prev)}
                className="px-5 py-2.5 border border-primary text-primary font-bold rounded-xl text-xs hover:bg-primary/5 transition-all"
              >
                {showAnswer ? 'Hide Rationale' : 'Reveal Answer'}
              </button>

              <button 
                onClick={handleNext}
                disabled={!selectedOption}
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-40"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Sidebar Quiz Stats */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <h4 className="text-base font-bold text-on-surface">Quiz Stats</h4>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-2xs border border-outline-variant/30 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-tertiary-container/10 text-tertiary rounded-xl">
                <Timer className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <span className="text-xs text-on-surface-variant font-bold block">Time Elapsed</span>
                <span className="text-lg font-black text-on-surface">04:15</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-2xs border border-outline-variant/30 dark:border-slate-800 flex items-center gap-3">
              <div className="p-2.5 bg-primary-container/10 text-primary rounded-xl">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs text-on-surface-variant font-bold block">Accuracy</span>
                <span className="text-lg font-black text-on-surface">100%</span>
              </div>
            </div>

            <div className="p-4 bg-secondary-container rounded-xl space-y-1">
              <p className="text-[10px] text-on-secondary-container font-extrabold uppercase tracking-wider">
                MENTOR TIP
              </p>
              <p className="text-xs text-on-secondary-container italic leading-relaxed">
                "HbA1c tests don't require fasting on the day of the draw because they reflect 3 months of glucose memory!"
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Generate New Quiz CTA */}
      <div className="pt-6 border-t border-outline-variant/30 flex flex-col items-center text-center space-y-3">
        <p className="text-xs text-on-surface-variant font-medium">Want to generate a new quiz on a different section of your medical history?</p>
        <button 
          onClick={() => alert('Generating new adaptive quiz using Gemini 3.6 Flash...')}
          className="px-6 py-3 bg-on-surface text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-[1.02] transition-all shadow-md text-xs"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Generate New Medical Quiz</span>
        </button>
      </div>

    </div>
  );
};
