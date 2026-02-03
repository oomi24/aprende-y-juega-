
import React from 'react';
import { BookOpen, Map, Palette, Camera, Settings, Star, User, Home, Award } from 'lucide-react';

export const COLORS = {
  blue: '#4A90E2',
  green: '#50C878',
  orange: '#FF6B35',
  pink: '#FF69B4',
  yellow: '#FFD166',
  purple: '#9D4EDD',
  turquoise: '#2EC4B6',
  white: '#FFFFFF',
  gray: '#F8F9FA',
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Mi Mundo', icon: <Home className="w-8 h-8" />, color: 'bg-blue-edu' },
  { id: 'juegos', label: 'Juegos', icon: <Palette className="w-8 h-8" />, color: 'bg-orange-energy' },
  { id: 'lectura', label: 'Leer', icon: <BookOpen className="w-8 h-8" />, color: 'bg-green-grow' },
  { id: 'progreso', label: 'Logros', icon: <Award className="w-8 h-8" />, color: 'bg-purple-creative' },
];

export const VENEZUELAN_RECIPES = [
  { id: 'arepa', name: 'Arepa', syllables: ['A', 'RE', 'PA'], image: '🫓' },
  { id: 'hallaca', name: 'Hallaca', syllables: ['HA', 'LLA', 'CA'], image: '🍲' },
  { id: 'pabellon', name: 'Pabellón', syllables: ['PA', 'BE', 'LLÓN'], image: '🍛' },
  { id: 'cachapa', name: 'Cachapa', syllables: ['CA', 'CHA', 'PA'], image: '🥞' },
];

export const INITIAL_READING_LEVELS = [
  { 
    id: 1, 
    title: 'Vocales', 
    env: 'bosque', 
    icon: '🌲', 
    color: 'bg-green-grow', 
    description: '¡A, E, I, O, U!', 
    unlocked: true 
  },
  { 
    id: 2, 
    title: 'Sílabas M', 
    env: 'rio', 
    icon: '💧', 
    color: 'bg-blue-edu', 
    description: 'Ma, Me, Mi...', 
    unlocked: true 
  },
  { 
    id: 3, 
    title: 'Palabras', 
    env: 'playa', 
    icon: '🏖️', 
    color: 'bg-yellow-attention', 
    description: 'Sol, Mar, Pez', 
    unlocked: false 
  },
  { 
    id: 4, 
    title: 'Frases', 
    env: 'ciudad', 
    icon: '🏙️', 
    color: 'bg-purple-creative', 
    description: 'Mamá me ama', 
    unlocked: false 
  },
];
