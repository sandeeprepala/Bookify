import express from 'express';
import { bookShow,cancelBooking,getUserBookings } from '../controllers/booking.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const bookingRouter = express.Router();

bookingRouter.route('/book').post(verifyJWT, bookShow);
bookingRouter.route('/:bookingId').delete(verifyJWT, cancelBooking);
bookingRouter.route('/my-bookings').get(verifyJWT, getUserBookings);

export default bookingRouter;