import { useState } from "react";
import { FaStar } from "react-icons/fa6";

interface PropsType {
  maxRating?: number;
}

const StarRating = ({ maxRating = 5 }: PropsType) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<number>(0);

  const handleClick = (val: number) => {
    if (rating === 1 && val === 1) setRating(0);
    else setRating(val);
  };

  const handleOnMouse = (value: number) => {
    setHoverValue(value);
  };

  const isStarActive = (starValue: number) => {
    return hoverValue ? starValue <= hoverValue : starValue <= rating;
  };

  return (
    <div className="rating-container">
      {new Array(maxRating).fill(0).map((_, index) => {
        return (
          <button
            key={index}
            onMouseEnter={() => handleOnMouse(index + 1)}
            onMouseLeave={() => handleOnMouse(0)}
            onClick={() => handleClick(index + 1)}
            aria-label={`Rate ${index + 1} out of ${maxRating}`}>
            <FaStar
              size={20}
              className={isStarActive(index + 1) ? "active" : ""}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
