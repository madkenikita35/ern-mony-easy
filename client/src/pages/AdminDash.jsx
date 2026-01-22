import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem('profile'));
        const { data } = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${profile.token}` }
        });
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleSubscription = async (userId) => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      await axios.patch(`http://localhost:5000/api/admin/verify-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${profile.token}` }
      });
      // Update UI locally
      setUsers(users.map(u => u._id === userId ? { ...u, isSubscribed: !u.isSubscribed } : u));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Management Console...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Admin Control Center</h1>
          <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="bg-red-600 px-4 py-2 rounded">Logout</button>
        </header>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Trial Start</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-700 transition">
                  <td className="p-4">{user.name}<br/><span className="text-xs text-gray-500">{user.email}</span></td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 text-sm">{new Date(user.trialStartDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.isSubscribed ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}`}>
                      {user.isSubscribed ? 'PAID' : 'TRIAL'}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role === 'employer' && (
                      <button 
                        onClick={() => toggleSubscription(user._id)}
                        className="bg-indigo-600 text-xs px-3 py-1 rounded hover:bg-indigo-500"
                      >
                        {user.isSubscribed ? 'Revoke' : 'Confirm Payment'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;