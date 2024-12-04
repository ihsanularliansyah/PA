import Image from 'next/image';
import Link from 'next/link';
// import SevicesListComponent from '../components/construct.components/sevicesList.component';
import FormBookingComponent from '../components/construct.components/formBooking.component';
import ServiceSliderComponent from '../components/construct.components/ServiceSliderComponent';
import ParallaxGallery from '../components/construct.components/ParallaxGallery';
import prisma from '../lib/db';
import StarRating from '../components/construct.components/StarRatingComponent';
import InputImageComponent from '../components/base.components/input/InputImage.component';

export async function getServerSideProps() {
  const reviews = await prisma.review.findMany({
    select: {
      comment: true,
      publish_status: true,
      booking: {
        select: {
          event_name: true,
          name: true,
        },
      },
    },
  });

  if (!reviews) {
    return {
      notFound: true,
    };
  }

  // Mark the review as visited if not already
  return {
    props: { reviews },
  };
}
export default function Home({ reviews }) {
  // console.log(reviews);
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white fixed w-full z-10 top-0">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">
              INCEPTION STUDIO
            </span>
          </Link>
          <div className="space-x-4">
            <Link href="#about">
              <span className="hover:text-red-500 cursor-pointer">ABOUT</span>
            </Link>
            <Link href="#portfolio" className="hidden md:inline">
              <span className="hover:text-red-500 cursor-pointer">
                PORTOFOLIO
              </span>
            </Link>
            <Link href="#services">
              <span className="hover:text-red-500 cursor-pointer">GALLERY</span>
            </Link>
            <Link href="#testimonials" className="hidden md:inline">
              <span className="hover:text-red-500 cursor-pointer">
                TESTIMONIALS
              </span>
            </Link>
            <Link href="#contact">
              <span className="hover:text-red-500 cursor-pointer">CONTACT</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="bg-gray-900 text-white h-fit md:h-screen grid pt-16 md:grid-cols-2 "
        style={{
          backgroundImage: 'url(/untitled-2074.JPG)',
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full">
          <div className="text-6xl md:text-9xl font-semibold py-14 px-8 space-y-6">
            <div className="w-fit">CAPTURE</div>
            <div className="w-fit">YOUR</div>
            <div className="w-fit">MOMENT</div>
            <div className="w-fit">WITH US</div>
          </div>
        </div>
        <div className=" h-full">
          {/* <Image
            src="/untitled-2074.JPG"
            alt="shuld be an image"
            width={404}
            height={404}
          /> */}
        </div>
      </section>
      <section
        id="about"
        className=" pb-20 md:pb-4 md:h-screen grid md:grid-cols-12 pt-8"
      >
        <div className="relative ml-12 col-span-4 h-full bg-secondar flex flex-col px-8 md:p-4 gap-8">
          <b className="text-4xl md:text-6xl font-semibold text-white md:translate-x-4">
            ABOUT
          </b>
          <Image
            className="hidden md:block bg-primary absolute bottom-10 -z-10"
            src="/untitled-1916.JPG"
            alt="shuld be an image"
            width={404}
            height={505}
          />
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-5 h-full bg-primar flex flex-col gap-8 justify-between p-8">
          <div className="space-y-6">
            <p>
              Inception Studio adalah sebuah studio produksi kreatif yang
              berfokus pada pembuatan video dan poto yang berkualitas untuk
              keperluan wedding, prewedding, dokumetasi, promosi, pemasaran, dan
              hiburan. Studio ini memiliki peralatan dan teknologi canggih,
              termasuk kamera, perangkat lunak editing video dan poto, serta
              komputer grafis yang handal, yang digunakan untuk menciptakan
              karya-karya visual yang menakjubkan.
            </p>
            <p>
              Inception Studio menyediakan layanan lengkap mulai dari
              konseptualisasi, pengembangan skenario, produksi, hingga
              post-produksi untuk memastikan kualitas dan hasil akhir yang
              memuaskan. Studio ini juga memiliki tim yang berbakat dan
              terampil, termasuk sutradara, penulis skenario, animator, editor,
              dan teknisi suara, yang bekerja sama untuk menciptakan karya-karya
              berkualitas tinggi.
            </p>
            <p>
              Deskripsi dari Inception Studio adalah sebagai sebuah studio
              produksi kreatif yang berkualitas tinggi dan fokus pada inovasi
              dan kreativitas. Studio ini menyediakan layanan lengkap untuk
              memastikan hasil akhir yang memuaskan dan dapat memenuhi kebutuhan
              produksi video dan animasi.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-4 ">
              <b className="block text-5xl">99</b> <p>Finised Project</p>
            </div>
            <div className="space-y-4 ">
              <b className="block text-5xl">99</b> <p>Ongoing Project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
        </div>
        <ParallaxGallery />
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <ServiceSliderComponent />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...reviews, reviews]
              .filter((item) => item.publish_status == 'publish')
              .map((review, key) => {
                return (
                  <div
                    key={key}
                    className="bg-slate-100 shadow-md rounded-lg h-40 p-4 text-left"
                  >
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold">
                        {review.booking?.name}
                      </p>
                      <StarRating
                        ratingValue={review?.rating}
                        readOnly={true}
                        size={'xl'}
                      />
                    </div>
                    <hr className="my-1 mb-4  border-2 border-sky-300 " />
                    <p>{review?.comment}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900  ">
        <div className="container mx-auto px-10 md:px-60 py-10">
          <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
          <FormBookingComponent />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Your Studio. All rights reserved.</p>
          <div className="flex justify-center mt-4">
            {/* Add social media icons */}
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href="#" className="mx-2 text-gray-400 hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </footer>
      <div className="w-full md:w-3/4 mx-auto mb-10 p-10">
        {[1].map((i) => {
          return (
            <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
              <div className="grid gap-4 head">
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[255, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[266.6667, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 255]}
                    // {...formControl('thumbnail')}
                  />
                </div>
              </div>
              <div className="grid gap-4 tail">
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[266.6667, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 255]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[255, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
              </div>
              <div className="grid gap-4 head">
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[255, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[266.6667, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 255]}
                    // {...formControl('thumbnail')}
                  />
                </div>
              </div>
              <div className="grid gap-4 tail">
                <div className="">
                  <InputImageComponent
                    aspect={'2/3'}
                    crop
                    cropSize={[266.6667, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'16/9'}
                    crop
                    cropSize={[400, 255]}
                    // {...formControl('thumbnail')}
                  />
                </div>
                <div className="">
                  <InputImageComponent
                    aspect={'9/16'}
                    crop
                    cropSize={[255, 400]}
                    // {...formControl('thumbnail')}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
