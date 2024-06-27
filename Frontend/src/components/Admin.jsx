

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

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

var settings = {
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

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
    description: "", // Added description field
    _id: null,
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4001/book");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`http://localhost:4001/book/${formData._id}`, formData);
      } else {
        await axios.post("http://localhost:4001/book/create", formData);
      }
      setFormData({ name: "", price: "", category: "", image: "", title: "", description: "", _id: null });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/book?id=${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Admin Dashboard</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name Of The Book</span>
          </div>
          <input type="text" name="name" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={formData.name} onChange={handleChange} />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input type="text" name="price" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={formData.price} onChange={handleChange} />
        </label>

        <details className="dropdown">
          <summary className="btn m-1">Select Category</summary>
          <div className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md outline-none"
            >
              <option value="">Select category...</option>
              {predefinedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </details>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Image of the Book</span>
          </div>
          <input type="text" name="image" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={formData.image} onChange={handleChange} />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description of the Book</span>
          </div>
          <input type="text" name="Description" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={formData.title} onChange={handleChange} />
        </label>

        <button style={{ backgroundColor: "Blue" }} className="btn btn-wide" type="submit">
          {formData._id ? "Update Book" : "Add Book"}
        </button>
      </form>


      <h2>Books List</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div className="card bg-base-100 w-96 shadow-xl" key={book._id}>
            <figure>
              <img src={book.image} alt={book.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.name}</h2>
              <p>{book.title}</p>
              <p>Price: {book.price}</p>
              <p>Category: {book.category}</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleEdit(book)} className="btn btn-primary">Edit</button>
                <button onClick={() => handleDelete(book._id)} className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))} 
          </Slider>
    </div>
  );
};

export default AdminDashboard;




      