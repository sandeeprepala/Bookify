import React from 'react'
import { useParams } from 'react-router-dom';
import Booking from './booking.jsx'
const ShowBookingPage = () => {
    const {theatreId , showId} = useParams();
  return <Booking  showId={showId} theatreId={theatreId} />
}

export default ShowBookingPage
