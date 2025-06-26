import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import Logout from './Logout';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;
        const res = await axios.get(`${BASE_URL}/api/v1/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className='noUser'>User not found.</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-left">
        <div className="avatar"></div>
        <h2>Welcome, {user.username?.split(' ')[0]}</h2>
        <p>Here's your profile information.</p>
      </div>

      <div className="profile-right">
        <form className="profile-form">
          <label>Name</label>
          <input type="text" value={user.username} readOnly />

          <label>Email</label>
          <input type="email" value={user.email} readOnly />

          <label>Role</label>
          <input type="text" value={user.role} readOnly />

          <label>City</label>
          <input type="text" value={user.city} readOnly />

          <label>Joined On</label>
          <input type="text" value={new Date(user.createdAt).toLocaleDateString()} readOnly />
        </form>
      </div>
    </div>
  );
};

export default Profile;
