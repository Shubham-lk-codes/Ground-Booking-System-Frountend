/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set up Axios default base URL
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend URL
axios.defaults.withCredentials = true; // Include cookies for authentication

export const AdminDashboard = () => {
  const [grounds, setGrounds] = useState([]); // Store grounds data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    amenities: '',
    pricePerHour: '',
    description: '',
    image: null, // Add image file to form data
  });
  const [editingId, setEditingId] = useState(null); // Track if editing
  const [message, setMessage] = useState(''); // Success/Error message

  // Fetch all grounds on component mount
  useEffect(() => {
    fetchGrounds();
  }, []);

  // Fetch grounds from the backend
  const fetchGrounds = async () => {
    try {
      const response = await axios.get('/grounds'); // Adjust route to backend API
      setGrounds(response.data.grounds || []); // Handle data from backend
    } catch (error) {
      console.error("Error fetching grounds:", error);
      setMessage('Error fetching grounds data');
      setGrounds([]); // Fallback to empty array on error
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Update image file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission for adding/updating a ground
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataObj.append(key, formData[key]);
        }
      });

      if (editingId) {
        // Update ground
        await axios.put(`/grounds/update/${editingId}`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Ground updated successfully');
      } else {
        // Add new ground
        await axios.post('/grounds/add', formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMessage('Ground added successfully');
      }

      fetchGrounds(); // Refresh list
      resetForm(); // Reset form state
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage('Error submitting the ground data');
    }
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  // Reset form state
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      location: '',
      amenities: '',
      pricePerHour: '',
      description: '',
      image: null,
    });
  };

  // Populate form with ground data for editing
  const handleEdit = (ground) => {
    setEditingId(ground._id);
    setFormData({
      name: ground.name,
      location: ground.location,
      amenities: ground.amenities.join(', '),
      pricePerHour: ground.pricePerHour,
      description: ground.description,
      image: null, // Reset image when editing
    });
  };

  // Delete a ground
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/grounds/delete/${id}`);
      fetchGrounds(); // Refresh list
      setMessage('Ground deleted successfully');
    } catch (error) {
      console.error("Error deleting ground:", error);
      setMessage('Error deleting the ground');
    }
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="admin-dashboard bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Admin Dashboard</h1>
      {message && <p className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</p>}

      {/* Form for Adding/Editing Ground */}
      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md mb-6">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ground Name"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            placeholder="Amenities (comma separated)"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="pricePerHour"
            value={formData.pricePerHour}
            onChange={handleInputChange}
            placeholder="Price per Hour"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
        >
          {editingId ? 'Update' : 'Add'} Ground
        </button>
      </form>

      {/* Ground List */}
      {grounds.length > 0 ? (
        <div className="ground-list grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {grounds.map((ground) => (
            <div key={ground._id} className="ground-item bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">{ground.name}</h3>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {ground.location}</p>
              <p className="text-gray-600 mb-2"><strong>Amenities:</strong> {ground.amenities.join(', ')}</p>
              <p className="text-gray-600 mb-2"><strong>Price per Hour:</strong> ₹{ground.pricePerHour}</p>
              <p className="text-gray-600 mb-2"><strong>Description:</strong> {ground.description}</p>
              {ground.imageUrl && (
                <img src={ground.imageUrl} alt={ground.name} className="mb-2 rounded" />
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(ground)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ground._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No grounds available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
