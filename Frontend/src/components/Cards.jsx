import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${item._id}`); // Changed to use path parameter
  };

  return (
    <div className="mt-4 my-3 p-3" onClick={handleClick}>
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <button className="btn btn-outline btn-primary">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;