import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas/authSchema';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);
  const [showEmailFeedback, setShowEmailFeedback] = useState(false);
  const authContext = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

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

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: name,
        email: email,
        password: password
      },{
        withCredentials: true,
      });

      // Redirect to home page after successful registration
      if(response.status === 201){
        console.log("response",response.data);
        toast.success('Account created successfully!');
        authContext.login(
           response.data.token,
           response.data.user.username
        );
      }
      
    } catch (err) {
      error.response && console.log(err.response.data);
      handleSignupError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupError = (error) => {
    let errorMessage = 'An error occurred during registration.';
    
    if (error.response) {
      switch (error.response.status) {
        case 409:
          errorMessage = 'This email is already registered.';
          break;
        case 400:
          errorMessage = error.response.data.message || 'Invalid registration data.';
          break;
        default:
          errorMessage = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Check your internet connection.';
    }

    setError(errorMessage);
    setTimeout(() => setError(''), 5000);
  };

  // Debounce effects
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (password.length > 0) setShowPasswordFeedback(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [password]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (email.length > 0) setShowEmailFeedback(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">User name</label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {showEmailFeedback && !isEmailValid && email.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Invalid email format</p>
            )}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            
            {showPasswordFeedback && (
              <div className="text-sm text-gray-600 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className={passwordChecks.length ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.length ? '✓' : '✗'} 8+ characters
                  </div>
                  <div className={passwordChecks.uppercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.uppercase ? '✓' : '✗'} Uppercase
                  </div>
                  <div className={passwordChecks.lowercase ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.lowercase ? '✓' : '✗'} Lowercase
                  </div>
                  <div className={passwordChecks.number ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.number ? '✓' : '✗'} Number
                  </div>
                  <div className={passwordChecks.specialChar ? 'text-green-500' : 'text-red-500'}>
                    {passwordChecks.specialChar ? '✓' : '✗'} Special char
                  </div>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isPasswordValid || loading}
            className={`w-full py-2 rounded-lg transition-all flex items-center justify-center ${
              isPasswordValid && !loading
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}