// src/App.js
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import SharePage from './pages/SharePage';


export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/play" element={<GamePage />} />
      <Route path="/share" element={<SharePage />} />
    </Routes>
  );
}