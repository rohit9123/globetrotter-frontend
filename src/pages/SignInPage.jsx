import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/authSchema';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const password = watch('password', '');
  const email = watch('email', '');

  // Password validation checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const onSubmit = async (data) => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://globerotter-backend.onrender.com/api/auth/login',
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log(response.dat);

      if (response.status === 200) {
      
        authContext.login(response.data.token,response.data.user.username);
        // Redirect to dashboard
        toast.success('Login successful!'); 
        navigate('/');
      }
    } catch (error) {
      let message = 'Login failed. Please try again.';
      if (error.response) {
        message = error.response.data.message || message;
      } else if (error.request) {
        message = 'Network error. Please check your internet connection.';
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password.length > 0) {
        setShowPasswordFeedback(true);
      } else {
        setShowPasswordFeedback(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}

            {showPasswordFeedback && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                <p className="font-medium mb-2">Password Requirements:</p>
                <ul className="space-y-1">
                  <li className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
                    {passwordChecks.length ? '✓' : '•'} At least 8 characters
                  </li>
                  <li className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}>
                    {passwordChecks.uppercase ? '✓' : '•'} One uppercase letter
                  </li>
                  <li className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}>
                    {passwordChecks.lowercase ? '✓' : '•'} One lowercase letter
                  </li>
                  <li className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
                    {passwordChecks.number ? '✓' : '•'} One number
                  </li>
                  <li className={passwordChecks.specialChar ? 'text-green-600' : 'text-gray-500'}>
                    {passwordChecks.specialChar ? '✓' : '•'} One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isEmailValid || !isPasswordValid || isLoading}
            className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}