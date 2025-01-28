// css
import "../styles/index.css"
import DefaultLayout from "@/layouts/default";
import { useInView } from 'react-intersection-observer';
// Swiper core styles
import { Pagination, Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
// next-ui components
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface Players{
  id: number;
  name: string;
  position: string;
  img: string;
  number: number;
}

const IndexPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const players: Players[] = [
    {
      id: 1,
      name: "Don Pabblo",
      position: "Striker",
      img: "/players/DonPabblo.JPG",
      number: 7
    },
    {
      id: 2,
      name: "David",
      position: "Midfielder",
      img: "/players/David.JPG",
      number: 10
    },
    {
      id: 3,
      name: "Serginho",
      position: "Left-winger",
      img: "/players/Serginho.jpg",
      number: 11
    },
    {
      id: 4,
      name: "Sorin",
      position: "Left-winger",
      img: "/players/Sorin.JPG",
      number: 97
    },
    {
      id: 5,
      name: "Marda",
      position: "Midfielder",
      img: "/players/Marda.JPG",
      number: 44
    },
    {
      id: 6,
      name: "Ovi",
      position: "Midfielder",
      img: "/players/Ovi.jpg",
      number: 6
    },
    {
      id: 7,
      name: "Verdes",
      position: "Central-back",
      img: "/players/Verdes.JPG",
      number: 69
    },
    {
      id: 8,
      name: "Cat",
      position: "Central-back",
      img: "/players/Cat.JPG",
      number: 4
    },
    {
      id: 5,
      name: "Leu",
      position: "Goalkeeper",
      img: "/players/Leu.JPG",
      number: 1
    }

  ];

  return (
    <DefaultLayout>
      <div
        ref={ref}
        className="relative w-full h-[500px] overflow-hidden"
      >
        <video
          src="/video/frontpage-video.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay={inView}
          muted
          playsInline
          loop={true}
        />
      </div>

      

      <div className="slider-box mt-10 mb-10"> 
        <h1 className="mb-5"> <b>Basarab's Players:</b> </h1>
        <Swiper className="swiper" modules={[ Virtual, Pagination, Navigation ]} spaceBetween={50} virtual 
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          // Define breakpoints for responsive slides per view
          620: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        >
              {players.map((player, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">{player.number}</p>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt={player.name}
                      className="z-0 w-full h-full object-cover"
                      src={player.img}
                    />
                    <CardFooter className="absolute bg-white/25 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                      <div>
                        <p className="text-black text-tiny">{player.name}</p>
                        <p className="text-black text-tiny">{player.position}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>


    </DefaultLayout>
  );
};

export default IndexPage;
