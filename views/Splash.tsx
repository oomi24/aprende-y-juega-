
import React from 'react';
import { motion } from 'framer-motion';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-blue-edu flex flex-col items-center justify-center text-white p-6">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-8xl mb-8"
      >
        🎨
      </motion.div>
      <h1 className="text-4xl font-bold mb-4 text-center">Aprendo Jugando</h1>
      <p className="text-xl opacity-80 animate-pulse">¡Estamos preparando tu mundo!</p>
      
      {/* Decorative shapes */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-pink-fun rounded-full opacity-50"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-attention rounded-lg opacity-50"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />
    </div>
  );
};

export default Splash;
