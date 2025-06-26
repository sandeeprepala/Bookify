import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/EventRevenue.css';

const EventRevenue = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [revenue, setRevenue] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;

        const res = await axios.get(`${backendURL}/api/v1/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(res.data.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [backendURL]);

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
              `${backendURL}/api/v1/admin/revenue`,
              { eventId: selectedEvent },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
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
