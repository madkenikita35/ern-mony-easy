import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/bg.png";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    location: "",
    wage: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const token = profile?.token;

      await axios.post("http://localhost:5000/api/jobs/post", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(" Job posted successfully! ");
      navigate("/employer-dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to post job. Check your subscription.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className=" absolute inset-0 bg-black/50"></div>

      {/* Transparent Form Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white ">Post New Work</h2>
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="text-gray-300 hover:text-white text-sm transition "
          >
            ✕ Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className=" block text-xs font-semibold text-blue-300 mb-1 ml-1 uppercase">
              Job Details
            </label>
            <input
              type="text"
              placeholder="Job Title (e.g. Delivery Driver)"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <textarea
            placeholder=" Work Description"
            className=" w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <div className=" p-4 bg-blue-500/10 rounded-xl border border-blue-400/30">
            <label className="block text-sm font-semibold text-blue-300 mb-1">
              Video Explanation URL
            </label>
            <input
              type="text"
              placeholder="YouTube or Drive Link"
              className="w-full p-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-blue-200 outline-none focus:bg-white/30"
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              required
            />
          </div>

          <div className=" grid grid-cols-2 gap-4 ">
            <input
              type="text"
              placeholder=" Location"
              className=" p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Wage (₹)"
              className=" p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none "
              onChange={(e) =>
                setFormData({ ...formData, wage: e.target.value })
              }
              required
            />
          </div>

          <input
            type="text"
            placeholder="Duration (e.g. 2 Days / Permanent)"
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-4 rounded-xl font-bold text-white transition shadow-lg transform active:scale-95 ${
              loading
                ? "bg-gray-500/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
            }`}
          >
            {loading ? "Processing..." : "Post Job Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
