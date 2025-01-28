import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";


export default function AboutPage() {

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Despre noi</h1>
        </div>

        <div className="w-full max-w-4xl mt-5 md:w-1/2">
            <Swiper 
              modules={[Virtual, Navigation, Pagination, Autoplay]} 
              spaceBetween={50} 
              slidesPerView={1} 
              virtual 
              navigation 
              pagination={{ clickable: true }} 
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
            >
              {[...Array(3)].map((_, i) => (
                <SwiperSlide key={i} virtualIndex={i}>
                  <img
                    src={`/about/${i + 1}.jpg`}
                    alt="image bsb 2021"
                    className="rounded-md mx-auto object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <p className="mt-2 text-black text-center bg-gray-100 rounded-lg p-4 shadow-md mb-3 w-full max-w-xl">
            Suntem un grup de inițiativă, pasionat de sport și competiții. Ne străduim să oferim cele mai bune experiențe și oportunități pentru toți participanții.
          </p>
        
        {/* Contact Section */}
        <div className="mt-10 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Contactele noastre</h2>
          <div className="flex flex-col gap-2 text-gray-500">
            <p>
              <strong>Email:</strong> basarabs@gmail.com
            </p>
            <p>
              <strong>Telefon:</strong> +373 60 81 83 10
            </p>
            <p>
              <strong>Adresa:</strong> Strada Alba Iulia 123, Chișinău, Republica Moldova
            </p>
          </div>
          <Button
            color="primary"
            className="mt-4"
            onClick={() => window.location.href = 'mailto:basarabs@gmail.com'}
          >
            Trimite un email
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
