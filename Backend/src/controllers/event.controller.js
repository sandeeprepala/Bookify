import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import Event from "../models/event.model.js";

// display all events
const getAllEventsForUsers = asyncHandler(async (req, res) => {
  // Return all events for users, no filtering by createdBy
  const events = await Event.find(); // This will fetch all events from the database
  console.log("All events fetched successfully:", events);
  if (!events || events.length === 0) {
    throw new ApiError("No events found", 404);
  }
  res.status(200).json(new ApiResponse(200, events, "All events fetched successfully"));
});

export { getAllEventsForUsers };