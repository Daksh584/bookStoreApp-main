import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI || "mongodb+srv://dakshkala04:JPP4jcFzKqCMUAN@daksh.8q47cxa.mongodb.net/?retryWrites=true&w=majority&appName=Daksh";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error: ", error));

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});