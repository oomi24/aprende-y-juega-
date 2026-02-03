
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GAMES = [
  { id: 'trazo', title: 'Trazo Mágico', icon: '✍️', color: 'bg-blue-edu', desc: 'Sigue las líneas' },
  { id: 'cocinero', title: 'Cocinero de Palabras', icon: '🍳', color: 'bg-orange-energy', desc: 'Ordena sílabas ricas' },
  { id: 'tesoro', title: 'Tesoro de Sílabas', icon: '🗺️', color: 'bg-green-grow', desc: 'Mapa de Venezuela' },
  { id: 'carrera', title: 'Carrera de Letras', icon: '🏎️', color: 'bg-pink-fun', desc: '¡Sé el más rápido!' },
];

const GamesMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">El Patio de Juegos 🎠</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {GAMES.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/juegos/${game.id}`)}
            className={`${game.color} p-8 rounded-[40px] text-white cursor-pointer shadow-xl flex items-center gap-6 relative overflow-hidden`}
          >
            <div className="text-7xl">{game.icon}</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
              <p className="text-xl opacity-90">{game.desc}</p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">✨</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GamesMenu;
