import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
// next-ui
import {Card, CardBody, CardFooter } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";

export default function Magazin() {
  const navigate = useNavigate();

  const list = [
    {
      id : 1,
      title: "Basarab's T-shirt 2021",
      description: "Basarab's T-shirt from the first edition of Basarab's Cup",
      img: "/images/T-shirt2021.jpeg",
      price: "$25.50",
    },
    {
      id : 2,
      title: "Basarab's Shorts 2021",
      description: "Basarab's Shorts from the first edition of Basarab's Cup",
      img: "/images/Shorts2021.jpeg",
      price: "$23.00",
    },
    {
      id : 3,
      title: "Basarab's T-shirt 2022",
      description: "Basarab's T-shirt from the second edition of Basarab's Cup",
      img: "/images/T-shirt2022.jpeg",
      price: "$35.50",
    },
    {
      id : 4,
      title: "Basarab's Shorts 2022",
      description: "Basarab's Shorts from the second edition of Basarab's Cup",
      img: "/images/Shorts2022.jpeg",
      price: "$33.00",
    },
  ];

  const handleCardClick = (id: number) => {
    navigate(`/card/${id}`);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 md:py-10">
        <h1 className={title()}>Magazin</h1>
        <div className="inline-block h-[75vh] max-w-lg text-center justify-center mt-5">
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              <Card shadow="sm" key={index} isPressable onPress={() => handleCardClick(item.id)}>
                <CardBody className="overflow-visible p-0">
                  <img
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="flex flex-col">
                  <b className="text-[15px]">{item.title}</b>
                  <p className="text-[13px] text-default-500">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
