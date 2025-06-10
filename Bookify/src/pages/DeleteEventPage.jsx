import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const DeleteEventPage = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // grabs `:id` from the URL

  useEffect(() => {
    const deleteEvent = async () => {
      const token = JSON.parse(localStorage.getItem('bookifyUser'))?.accessToken;
      try {
        await axios.delete(`/api/v1/events/delete-event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

    deleteEvent();
  }, [id]);
};

export default DeleteEventPage;