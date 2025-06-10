import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  showSlot: { type: String, enum: ['9 AM', '12 PM', '3 PM' , '6 PM' , '9 PM'], required: true },
  bookedSeats: [{ type: String }] // e.g., ["A1", "B5"]
});

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  shows: [showSchema]
}, { timestamps: true });

const Theatre = mongoose.model('Theatre', theatreSchema);
const Show = mongoose.model('Show', showSchema);
export {Theatre,Show};
