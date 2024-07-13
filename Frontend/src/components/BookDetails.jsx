import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from "./Navbar";

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-store-app-main-lake.vercel.app/book");
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

  const handleClick = (title) => {
    navigate(`/chat/${title}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const shuffledBooks = shuffleArray(books.filter((relatedBook) => relatedBook._id !== id));

  return (<>
  <div className="p-10">
    <Navbar />
  </div>
    <div className="container mx-auto mt-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="rounded-lg shadow-lg max-w-full h-auto"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{book.name}</h1>
          <p className="mt-4 text-gray-700">{book.title}</p>
          <p className="mt-2 text-lg">
            Author: <span className="font-medium">{book.author}</span>
          </p>
          <p className="mt-2 text-lg">
            Published: <span className="font-medium">{book.edition}</span>
          </p>
          <p className="mt-4 text-2xl font-semibold text-green-600">${book.price}</p>
          <button className="btn btn-primary mt-4 w-full">Buy Now</button>
          <button
            onClick={() => handleClick(book.title)}
            className="btn btn-primary mt-4 w-full"
          >
            Chat About the book
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Books</h2>
        <Slider {...settings}>
          {shuffledBooks.map((relatedBook) => (
            <div key={relatedBook._id} className="card bg-base-100 shadow-md p-4">
              <img
                src={relatedBook.image}
                alt={relatedBook.name}
                className="h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-xl font-semibold">{relatedBook.name}</h3>
              <p className="text-gray-600 mt-1">{relatedBook.author}</p>
              <p className="text-green-600 font-semibold mt-1">${relatedBook.price}</p>
              <button
                onClick={() => navigate(`/book/${relatedBook._id}`)}
                className="btn btn-secondary mt-4 w-full"
              >
                View Details
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </>
  );
}

export default BookDetail;
