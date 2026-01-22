// 
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // STEP 1: Import the navigation tool

const EmployerDash = () => {
  const [user, setUser] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const isFetched = useRef(false);
  const navigate = useNavigate(); // STEP 2: Initialize the navigation tool

  useEffect(() => {
    if (isFetched.current) return;

    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      try {
        const parsedData = JSON.parse(storedProfile);
        const userData = parsedData.user || parsedData;

        if (userData && userData._id) {
          setUser(userData);
          const startDate = new Date(userData.trialStartDate || new Date());
          const now = new Date();
          const timeDiff = Math.abs(now - startDate);
          const daysPassed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          const remaining = 8 - daysPassed;
          
          setDaysLeft(remaining > 0 ? remaining : 0);
          isFetched.current = true; 
        }
      } catch (err) {
        console.error("Profile Parse Error:", err);
      }
    }
  }, []);

  if (!user) return <div className="p-20 text-center font-bold">Loading Your Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>
        </header>

        <div className={`p-6 rounded-xl mb-8 text-white shadow-lg ${user.isSubscribed ? 'bg-green-600' : 'bg-orange-500'}`}>
          <h2 className="text-xl font-bold mb-1">
            {user.isSubscribed ? '✅ Subscription Active' : '⏳ Trial Status'}
          </h2>
          <p className="opacity-90 font-medium">
            {user.isSubscribed 
              ? `Welcome back, ${user.name}!` 
              : `You have ${daysLeft} days remaining in your free trial.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-blue-600 mb-2">Create Job Post</h3>
            <p className="text-gray-500 text-sm mb-4">Post a new job with a video for seekers to watch.</p>
            {/* STEP 3: Add the onClick event to the button */}
            <button 
              onClick={() => navigate('/post-job')} 
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Post Now
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-2">My Applications</h3>
            <p className="text-gray-500 text-sm mb-4">View and manage seekers who applied to your jobs.</p>
            {/* STEP 4: Add the onClick event to the inbox button */}
            <button 
              onClick={() => navigate('/view-applications')}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Check Inbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDash;
