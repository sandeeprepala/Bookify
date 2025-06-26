import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState('');
  const [userId, setUserId] = useState('');
  const [search, setSearch] = useState('');

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;
        const parsedData = userDataString ? JSON.parse(userDataString) : null;

        const role = parsedData?.user?.role || '';
        const id = parsedData?.user?._id || '';
        setIsAdmin(role);
        setUserId(id);

        const response = await axios.get(`${backendURL}/api/v1/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [backendURL]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="events-container">
      <div className="events-heading">
        <h3>Movies in your City</h3>
        <input
          className='search'
          type="text"
          placeholder='Search Movies 🔍︎'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {isAdmin === "admin" && (
        <button className="add-event-btn" onClick={() => navigate('/create-event')}>
          Add Event
        </button>
      )}

      <div className="cards-wrapper">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.coverImage} alt={event.title} className="event-image" />
            <div className="event-details">
              <h2>{event.title}</h2>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Language:</strong> {event.language}</p>
              <p><strong>Rating:</strong> {event.rating}/5</p>
              <p><strong>Ticket Prize: Rs 200</strong></p>
            </div>

            {isAdmin === "admin" && String(userId) === String(event.createdBy) && (
              <button className="delete-event-btn" onClick={() => navigate(`/delete-event/${event._id}`)}>
                Delete
              </button>
            )}

            <button className='book-event-btn' onClick={() => navigate(`/event/${event._id}/theatres`)}>
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
