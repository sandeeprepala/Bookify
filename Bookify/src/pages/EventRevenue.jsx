import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/EventRevenue.css'; // Import your CSS

const EventRevenue = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;

        const res = await axios.get('/api/v1/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched events:', res.data.data); // Adjust if your data is nested differently
        setEvents(res.data.data || []); // Set the events; adjust path according to your API response
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='revenue-container'>
        <h1>Total Revenue</h1>
      <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">-- Select an Event --</option>
        {(events || []).map((event) => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>

      <button
        onClick={async () => {
          if (!selectedEvent) return alert('Choose an event.');
          try {
            const userDataString = localStorage.getItem('bookifyUser');
            const token = userDataString ? JSON.parse(userDataString).accessToken : null;

            const res = await axios.post(
              '/api/v1/admin/revenue',
              { eventId: selectedEvent },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log('Fetched revenue:', res.data.data); // Adjust if your data is nested differently
            setRevenue(res.data.data);
          } catch (error) {
            console.error('Error fetching revenue:', error);
            alert('Failed to get revenue.');
          }
        }}
      >
        Get Revenue
      </button>

      {revenue !== null && (
        <div className='revenue'>
          <h3>Total Revenue: ₹{revenue}</h3>
        </div>
      )}
    </div>
  );
};

export default EventRevenue;
