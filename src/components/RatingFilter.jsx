import React from "react";
import Rating from "react-rating";

function RatingFilter({ selectedStars, onStarClick }) {
  const starStyle = {
    color: "#ec8d11",
    fontSize: "24px",
    cursor: "pointer",
  };

  return (
    <div className="rating-filter d-flex justify-content-center">
      <h2 className="pt-1 text-light">Filter by Rating</h2>
      <Rating
        className="ps-2"
        initialRating={selectedStars}
        onClick={onStarClick}
        emptySymbol={
          <span style={{ ...starStyle, color: "#ccc" }}>&#9734;</span>
        }
        fullSymbol={<span style={starStyle}>&#9733;</span>}
      />
    </div>
  );
}

export default RatingFilter;
