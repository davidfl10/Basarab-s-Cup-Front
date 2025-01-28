import React, { FormEvent, useContext, useEffect, useRef } from "react";
import {Input} from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {EyeFilledIcon} from "../../public/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../public/EyeSlashFilledIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import Swal from "sweetalert2";
import AppContext from "@/contexts/context";

interface FormData {
    Firstname: string;
    Lastname: string;
    Phone: string;
    Teamcode: string;
    Email: string;
    Password: string;
}

export default function register() {
  const [value, setValue] = React.useState("");
  const [fnvalue, setFNValue] = React.useState("");
  const [lnvalue, setLNValue] = React.useState("");
  const [phonevalue, setPhoneValue] = React.useState("");
  const [codevalue, setCodeValue] = React.useState("");
  const [passvalue, setPassValue] = React.useState("");


  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [firstNameErrors, setFirstNameErrors] = React.useState<string>();
  const [lastNameErrors, setLastNameErrors] = React.useState<string>();
  const [phoneErrors, setPhoneErrors] = React.useState<string>();
  const [emailErrors, setEmailErrors] = React.useState<string>();
  const [passwordErrors, setPasswordErrors] = React.useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const context = useContext(AppContext);
    
  if (!context) {
    throw  new Error("Context not found");
  }
  const { token, loggedIn, editUser } = context;

  const registerBtn = () => {
    Swal.fire({
      title: 'Registered!',
      text: 'Account created successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  const editBtn = () => {
    Swal.fire({
      title: 'Edited!',
      text: 'Account edited successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  if (loggedIn) {
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const config = {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            }
          };
  
          const response = await axios.get("https://localhost:7011/api/Users/", config);
          console.log(response.data);
          setFNValue(response.data.firstName);
          setLNValue(response.data.lastName);
          setPhoneValue(response.data.phone);
          setCodeValue(response.data.teamCode);
          setPassValue(response.data.password);
          setValue(response.data.email);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchUserData();
    }, [token]);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstNameErrors("");
    setLastNameErrors("");
    setPhoneErrors("");
    setPasswordErrors("");
    setEmailErrors("");

    if (formRef.current){

        const data: FormData = {
            Firstname: formRef.current.firstName.value.trim(),
            Lastname: formRef.current.lastName.value.trim(),
            Phone: formRef.current.phoneNumber.value.trim(),
            Teamcode: formRef.current.teamCode.value.trim(),
            Email: formRef.current.email.value.trim(),
            Password: formRef.current.password.value.trim()
        }

        console.log(data);
        if (!data.Firstname) { setFirstNameErrors("First Name field is required"); }
        if (!data.Lastname) { setLastNameErrors("Last Name field is required"); }
        if ( data.Phone.length < 8 ) { setPhoneErrors("Phone Number must have at least 8 characters"); }
        if ( data.Password.length < 8 ) { setPasswordErrors("Password must have at least 8 characters"); }
        if (!data.Email.trim()) { setEmailErrors("Write an valid email"); }


        if ( firstNameErrors || lastNameErrors || phoneErrors || passwordErrors ) { 
          return; 
        }
        else if (editUser) {
          axios.put("https://localhost:7011/api/Users/edit", data, {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            }
          })
          .then(() => {
            editBtn();
            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else {
          axios.post("https://localhost:7011/api/Auth/register", data)
          .then(() => {
            registerBtn();
            navigate("/login");
          })
          .catch((err : any) => {
            if (err) {
              console.log(err.status);
              if (err.status === 500) { setEmailErrors("This email is already registered. Use another one.") }
            } else {
              console.error("An error occurred:", err);
            }
          })
        }
        
    }

  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center h-screen">
          <div className="flex-col border-2 p-10 border-black-500-75 rounded gap-4">
              <form ref={formRef} onSubmit={onSubmit}>
                  {(editUser) ? (
                    <h1 className="mb-4">Edit your account!</h1>
                  ) : (
                    <h1 className="mb-4">Create an account!</h1>
                  )}
                  <Input
                    isRequired
                    name="firstName"
                    value={fnvalue}
                    onValueChange={setFNValue}
                    type="text"
                    variant="bordered"
                    label="First Name"
                    className="max-w-xs mb-2"
                  />
                  {firstNameErrors && (
                  <div className="text-red-500 text-xs max-w-xs mb-1">{firstNameErrors}</div>
                  )}
                  <Input
                    isRequired
                    name="lastName"
                    value={lnvalue}
                    onValueChange={setLNValue}
                    type="text"
                    variant="bordered"
                    label="Last Name"
                    className="max-w-xs mb-2"
                  />
                  {lastNameErrors && (
                  <div className="text-red-500 text-xs max-w-xs mb-1">{lastNameErrors}</div>
                  )}
                  <Input
                    isRequired
                    name="phoneNumber"
                    value={phonevalue}
                    onValueChange={setPhoneValue}
                    type="text"
                    variant="bordered"
                    label="Phone Number"
                    className="max-w-xs mb-2"
                  />
                  {phoneErrors && (
                  <div className="text-red-500 text-xs max-w-xs mb-1">{phoneErrors}</div>
                  )}
                  <Input
                    name="teamCode"
                    value={codevalue}
                    onValueChange={setCodeValue}
                    type="text"
                    variant="bordered"
                    label="Team Code"
                    className="max-w-xs mb-2"
                  />
                  <Input
                    isRequired
                    name="email"
                    value={value}
                    type="email"
                    label="Email"
                    variant="bordered"
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "success"}
                    onValueChange={setValue}
                    className="max-w-xs mb-2"
                  />
                  {emailErrors && (
                  <div className="text-red-500 text-xs max-w-xs mb-1">{emailErrors}</div>
                  )}
                  <Input
                    isRequired
                    name="password"
                    value={passvalue}
                    onValueChange={setPassValue}
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
                  {passwordErrors && (
                  <div className="text-red-500 text-xs max-w-xs mb-1">{passwordErrors}</div>
                  )}
                  <>
                  {(editUser) ? (
                    <Button color="primary" variant="solid" className="w-full mb-4" type="submit">Edit profile</Button>
                  ) : (
                    <>
                      <Button color="primary" variant="solid" className="w-full mb-4" type="submit">Sign up</Button>
                      <div className="flex justify-start items-center gap-1">
                          <p>Already have an account?</p>
                          <Link className="" href="/login">Log in</Link>
                      </div>
                    </>
                  )}
                  </>
              </form>
          </div>
      </div>
    </DefaultLayout>
  );
}
