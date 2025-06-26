import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.css'; // create this CSS file for styles
import axios from 'axios';

const Logout = () => {
 const handleLogout = async () => {
  try {
    // const token = localStorage.getItem("accessToken");
   const userDataString = localStorage.getItem('bookifyUser');
   const token = userDataString ? JSON.parse(userDataString).accessToken : null;
// if (userDataString) {
//   const userData = JSON.parse(userDataString);
//   console.log('Access Token:', userData.accessToken);
// } else {
//   console.log('No user data found in localStorage');
// }
    if (!token) {
      console.error("No access token found in localStorage");
      return;
    }
     

    const res = await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {}, // body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout success:", res.data.message);
    localStorage.clear();
    window.location.href = "/";
    console.log(res.data);
  } catch (err) {
    console.error("Logout failed:", err.response?.data || err.message);
  }
};



  return <button className='logout-button' onClick={handleLogout}>Logout</button>;
};


export default Logout;
