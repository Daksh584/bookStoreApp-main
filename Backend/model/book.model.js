import mongoose from "mongoose";

const predefinedCategories = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Self-help",
  // Add more categories as needed
];

const bookSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: String,
    enum: predefinedCategories,
    required: true,
  },
  image: String,
  title: String,
  OriginalPrice: Number,
  edition: String,
  usedTime: Date,
  author: String,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;