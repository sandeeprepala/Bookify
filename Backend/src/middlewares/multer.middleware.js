import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); // Set the destination folder for uploaded files
},
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Set the filename to include a timestamp
    }
});


export const upload = multer({storage,});   // Create a multer instance with the specified storage configuration