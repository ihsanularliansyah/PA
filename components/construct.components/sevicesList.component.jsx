import { useRouter } from 'next/router';
import React from 'react';

function SevicesListComponent() {
  const router = useRouter();
  const services = [
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, key) => {
        return (
          <div
            key={key + service.name}
            className="p-6 bg-white rounded-lg shadow-lg cursor-pointer"
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
            <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SevicesListComponent;
