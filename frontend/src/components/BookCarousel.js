import React from "react";
import Slider from "react-slick";
import BookCard from "./BookCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCarousel = ({ books, onEdit, onDelete }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {books.map((book) => (
        <div key={book.id} className="p-2">
          <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </Slider>
  );
};

export default BookCarousel;
