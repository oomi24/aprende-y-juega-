
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { playInstruction } from '../lib/audio';

const TREASURE_STOPS = [
  { id: 'bosque', name: 'Bosque Mágico', syllable: 'MA', x: 15, y: 80, icon: '🌲', color: 'bg-green-500' },
  { id: 'rio', name: 'Río de Cristal', syllable: 'RE', x: 30, y: 40, icon: '💧', color: 'bg-blue-400' },
  { id: 'playa', name: 'Playa Dorada', syllable: 'PA', x: 60, y: 60, icon: '🏖️', color: 'bg-yellow-400' },
  { id: 'ciudad', name: 'Ciudad Lucero', syllable: 'TA', x: 50, y: 20, icon: '🏙️', color: 'bg-purple-400' },
  { id: 'montana', name: 'Montaña Alta', syllable: 'LA', x: 85, y: 30, icon: '🏔️', color: 'bg-slate-400' },
];

const SyllableTreasure: React.FC = () => {
  const navigate = useNavigate();
  const [foundSyllables, setFoundSyllables] = useState<string[]>([]);
  const [selectedStop, setSelectedStop] = useState<typeof TREASURE_STOPS[0] | null>(null);

  useEffect(() => {
    playInstruction("¡Bienvenido a la búsqueda del tesoro! Sigue el camino y toca los lugares para encontrar sílabas.");
  }, []);

  const handleStopClick = (stop: typeof TREASURE_STOPS[0]) => {
    if (foundSyllables.includes(stop.syllable)) return;
    
    setSelectedStop(stop);
    playInstruction(`¡Increíble! En el ${stop.name} encontraste la sílaba ${stop.syllable}`);
    
    setTimeout(() => {
      setFoundSyllables(prev => [...prev, stop.syllable]);
      setSelectedStop(null);
    }, 2500);
  };

  const isComplete = foundSyllables.length === TREASURE_STOPS.length;

  // Generate SVG path data for the connecting line
  const pathData = TREASURE_STOPS.map((s, i) => `${i === 0 ? 'M' : 'L'} ${s.x} ${s.y}`).join(' ');

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/juegos')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
          <ArrowLeft /> Volver
        </button>
        <h2 className="text-3xl font-bold text-green-grow">Tesoro de Sílabas 💎</h2>
        <div className="w-24"></div>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl p-8 flex-1 flex flex-col items-center relative overflow-hidden">
        <p className="text-xl text-slate-600 mb-8 font-bold text-center">
          ¡Sigue el rastro de los iconos para hallar el tesoro!
        </p>

        <div className="relative w-full max-w-2xl aspect-[1.4] bg-orange-50 rounded-[50px] border-8 border-orange-100 overflow-hidden shadow-inner">
          {/* Connecting Line Path */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d={pathData}
              fill="none"
              stroke="#FFD166"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Treasure Stops */}
          {TREASURE_STOPS.map((stop) => {
            const isFound = foundSyllables.includes(stop.syllable);
            return (
              <motion.button
                key={stop.id}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStopClick(stop)}
                disabled={isFound}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl border-4 transition-all z-10
                  ${isFound 
                    ? 'bg-green-grow border-white text-white rotate-12' 
                    : `${stop.color} border-white text-white animate-bounce`}
                `}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl">{isFound ? '✅' : stop.icon}</span>
                  {isFound && <span className="font-black text-xs mt-1">{stop.syllable}</span>}
                </div>
              </motion.button>
            );
          })}

          {/* Pop-up for selected stop */}
          {selectedStop && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-[40px] shadow-2xl border-8 border-yellow-400 text-center z-30 min-w-[280px]"
            >
              <div className="text-4xl mb-2">✨ ¡Tesoro! ✨</div>
              <div className="text-8xl font-black text-orange-energy mb-4 drop-shadow-md">
                {selectedStop.syllable}
              </div>
              <p className="text-xl text-slate-600 font-bold uppercase tracking-wider">
                {selectedStop.name}
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress bar / Collected syllables */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {TREASURE_STOPS.map(s => (
            <div 
              key={s.id} 
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-4 transition-all duration-500
                ${foundSyllables.includes(s.syllable) 
                  ? 'bg-green-100 border-green-grow text-green-700 scale-110 shadow-lg' 
                  : 'bg-white border-slate-100 text-slate-200'}
              `}
            >
              {foundSyllables.includes(s.syllable) ? s.syllable : '?'}
            </div>
          ))}
        </div>

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-8 text-center z-40"
          >
            <div className="text-9xl mb-6">🏴‍☠️</div>
            <h3 className="text-5xl font-black text-green-grow mb-4">¡Mapa Completado!</h3>
            <p className="text-2xl text-slate-600 mb-10 font-bold max-w-md">
              ¡Has descubierto todas las sílabas del cofre secreto!
            </p>
            <button 
              onClick={() => {
                playInstruction("¡Eres un gran explorador! Aquí tienes tus estrellas.");
                navigate('/juegos');
              }}
              className="px-12 py-5 bg-orange-energy text-white rounded-3xl font-black text-2xl shadow-2xl hover:scale-105 transition-transform"
            >
              ¡Cobrar mi Premio! 🌟
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SyllableTreasure;
