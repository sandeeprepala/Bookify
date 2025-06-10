import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import Event from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Booking from "../models/booking.model.js";
import mongoose from "mongoose";
import { Show } from "../models/theatre.model.js";
import { Theatre } from "../models/theatre.model.js";

// functions for a  admin 
//1. Create an event
//2. Delete an event
//3.edit an event
//4. Get all events

const createEvent = asyncHandler(async (req, res, next) => {
    // steps
    // 1. Validate request body
    // 2. Check if event already exists
    // 3. Create new event
    // 4. Save event to database
    // 5. Send response
    const { user } = req;
    if (!user || user.role !== 'admin') { 
        throw new ApiError("Only admins can create events", 403);
    }
    const { title, description, date, venue, language, rating } = req.body;
    // console.log(req.body);
    const coverImagePath = req.file? req.file.path : ""; // Assuming you're using multer for file uploads
    // console.log("Cover image path:", coverImagePath);
    if(!coverImagePath) {
        throw new ApiError("Cover image is required", 400);
    }
    const coverImage = await uploadOnCloudinary(coverImagePath);
    if(!coverImage || !coverImage.url) {
        throw new ApiError("Failed to upload cover image in cloudinary", 500);
    }

    if (!title || !date || !venue || !language || !rating) {
        throw new ApiError("All fields are required", 400);
    }

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
        throw new ApiError("Event already exists", 400);
    }

    const event = await Event.create({
        title,
        description,
        date,
        venue,
        coverImage: coverImage.url, // Assuming coverImage is an object with a url property
        language,
        rating, // Ensure rating is a number
        createdBy: req.user._id // assuming req.user is set by auth middleware
    });


    res.status(201).json(new ApiResponse(201, event, "Event created successfully"));
});

const editEvent = asyncHandler(async (req, res, next) => {
    // 1. Validate request params
    const { eventId } = req.params;
    if (!eventId) {
        throw new ApiError("Event ID is required", 400);
    }

    // 2. Extract fields from body
    const { title, description, date, venue, language, rating } = req.body;

    // 3. Handle cover image upload if provided
    let coverImageUrl = null;
    if (req.file && req.file.path) {
        const coverImage = await uploadOnCloudinary(req.file.path);
        if (!coverImage || !coverImage.secure_url) {
            throw new ApiError("Failed to upload cover image to Cloudinary", 500);
        }
        coverImageUrl = coverImage.secure_url;
    }

    // 4. Find event by ID
    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError("Event not found", 404);
    }

    // 5. Authorization check
    if (event.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError("You are not authorized to edit this event", 403);
    }

    // 6. Update fields if provided
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.venue = venue || event.venue;
    event.language = language || event.language;
    event.rating = rating || event.rating;
    if (coverImageUrl) {
        event.coverImage = coverImageUrl; 
    }

    // 7. Save updated event
    await event.save();

    // 8. Send response
    res.status(200).json(new ApiResponse(200, event, "Event updated successfully"));
});


const deleteEvent = asyncHandler(async (req, res) => {
    // Step 1: Extract and validate eventId
    const { eventId } = req.params;
    if (!eventId) {
        throw new ApiError("Event ID is required", 400);
    }

    // Step 2: Find event in DB
    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError("Event not found", 404);
    }

    // Step 3: Authorization check
    if (event.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError("You are not authorized to delete this event", 403);
    }

    // Step 4: Delete event
    await event.deleteOne();

    // Step 5: Send response
    res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
});

// user.controller.js or user.routes.js



const getAllEventsForAdmins = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ createdBy: req.user._id });
  res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
});

const totalEventWiseRevenue = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const objectEventId = new mongoose.Types.ObjectId(eventId);

  const totalRevenue = await Theatre.aggregate([
    { $unwind: "$shows" },
    { $match: { "shows.eventId": objectEventId } },
    {
      $project: { 
        seatCount: { $size: "$shows.bookedSeats" }
      }
    },
    {
      $group: {
        _id: null,
        totalSeatsBooked: { $sum: "$seatCount" }
      }
    }
  ]);

  const seats = totalRevenue[0]?.totalSeatsBooked || 0;
  const totalAmount = seats * 200;

  console.log("Total seats booked:", seats);

  res.status(200).json(new ApiResponse(200, totalAmount, "Total revenue fetched successfully"));
});




export {createEvent, editEvent, deleteEvent, getAllEventsForAdmins,totalEventWiseRevenue};