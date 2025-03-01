import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas/authSchema';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [hasStartedPasswordTyping, setHasStartedPasswordTyping] = useState(false);
  const [hasStartedEmailTyping, setHasStartedEmailTyping] = useState(false);
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);
  const [showEmailFeedback, setShowEmailFeedback] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    // Handle signup API request here
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


  // Password validation checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const isEmailValid = emailRegex.test(email);

  // Debounce effect to show feedback only after the user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasStartedPasswordTyping) {
        setShowPasswordFeedback(true);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timeout);
  }, [password, hasStartedPasswordTyping]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasStartedEmailTyping) {
        setShowEmailFeedback(true);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [email, hasStartedEmailTyping]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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
                setHasStartedEmailTyping(true);
                setShowEmailFeedback(false); // Hide feedback while typing
              }}
            />
            {showEmailFeedback && email.length === 0 && (
              <p className="text-red-500 text-sm mt-1">Email cannot be empty</p>
            )}
            {showEmailFeedback && !isEmailValid && email.length > 0 && (
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
                setHasStartedPasswordTyping(true);
                setShowPasswordFeedback(false); // Hide feedback while typing
              }}
            />
            {showPasswordFeedback && password.length === 0 && (
              <p className="text-red-500 text-sm mt-1">Password cannot be empty</p>
            )}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

            {/* Show validation feedback only after user stops typing */}
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
            disabled={!isPasswordValid}
            className={`w-full py-2 rounded-lg ${
              isPasswordValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
