import Book from "../model/book.model.js";

export const createBook = async (req, res) => {
  const {
    name,
    price,
    category,
    image,
    title,
    OriginalPrice,
    edition,
    author,
    usedTime,
  } = req.body;
  const newBook = new Book({
    name,
    price,
    category,
    image,
    title,
    OriginalPrice,
    edition,
    author,
    usedTime,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    category,
    image,
    title,
    OriginalPrice,
    edition,
    author,
    usedTime,
  } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        image,
        title,
        OriginalPrice,
        edition,
        author,
        usedTime,
      },
      { new: true }
    );
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.query;

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};