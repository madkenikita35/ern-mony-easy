import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem('profile'));
        const token = profile?.token;

        // Fetch applications for this specific employer
        const { data } = await axios.get('http://localhost:5000/api/applications/employer-inbox', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications", err);
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-400">Loading applications...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Received Applications</h1>
        
        {applications.length === 0 ? (
          <div className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-10 rounded-2xl text-center border border-dashed border-gray-300">
            <p className="text-gray-500">No one has applied yet. Make sure your video is clear!</p>
          </div>
        ) : (
          <div className="grid gap-4">
           {applications.map((app) => (
  <div key={app._id} className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
    <div>
      {/* 1. Change app.applicantName to app.seekerId?.name */}
      <h3 className="font-bold text-lg text-gray-800">
        {app.seekerId?.name || "Anonymous Seeker"}
      </h3>
      
      {/* 2. Change app.jobTitle to app.jobId?.title */}
      <p className="text-sm text-gray-500">
        Applied for: <span className="font-semibold text-indigo-600">
          {app.jobId?.title || "Job Deleted"}
        </span>
      </p>
      
      <p className="text-xs text-gray-400 mt-1">
        Date: {new Date(app.createdAt).toLocaleDateString()}
      </p>
    </div>

    <div className="text-right">
      {/* 3. Change app.applicantEmail to app.seekerId?.email */}
      <a 
        href={`mailto:${app.seekerId?.email}?subject=Regarding your application for ${app.jobId?.title}`} 
        className="inline-block bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition"
      >
        Contact Seeker
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