import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TurneePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-10 py-8 md:py-10">
        <h1 className={title()}>Turnee</h1>
        
        <div className="flex items-center justify-center w-full flex-wrap">
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold"><b>Basarab's Cup 2021</b></h1>
            <p className="mt-2">
              „Basarab's Cup” - prima ediție a turneului a fost cu adevărat specială...
              <Link href="https://www.instagram.com/elody_farmacia/"> @elody_farmacia </Link>, 
              <Link href="https://brutariabardar.md/"> @brutariabardar.md </Link>, 
              <Link href="https://www.instagram.com/tandtravel.md/"> @tandtravel.md </Link>
            </p>
            <Link href="https://www.instagram.com/p/CScR2PzINWz/?img_index=1">
              <Button color="primary" className="mt-4">Details</Button>
            </Link>
          </div>

          <div className="w-full md:w-1/2">
            <Swiper 
              modules={[Virtual, Navigation, Pagination, Autoplay]} 
              spaceBetween={50} 
              slidesPerView={1} 
              virtual 
              navigation 
              pagination={{ clickable: true }} 
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
            >
              {[...Array(4)].map((_, i) => (
                <SwiperSlide key={i} virtualIndex={i}>
                  <img
                    src={`/2021/${i + 1}.jpg`}
                    alt="image bsb 2021"
                    className="rounded-md mx-auto object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="w-full border-t border-gray-600 my-6" />
        
        <div className="flex items-center justify-center w-full flex-wrap">
          <div className="w-full md:w-1/2">
            <Swiper 
              modules={[Virtual, Navigation, Pagination, Autoplay]} 
              spaceBetween={50} 
              slidesPerView={1} 
              virtual 
              navigation 
              pagination={{ clickable: true }} 
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configuration
            >
              {[...Array(5)].map((_, i) => (
                <SwiperSlide key={i} virtualIndex={i}>
                  <img
                    src={`/2022/${i + 1}.jpg`}
                    alt="image bsb 2022"
                    className="rounded-md mx-auto object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold"><b>Basarab's Cup 2022</b></h1>
            <p className="mt-2">
              „The Unity Cup” - turneul ce unește națiunile prin sport...
              <Link href="https://www.lira.md/"> @lira_digitalagency </Link>, 
              <Link href="https://moldovapentrupace.md/"> @moldovaforpeace </Link>
            </p>
            <Link href="https://www.instagram.com/p/CkwF62mov2d/">
              <Button color="primary" className="mt-4">Details</Button>
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-gray-600 my-6" />
        
        <div className="flex items-center justify-center w-full flex-wrap">
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold"><b>Basarab's Cup 2025</b></h1>
            <p className="mt-2">
              Planificăm o nouă ediție a turneului nostru...
            </p>
            <Link href="/turneu">
              <Button color="primary" className="mt-4">Details</Button>
            </Link>
          </div>
          <img src="/2025/Cupa_Basarab's_Cup.jpg" alt="cupa" className="w-full md:w-1/2 rounded-md" />
        </div>
      
      </section>
    </DefaultLayout>
  );
}
