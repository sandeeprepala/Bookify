import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeWithUser from '../components/HomeWithUser';
import HomeNoUser from '../components/HomeNoUser';
import MovieSlideBar from '../components/MovieSlideBar';
import AboutUs from '../components/AboutUs';
import OurCollab from '../components/OurCollabs';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bookifyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser).user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bookifyUser');
    navigate('/login');
  };

  return (
    <div>
     
      {user ? <HomeWithUser user={user} onLogout={handleLogout} /> : <HomeNoUser />}
      <AboutUs />
      <OurCollab/>
    </div>
  );
};

export default Home;
