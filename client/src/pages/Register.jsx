import React, { useState } from 'react';
import { signUp } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      alert("Registration Successful! Please login.");
      navigate('/'); // Go back to login page
    } catch (err) {
      // Using 'err' here removes the ESLint warning
      const errorMessage = err.response?.data?.message || "Registration failed. Try again.";
      alert(errorMessage);
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] p-4">
      <form onSubmit={handleSubmit} className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join Ern Mony Easy</h2>
        
        <input type="text" placeholder="Full Name" required className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          
        <input type="email" placeholder="Email Address" required className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          
        <input type="password" placeholder="Password" required className="w-full p-3 mb-4 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">I am a:</label>
          <select 
            className="w-full p-3 border rounded bg-white"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="seeker">Job Seeker (Looking for work)</option>
            <option value="employer">Employer (Posting jobs)</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Create Account
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;