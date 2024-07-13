import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

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

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
    OriginalPrice: "",
    edition: "", 
    author: "",
    usedTime: "", 
    _id: null,
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://book-store-app-main-lake.vercel.app/book");
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
        await axios.put(`https://book-store-app-main-lake.vercel.app/book/${formData._id}`, formData);
      } else {
        await axios.post("https://book-store-app-main-lake.vercel.app/book/create", formData);
      }
      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        title: "",
        edition: "",
        author: "",
        usedTime: "",
        _id: null,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };
  const navigate = useNavigate();
  const handleEdit = (book) => {
    setFormData({
      _id: book._id,
      name: book.name,
      price: book.price,
      category: book.category,
      image: book.image,
      title: book.title,
      OriginalPrice: book.OriginalPrice,
      edition: book.edition,
      author: book.author,
      usedTime: book.usedTime,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://book-store-app-main-lake.vercel.app/book?id=${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      title: "",
      OriginalPrice: "",
      edition: "",
      author: "",
      usedTime: "",
      _id: null,
    });
  };

  return (<>
    <div className="container mx-auto mt-5 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 onClick={() => navigate("/")} className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-5">
        <label className="form-control">
          <span className="label-text">Name of the Book</span>
          <input
            type="text"
            name="name"
            placeholder="Enter book name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Description</span>
          <input
            type="text"
            name="title"
            placeholder="Enter Description"
            className="input input-bordered"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Price</span>
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            className="input input-bordered"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Select Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered"
          >
            <option value="">Select category...</option>
            {predefinedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <span className="label-text">Image of the Book</span>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            className="input input-bordered"
            value={formData.image}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Original Price</span>
          <input
            type="text"
            name="OriginalPrice"
            placeholder="Enter price"
            className="input input-bordered"
            value={formData.OriginalPrice}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Edition</span>
          <input
            type="text"
            name="edition"
            placeholder="Enter edition"
            className="input input-bordered"
            value={formData.edition}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Author</span>
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            className="input input-bordered"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Used Time</span>
          <input
            type="text"
            name="usedTime"
            placeholder="Enter used time"
            className="input input-bordered"
            value={formData.usedTime}
            onChange={handleChange}
          />
        </label>

        <button
          style={{ backgroundColor: "blue" }}
          className="btn btn-wide"
          type="submit"
        >
          {formData._id ? "Update Book" : "Add Book"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-3">Books List</h2>
      <Slider {...settings} className="mb-5">
        {books.map((book) => (
          <div className="card bg-base-100 w-full max-w-sm shadow-xl" key={book._id}>
            <figure>
              <img src={book.image} alt={book.name} className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.name}</h2>
              <p className="text-sm">{book.title}</p>
              <p className="text-sm">Price: {book.price}</p>
              <p className="text-sm">Category: {book.category}</p>
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
};

export default AdminDashboard;