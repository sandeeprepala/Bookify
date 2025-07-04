import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const [yourBookings, setYourBookings] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const userDataString = localStorage.getItem('bookifyUser');
      const token = userDataString ? JSON.parse(userDataString).accessToken : null;

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api/v1/bookings/my-bookings`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const reversedData = res.data.data.slice().reverse();   
      setYourBookings(reversedData); // Show most recent first
    };

    fetchBookedSeats();
  }, []);

  return (
    <div>
      <div className='main'>
        <h1>Your Bookings</h1>
        {yourBookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className='heading'><h5>{booking.eventId.title}</h5></div>
            <p>Date: {new Date(booking.eventId.date).toLocaleString()}</p>
            <p>{booking.theatreId.name}, {booking.theatreId.location}</p>
            <p>Slot: {booking.showSlot}</p>
            <p>Seats: {booking.selectedSeats.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
