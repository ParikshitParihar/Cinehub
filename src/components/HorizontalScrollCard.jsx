import React, { useRef, useMemo } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handlePrevious = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  // memoize cards for performance
  const cards = useMemo(() =>
    data.map((item, index) => (
      <Card
        key={`${heading}-${item.id || index}`}
        data={item}
        index={index + 1}
        trending={trending}
        media_type={media_type}
      />
    ))
    , [data, heading, trending, media_type]);

  return (
    <div className='container mx-auto px-12 my-10'>
      <h2 className='text-xl lg:text-2xl font-bold mb-2 text-white'>
        {heading}
      </h2>

      <div className='relative'>
        {/* scrollable container */}
        <div
          ref={containerRef}
          className='grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 grid-flow-col overflow-x-scroll scrollbar-none scroll-smooth relative z-10'>
          {cards}
        </div>

        {/* navigation buttons */}
        <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
          <button
            onClick={handlePrevious}
            className='bg-white p-1 text-black rounded-full -ml-2 z-10 cursor-pointer'
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={handleNext}
            className='bg-white p-1 text-black rounded-full -mr-2 z-10 cursor-pointer'
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
