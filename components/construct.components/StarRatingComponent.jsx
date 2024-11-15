import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function StarRating({
  onRatingSelect,
  ratingValue,
  size,
  readOnly,
}) {
  useEffect(() => {
    setRating(ratingValue);
  }, [ratingValue]);

  const [rating, setRating] = useState(0); // State to store the current rating
  const [hover, setHover] = useState(null); // State to handle hover effect

  // Function to handle rating change
  const handleClick = (rate) => {
    setRating(rate);
    onRatingSelect(rate); // Pass the selected rating to parent component or backend
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(null)}
          className="focus:outline-none"
        >
          <FontAwesomeIcon
            icon={faStar}
            className={`text-${size ? size : '3xl'} ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
