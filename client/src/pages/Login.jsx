// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signIn } from '../api';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // 1. Send login request to backend
//       const { data } = await signIn(formData);

//       // 2. Save user data and token to localStorage
//       localStorage.setItem('profile', JSON.stringify(data));

//       // 3. Redirect based on user role
//       const userRole = data.user?.role;

//       if (userRole === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (userRole === 'employer') {
//         navigate('/employer-dashboard');
//       } else {
//         navigate('/seeker-home');
//       }

//     } catch (err) {
//       // Handles error and removes "unused variable" warnings
//       const errorMsg = err.response?.data?.message || "Invalid Email or Password";
//       alert(errorMsg);
//       console.error("Login Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7]">

//       {/* <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"> */}
//       <div className="p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed]">

//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-indigo-600">Ern Mony Easy</h2>
//           <p className="text-gray-500 mt-2">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               required
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               placeholder="name@example.com"
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               placeholder="••••••••"
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-bold text-white transition shadow-lg ${
//               loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
//             }`}
//           >
//             {loading ? 'Authenticating...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             New to the platform?{' '}
//             <span
//               onClick={() => navigate('/register')}
//               className="text-indigo-600 font-semibold cursor-pointer hover:underline"
//             >
//               Create an account
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signIn } from "../api";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await signIn(formData);
//       localStorage.setItem("profile", JSON.stringify(data));

//       const userRole = data.user?.role;
//       if (userRole === "admin") navigate("/admin-dashboard");
//       else if (userRole === "employer") navigate("/employer-dashboard");
//       else navigate("/seeker-home");
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || "Invalid Email or Password";
//       alert(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] p-4">
//       {/* Main Container: Split into Left and Right */}
//       <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[550px]">
//         {/* LEFT SIDE: Image/Pattern Section */}
//         <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
//             alt="Workspace"
//             className="absolute inset-0 w-full h-full object-cover opacity-80"
//           />
//           <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white bg-gradient-to-t from-indigo-900/80 to-transparent">
//             <h2 className="text-4xl font-bold">Ern Mony Easy</h2>
//             <p className="mt-2 text-indigo-100 text-lg">
//               Connecting workers with opportunities instantly through video.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE: Login Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-gray-500 mt-2">
//               Please enter your details to sign in
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50"
//                 placeholder="name@example.com"
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-gray-50"
//                 placeholder="••••••••"
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-4 rounded-xl font-bold text-white transition shadow-lg transform active:scale-95 ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {loading ? "Authenticating..." : "Sign In"}
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//             <p className="text-gray-600">
//               New to the platform?{" "}
//               <span
//                 onClick={() => navigate("/register")}
//                 className="text-indigo-600 font-bold cursor-pointer hover:text-indigo-800 transition"
//               >
//                 Create an account
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api";
import backgroundImage from "../assets/bg.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await signIn(formData);
      localStorage.setItem("profile", JSON.stringify(data));

      // CHANGE THIS: Send everyone to the same landing page
      navigate("/main-home");
    } catch (err) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        // 2. Use the imported variable
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark Overlay to make the center card pop */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Card Container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden min-h-[550px]">
        {/* LEFT SIDE: Image Section */}
        <div className=" hidden md:flex md:w-1/2 relative overflow-hidden">
          <img
            src=" https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
            alt="Office"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white ">
            <h2 className="text-4xl font-bold">Ern Mony Easy</h2>
            <p className="mt-2 text-indigo-100 text-lg">
              Your gateway to instant daily work.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-800 mt-2">
              Log in to manage your opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white/50 shadow-sm"
                placeholder="name@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white/50 shadow-sm"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition shadow-lg transform active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-800">
              New to the platform?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-600 font-extrabold cursor-pointer hover:text-indigo-800 transition underline decoration-2 underline-offset-4"
              >
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
