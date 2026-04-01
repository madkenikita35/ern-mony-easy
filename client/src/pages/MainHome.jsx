// import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.png";

const MainHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"))?.user;

  return (
    <div
      className=" min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Background Overlays & Decorative Glows */}
      <div className="absolute inset-0 bg-black/65 fixed"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Top Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Welcome, <span className="text-blue-400">{user?.name}</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mx-auto">
            Connecting local talent with instant opportunities. What is your
            goal today?
          </p>
        </div>

        {/* 1. Statistics Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 bg-white/5 backdrop-blur-sm py-6 rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">
              Jobs Posted
            </p>
          </div>
          <div className="hidden md:block w-[1px] bg-white/20 h-12"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">1.2k</p>
            <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">
              Active Seekers
            </p>
          </div>
          <div className="hidden md:block w-[1px] bg-white/20 h-12"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">₹2L+</p>
            <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">
              Wages Paid
            </p>
          </div>
        </div>

        {/* 2. Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Option 1: Job Seeker */}
          <div
            onClick={() => navigate("/seeker-home")}
            className="group bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
              🔍
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Find Work</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Browse verified daily wage jobs near you. Use our one-click apply
              system to start working immediately.
            </p>
            <div className="mt-6 inline-block text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
              Start Searching →
            </div>
          </div>

          {/* Option 2: Employer */}
          <div
            onClick={() => navigate("/employer-dashboard")}
            className="group bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
              📢
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Hire Talent</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Need help fast? Post your job requirements via video and get
              applications from skilled workers in minutes.
            </p>
            <div className="mt-6 inline-block text-indigo-400 font-bold group-hover:translate-x-2 transition-transform">
              Post a Job →
            </div>
          </div>
        </div>

        {/* 3. "How It Works" Section */}
        <div className="pt-10 border-t border-white/10">
          <h3 className="text-white font-bold text-xl mb-8 opacity-80 uppercase tracking-widest">
            How Ern Mony Easy Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 text-left">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                1
              </span>
              <p className="text-gray-300 text-sm">
                Watch short video descriptions to understand the job
                requirements clearly.
              </p>
            </div>
            <div className="flex items-start gap-4 text-left">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                2
              </span>
              <p className="text-gray-300 text-sm">
                Apply instantly. No complex resumes needed, just your verified
                profile.
              </p>
            </div>
            <div className="flex items-start gap-4 text-left">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                3
              </span>
              <p className="text-gray-300 text-sm">
                Complete the work and receive your daily wages directly and
                safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button (Floating Top Right) */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="absolute top-6 right-6 z-20 bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 border border-white/10 px-5 py-2 rounded-full transition-all text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default MainHome;
