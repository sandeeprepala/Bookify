import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddShowForm from './AddShowForm';
import DeleteShowButton from './DeleteShowButton';
import '../styles/Admin.css';
import EventRevenue from './EventRevenue';

const Admin = () => {
  const [selectedTheatreId, setSelectedTheatreId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    if (!selectedTheatreId) {
      alert("Please select a theatre first.");
      return;
    }
    setShowForm(true);
  };

  return (
    <div className="admin-container">
      <div className="head">
        <h2>Add and Delete Shows in Specified Theatre</h2>
        <div className="controls">
          <select
            value={selectedTheatreId}
            onChange={(e) => setSelectedTheatreId(e.target.value)}
          >
            <option value="">-- Select Theatre --</option>
            <option value="6843e3be907fe3f88012f04e">PVR Cinemas</option>
            <option value="6844442bd5cad16b388a4d77">Asian Cinemas</option>
            <option value="6844443bd5cad16b388a4d7d">INOX</option>
            <option value="68444447d5cad16b388a4d83">Cinepolis</option>
            <option value="6844444fd5cad16b388a4d89">SRS Cinemas</option>
            <option value="6844445ed5cad16b388a4d8f">Carnival Cinemas</option>
            <option value="68444468d5cad16b388a4d95">Central Mall Cinema</option>
            <option value="68444472d5cad16b388a4d9b">VR Cinemas</option>
            <option value="68444479d5cad16b388a4da1">Big Cinemas</option>
            <option value="6844448bd5cad16b388a4da7">Gold Cinema</option>
            <option value="68444492d5cad16b388a4dad">Galaxy Theatre</option>
          </select>
          <button onClick={handleAddClick}>Add Show</button>
        </div>
      </div>

      {showForm && selectedTheatreId && (
        <div className="form-section">
          <AddShowForm theatreId={selectedTheatreId} />
        </div>
      )}

      {selectedTheatreId && (
        <TheatreShows theatreId={selectedTheatreId} />
      )}
      <EventRevenue/>
    </div>
  );
};

const TheatreShows = ({ theatreId }) => {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
      const res = await axios.get(`/api/v1/theatres/${theatreId}`);
      setShows(res.data.data.shows);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [theatreId]);

  return (
    <div className="shows-section">
      <h2>Shows</h2>
      {shows.map((show) => (
        <div key={show._id} className="show-card">
          <p><strong>Event ID:</strong> {show.eventId}</p>
          <p><strong>Slot:</strong> {show.showSlot}</p>
          <p><strong>Booked Seats:</strong> {show.bookedSeats.join(', ')}</p>
          <DeleteShowButton
            theatreId={theatreId}
            showId={show._id}
            onSuccess={fetchShows}
          />
        </div>
      ))}
      
      
    </div>
  );
};

export default Admin;
