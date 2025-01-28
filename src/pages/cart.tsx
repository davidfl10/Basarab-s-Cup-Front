import AppContext from '@/contexts/context'
import DefaultLayout from '@/layouts/default';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Card, CardBody } from '@nextui-org/card';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@nextui-org/link';
import { CircularProgress } from '@nextui-org/progress';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  name: string;
  description: string;
  images: string;
  price: number;
}

interface CartItems{
  productId: number;
  quantity: number;
  product: Product;
}


const cart = () => {
    const context = useContext(AppContext);
    
    if (!context) {
        throw  new Error("Context not found");
    }

    const {token} = context;

    const saveProducts = (data: any) => {
      let cartItems : CartItems[] = [];

      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const product = element.product;
          const quantity = element.quantity;
          const imageArray = product.images.split(" ");

          cartItems.push({
            productId : product.id,
            quantity : quantity,
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              images: imageArray[0],
              price: product.price,
            }
          });

        };
      };

      setCartProducts(cartItems);
      setLoading(false);
    };
    
    const [cartProducts, setCartProducts] = useState<CartItems[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
      const getProducts = async () => {
        try {
          const config = {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            }
          };
    
          const response = await axios.get("https://localhost:7011/api/Cart", config);
          // console.log(response.data);
          saveProducts(response.data);
        } catch (error) {
          setError("Failed to fetch products");
          setLoading(false);
        }
      };

      useEffect(() => {
        if (token) {
          getProducts();
        }
      }, [token]);

    
    const totalCost = cartProducts.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
    
    const navigate = useNavigate();
    const viewProduct = (id: number) => {
      navigate(`/card/${id}`);
    }

    const deleteBtn = () => {
      Swal.fire({
        title: 'Deleted!',
        text: 'Item deleted from your cart successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    const deleteProduct = async (id: number) => {
      try {
        const data = {
          ProductId: id
        }
        const config = {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          }
        };
  
        const response = await axios.post("https://localhost:7011/api/Cart/delete", data, config);
        console.log(response.data);
        getProducts();
      } catch (error) {
        console.log(error);
      }
    }

    const updateQuantity = async (productId: number, increment: boolean) => {
      const updatedCart = cartProducts.map((item) => {
        if (item.productId === productId) {
            const updatedQuantity = increment ? item.quantity + 1 : item.quantity - 1;
            if (updatedQuantity > 0 && updatedQuantity < 10) {
              return { ...item, quantity: updatedQuantity };
            }
          }
        return item;
      });
  
      setCartProducts(updatedCart);

      try{
        const data = {
          ProductId: productId,
          Quantity: increment ? 1 : -1
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
      };

      
    };

    if (isLoading) {
      return (
        <DefaultLayout>
          <CircularProgress label="Loading..." />
        </DefaultLayout>
      )
    }

    if (error){
      return (
        <DefaultLayout>
          <div>{error}</div>
        </DefaultLayout>
      )
    }

  return (
    <DefaultLayout>
      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-5 col-span-6 md:col-span-8">
          <h3 className="font-semibold text-foreground/90">Your cart is empty</h3>
          <Link href='/magazin'> <Button>Start Shopping</Button> </Link>
        </div>
      ) : (
        <section className="flex flex-col items-center justify-center gap-4">
          {cartProducts.map((item) => (
            <Card
            key={item.productId}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
            >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt={item.product.name}
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src={item.product.images}
                    width="100%"
                  />
                </div>
      
                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90">{item.product.name}</h3>
                      <div className="flex items-center gap-2">
                        <Button size='sm' onPress={() => updateQuantity(item.productId, false)}>
                          -
                        </Button>
                        <p className="text-small text-foreground/80">Quantity: {item.quantity}</p>
                        <Button size="sm" onPress={() => updateQuantity(item.productId, true)}> 
                          +
                        </Button>
                      </div>
                      <h1 className="text-large font-medium mt-2">Product Cost: {item.quantity*item.product.price}$</h1>
                    </div>
                  </div>
      
                  <div className="flex justify-between gap-2 mt-0 md:mt-10">
                    <Button onPress={() => viewProduct(item.productId)}>View Product</Button>
                    <Button onClick={deleteBtn} onPress={() => deleteProduct(item.productId)} color='danger'>Delete</Button>
                  </div>
                  
                </div>
              </div>

            </CardBody>
          </Card>
          ))}
          <div className="flex gap-2 mt-0 md:mt-10">
            <h1 className="text-large font-bold mt-2">Total Price: {totalCost}$</h1>
            <Button color='primary'>Finish shopping</Button>
          </div>
        </section>

        )}
      
    </DefaultLayout>
  );
};

export default cart;