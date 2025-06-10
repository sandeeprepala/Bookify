import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../styles/Navbar.css';

const Navbar = () => {
  const userDataString = localStorage.getItem('bookifyUser');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const isAdmin = userData?.user.role === "admin";

  return (
    <nav className="navbar">
      <div className="navbar-logo"><img src="https://i.pinimg.com/736x/56/1b/8b/561b8b23218724f512c98b4ec5281017.jpg" width={70} height={70} /></div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/events" className="navbar-link">Events</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
        {isAdmin ? (
          <Link to="/admin" className="navbar-link">Admin</Link>
        ) : (
          <Link to="/bookings/my-bookings" className="navbar-link">Bookings</Link>
        )}
        <Logout />

        
      </div>
    </nav>
  );
};

export default Navbar;
