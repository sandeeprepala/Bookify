import { ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res,next) => {
    //steps
    //1. Validate request body
    //2. Check if user already exists
    //3. Create new user
    //4. Save user to database
    //5. remove password and refresh token from response
    //6. Send response
    const {username,email,password,city,role} = req.body;
    // console.log("Registering user:", username, email, city, role);
    if(!username || !email || !password || !city){
        throw new ApiError("All fields are required", 400);
    }
    const existingUser = await User.findOne({
        $or:[{email}, {username}]
    })
    if(existingUser){
        throw new ApiError("User already exists", 400);
    }

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        city,
        role
    })
    console.log("User created successfully:", user);
    const createdUser = await User.findById(user._id).select("-password");
    if(!createdUser){
        console.log("User creation failed");
        throw new ApiError("User creation failed", 404);
    }
    console.log("User created successfully:", createdUser);

    res.status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
    // steps
    // 1. Validate request body
    // 2. Check if user exists
    // 3. Compare password
    // 4. Generate access token and refresh token
    // 5. Save refresh token to user
    // 6. Send response with tokens

    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError("Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError("User not found", 404);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError("Invalid password", 401);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    console.log(refreshToken);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    if (!loggedInUser) {
        throw new ApiError("User not found", 404);
    }
    const cookieOptions = {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
    };

    res.status(200)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, { user: loggedInUser, // Return the logged-in user details
                accessToken, // Include the access token in the response
                refreshToken // Include the refresh token in the response
            }, "Login successful"));

});

const LogoutUser = asyncHandler(async (req, res, next) => {
    // steps
    // 1. Clear refresh token from user
    // 2. Clear cookies for access and refresh tokens
    // 3. Send response

    await User.findByIdAndUpdate(req.user._id, { refreshToken: "" }); // Clear the refresh token in the database
    const cookieOptions = {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
    };
    return res
        .status(200)
        .cookie("refreshToken", "", { ...cookieOptions, expires: new Date(0) }) // Clear refresh token cookie
        .cookie("accessToken", "", { ...cookieOptions, expires: new Date(0) }) // Clear access token cookie
        .json(new ApiResponse(200, null, "Logout successful"));
})

const getUserDetails = asyncHandler(async (req, res, next) => { 
    // steps
    // 1. Get user details from request object
    // 2. Send response with user details

    const user = req.user; // User is attached to the request object by auth middleware
    if (!user) {
        throw new ApiError("User not found", 404);
    }
    
    res.status(200)
        .json(new ApiResponse(200, user, "User details retrieved successfully"));
});

export {registerUser, loginUser, LogoutUser, getUserDetails}