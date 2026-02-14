// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ViewApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const profile = JSON.parse(localStorage.getItem('profile'));
//         const token = profile?.token;

//         // Fetch applications for this specific employer
//         const { data } = await axios.get('http://localhost:5000/api/applications/employer-inbox', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setApplications(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching applications", err);
//         setLoading(false);
//       }
//     };
//     fetchApps();
//   }, []);

//   if (loading) return <div className="p-10 text-center text-gray-400">Loading applications...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Received Applications</h1>

//         {applications.length === 0 ? (
//           <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-10 rounded-2xl text-center border border-dashed border-gray-300">
//             <p className="text-gray-500">No one has applied yet. Make sure your video is clear!</p>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//            {applications.map((app) => (
//   <div key={app._id} className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
//     <div>
//       {/* 1. Change app.applicantName to app.seekerId?.name */}
//       <h3 className="font-bold text-lg text-gray-800">
//         {app.seekerId?.name || "Anonymous Seeker"}
//       </h3>

//       {/* 2. Change app.jobTitle to app.jobId?.title */}
//       <p className="text-sm text-gray-500">
//         Applied for: <span className="font-semibold text-indigo-600">
//           {app.jobId?.title || "Job Deleted"}
//         </span>
//       </p>

//       <p className="text-xs text-gray-400 mt-1">
//         Date: {new Date(app.createdAt).toLocaleDateString()}
//       </p>
//     </div>

//     <div className="text-right">
//       {/* 3. Change app.applicantEmail to app.seekerId?.email */}
//       <a
//         href={`mailto:${app.seekerId?.email}?subject=Regarding your application for ${app.jobId?.title}`}
//         className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition"
//       >
//         Contact Seeker
//       </a>
//     </div>
//   </div>
//   ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewApplications;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.png"; // Import your background

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem("profile"));
        const token = profile?.token;

        const { data } = await axios.get(
          "http://localhost:5000/api/applications/employer-inbox",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setApplications(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications", err);
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-bold">
        Loading applications...
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay for consistent look */}
      <div className="absolute inset-0 bg-black/50 fixed"></div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 pt-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Received Applications
            </h1>
            <p className="text-blue-300 text-sm font-medium">
              Connect with seekers who applied to your jobs
            </p>
          </div>
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl transition"
          >
            ← Back
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-3xl text-center border border-white/10 shadow-2xl">
            <p className="text-gray-300 text-lg mb-2">
              No one has applied yet.
            </p>
            <p className="text-gray-400 text-sm">
              Make sure your video explanations are clear and engaging!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/15 transition group"
              >
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                    {app.seekerId?.name || "Anonymous Seeker"}
                  </h3>

                  <p className="text-sm text-gray-300 mt-1">
                    Applied for:{" "}
                    <span className="font-semibold text-blue-400">
                      {app.jobId?.title || "Job Deleted"}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <span className="opacity-70 italic">Applied on</span>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <a
                    href={`mailto:${app.seekerId?.email}?subject=Regarding your application for ${app.jobId?.title}`}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 active:scale-95 transform"
                  >
                    <span>📧</span> Contact Seeker
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;
