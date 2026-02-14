// //
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom"; // STEP 1: Import the navigation tool
// import backgroundImage from "../assets/bg.png";

// const EmployerDash = () => {
//   const [user, setUser] = useState(null);
//   const [daysLeft, setDaysLeft] = useState(0);
//   const isFetched = useRef(false);
//   const navigate = useNavigate(); // STEP 2: Initialize the navigation tool

//   useEffect(() => {
//     if (isFetched.current) return;

//     const storedProfile = localStorage.getItem("profile");
//     if (storedProfile) {
//       try {
//         const parsedData = JSON.parse(storedProfile);
//         const userData = parsedData.user || parsedData;

//         if (userData && userData._id) {
//           setUser(userData);
//           const startDate = new Date(userData.trialStartDate || new Date());
//           const now = new Date();
//           const timeDiff = Math.abs(now - startDate);
//           const daysPassed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//           const remaining = 8 - daysPassed;

//           setDaysLeft(remaining > 0 ? remaining : 0);
//           isFetched.current = true;
//         }
//       } catch (err) {
//         console.error("Profile Parse Error:", err);
//       }
//     }
//   }, []);

//   if (!user)
//     return (
//       <div className="p-20 text-center font-bold">
//         Loading Your Dashboard...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] p-6">
//       <div className="max-w-4xl mx-auto">
//         <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6 rounded-xl shadow-sm">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Employer Dashboard
//           </h1>
//           <button
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/";
//             }}
//             className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
//           >
//             Logout
//           </button>
//         </header>

//         <div
//           className={`p-6 rounded-xl mb-8 text-white shadow-lg ${user.isSubscribed ? "bg-green-600" : "bg-orange-500"}`}
//         >
//           <h2 className="text-xl font-bold mb-1">
//             {user.isSubscribed ? "✅ Subscription Active" : "⏳ Trial Status"}
//           </h2>
//           <p className="opacity-90 font-medium">
//             {user.isSubscribed
//               ? `Welcome back, ${user.name}!`
//               : `You have ${daysLeft} days remaining in your free trial.`}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-xl border border-gray-100 shadow-sm">
//             <h3 className="text-lg font-bold text-blue-600 mb-2">
//               Create Job Post
//             </h3>
//             <p className="text-gray-500 text-sm mb-4">
//               Post a new job with a video for seekers to watch.
//             </p>
//             {/* STEP 3: Add the onClick event to the button */}
//             <button
//               onClick={() => navigate("/post-job")}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
//             >
//               Post Now
//             </button>
//           </div>

//           <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-xl border border-gray-100 shadow-sm">
//             <h3 className="text-lg font-bold text-gray-700 mb-2">
//               My Applications
//             </h3>
//             <p className="text-gray-500 text-sm mb-4">
//               View and manage seekers who applied to your jobs.
//             </p>
//             {/* STEP 4: Add the onClick event to the inbox button */}
//             <button
//               onClick={() => navigate("/view-applications")}
//               className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
//             >
//               Check Inbox
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerDash;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.png";

const EmployerDash = () => {
  const [user, setUser] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const isFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetched.current) return;

    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      try {
        const parsedData = JSON.parse(storedProfile);
        const userData = parsedData.user || parsedData;

        if (userData && userData._id) {
          setUser(userData);
          // Fixed Trial Calculation Logic
          const startDate = new Date(userData.trialStartDate || new Date());
          const now = new Date();
          const diffInTime = now.getTime() - startDate.getTime();
          const daysPassed = Math.floor(diffInTime / (1000 * 3600 * 24));
          const remaining = 8 - daysPassed;

          setDaysLeft(remaining > 0 ? remaining : 0);
          isFetched.current = true;
        }
      } catch (err) {
        console.error("Profile Parse Error:", err);
      }
    } else {
      navigate("/login"); // Redirect if no profile found
    }
  }, [navigate]);

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white font-bold">
        Loading Your Dashboard...
      </div>
    );

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative attachment-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay to keep background sharp but readable */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content Card - Glassmorphism style */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-6 md:p-10">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Employer Panel</h1>
            <p className="text-blue-200">Manage your recruitment</p>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 px-5 py-2 rounded-xl text-sm font-bold transition"
          >
            Logout
          </button>
        </header>

        {/* Status Banner */}
        <div
          className={`p-5 rounded-2xl mb-8 flex items-center justify-between shadow-inner ${
            user.isSubscribed
              ? "bg-green-500/20 border border-green-500/50"
              : "bg-orange-500/20 border border-orange-500/50"
          }`}
        >
          <div>
            <h2
              className={`text-lg font-bold ${user.isSubscribed ? "text-green-300" : "text-orange-300"}`}
            >
              {user.isSubscribed
                ? "✅ Premium Plan Active"
                : "⏳ Free Trial Active"}
            </h2>
            <p className="text-white/80 text-sm">
              {user.isSubscribed
                ? `Unlimited job posts enabled for ${user.name}.`
                : `You have ${daysLeft} days remaining to post for free.`}
            </p>
          </div>
          {!user.isSubscribed && (
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-600 transition">
              Upgrade
            </button>
          )}
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Post Job Card */}
          <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:border-blue-400/50 transition group">
            <h3 className="text-xl font-bold text-blue-300 mb-2">
              Create Job Post
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Share a video and details to attract the best workers instantly.
            </p>
            <button
              onClick={() => navigate("/post-job")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold shadow-lg transition transform group-hover:scale-[1.02]"
            >
              Post New Job
            </button>
          </div>

          {/* Inbox Card */}
          <div className="bg-white/10 p-8 rounded-2xl border border-white/10 hover:border-purple-400/50 transition group">
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              Applicants Inbox
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Review seekers who have applied to your active job listings.
            </p>
            <button
              onClick={() => navigate("/view-applications")}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl font-bold transition transform group-hover:scale-[1.02]"
            >
              Check Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDash;
