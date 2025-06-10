import { Theatre } from "../models/theatre.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add a show to a theatre
const addShowToTheatre = asyncHandler(async (req, res, next) => {
    // steps
    // 1. Validate request body
    // 2. Find the theatre by ID
    // 3. Create a new show using the validated request body
    // 4. Save the show to the database
    // 5. Return the show object
    const { theatreId } = req.params;
    if (!theatreId) {
        throw new ApiError("Theatre ID is required", 400);
    }
    const {eventId , showSlot , bookedSeats } = req.body;
    if(!eventId ||!showSlot){
        throw new ApiError("All fields are required", 400);
    }

    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
        throw new ApiError("Theatre not found", 404);
    }
    theatre.shows.push({ eventId, showSlot, bookedSeats: bookedSeats || [] });
    const savedTheatre = await theatre.save();
    res.status(201).json(new ApiResponse(201, savedTheatre, "Show added successfully"));
});

// get all shows for a theatre
const getShowsByTheatre = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;

  const theatre = await Theatre.findById(theatreId).populate('shows.eventId');
  if (!theatre) throw new ApiError('Theatre not found', 404);

  res.status(200).json(new ApiResponse(200, theatre.shows, 'Shows fetched successfully'));
});

// update a show for a theatre
const updateShow = asyncHandler(async (req, res) => {
  const { theatreId, showId } = req.params;
  const { eventId, showSlot, bookedSeats } = req.body;

  const theatre = await Theatre.findById(theatreId);
  if (!theatre) throw new ApiError('Theatre not found', 404);

  const show = theatre.shows.id(showId);
  if (!show) throw new ApiError('Show not found', 404);

  if (eventId) show.eventId = eventId;
  if (showSlot) show.showSlot = showSlot;
  if (bookedSeats) show.bookedSeats = bookedSeats;

  await theatre.save();

  res.status(200).json(new ApiResponse(200, show, 'Show updated successfully'));
});
//delete a show for a theatre
const deleteShow = asyncHandler(async (req, res) => {
  const { theatreId, showId } = req.params;

  if (!theatreId || !showId) {
    throw new ApiError(400, "Theatre ID and Show ID are required");
  }

  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    throw new ApiError(404, "Theatre not found");
  }

  // Find the index of the show to delete
  const showIndex = theatre.shows.findIndex((show) => show._id.toString() === showId);
  if (showIndex === -1) {
    throw new ApiError(404, "Show not found in this theatre");
  }

  // Remove the show
  theatre.shows.splice(showIndex, 1);
  await theatre.save();

  res.status(200).json(new ApiResponse(200, theatre, "Show deleted successfully"));
});



export { addShowToTheatre,getShowsByTheatre,updateShow,deleteShow };