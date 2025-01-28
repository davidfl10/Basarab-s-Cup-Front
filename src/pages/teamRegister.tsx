import AppContext from '@/contexts/context';
import DefaultLayout from '@/layouts/default';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import axios from 'axios';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface FormData {
    Name: string;
    Player1: string;
    Player2: string;
    Player3: string;
    Player4: string;
    Player5: string;
    Player6: string;
    Player7: string;
    Player8: string;
    Player9: string;
    Player10: string;
    Player11: string;
    Player12: string;
    Player13: string;
    Player14: string;
    [key: string]: string;
  }

const teamRegister = () => {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("https://localhost:7011/api/Table");
      setTeams(response.data);
    };
    loadData();
  }, []);

  const navigate = useNavigate();
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error("Profile must be used within an AppContext.Provider");
  }
      
  const { token, loggedIn } = context;

  const formRef = useRef<HTMLFormElement>(null);
  const [userError, setUserError] = useState<string>("");
  const [teamNameError, setTeamNameError] = useState<string>("");
  const [playerErrors, setPlayerErrors] = useState<string[]>([]);

  useEffect(() => {
    if (formRef.current) {
      const teamName = formRef.current.teamName.value.trim();
      let isNameTaken = teams.some((team) => team.name === teamName);

      if (isNameTaken) {
        setTeamNameError("This team name is already taken");
      } else {
        setTeamNameError("");
      }
    }
  }, [teams, formRef.current?.teamName?.value]);

  const validatePlayers = (data: FormData) => {
    const errors = [...playerErrors];

    [...Array(10)].forEach((_, i: number) => {
      let index: string = `Player${i + 1}`;
      if (data[index].length < 2) {
        errors[i] = "Player name must have at least 2 characters";
      } else {
        errors[i] = "";
      }
    });

    [...Array(4)].forEach((_, i: number) => {
      let index: string = `Player${i + 11}`;
      if (data[index] && data[index].length < 2) {
        errors[i + 10] = "Player name must have at least 2 characters";
      } else {
        errors[i + 10] = "";
      }
    });

    setPlayerErrors(errors);
    return errors.every((error) => error === "");
  };

  const registerBtn = () => {
    Swal.fire({
      title: 'Registered!',
      text: 'Team registered successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (loggedIn){
      e.preventDefault();
      

      if ( formRef.current ){
        const data: FormData = {
          Name: formRef.current.teamName.value.trim(),
          Player1: formRef.current.Player1.value.trim(),
          Player2: formRef.current.Player2.value.trim(),
          Player3: formRef.current.Player3.value.trim(),
          Player4: formRef.current.Player4.value.trim(),
          Player5: formRef.current.Player5.value.trim(),
          Player6: formRef.current.Player6.value.trim(),
          Player7: formRef.current.Player7.value.trim(),
          Player8: formRef.current.Player8.value.trim(),
          Player9: formRef.current.Player9.value.trim(),
          Player10: formRef.current.Player10.value.trim(),
          Player11: formRef.current.Player11.value.trim(),
          Player12: formRef.current.Player12.value.trim(),
          Player13: formRef.current.Player13.value.trim(),
          Player14: formRef.current.Player14.value.trim()
        }
        const config = {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          } 
        };

        const isPlayerValid = validatePlayers(data);

        if (!teamNameError && isPlayerValid) {
          try{
            await axios.post("https://localhost:7011/api/Team/add", data, config)
            // Reload data after successful form submission
            const response = await axios.get("https://localhost:7011/api/Table");
            setTeams(response.data);
            registerBtn();
            navigate('/turneu');
          } catch(err: any) {
            if (err.status === 500) setUserError("You have already registered a team");
        }
        }
      }
    } else {
      navigate('/login');
    }
    
  }


  return (
    <DefaultLayout>
        <div className='flex items-center justify-center min-h-screen mt-5 mb-5'>
            <div className='flex-col border-2 p-7 border-black-500-75 rounded gap-4 max-w-3xl'>
            <h1 className="font-bold mb-4 text-center">Register your team!</h1>
            <form ref={formRef} onSubmit={onSubmit} className='w-full flex flex-wrap items-center justify-center gap-4'>
                <div className='w-[60%] justify-center'>
                <div className='flex flex-col'>
                    <Input 
                      type="text" 
                      name='teamName'
                      variant='bordered' 
                      label="Team Name"
                      isRequired 
                      minLength={2}
                      maxLength={30}
                    />
                    {teamNameError && (
                      <div className="text-red-500 text-xs max-w-xs mt-1">{teamNameError}</div>
                    )}
                </div>
                </div>

                {[...Array(14)].map((_, index) => (
                    <div className='flex justify-center w-[40%] mb-6 md:mb-0' key={index}>
                      <div className='flex flex-col'>
                        <Input 
                          type="text" 
                          name={`Player${index + 1}`} 
                          variant="bordered" 
                          label={`Player ${index + 1}`} 
                          placeholder={`Enter Player ${index + 1}`}
                          isRequired={index + 1 < 11}
                          minLength={2}
                          maxLength={30}  
                        />
                        {playerErrors[index] && (
                          <div className="text-red-500 text-xs max-w-xs mt-1">{playerErrors[index]}</div>
                        )}
                      </div>
                    </div>
                ))}

                {userError && (
                  <div className="text-red-500 text-xs max-w-xs mt-2 mb-1">{userError}</div>
                )}
                <Button type="submit" color="primary" className='w-1/3 mb-2'>Submit</Button>
            </form>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default teamRegister;