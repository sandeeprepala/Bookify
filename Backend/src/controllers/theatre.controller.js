import {Theatre} from "../models/theatre.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//create a new theatre
const createTheatre = asyncHandler(async (req, res, next) => {
    const {name , location , shows} = req.body;
    
    if(!name ||!location ||!shows|| !Array.isArray(shows)) throw new ApiError("All fields are required", 400);
      const newTheatre = await Theatre.create({ name, location, shows });

    if (!newTheatre) {
        throw new ApiError("Failed to create theatre", 500);
    }
    res.status(201).json(new ApiResponse(201,newTheatre," Theatre created successfully"));

});

//get all theatres
const getAllTheatres = asyncHandler(async (req, res) => {
  const theatres = await Theatre.find({});

  if (theatres.length === 0) {
    throw new ApiError("No theatres found", 404);
  }

  res
    .status(200)
    .json(new ApiResponse(200, theatres, "All theatres fetched successfully"));
});

//get theatre by id
const getTheatreById = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;

  const theatre = await Theatre.findById(theatreId);
  if (!theatre) throw new ApiError(404, 'Theatre not found');

  res.status(200).json(new ApiResponse(200, theatre, 'Theatre fetched successfully'));
});



export { createTheatre, getAllTheatres, getTheatreById };