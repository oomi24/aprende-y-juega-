
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Book, Trophy } from 'lucide-react';
import { ChildProfile } from '../types';

interface DashboardProps {
  profile: ChildProfile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">¡Qué bueno verte, {profile?.name}! 👋</h1>
        <p className="text-lg text-slate-500">¿Qué quieres aprender hoy?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <motion.div 
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-energy p-8 rounded-[40px] text-white cursor-pointer shadow-xl relative overflow-hidden"
          onClick={() => navigate('/juegos')}
        >
          <div className="relative z-10">
            <PlayCircle className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Juegos</h2>
            <p className="opacity-90">Traza, reconoce y diviértete con colores.</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🎮</div>
        </motion.div>

        <motion.div 
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="bg-green-grow p-8 rounded-[40px] text-white cursor-pointer shadow-xl relative overflow-hidden"
          onClick={() => navigate('/lectura')}
        >
          <div className="relative z-10">
            <Book className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Lectura</h2>
            <p className="opacity-90">Aprende las letras y sílabas de Venezuela.</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">📖</div>
        </motion.div>

        <motion.div 
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="bg-purple-creative p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <Trophy className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Tus Estrellas</h2>
            <p className="opacity-90">¡Tienes {profile?.stars} estrellas brillantes!</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">⭐</div>
        </motion.div>
      </div>

      <motion.section 
        variants={item}
        className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col items-center"
      >
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Tu Árbol del Crecimiento 🌳</h3>
        <div className="relative w-full max-w-sm aspect-square bg-blue-50 rounded-full flex items-end justify-center p-8 overflow-hidden">
          {/* Visualizing growth based on level */}
          <motion.div
            initial={{ height: '20%' }}
            animate={{ height: `${20 + (profile?.level || 1) * 15}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="w-24 bg-green-800 rounded-t-lg relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-wrap justify-center w-48">
              {Array.from({ length: (profile?.level || 1) + 2 }).map((_, i) => (
                <div key={i} className="w-12 h-12 bg-green-grow rounded-full m-1 border-2 border-green-600 flex items-center justify-center">
                  <span className="text-xs">🍎</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <p className="mt-8 text-slate-500 font-semibold italic text-center">
          "Cada día que aprendes, ¡tu árbol crece más alto!"
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
