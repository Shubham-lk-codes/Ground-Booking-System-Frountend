/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set up Axios defaults
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend URL
axios.defaults.withCredentials = true; // Allow cookies for authentication

export const AdminGroundOwnerDashboard = () => {
  const [groundOwners, setGroundOwners] = useState([]); // Ground owners data
  const [message, setMessage] = useState(''); // Success/Error message

  // Fetch ground owners when the component mounts
  useEffect(() => {
    fetchGroundOwners();
  }, []);

  // Fetch ground owners from the backend
  const fetchGroundOwners = async () => {
    try {
      const response = await axios.get('/ground-owners'); // Matches the route in your backend
      setGroundOwners(response.data.owners || []);
    } catch (error) {
      console.error('Error fetching ground owners:', error);
      setMessage('Error fetching ground owners data');
    }
  };

  // Approve a ground owner
  const handleApprove = async (id) => {
    try {
      await axios.put(`/ground-owners/${id}/approve`); // Matches the approve route in your backend
      setMessage('Ground owner approved successfully');
      fetchGroundOwners(); // Refresh the ground owners list
    } catch (error) {
      console.error('Error approving ground owner:', error);
      setMessage('Error approving ground owner');
    }
    setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
  };

  // Reject a ground owner
  const handleReject = async (id) => {
    try {
      await axios.delete(`/ground-owners/${id}/reject`); // Matches the reject route in your backend
      setMessage('Ground owner rejected and removed successfully');
      fetchGroundOwners(); // Refresh the ground owners list
    } catch (error) {
      console.error('Error rejecting ground owner:', error);
      setMessage('Error rejecting ground owner');
    }
    setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
  };

  return (
    <div className="admin-dashboard bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Admin - Manage Ground Owners</h1>
      {message && <p className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</p>}

      {/* Ground Owner List */}
      {groundOwners.length > 0 ? (
        <div className="ground-owner-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groundOwners.map((owner) => (
            <div key={owner._id} className="ground-owner-item bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">{owner.name}</h3>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> {owner.email}</p>
              <p className="text-gray-600 mb-2"><strong>Contact:</strong> {owner.contact}</p>
              <p className="text-gray-600 mb-2"><strong>Status:</strong> {owner.status}</p>
              <div className="flex space-x-2">
                {owner.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(owner._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(owner._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-4">No ground owners available</p>
      )}
    </div>
  );
};

export default AdminGroundOwnerDashboard;
