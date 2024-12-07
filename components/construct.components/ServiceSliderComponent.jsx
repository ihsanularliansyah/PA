/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ButtonComponent,
  FloatingPageComponent,
  ModalComponent,
  SelectComponent,
} from '../base.components';
import Image from 'next/image';
import { styleOptions } from './formBooking.component';
// import Autoplay from 'embla-carousel-autoplay';
// import { PrevIcon, NextIcon } from './Icons'; // Assume you have icon components

const ServiceSliderComponent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const router = useRouter();
  const [modalDetail, setModalDetail] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    modalDetail && setImages(MoreAbout(modalDetail));
  }, [modalDetail]);

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
      slug: 'prewedding',
      name: 'Prewedding',
      desc: ' Capture the beauty of your special day with our professional wedding photography services.',
      icon: '/parallax/untitled-3357.JPG',
    },
    {
      slug: 'wedding',
      name: 'Wedding',
      desc: 'Showcase your business with high-quality corporate videos that make an impact.',
      icon: '/parallax/untitled-2026.jpg',
    },
    {
      slug: 'corporate',
      name: 'Corporate',
      desc: 'Document your events with comprehensive photography and videography services.',
      icon: '/parallax/colorist-5837.JPG',
    },
    {
      slug: 'graduate',
      name: 'Graduate',
      desc: ' Capture the beauty of your special day with our professional wedding photography services.',
      icon: '/parallax/NABILA-05.JPG',
    },
  ];

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-4">
            {services.map((service, index) => (
              <div
                className="min-w-[100%] md:min-w-[25%] px-4 flex-shrink-0"
                key={index}
                onClick={async () => {
                  await router.replace(
                    {
                      query: { style: service.slug },
                    },
                    undefined,
                    { shallow: true }
                  );
                  // router.push('#contact', undefined, { shallow: true });
                  setModalDetail(service.slug);
                }}
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
        {/* {selectedIndex != 0 && (
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
        )} */}

        {/* Dots Navigation */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div> */}
      </div>
      <FloatingPageComponent
        show={modalDetail?.length}
        onClose={() => setModalDetail(false)}
        title={
          <p className="pb-4">
            <span>
              {typeof modalDetail == 'string' &&
                modalDetail?.replace(/\-/g, ' ')}
            </span>{' '}
            <span className="text-green-400 italic pl-4">
              Start From Rp. 300.000-
            </span>
          </p>
        }
        header={
          <div className="px-10 pb-4">
            <SelectComponent options={styleOptions} value={'modern'} />
          </div>
        }
      >
        <div className="grid grid-cols-2 px-10 pb-8 gap-4">
          <div class="flex flex-wrap gap-4 justify-center">
            {images.at(0)?.length &&
              images.at(0).map((img, key) => {
                return (
                  <div key={`modImg-${key}`}>
                    <Image
                      width={404}
                      height={404}
                      class=" rounded-lg"
                      src={`/parallax/${img}` || ''}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          <div class="flex flex-wrap gap-4 justify-center">
            {images.at(1)?.length &&
              images.at(1).map((img, key) => {
                return (
                  <div key={`modImg-${key}`}>
                    <Image
                      width={404}
                      height={404}
                      class=" rounded-lg"
                      src={`/parallax/${img}` || ''}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex justify-center gap-10 px-10 mb-8">
          <ButtonComponent
            onClick={() => {
              setModalDetail(false);
            }}
            label="Tutup"
            icon={faXmark}
            size="lg"
            variant="outline"
            paint="danger"
            block
          />
          <ButtonComponent
            onClick={() => {
              setModalDetail(false);
              document
                .getElementById('contact')
                .scrollIntoView({ behavior: 'smooth' });
            }}
            label="Booking"
            icon={faCheck}
            size="lg"
            block
          />
        </div>
      </FloatingPageComponent>
    </>
  );
};

export default ServiceSliderComponent;
function MoreAbout(event) {
  let imagesList = [];
  switch (event) {
    case (event = 'prewedding'):
      imagesList = [
        ['untitled-3357.jpg', 'untitled-2699.jpg'],
        ['untitled-2911.jpg', 'untitled-3287.jpg'],
      ];
      break;
    case (event = 'wedding'):
      imagesList = [
        ['untitled-3357.jpg', 'untitled-2699.jpg'],
        ['untitled-2911.jpg', 'untitled-3287.jpg'],
      ];
      break;
    case (event = 'corporate'):
      imagesList = [
        ['colorist-5837.jpg', 'colorist-6301.jpg'],
        ['untitled-1916.jpg', 'untitled-2026.jpg'],
      ];
      break;
    case (event = 'graduate'):
      imagesList = [
        ['colorist-5837.jpg', 'colorist-6301.jpg'],
        ['untitled-1916.jpg', 'untitled-2026.jpg'],
      ];
      break;
    default:
      imagesList = [];
  }
  return imagesList;
}
