import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { app } from './app.js';

mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.get('/', (req, res) => {
    res.send('Welcome to Bookify API');
});
