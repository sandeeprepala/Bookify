import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddShowForm.css';

const AddShowForm = ({ theatreId }) => {
  const [eventId, setEventId] = useState('');
  const [showSlot, setShowSlot] = useState('');
  const [bookedSeatsInput, setBookedSeatsInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookedSeats = bookedSeatsInput
      .split(',')
      .map(seat => seat.trim())
      .filter(seat => seat); // remove empty strings

    const show = { eventId, showSlot, bookedSeats };

    try {
      const userDataString = localStorage.getItem('bookifyUser');
      const token = userDataString ? JSON.parse(userDataString).accessToken : null;

      const response = await axios.post(`/api/v1/shows/${theatreId}`, show, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('Show added successfully!');
      setEventId('');
      setShowSlot('');
      setBookedSeatsInput('');
    } catch (error) {
      console.error('Error adding show:', error);
      alert('Failed to add show');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-show-form">
      <div>
        <label>Event ID:</label>
        <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} required />
      </div>

      <div>
        <label>Show Slot:</label>
        <input type="text" value={showSlot} onChange={(e) => setShowSlot(e.target.value)} required />
      </div>

      <div>
        <label>Booked Seats (comma separated):</label>
        <input
          type="text"
          value={bookedSeatsInput}
          onChange={(e) => setBookedSeatsInput(e.target.value)}
          placeholder="A1, A2, B3"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddShowForm;
