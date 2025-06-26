import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.css';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const userDataString = localStorage.getItem('bookifyUser');
      const token = userDataString ? JSON.parse(userDataString).accessToken : null;

      if (!token) {
        console.error("No access token found in localStorage");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Logout success:", res.data.message);
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return <button className='logout-button' onClick={handleLogout}>Logout</button>;
};

export default Logout;
