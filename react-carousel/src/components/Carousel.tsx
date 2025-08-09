import { useEffect, useRef, useState } from "react";
import type { BannerImagesType } from "../types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface CarouselProps {
  images: BannerImagesType[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = setInterval(handleClickNextBtn, 1000);

    return () => clearInterval(ref.current!);
  }, []);

  const handleClickPrevBtn = () => {
    setIndex(prev => (prev !== 0 ? prev - 1 : prev));
  };

  const handleClickNextBtn = () => {
    setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="container"
      onMouseEnter={() => clearInterval(ref.current!)}
      onMouseLeave={() => {
        ref.current = setInterval(handleClickNextBtn, 1000);
      }}>
      <div>
        <img src={images[index].imageUrl} alt="banner" />
      </div>
      <button onClick={handleClickPrevBtn} className="prev-btn">
        <FaChevronLeft />
      </button>
      <button onClick={handleClickNextBtn} className="next-btn">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
