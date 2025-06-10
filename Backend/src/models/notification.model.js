import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {// Reference to the user receiving the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  isRead: {// Indicates if the notification has been read
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model('Notification', notificationSchema);
