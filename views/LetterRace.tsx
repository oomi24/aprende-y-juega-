
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Zap } from 'lucide-react';
import { playInstruction } from '../lib/audio';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LetterRace: React.FC = () => {
  const navigate = useNavigate();
  const [targetLetter, setTargetLetter] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const generateRound = () => {
    const target = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    const otherOptions = LETTERS.filter(l => l !== target)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOptions = [...otherOptions, target].sort(() => 0.5 - Math.random());
    
    setTargetLetter(target);
    setOptions(allOptions);
    playInstruction(`¿Dónde está la letra ${target}?`);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleSelect = (letter: string) => {
    if (letter === targetLetter) {
      setScore(s => s + 10);
      setProgress(p => p + 10);
      playInstruction("¡Eso es! ¡Eres muy rápido!");
      if (progress >= 90) {
        setFinished(true);
      } else {
        setTimeout(generateRound, 1000);
      }
    } else {
      playInstruction("¡Casi! Inténtalo otra vez");
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/juegos')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
          <ArrowLeft /> Volver
        </button>
        <h2 className="text-3xl font-bold text-pink-fun">Carrera de Letras 🏎️</h2>
        <div className="text-orange-energy font-bold text-xl">Puntos: {score}</div>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl p-8 flex-1 flex flex-col items-center">
        {/* Race Track Progress */}
        <div className="w-full h-8 bg-slate-100 rounded-full relative mb-12 border-2 border-slate-200 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-pink-fun"
            animate={{ width: `${progress}%` }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-300">🏁</div>
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 text-2xl"
            animate={{ left: `${progress}%` }}
            transition={{ type: 'spring' }}
          >
            🏎️
          </motion.div>
        </div>

        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-slate-600 mb-2">Busca la letra:</h3>
          <div className="text-8xl font-black text-pink-fun bg-pink-50 w-32 h-32 flex items-center justify-center rounded-3xl mx-auto border-4 border-pink-200 shadow-lg">
            {targetLetter}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
          {options.map((letter) => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(letter)}
              className="h-24 bg-white border-4 border-slate-100 rounded-[24px] shadow-md flex items-center justify-center text-4xl font-black text-slate-700 hover:border-pink-fun hover:text-pink-fun transition-colors"
            >
              {letter}
            </motion.button>
          ))}
        </div>

        {finished && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-pink-fun flex flex-col items-center justify-center text-white p-8 text-center rounded-[40px]"
          >
            <Trophy className="w-32 h-32 mb-6" />
            <h3 className="text-5xl font-bold mb-4">¡Ganaste la Carrera!</h3>
            <p className="text-2xl opacity-90 mb-12">¡Eres el corredor de letras más veloz de Venezuela!</p>
            <button 
              onClick={() => navigate('/juegos')}
              className="px-12 py-5 bg-white text-pink-fun rounded-3xl font-bold text-2xl shadow-2xl hover:bg-pink-50 transition-colors"
            >
              ¡Regresar al Patio!
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LetterRace;
