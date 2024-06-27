// src/components/BooksInfo.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";

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
  const maxResults = 20;
  const startIndex = 0;
  const handleSearch = async () => {
    if (query) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data1 = response.data;
        setBooks(response.data.items);
        console.log(response.data);
        console.log(data1.items[0].volumeInfo);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-5">
      <div className="search-bar mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded">Search</button>
      </div>
      <div className="books-list">
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book.id} className="mt-4 my-3 p-3">
              <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BooksInfo;