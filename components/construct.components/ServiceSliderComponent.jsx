import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import Image from 'next/image';
import { useRouter } from 'next/router';
// import Autoplay from 'embla-carousel-autoplay';
// import { PrevIcon, NextIcon } from './Icons'; // Assume you have icon components

const ServiceSliderComponent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const router = useRouter();
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  const services = [
    {
      slug: 'wedding-photography',
      name: 'Wedding Photography',
      desc: ' Capture the beauty of your special day with our professional wedding photography services.',
      icon: '/parallax/untitled-3357.JPG',
    },
    {
      slug: 'corporate-videos',
      name: 'Corporate Videos',
      desc: 'Showcase your business with high-quality corporate videos that make an impact.',
    },
    {
      slug: 'event-coverage',
      name: 'Event Coverage',
      desc: 'Document your events with comprehensive photography and videography services.',
    },
    {
      slug: 'wedding-photography',
      name: 'Wedding Photography',
      desc: ' Capture the beauty of your special day with our professional wedding photography services.',
    },
    {
      slug: 'corporate-videos',
      name: 'Corporate Videos',
      desc: 'Showcase your business with high-quality corporate videos that make an impact.',
    },
    {
      slug: 'event-coverage',
      name: 'Event Coverage',
      desc: 'Document your events with comprehensive photography and videography services.',
    },
    {
      slug: 'wedding-photography',
      name: 'Wedding Photography',
      desc: ' Capture the beauty of your special day with our professional wedding photography services.',
    },
    {
      slug: 'corporate-videos',
      name: 'Corporate Videos',
      desc: 'Showcase your business with high-quality corporate videos that make an impact.',
    },
    {
      slug: 'event-coverage',
      name: 'Event Coverage',
      desc: 'Document your events with comprehensive photography and videography services.',
    },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -mx-4">
          {services.map((service, index) => (
            <div
              className="min-w-[100%] md:min-w-[33.3333%] px-4 flex-shrink-0"
              key={index}
              onClick={() =>
                router.replace(
                  {
                    query: { style: service.slug },
                  },
                  undefined,
                  { shallow: true }
                )
              }
            >
              <div
                className="bg-white rounded-lg shadow p-6 text-center h-80 cursor-pointer hover:scale-95"
                style={{
                  backgroundImage: `url(${service.icon})`,
                  backgroundSize: 'cover',
                }}
              >
                {/* <Image
                  src={service?.icon}
                  alt={service.name}
                  className="w-16 h-16 mx-auto mb-4"
                  width={1900}
                  height={600}
                /> */}
                <h3
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.77)' }}
                  className="p-4 rounded-lg text-xl font-semibold mb-2"
                >
                  {service.name}
                </h3>
                <p className="text-gray-600 max">{}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {selectedIndex != 0 && (
        <button
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow absolute top-1/2 left-4 transform -translate-y-1/2 hover:bg-gray-100 transition"
          onClick={scrollPrev}
        >
          <FontAwesomeIcon icon={faCaretLeft} size="2x" />
        </button>
      )}
      {selectedIndex != scrollSnaps.length - 1 && (
        <button
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow absolute top-1/2 right-4 transform -translate-y-1/2 hover:bg-gray-100 transition"
          onClick={scrollNext}
        >
          <FontAwesomeIcon icon={faCaretRight} size="2x" />
        </button>
      )}

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSliderComponent;
