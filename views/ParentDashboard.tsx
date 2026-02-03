
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { TrendingUp, Award, Settings, Download, Users } from 'lucide-react';
import { ChildProfile, AccessibilityConfig } from '../types';
import { COLORS } from '../constants';

const MOCK_DATA = [
  { day: 'Lun', motor: 65, reading: 40 },
  { day: 'Mar', motor: 70, reading: 45 },
  { day: 'Mie', motor: 68, reading: 60 },
  { day: 'Jue', motor: 85, reading: 65 },
  { day: 'Vie', motor: 90, reading: 75 },
];

const SKILL_DATA = [
  { name: 'Motricidad Fina', score: 85, color: COLORS.orange },
  { name: 'Lectura Silábica', score: 60, color: COLORS.green },
  { name: 'Reconocimiento Visual', score: 95, color: COLORS.blue },
  { name: 'Memoria Auditiva', score: 70, color: COLORS.purple },
];

interface ParentDashboardProps {
  profile: ChildProfile | null;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ profile }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Panel de Padres 👨‍👩‍👧</h1>
          <p className="text-slate-500 font-semibold">Seguimiento de {profile?.name}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 font-bold transition-colors">
            <Download className="w-5 h-5" /> Imprimir Reporte
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-edu text-white rounded-2xl shadow-lg hover:bg-blue-600 font-bold transition-colors">
            <Settings className="w-5 h-5" /> Ajustes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 font-bold text-sm uppercase">Puntos Totales</p>
          <p className="text-3xl font-black text-blue-edu">{profile?.stars} ⭐</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 font-bold text-sm uppercase">Nivel de Lectura</p>
          <p className="text-3xl font-black text-green-grow">{profile?.level} / 5</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 font-bold text-sm uppercase">Sesiones esta Semana</p>
          <p className="text-3xl font-black text-orange-energy">12</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 font-bold text-sm uppercase">Tiempo Promedio</p>
          <p className="text-3xl font-black text-purple-creative">15 min</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-edu" /> Progreso Semanal
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="motor" stroke={COLORS.orange} strokeWidth={4} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="reading" stroke={COLORS.green} strokeWidth={4} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-sm font-bold justify-center">
            <div className="flex items-center gap-2 text-orange-energy">
              <span className="w-3 h-3 rounded-full bg-orange-energy" /> Psicometría
            </div>
            <div className="flex items-center gap-2 text-green-grow">
              <span className="w-3 h-3 rounded-full bg-green-grow" /> Lectura
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Award className="text-purple-creative" /> Habilidades Clave
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_DATA} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 'bold'}} width={150} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={30}>
                  {SKILL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className="bg-blue-edu text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Recomendación Pedagógica 💡</h2>
            <p className="text-xl opacity-90 leading-relaxed mb-6">
              Carlos está demostrando un avance increíble en el reconocimiento visual. 
              Sugerimos enfocarse esta semana en el juego <strong>"Cocinero de Palabras"</strong> para reforzar la segmentación silábica, 
              mientras se mantiene el nivel de confianza actual.
            </p>
            <button className="bg-white text-blue-edu px-8 py-3 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
              Ver Actividades Imprimibles
            </button>
          </div>
          <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center text-8xl">
            🧠
          </div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">✨</div>
      </section>
    </div>
  );
};

export default ParentDashboard;
