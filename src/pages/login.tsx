import React, { FormEvent, useContext, useRef, useState } from "react";
import {Input} from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {EyeFilledIcon} from "../../public/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../public/EyeSlashFilledIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "@/contexts/context";
import DefaultLayout from "@/layouts/default";

interface FormData {
  Email: string;
  Password: string;
}

export default function login() {
  const [value, setValue] = React.useState("");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null); 
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Navbar must be used within an AppContext.Provider");
  }

  const { setToken } = context;
  
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current){

        const data: FormData = {
            Email: formRef.current.email.value,
            Password: formRef.current.password.value,
        }

        axios.post("https://localhost:7011/api/Auth/login", data)
          .then(res => {
            setToken(res.data.token);
            navigate("/");
          })
          .catch(err => {
            console.error(err)
            setErrorMessage("Your credentials are invalid");
          })
    }
};

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center h-[80vh]">
          <div className="flex-col border-2 p-10 border-black-500-75 rounded gap-4">
            <form ref={formRef} onSubmit={onSubmit}>
              <h1 className="mb-4">Welcome back!</h1>
              <Input
                isRequired
                name="email"
                value={value}
                type="email"
                label="Email"
                variant="bordered"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage="Please enter a valid email"
                onValueChange={setValue}
                className="max-w-xs"
              />
              <Input
                isRequired
                name="password"
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs mb-2"
              />
              {errorMessage && (
              <div className="text-red-500 text-xs mb-2">{errorMessage}</div>
              )}
              <Button color="primary" variant="solid" className="w-full mb-4" type="submit">Login</Button>
              <div className="flex justify-start items-center gap-1">
                  <p>Does not have an account?</p>
                  <Link className="" href="/register">Sign up</Link>
              </div>
            </form>
          </div>
      </div>
    </DefaultLayout>
  );
}
