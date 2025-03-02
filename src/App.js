import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import SharePage from './pages/SharePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/SignInPage';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from './pages/LeaderBoardPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        {/* ToastContainer must be at root level */}
        <ToastContainer position="top-center" autoClose={3000} />
        
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path='/leaderboard' element={< Leaderboard/>} />
            <Route path="/about" element={<AboutPage />} />
            {/* Single PrivateRoute wrapper for all protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/play" element={<GamePage />} />
              <Route path="/share" element={<SharePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}