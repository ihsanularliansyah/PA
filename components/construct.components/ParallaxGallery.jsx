import React from 'react';
import Image from 'next/image';

function ParallaxGallery() {
  return (
    <div class="px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="grid gap-4 bg-red-300">
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/colorist-5514.JPG"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/colorist-5374.JPG"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/colorist-5837.JPG"
            alt=""
          />
        </div>
      </div>
      <div class="grid gap-4 bg-yellow-300">
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/ILCE-6000 (1056).jpg"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-2645.JPG"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-3357.JPG"
            alt=""
          />
        </div>
      </div>
      <div class="grid gap-4 bg-green-300">
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-2911.JPG"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-2699.JPG"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-2026.JPG"
            alt=""
          />
        </div>
      </div>
      <div class="grid gap-4 bg-purple-300">
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/DSC03481.jpg"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/NABILA-05.jpg"
            alt=""
          />
        </div>
        <div>
          <Image
            width={404}
            height={404}
            class="h-auto max-w-full rounded-lg"
            src="/parallax/untitled-3287.JPG"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ParallaxGallery;
