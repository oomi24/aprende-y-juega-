
import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Sparkles } from 'lucide-react';
import { VENEZUELAN_RECIPES } from '../constants';
import { playInstruction } from '../lib/audio';

const WordChef: React.FC = () => {
  const navigate = useNavigate();
  const [currentRecipeIdx, setCurrentRecipeIdx] = useState(0);
  const recipe = VENEZUELAN_RECIPES[currentRecipeIdx];
  
  const [shuffledSyllables, setShuffledSyllables] = useState(() => 
    [...recipe.syllables].sort(() => Math.random() - 0.5)
  );

  const [won, setWon] = useState(false);

  useEffect(() => {
    playInstruction(`¡Hola Chef! Vamos a preparar una ${recipe.name}. Ordena las sílabas.`);
  }, [currentRecipeIdx]);

  const handleReorder = (newOrder: string[]) => {
    setShuffledSyllables(newOrder);
    if (JSON.stringify(newOrder) === JSON.stringify(recipe.syllables)) {
      setWon(true);
      playInstruction(`¡Delicioso! Has cocinado una ${recipe.name}.`);
    }
  };

  const nextRecipe = () => {
    const nextIdx = (currentRecipeIdx + 1) % VENEZUELAN_RECIPES.length;
    setCurrentRecipeIdx(nextIdx);
    setShuffledSyllables([...VENEZUELAN_RECIPES[nextIdx].syllables].sort(() => Math.random() - 0.5));
    setWon(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/juegos')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold">
          <ArrowLeft /> Volver
        </button>
        <h2 className="text-3xl font-bold text-orange-energy">Cocinero de Palabras 👨‍🍳</h2>
        <div className="w-24"></div>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl p-8 flex-1 flex flex-col items-center">
        <div className="bg-yellow-50 p-6 rounded-3xl mb-8 w-full max-w-md text-center border-2 border-yellow-200">
          <ChefHat className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-slate-800">Receta del día: <span className="text-orange-energy">{recipe.name}</span></h3>
          <div className="text-6xl mt-4">{recipe.image}</div>
        </div>

        <p className="text-xl text-slate-600 mb-12 font-semibold">¡Ordena las sílabas para preparar la comida!</p>

        <Reorder.Group 
          axis="x" 
          values={shuffledSyllables} 
          onReorder={handleReorder}
          className="flex gap-4 p-4"
        >
          {shuffledSyllables.map((syl) => (
            <Reorder.Item 
              key={syl} 
              value={syl}
              className="w-24 h-24 bg-white border-4 border-orange-energy rounded-2xl shadow-lg flex items-center justify-center text-3xl font-black text-orange-energy cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
            >
              {syl}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="mt-16 w-full max-w-md bg-slate-100 h-24 rounded-3xl border-4 border-dashed border-slate-300 flex items-center justify-center">
          {won ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-green-grow font-black text-3xl"
            >
              <Sparkles /> {recipe.name.toUpperCase()} <Sparkles />
            </motion.div>
          ) : (
            <span className="text-slate-400 font-bold italic">Arrastra las sílabas aquí...</span>
          )}
        </div>

        {won && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={nextRecipe}
            className="mt-8 px-12 py-4 bg-orange-energy text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-orange-600 transition-colors"
          >
            ¡Siguiente Receta!
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default WordChef;
