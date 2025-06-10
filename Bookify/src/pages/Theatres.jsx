import React, { useEffect, useState } from 'react';
import axios from 'axios';
import booking from './booking';
import { useNavigate } from 'react-router-dom';
import '../styles/Theatre.css';

const Theatre = ({ eventId }) => {
  const navigate = useNavigate();
  const [theatres, setTheatres] = useState([]);
  const [search, setSearch] = useState('');

  const handleClick = (theatreId, showId) =>
  {
      navigate(`/theatre/${theatreId}/${showId}`);
  }

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;
        const res = await axios.get('/api/v1/theatres' ,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setTheatres(res.data.data);
        }
        
       catch (error) {
        console.error('Error fetching theatres', error);
      }
    };
    fetchTheatres();
  }, []);

  const filteredTheatres = theatres.filter(theatre =>
    theatre.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='main'>
      <div className='top'>
      <input
        type="text"
        placeholder="Search theatres..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-bar"
      />
      </div>
        
    <div className="theatre-container">
      
      <div className="theatre-list">
        {filteredTheatres.map(theatre => (
          <div className="theatre-card" key={theatre._id}>
            <h2>{theatre.name}</h2>
            <p>{theatre.location}</p>
            <div className="show-buttons">
              {theatre.shows
                .filter(show => show.eventId === eventId)
                .map((show, index) => (
                  <button key={index} className="show-button" onClick={()=>handleClick(theatre._id,show._id)}>
                    {show.showSlot}
                  </button>
                ))}
                {theatre.shows.filter(show => show.eventId === eventId).length === 0 && (
  <button className="not-available-button">Not Available</button>
)}

            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Theatre;