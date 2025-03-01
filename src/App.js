// src/App.js
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import SharePage from './pages/SharePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/SignInPage'
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function App() {

  
  return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/play" element = {<GamePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/share" element = {<SharePage />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/signin' element={<LoginPage />} />
        </Routes>

        </main>
      </div>
  );
}