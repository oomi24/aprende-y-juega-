
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, ChevronRight, Play } from 'lucide-react';
import { INITIAL_READING_LEVELS } from '../constants';
import { playInstruction } from '../lib/audio';

const EnvironmentSection: React.FC<{ type: string; children: React.ReactNode }> = ({ type, children }) => {
  const themes: Record<string, string> = {
    bosque: 'bg-green-50 border-green-100',
    rio: 'bg-blue-50 border-blue-100',
    playa: 'bg-yellow-50 border-yellow-100',
    ciudad: 'bg-slate-50 border-slate-100',
  };

  const decor: Record<string, string[]> = {
    bosque: ['🌲', '🌸', '🍄', '🌳'],
    rio: ['🛶', '🐟', '🌊', '🦆'],
    playa: ['☀️', '🌴', '🐚', '🦀'],
    ciudad: ['🚗', '🏢', '🚥', '🏬'],
  };

  return (
    <div className={`relative w-full py-16 px-8 border-b-4 border-dashed ${themes[type]} first:rounded-t-[60px] last:rounded-b-[60px] overflow-hidden`}>
      {/* Decorative background elements */}
      {decor[type].map((emoji, i) => (
        <div 
          key={i} 
          className="absolute opacity-20 text-4xl select-none"
          style={{ 
            top: `${Math.random() * 80 + 10}%`, 
            left: `${Math.random() * 80 + 10}%`,
            transform: `rotate(${Math.random() * 40 - 20}deg)`
          }}
        >
          {emoji}
        </div>
      ))}
      <div className="relative z-10 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

const ReadingPath: React.FC = () => {
  const [levels] = useState(INITIAL_READING_LEVELS);

  useEffect(() => {
    playInstruction("¡Bienvenido al Camino del Lector! Elige una parada para empezar a leer.");
  }, []);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="text-center mb-12">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-black text-slate-800 mb-4 drop-shadow-sm"
        >
          El Camino del Lector 📖
        </motion.h1>
        <p className="text-xl text-slate-500 font-bold">¡Explora mundos mágicos con tus palabras!</p>
      </header>

      <div className="flex flex-col items-center">
        {levels.map((level, idx) => (
          <EnvironmentSection key={level.id} type={level.env}>
            <div className={`flex flex-col items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 w-full max-w-2xl`}>
              
              {/* Level Card/Node */}
              <motion.div
                whileHover={level.unlocked ? { scale: 1.05, rotate: 2 } : {}}
                whileTap={level.unlocked ? { scale: 0.95 } : {}}
                className={`
                  relative w-full md:w-80 p-6 rounded-[40px] shadow-xl border-4 transition-all
                  ${level.unlocked 
                    ? `bg-white border-white cursor-pointer` 
                    : 'bg-gray-100 border-gray-200 grayscale opacity-80'}
                `}
                onClick={() => {
                  if (level.unlocked) {
                    playInstruction(`¡Vamos al ${level.title}!`);
                  } else {
                    playInstruction("Este nivel todavía está bloqueado. ¡Sigue aprendiendo para abrirlo!");
                  }
                }}
              >
                {/* Visual indicator of the level icon */}
                <div className={`
                  w-20 h-20 rounded-3xl mb-4 flex items-center justify-center text-5xl shadow-inner
                  ${level.unlocked ? level.color : 'bg-gray-300'}
                `}>
                  {level.unlocked ? level.icon : <Lock className="text-white w-10 h-10" />}
                </div>

                <div className="mb-4">
                  <h3 className={`text-2xl font-black ${level.unlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                    Nivel {level.id}: {level.title}
                  </h3>
                  <p className="text-slate-500 font-bold">{level.description}</p>
                </div>

                {level.unlocked && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-1">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <Star className="w-6 h-6 text-gray-200 fill-current" />
                    </div>
                    <div className="bg-blue-edu p-2 rounded-full text-white">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Connecting Path Description */}
              <div className="hidden md:flex flex-1 flex-col items-center text-center px-4">
                <span className="text-4xl mb-2">{level.unlocked ? '✅' : '🔒'}</span>
                <p className={`text-lg font-black uppercase tracking-widest ${level.unlocked ? 'text-green-600' : 'text-slate-400'}`}>
                  {level.unlocked ? '¡Explorado!' : 'Por descubrir'}
                </p>
              </div>

            </div>

            {/* Winding path SVG connector (visible between levels) */}
            {idx < levels.length - 1 && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-16 w-4 overflow-hidden z-20">
                <div className="w-full h-full border-r-4 border-dashed border-slate-300"></div>
              </div>
            )}
          </EnvironmentSection>
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="mt-16 bg-gradient-to-br from-blue-edu to-blue-600 rounded-[50px] p-12 text-center text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="text-7xl mb-6">🎯</div>
          <h2 className="text-4xl font-black mb-4">¡Tu aventura apenas comienza!</h2>
          <p className="text-xl opacity-90 font-bold max-w-xl mx-auto">
            Cada vez que completas un mundo, desbloqueas nuevos amigos y sorpresas en tu ciudad.
          </p>
        </div>
        {/* Background rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-30"></div>
      </motion.div>
    </div>
  );
};

export default ReadingPath;
