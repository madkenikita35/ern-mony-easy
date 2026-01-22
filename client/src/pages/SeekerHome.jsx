import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeekerHome = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetching from your existing /api/jobs route
        const { data } = await axios.get('http://localhost:5000/api/jobs/all');
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs", err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const token = profile?.token;

      if (!token) return alert("Please login to apply");

      await axios.post(`http://localhost:5000/api/applications/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Application sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply.");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500 font-bold">Finding jobs for you...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#68ceed] via-[#a7b5e8] to-[#f2f6f7] pb-10">
      <header className="bg-indigo-600 text-white p-6 shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ern Mony Easy</h1>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="text-sm bg-indigo-700 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available right now. Check back later!</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-gradient-to-r from-[#f2f6f7] via-[#a7b5e8] to-[#68ceed] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                    <p className="text-indigo-600 font-semibold">₹{job.wage} • {job.duration}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{job.location}</span>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{job.description}</p>

                <div className="flex gap-3">
                  {/* Video Button - Opens URL in new tab */}
                  <a 
                    href={job.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-50 text-blue-600 text-center py-3 rounded-xl font-bold border border-blue-100 hover:bg-blue-100 transition"
                  >
                    Watch Video
                  </a>
                  
                  {/* One-Click Apply Button */}
                  <button 
                    onClick={() => handleApply(job._id)}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-indigo-700 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default SeekerHome;