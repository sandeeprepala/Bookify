# Bookify — Event Booking Platform

**Bookify** is an end-to-end event booking platform that lets users discover, book, and manage events easily.  
Admins can manage events, users can book and pay, and organizers can monitor bookings — all in one place.

Live link - https://bookify-app-ten.vercel.app/
---

## 📌 **Features**

✅ Browse events with details, images & availability  
✅ User authentication and role-based access (User/Admin)  
✅ Book events with seats/tickets & real-time availability check  
✅ Payment gateway integration (Razorpay)  
✅ Email notifications for booking confirmations  
✅ Admin Dashboard to add/edit/delete events & manage bookings  
✅ Fully responsive UI

---

## ⚙️ **Tech Stack**

**Frontend:**  
- React.js (Vite)  
- CSS Modules  
- Axios for API calls  
- React Router for navigation

**Backend:**  
- Node.js & Express.js  
- MongoDB (Mongoose) for storing events, users & bookings  
- JWT Authentication & role-based authorization  
- Nodemailer (for emails)  
- Stripe (payments)
- Cloudinary for image uploading

**Deployment:**  
- Frontend: Vercel  
- Backend: Render 
- MongoDB Atlas

---

## 🗂️ **Project Structure**

```plaintext
bookify/
 ├── client/              # React frontend
 │   ├── src/
 │   │   ├── components/  # Reusable UI components
 │   │   ├── pages/       # Home, EventList, EventDetails, BookEvent, Admin
 │   │   ├── App.jsx
 │   │   ├── index.js
 ├── server/              # Node backend
 │   ├── index.js
 │   ├── models/          # Event, User, Booking schemas
 │   ├── routes/          # Auth, Events, Bookings, Admin APIs
 │   ├── controllers/     # Logic for routes
 │   ├── config/          # DB, email, payment configs
 │   ├── .env
 │   ├── package.json
 ├── README.md
 ├── package.json
