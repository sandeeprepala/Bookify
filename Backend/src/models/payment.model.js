import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: {// Reference to the booking associated with this payment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  paymentMethod: String, // e.g., "card", "UPI"
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending',
  },
  amount: Number,
  transactionId: String,
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model('Payment', paymentSchema);
