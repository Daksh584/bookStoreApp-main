import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (id && books.length > 0) {
      const foundBook = books.find((b) => b._id === id);
      if (foundBook) {
        setBook(foundBook);
      } else {
        console.error(`Book with ID ${id} not found.`);
      }
    }
  }, [id, books]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-5 p-5">
      <h1 className="text-4xl font-bold">{book.title}</h1>
      <p className="mt-4">{book.description}</p>
      <p className="mt-2">Author: {book.author}</p>
      <p className="mt-2">Published: {book.publishedDate}</p>
      <img src={book.image} alt={book.title} className="mt-4" />
      {/* Add any other information you want to display */}
    </div>
  );
}

export default BookDetail;