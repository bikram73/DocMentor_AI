import React, { useState } from 'react';
import { VitalMetric, MedicalDocument } from '../types';
import { VITAL_HISTORIES } from '../data/mockMedicalData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Activity, 
  Heart, 
  Droplet, 
  TrendingUp, 
  FileText, 
  Download, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';

interface PatientPortalProps {
  documents: MedicalDocument[];
  onSelectDoc: (doc: MedicalDocument) => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ documents, onSelectDoc }) => {
  const [selectedMetric, setSelectedMetric] = useState<'glucose' | 'bp' | 'ldl' | 'hr'>('glucose');

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Export */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Patient Record Locker & Vital Metric Analytics</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Historical laboratory trajectory, vital sign trends, and complete health document archives.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Medical Summary Report</span>
        </button>
      </div>

      {/* Vital Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div
          onClick={() => setSelectedMetric('glucose')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'glucose'
              ? 'bg-slate-800 border-teal-500 ring-2 ring-teal-500/20 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Fasting Glucose</span>
            <Droplet className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">126</span>
            <span className="text-xs text-slate-400 font-mono">mg/dL</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">
            ↓ Improved from 142 mg/dL (-11%)
          </p>
        </div>

        <div
          onClick={() => setSelectedMetric('bp')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'bp'
              ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/20 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Blood Pressure</span>
            <Heart className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">120/76</span>
            <span className="text-xs text-slate-400 font-mono">mmHg</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">
            ✓ Normal Target Range achieved
          </p>
        </div>

        <div
          onClick={() => setSelectedMetric('ldl')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'ldl'
              ? 'bg-slate-800 border-amber-500 ring-2 ring-amber-500/20 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">LDL Cholesterol</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">155</span>
            <span className="text-xs text-slate-400 font-mono">mg/dL</span>
          </div>
          <p className="text-[10px] text-amber-400 font-semibold mt-1">
            ↓ Reduced from 175 mg/dL
          </p>
        </div>

        <div
          onClick={() => setSelectedMetric('hr')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedMetric === 'hr'
              ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Resting Heart Rate</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">66</span>
            <span className="text-xs text-slate-400 font-mono">bpm</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">
            ✓ Excellent athletic baseline
          </p>
        </div>

      </div>

      {/* Interactive Recharts Graph Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span>
              {selectedMetric === 'glucose' && 'Fasting Blood Glucose Trajectory (mg/dL)'}
              {selectedMetric === 'bp' && 'Blood Pressure Trend (Systolic vs Diastolic mmHg)'}
              {selectedMetric === 'ldl' && 'Fasting LDL Cholesterol Trajectory (mg/dL)'}
              {selectedMetric === 'hr' && 'Resting Heart Rate Log (bpm)'}
            </span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Jan - Feb 2025</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === 'bp' ? (
              <LineChart data={VITAL_HISTORIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[60, 160]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="bpSystolic" name="Systolic" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="bpDiastolic" name="Diastolic" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            ) : (
              <AreaChart data={VITAL_HISTORIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey={
                    selectedMetric === 'glucose' ? 'bloodSugar' : selectedMetric === 'ldl' ? 'cholesterolLDL' : 'heartRate'
                  }
                  stroke="#14b8a6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVal)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Document Archive List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Medical Document Archive ({documents.length})</span>
        </h3>

        <div className="divide-y divide-slate-800">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                  <p className="text-[10px] text-slate-400">
                    Uploaded: {doc.uploadDate} • Patient: {doc.patientName}
                  </p>
                </div>
              </div>

              <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 font-medium">
                View Breakdown →
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
