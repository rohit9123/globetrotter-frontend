import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // Handle login API request here
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const isEmailValid = emailRegex.test(email);

  // Password validation checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasStartedTyping) {
        setShowFeedback(true);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [email, hasStartedTyping]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password.length > 0) {
        setShowPasswordFeedback(true);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setHasStartedTyping(true);
                setShowFeedback(false);
              }}
            />
            {showFeedback && email.length === 0 && (
              <p className="text-red-500 text-sm mt-1">Email cannot be empty</p>
            )}
            {showFeedback && !isEmailValid && email.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Invalid email format</p>
            )}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowPasswordFeedback(false);
              }}
            />
            {showPasswordFeedback && password.length === 0 && (
              <p className="text-red-500 text-sm mt-1">Password cannot be empty</p>
            )}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            {showPasswordFeedback && password.length > 0 && (
              <div className="text-sm text-gray-600 mt-2">
                Password must contain:
                <ul className="list-inside">
                  <li className={passwordChecks.length ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.length ? '✓' : '✗'} At least 8 characters
                  </li>
                  <li className={passwordChecks.uppercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.uppercase ? '✓' : '✗'} One uppercase letter
                  </li>
                  <li className={passwordChecks.lowercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.lowercase ? '✓' : '✗'} One lowercase letter
                  </li>
                  <li className={passwordChecks.number ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.number ? '✓' : '✗'} One number
                  </li>
                  <li className={passwordChecks.specialChar ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.specialChar ? '✓' : '✗'} One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isEmailValid || !isPasswordValid}
            className={`w-full py-2 rounded-lg ${
              isEmailValid && isPasswordValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
