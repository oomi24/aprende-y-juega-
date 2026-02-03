
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Views
import Dashboard from './views/Dashboard';
import GamesMenu from './views/GamesMenu';
import ReadingPath from './views/ReadingPath';
import TracingGame from './views/TracingGame';
import WordChef from './views/WordChef';
import SyllableTreasure from './views/SyllableTreasure';
import LetterRace from './views/LetterRace';
import ParentDashboard from './views/ParentDashboard';
import Splash from './views/Splash';

// Components
import Sidebar from './components/Sidebar';
import { ChildProfile } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial profile load
    setTimeout(() => {
      setProfile({
        id: '1',
        name: 'Carlos',
        avatar: '🦁',
        age: 6,
        level: 1,
        stars: 120
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <Splash />;

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 text-slate-800 selection:bg-pink-100 overflow-hidden">
        <Sidebar profile={profile} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard profile={profile} />} />
              <Route path="/juegos" element={<GamesMenu />} />
              <Route path="/juegos/trazo" element={<TracingGame />} />
              <Route path="/juegos/cocinero" element={<WordChef />} />
              <Route path="/juegos/tesoro" element={<SyllableTreasure />} />
              <Route path="/juegos/carrera" element={<LetterRace />} />
              <Route path="/lectura" element={<ReadingPath />} />
              <Route path="/progreso" element={<Dashboard profile={profile} />} />
              <Route path="/parent" element={<ParentDashboard profile={profile} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
};

export default App;
