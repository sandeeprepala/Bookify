import mongoose from 'mongoose';

// const seatTypeSchema = new mongoose.Schema({
//   type: { type: String, required: true },      // e.g., Gold, Silver, Balcony
//   price: { type: Number, required: true },
//   totalSeats: { type: Number, required: true }, // total seats available of this type
// });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: String,

  date: { type: Date, required: true },

  venue: String,

  coverImage: String,

  language: String,

  rating: Number,

  // seatTypes: [seatTypeSchema],  // array of seat types

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
