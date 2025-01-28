import { Link } from '@nextui-org/link'; // For navigation
import { Button } from '@nextui-org/button'; // For button styling
import { CircularProgress } from '@nextui-org/progress';
import DefaultLayout from '@/layouts/default';
import { useContext, useEffect, useState } from 'react';
import AppContext from '@/contexts/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  firstName: string;
  lastName: string;
  teamCode: string;
  phoneNumber: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error("Profile must be used within an AppContext.Provider");
  }
  
  const { token, setToken, setTeamCode, setEditUser } = context;

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
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          teamCode: response.data.teamCode,
          phoneNumber: response.data.phone,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]); 

  const navigate = useNavigate();
  const logOut = () => {
    setToken(null);
    navigate('/');
  };

  const handleTeamClick = (id: number) => {
    setTeamCode(id);
    navigate(`/team`);
  };

  const handleEditClick = () => {
    setEditUser(true);
    navigate(`/register`);
  };

  return (
    <DefaultLayout>
      {loading && (
        <CircularProgress label="Loading..." />
      )}

      
      {error && (
        <div>Failed to fetch user data...</div>
      )}

        
        {user && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-2">{user.lastName} {user.firstName}</h1>
              <p className="text-lg text-gray-400">Team Code: {user.teamCode} {user.teamCode && (<Button onClick={() => handleTeamClick(parseInt(user.teamCode))}>My team</Button>)} </p>
              <p className="text-lg text-gray-400">Phone Number: {user.phoneNumber}</p>
              <p className="text-lg text-gray-400">Email: {user.email}</p>
            </div>
          
            <div className="flex justify-center gap-3 mt-6">
              <Link href="/cart">
                <Button color="primary" variant="solid">Go to Cart</Button>
              </Link>
              <Button onClick={() => handleEditClick()}>Edit Profile</Button>
              <Button onClick={logOut} color="primary" variant="ghost">Log out</Button>
            </div>
          </div>
        )}


        
    </DefaultLayout>
  );
};

export default Profile;
