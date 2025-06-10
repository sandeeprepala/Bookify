import express from 'express';
// import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
// app.use(cors());
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  credentials: true               // ✅ allow sending cookies
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser()); // Middleware to parse cookies


// Import routes
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import eventRouter from './routes/eventRoute.js';
import theatreRouter from './routes/theatreRoute.js';
import showRouter from './routes/showRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import paymentRouter from './routes/paymentRoute.js';
// Use routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/theatres', theatreRouter);
app.use('/api/v1/shows', showRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/payments', paymentRouter);

export { app };