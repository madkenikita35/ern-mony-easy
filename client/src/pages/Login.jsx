import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Send login request to backend
      const { data } = await signIn(formData);
      
      // 2. Save user data and token to localStorage
      localStorage.setItem('profile', JSON.stringify(data));
      
      // 3. Redirect based on user role
      const userRole = data.user?.role;

      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'employer') {
        navigate('/employer-dashboard');
      } else {
        navigate('/seeker-home');
      }
      
    } catch (err) {
      // Handles error and removes "unused variable" warnings
      const errorMsg = err.response?.data?.message || "Invalid Email or Password";
      alert(errorMsg);
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7]">

      {/* <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"> */}
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed]">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">Ern Mony Easy</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="name@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition shadow-lg ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New to the platform?{' '}
            <span 
              onClick={() => navigate('/register')} 
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;