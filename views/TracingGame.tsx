
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { playInstruction } from '../lib/audio';

const LETTERS_TO_TRACE = ['A', 'B', 'C', 'O', 'M', 'S'];

const TracingGame: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const [success, setSuccess] = useState(false);

  const drawTemplate = useCallback((ctx: CanvasRenderingContext2D, letter: string) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    ctx.font = `bold ${height * 0.8}px Quicksand`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 10;
    ctx.setLineDash([20, 10]);
    ctx.strokeText(letter, width / 2, height / 2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    drawTemplate(ctx, LETTERS_TO_TRACE[currentLetterIdx]);
    playInstruction(`Ahora vamos a trazar la letra ${LETTERS_TO_TRACE[currentLetterIdx]}`);
  }, [currentLetterIdx, drawTemplate]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#FF6B35';
    ctx.setLineDash([]);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawTemplate(ctx, LETTERS_TO_TRACE[currentLetterIdx]);
      setSuccess(false);
      playInstruction("¡No te preocupes! Inténtalo de nuevo con calma.");
    }
  };

  const handleNext = () => {
    if (currentLetterIdx < LETTERS_TO_TRACE.length - 1) {
      playInstruction("¡Fantástico! Vamos con la siguiente.");
      setCurrentLetterIdx(prev => prev + 1);
      setSuccess(false);
    } else {
      playInstruction("¡Felicidades! Has trazado todas las letras.");
      setSuccess(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/juegos')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold">
          <ArrowLeft /> Volver
        </button>
        <h2 className="text-3xl font-bold text-blue-edu">Trazo Mágico ✨</h2>
        <div className="w-24"></div>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl p-8 flex-1 flex flex-col items-center justify-center relative">
        <div className="mb-6 text-center">
          <p className="text-xl font-bold text-slate-600 mb-2">¡Sigue la línea punteada!</p>
          <div className="text-6xl font-black text-orange-energy mb-4">{LETTERS_TO_TRACE[currentLetterIdx]}</div>
        </div>

        <div className="w-full max-w-lg aspect-square border-4 border-dashed border-blue-100 rounded-3xl relative overflow-hidden bg-gray-50 touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair"
          />
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-2xl font-bold text-slate-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" /> Reintentar
          </button>
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-green-grow hover:bg-green-600 rounded-2xl font-bold text-white shadow-lg transition-all"
          >
            <CheckCircle className="w-5 h-5" /> ¡Listo!
          </button>
        </div>

        {success && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 bg-white/90 rounded-[40px] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="text-8xl mb-6">🥳</div>
            <h3 className="text-4xl font-bold text-green-grow mb-4">¡Excelente Trabajo!</h3>
            <p className="text-xl text-slate-600 mb-8">Has completado todos los trazos por hoy.</p>
            <button 
              onClick={() => navigate('/juegos')}
              className="px-8 py-4 bg-blue-edu text-white rounded-2xl font-bold text-xl shadow-xl"
            >
              ¡Seguir Jugando!
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TracingGame;
