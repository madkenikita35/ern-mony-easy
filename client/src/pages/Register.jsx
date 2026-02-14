// import React, { useState } from 'react';
// import { signUp } from '../api';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signUp(formData);
//       alert("Registration Successful! Please login.");
//       navigate('/'); // Go back to login page
//     } catch (err) {
//       // Using 'err' here removes the ESLint warning
//       const errorMessage = err.response?.data?.message || "Registration failed. Try again.";
//       alert(errorMessage);
//       console.error("Signup Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] p-4">
//       <form onSubmit={handleSubmit} className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join Ern Mony Easy</h2>

//         <input type="text" placeholder="Full Name" required className="w-full p-3 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

//         <input type="email" placeholder="Email Address" required className="w-full p-3 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

//         <input type="password" placeholder="Password" required className="w-full p-3 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">I am a:</label>
//           <select
//             className="w-full p-3 border rounded bg-white"
//             value={formData.role}
//             onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           >
//             <option value="seeker">Job Seeker (Looking for work)</option>
//             <option value="employer">Employer (Posting jobs)</option>
//           </select>
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
//           Create Account
//         </button>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account? <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer">Login</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { signUp } from "../api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.png"; // Import the background

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      alert("Registration Successful! Please login.");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Try again.";
      alert(errorMessage);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay for background clarity */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Split Container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* LEFT SIDE: Promotional Text/Image Section */}
        <div className="hidden md:flex md:w-5/12 relative overflow-hidden bg-indigo-900/40 border-r border-white/10">
          <div className="p-12 flex flex-col justify-center h-full text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Start Your Journey with{" "}
              <span className="text-blue-400">Ern Mony Easy</span>
            </h2>
            <p className="mt-6 text-gray-200 text-lg">
              Whether you are looking for daily wages or hiring talent via
              video, we've got you covered.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                  ✔
                </span>
                Video-based job postings
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                  ✔
                </span>
                Instant employer contact
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Register Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-gray-300 mt-2">
              Join our growing community today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <input
              type="password"
              placeholder="Create Password"
              required
              className="w-full p-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <div>
              <label className="block text-xs font-semibold text-blue-300 mb-2 ml-1 uppercase">
                Choose your role
              </label>
              <select
                className="w-full p-3.5 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="seeker" className="bg-indigo-900 text-white">
                  Job Seeker (Looking for work)
                </option>
                <option value="employer" className="bg-indigo-900 text-white">
                  Employer (Posting jobs)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition transform active:scale-95"
            >
              Get Started Now
            </button>
          </form>

          <p className="mt-8 text-center text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-white font-bold cursor-pointer hover:underline decoration-blue-500"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
