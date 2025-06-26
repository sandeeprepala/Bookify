import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; // adjust path as needed
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Footer from './components/Footer';
import Events from './pages/Events'; // adjust path as needed
import Admin from './pages/Admin';
import CreateEvent from './pages/CreateEvent';
import DeleteEventPage from './pages/DeleteEventPage';
import Theatre from './pages/Theatres';
import TheatrePage from './pages/TheatrePage';
import ShowBookingPage from './pages/ShowBookingPage';
import MyBookings from './pages/MyBookings';
import Checkout from './pages/Checkout';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create-event" element={<CreateEvent />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
        <Route path="/delete-event/:id" element={<DeleteEventPage />} />
        <Route path="/event/:eventId/theatres" element={<TheatrePage />} />
        <Route path="/theatre/:theatreId/:showId" element={<ShowBookingPage />} />
        <Route path="/bookings/my-bookings" element={<MyBookings />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
