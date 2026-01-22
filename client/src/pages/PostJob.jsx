import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    location: '',
    wage: '',
    duration: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const token = profile?.token;

      // Sending to your existing /api/jobs/post route
      await axios.post('http://localhost:5000/api/jobs/post', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Job posted successfully!");
      navigate('/employer-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job. check your subscription.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Post New Work</h2>
        
        <div className="space-y-4">
          <input type="text" placeholder="Job Title (e.g. Delivery Driver)" className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            
          <textarea placeholder="Work Description" className="w-full p-3 border rounded-xl h-24"
            onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <label className="block text-sm font-semibold text-blue-700 mb-1">Video Explanation URL</label>
            <input type="text" placeholder="YouTube or Drive Link" className="w-full p-2 border rounded-lg"
              onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Location" className="p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            <input type="number" placeholder="Wage (₹)" className="p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, wage: e.target.value})} required />
          </div>

          <input type="text" placeholder="Duration (e.g. 2 Days / Permanent)" className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
        </div>

        <button type="submit" className="w-full mt-6 bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
          Post Job Listing
        </button>
      </form>
    </div>
  );
};

export default PostJob;