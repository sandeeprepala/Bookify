import {v2 as cloudinary} from "cloudinary"; // Import Cloudinary library
import fs from "fs"
import dotenv from "dotenv"; // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from .env file

cloudinary.config({                                 // Cloudinary configuration 
                                                    // This configuration should be set in your environment variables
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) 
            {
                console.log("No local file path provided for upload to Cloudinary"); // Log if no file path is provided
                return null; // Check if the local file path is provided
                
            }
        
        // console.log("Uploading file to Cloudinary:", localFilePath); // Log the file being uploaded
        const result = await cloudinary.uploader.upload(localFilePath, { // Upload the file to Cloudinary
            resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
        });
        fs.unlinkSync(localFilePath); // Delete the local file after upload
        // console.log("File uploaded to Cloudinary successfully:", result.url); // Log the successful upload and the URL
        return result; // Return the result from Cloudinary
    } catch (error) {
        fs.unlinkSync(localFilePath);
        // console.error("Cloudinary upload error:", error);
        return null; // Return null if there was an error
    }
}

export {uploadOnCloudinary}; // Export the upload function for use in other modules