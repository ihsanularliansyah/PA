import Image from 'next/image';
import React from 'react';
import { useGet } from '../../helpers';

const ServiceGallery = ({ section }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, code, data, reset] = useGet({
    path: `galleries/${section || ''}`, // Adjust path for specific section if necessary
  });

  // Destructure and prepare data for clarity
  const images = data?.data?.sets?.flatMap((set) => set.images) || [];

  const groupedImages = images.reduce((acc, img) => {
    const columnKey = img.setColumn;
    acc[columnKey] = acc[columnKey] || {};
    acc[columnKey][img.setRow] = img;
    return acc;
  }, {});

  return (
    <div>
      {!loading ? (
        <div className="flex gap-4 pb-4">
          {Object.keys(groupedImages).map((column) => (
            <div key={column} className="flex flex-col gap-4 w-1/4">
              {Object.keys(groupedImages[column])
                .sort((a, b) => Number(a) - Number(b))
                .map((row) => {
                  const img = groupedImages[column][row];
                  return (
                    <Image
                      key={img.id}
                      src={img.filePath}
                      width={400}
                      height={400}
                      quality={50}
                      alt={`Column ${img.setColumn}, Row ${img.setRow}`}
                      className="rounded-lg object-cover"
                    />
                  );
                })}
            </div>
          ))}
        </div>
      ) : (
        <PortfolioSkeleton />
      )}
    </div>
  );
};

export default ServiceGallery;

const SkeletonLoader = ({ aspect }) => {
  return (
    <div
      className="skeleton-loader"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
        aspectRatio: aspect,
      }}
    >
      <div
        className="skeleton-animation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
          aspectRatio: aspect,
        }}
      ></div>
    </div>
  );
};

const PortfolioSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`grid gap-4 ${i % 2 === 0 ? 'head' : 'tail'}`}>
          {i % 2 === 0 ? (
            <>
              <SkeletonLoader aspect="9/16" />
              <SkeletonLoader aspect="2/3" />
              <SkeletonLoader aspect="16/9" />
            </>
          ) : (
            <>
              <SkeletonLoader aspect="2/3" />
              <SkeletonLoader aspect="16/9" />
              <SkeletonLoader aspect="9/16" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
