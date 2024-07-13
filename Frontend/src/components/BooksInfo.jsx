import React, { useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function BooksInfo() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (query) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        setBooks(response.data.items);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    }
  };

  const navigate = useNavigate();
  const handleClick = (title) => {
    navigate(`/chat/${title}`); // Changed to use path parameter
  };

  return (
    <>
      <div className="w-full p-10"><Navbar />
      </div>
      <div className="container mx-auto mt-5 p-5 py- 40">
        <div className="search-bar mb-5 flex justify-center">
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books"
              className="p-2 input input-bordered w-full max-w-xs flex items-center"
            />
            <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded">Search</button>
          </div>
        </div>
        <div className="books-list">
          <Slider {...settings}>
            {books.map((book) => (
              <div key={book.id} className="mt-4 my-3 p-3">
                <a target="_blank" rel="noopener noreferrer" className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                  <figure>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Book cover" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {book.volumeInfo.title}
                    </h2>
                    <p>{book.volumeInfo.authors?.join(', ')}</p>
                    <div className="card-actions justify-between">
                      <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                        ₹{book.saleInfo.listPrice?.amount}
                      </div>
                      <button onClick={() => handleClick(book.volumeInfo.title)} className="btn btn-outline btn-primary">Chat About the Book</button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default BooksInfo;