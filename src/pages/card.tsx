
// Swiper core styles
import {Navigation, Pagination, Virtual} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "@nextui-org/button";
import axios from "axios";
import AppContext from "@/contexts/context";
import { useContext, useState } from "react";
import Swal from 'sweetalert2';
import { Navbar } from "@/components/navbar";


interface Product {
    id: number;
    title: string;
    description: string;
    img: string[];
    quantity: number;
    price: string;
}

const CardDetail = () => {
    const { id } = useParams<{ id: string }>(); // Get the id from the URL

    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Function to handle size selection
    const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    };

    const list: Product[] = [
        {
          id : 1,
          title: "Basarab's T-shirt 2021",
          description: "Basarab's T-shirt from the first edition of Basarab's Cup",
          img: ["/images/T-shirt2021.jpeg", "/images/T-shirt2021-2.jpeg"],
          quantity: 10,
          price: "$25.50",
        },
        {
          id : 2,
          title: "Basarab's Shorts 2021",
          description: "Basarab's Shorts from the first edition of Basarab's Cup",
          img: ["/images/Shorts2021.jpeg", "/images/Shorts2021-2.jpeg"],
          quantity: 10,
          price: "$23.00",
        },
        {
          id : 3,
          title: "Basarab's T-shirt 2022",
          description: "Basarab's T-shirt from the second edition of Basarab's Cup",
          img: ["/images/T-shirt2022.jpeg", "/images/T-shirt2022-2.jpeg"],
          quantity: 10,
          price: "$35.50",
        },
        {
          id : 4,
          title: "Basarab's Shorts 2022",
          description: "Basarab's Shorts from the second edition of Basarab's Cup",
          img: ["/images/Shorts2022.jpeg", "/images/Shorts2022-2.jpeg", "/images/Shorts2022-3.jpeg", "/images/Shorts2022-4.jpeg"],
          quantity: 10,
          price: "$33.00",
        },
      ];

    const product: Product | undefined = list.find(p => p.id === Number(id)); // Example product lookup
  
    if (!product) {
        return <div>Product not found!</div>; // Handle case where no product matches the id
      }

      const navigate = useNavigate();
      const context = useContext(AppContext);
  
      if (!context) {
        throw new Error("Profile must be used within an AppContext.Provider");
      }
      
      const { token, loggedIn } = context;
      console.log(token);

    
    const handleClick = () => {
      Swal.fire({
        title: 'Added!',
        text: 'Item added to your cart successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
      const addToCart = async () => {
        if (loggedIn){
          try {
          const data = {
            productId: id,
            quantity: quantityUser
          }
          const config = {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            }
          };
    
          const response = await axios.post("https://localhost:7011/api/Cart/add", data, config);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        else {
          navigate('/login');
        }
        
      };

      const [quantityUser, setQuantity] = useState(1);
      const updateQuantity = (productId: number, increment: boolean) => {
        list.map((item) => {
          if (item.id === productId) {
            setQuantity((prevQuantity) => {
              // Only allow updates if within range of 1 to 10
              if (increment && prevQuantity < 10) {
                return prevQuantity + 1;
              } else if (!increment && prevQuantity > 1) {
                return prevQuantity - 1;
              }
              // If out of range, don't update
              return prevQuantity;
            });
          }
        });
      }

  return (
    <> 
      <Navbar />
        <div className="flex flex-col px-6 md:flex-row gap-5 items-center justify-center">
          {/* Swiper Slider for Images */}
          <div className="w-full md:w-1/2 h-2/3 md:h-[80vh]">
          <Swiper modules={[Virtual, Navigation, Pagination]} spaceBetween={50} slidesPerView={1} virtual navigation pagination={{ clickable: true }}>
              {product.img.map((image, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className=" rounded-md mx-auto object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <div className="flex items-center gap-2 mb-4">
              <Button size='sm' onPress={() => updateQuantity(product.id, false)}>
                -
              </Button>
              <p className="text-small text-foreground/80">Quantity: {quantityUser}</p>
              <Button size="sm" onPress={() => updateQuantity(product.id, true)}> 
                +
              </Button>
            </div>
            {/* <p>Size:</p>
            <ButtonGroup className="mb-4">
              {['S', 'M', 'L'].map((size) => (
                <Button
                  key={size}
                  onPress={() => handleSizeSelect(size)}
                  color={selectedSize === size ? 'primary' : 'default'} // Change color based on selected size
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup> */}
            <p className="text-xl font-semibold mb-4">{product.price}</p>
            <Button className="mb-4" onClick={handleClick} onPress={addToCart} color="primary" variant="solid">
              Add to Cart
            </Button>
          </div>
        </div>
    </> 
  );
};

export default CardDetail;
