import Booking from "../models/booking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Theatre,Show } from "../models/theatre.model.js";
import sendEmail from '../utils/sendEmail.js'; // adjust path if needed
import {User} from '../models/user.model.js'; // adjust path if needed


//book a ticket for a show
const bookShow = asyncHandler(async (req, res) => {
  const { theatreId, showId, selectedSeats } = req.body;
  console.log("Received theatreId:", theatreId); // debug
  const userId = req.user._id;

  const theatre = await Theatre.findById(theatreId); // ✅ FIXED HERE
  console.log("Found theatre:", theatre); // debug
  if (!theatre) throw new ApiError(404, 'Theatre not found');
    
  const show = theatre.shows.find((s) => s._id.toString() === showId); // ✅ Works

  if (!show) throw new ApiError(404, 'Show not found');

  const alreadyBooked = selectedSeats.some(seat => show.bookedSeats.includes(seat));
  if (alreadyBooked) throw new ApiError(400, 'Some seats are already booked');

  show.bookedSeats.push(...selectedSeats);
  await theatre.save();

  const newBooking = await Booking.create({
    userId,
    theatreId,
    showId,
    eventId: show.eventId,
    showSlot: show.showSlot,
    selectedSeats
  });
  // ✅ Send confirmation email
  const user = await User.findById(userId); // Make sure you have User model
  const seatList = selectedSeats.join(', ');

  await sendEmail(
    user.email,
    'Bookify - Ticket Confirmation 🎟️',
    `Hello ${user.username},\n\nYour booking was successful!\n\nTheatre: ${theatre.name}\nShow Time: ${show.showSlot}\nSeats: ${seatList}\n\nEnjoy your show!\n\n- Bookify Team`
  );
  
  res.status(201).json(new ApiResponse(201, newBooking, 'Booking successful'));
});

// cancel a booking
const cancelBooking = asyncHandler(async (req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, 'Booking not found');

    if (booking.userId.toString() !== userId.toString()) {
        throw new ApiError(403, 'You are not authorized to cancel this booking');
    }

    // Mark booking as cancelled
    booking.status = 'cancelled';
    await booking.save();

    // Remove seats from show
    const theatre = await Theatre.findById(booking.theatreId);
    if (!theatre) throw new ApiError(404, 'Theatre not found');

    const show = theatre.shows.id(booking.showId);
    if (!show) throw new ApiError(404, 'Show not found');

    // Filter out cancelled seats
    show.bookedSeats = show.bookedSeats.filter(
        seat => !booking.selectedSeats.includes(seat)
    );

    await theatre.save();

    res.status(200).json(new ApiResponse(200, booking, 'Booking cancelled and seats freed'));
});


//get all bookings for a user
const getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId })
  .populate('theatreId', 'name location')
  .populate('eventId', 'title date');
    res.status(200).json(new ApiResponse(200, bookings, 'Bookings retrieved successfully'));
});

//get all theatre bookings

// const getTheatreBookings = asyncHandler(async (req, res) => {
//   const 
// });

export { bookShow ,cancelBooking, getUserBookings };