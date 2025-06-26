import React from 'react';
import axios from 'axios';

const DeleteShowButton = ({ theatreId, showId, onSuccess }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this show?');
    if (!confirmDelete) return;

    const userDataString = localStorage.getItem('bookifyUser');
    const token = userDataString ? JSON.parse(userDataString).accessToken : null;
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    try {
      await axios.delete(`${backendURL}/api/v1/shows/${theatreId}/${showId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Show deleted successfully!');
      if (onSuccess) onSuccess(); // Refresh or update UI
    } catch (error) {
      console.error('Failed to delete show:', error);
      alert('Failed to delete show');
    }
  };

  return (
    <button className="delete-show-btn" onClick={handleDelete}>
      Delete Show
    </button>
  );
};

export default DeleteShowButton;
