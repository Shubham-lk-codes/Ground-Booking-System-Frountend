/* AdminDashboard.js */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

 export const AdminDashboardForOwner = () => {
  const [groundOwners, setGroundOwners] = useState([]);

  useEffect(() => {
    fetchGroundOwners();
  }, []);

  const fetchGroundOwners = async () => {
    try {
      const response = await axios.get('/api/admin/ground-owners');
      setGroundOwners(response.data);
    } catch (error) {
      console.error("Error fetching ground owners", error);
    }
  };

  const approveGroundOwner = async (id) => {
    try {
      await axios.put(`/api/admin/ground-owners/approve/${id}`);
      fetchGroundOwners();
    } catch (error) {
      console.error("Error approving ground owner", error);
    }
  };

  const deleteGroundOwner = async (id) => {
    try {
      await axios.delete(`/api/admin/ground-owners/${id}`);
      fetchGroundOwners();
    } catch (error) {
      console.error("Error deleting ground owner", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Pending Ground Owner Approvals</h1>
      <ul>
        {groundOwners.map(owner => (
          <li key={owner._id}>
            <p>{owner.name} - {owner.email}</p>
            <button onClick={() => approveGroundOwner(owner._id)}>Approve</button>
            <button onClick={() => deleteGroundOwner(owner._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


