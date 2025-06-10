import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  showId: { type: String, required: true }, // show's _id from theatre.shows
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  showSlot: { type: String, required: true },
  selectedSeats: [{ type: String, required: true }],
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
