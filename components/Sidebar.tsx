
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCog, LogOut, Star } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import { ChildProfile } from '../types';

interface SidebarProps {
  profile: ChildProfile | null;
}

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-24 md:w-64 bg-white border-r flex flex-col items-center py-8 shadow-sm h-screen sticky top-0">
      {/* Profile Summary */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl mb-4 border-4 border-yellow-400">
          {profile?.avatar || '👤'}
        </div>
        <div className="hidden md:block text-center">
          <p className="font-bold text-xl text-slate-800">¡Hola, {profile?.name}!</p>
          <div className="flex items-center justify-center gap-1 text-orange-500 font-bold">
            <Star className="w-5 h-5 fill-current" />
            <span>{profile?.stars}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 flex flex-col gap-4 w-full px-4">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.id === 'dashboard' ? '/' : `/${item.id}`}
            className={({ isActive }) => `
              flex items-center justify-center md:justify-start gap-4 p-3 rounded-2xl transition-all duration-300
              ${isActive ? `${item.color} text-white shadow-lg scale-105` : 'hover:bg-gray-100 text-slate-500'}
            `}
          >
            {item.icon}
            <span className="hidden md:block font-bold">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Parent Access / Footer */}
      <div className="mt-auto px-4 w-full flex flex-col gap-3">
        <button 
          onClick={() => navigate('/parent')}
          className="flex items-center justify-center md:justify-start gap-3 p-3 text-blue-edu hover:bg-blue-50 rounded-2xl transition-colors font-semibold"
        >
          <UserCog className="w-6 h-6" />
          <span className="hidden md:block">Padres</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
