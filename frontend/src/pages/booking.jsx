import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SeatBooking.css';
import { useNavigate } from'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const Booking = ({ showId, theatreId }) => {
  const navigate = useNavigate();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const userDataString = localStorage.getItem('bookifyUser');
        const token = userDataString ? JSON.parse(userDataString).accessToken : null;
        const response = await axios.get(`${BACKEND_URL}/api/v1/theatres/${theatreId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const theatre = response.data.data;
        const show = theatre.shows.find((s) => s._id === showId);
        setBookedSeats(show?.bookedSeats || []);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();
  }, [showId, theatreId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    const userDataString = localStorage.getItem('bookifyUser');
    const token = userDataString ? JSON.parse(userDataString).accessToken : null;

    try {
      const totalAmount = selectedSeats.length * 200;

      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/payments/create-order`,
        { amount: totalAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const { id: order_id, amount } = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Bookify",
        description: "Movie Ticket Booking",
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `${BACKEND_URL}/api/v1/payments/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (verifyRes.data.success) {
            await axios.post(
              `${BACKEND_URL}/api/v1/bookings/book`,
              {
                theatreId,
                showId,
                selectedSeats,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            alert("Booking successful!");
            setSelectedSeats([]);
            navigate("/bookings/my-bookings");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Sandeep Repala",
          email: "test@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment/Booking error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="seat-booking-container">
      <p className='sections'>
        <button className='green'></button> Your Seat Booking
        <button className='red'></button> Already Booked
        <button className='seat'></button> Not Selected
      </p>
      <div className="seat-grid">
        {rows.map((row) =>
          Array.from({ length: seatsPerRow }, (_, i) => {
            const seat = `${row}${i + 1}`;
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            return (
              <button
                key={seat}
                className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                disabled={isBooked}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </button>
            );
          })
        )}
      </div>

      <div className='screen'></div>
      <button
        onClick={handleBooking}
        className="book-button"
        disabled={selectedSeats.length === 0}
      >
        Book Selected Seats
      </button>
    </div>
  );
};

export default Booking;
