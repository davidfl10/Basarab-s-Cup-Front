import { useContext, useEffect, useState } from 'react';
import AppContext from '@/contexts/context';
import DefaultLayout from '@/layouts/default';
import axios from 'axios';
import { CircularProgress } from '@nextui-org/progress';
import { Button } from '@nextui-org/button';

interface User{
    id: number;
    teamCode: string;
}

const Team = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Team must be used within an AppContext.Provider");
  }

  const { loggedIn, token, teamCode } = context;
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);

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
                setUser({
                    id: response.data.id,
                    teamCode: response.data.teamCode
                });
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchUserData();
    }, []);
    }

  useEffect(() => {
    const loadData = async () => {
        try {
            const response = await axios.get("https://localhost:7011/api/Table");
            setTeams(response.data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
        setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <DefaultLayout>
        <CircularProgress label="Loading..." />
      </DefaultLayout>
    )
  }

  if (!teams || teams.length === 0) {
    return (
      <DefaultLayout>
        <div>No teams available.</div>
      </DefaultLayout>
    );
  }

  const matchingTeam = teams.find(team => team.id === teamCode);

  if (!matchingTeam) {
    return (
      <DefaultLayout>
        <div>No team found for the provided team code.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">{matchingTeam.name}</h1>

            {/* Team Players */}
            <div className="text-center bg-gray-100 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-2 w-full max-w-3xl">
              {[...Array(14)].map((_, i) => {
                const player = matchingTeam[`player${i + 1}`];
                return (
                  player && (
                    <p key={i} className="text-lg text-gray-700">
                      Player{i + 1}: {player}
                    </p>
                  )
                );
              })}
            </div>
          
            {/* Team Statistics */}
            <div className="text-center bg-gray-100 rounded-lg p-4 shadow-md mb-6 w-full max-w-3xl">
              <p className="text-lg text-gray-800">
                Played: <span className="font-semibold">{matchingTeam.played}</span>
              </p>
              <p className="text-lg text-gray-800">
                Points: <span className="font-semibold">{matchingTeam.points}</span>
              </p>
              <p className="text-lg text-gray-800">
                Goal Difference: <span className="font-semibold">{matchingTeam.gd}</span>
              </p>
            </div>

            {/* {user?.id === matchingTeam.userId && (
            <Button className="mt-6" color="primary" variant="solid">
              Edit Team
            </Button>
            )} */}

            { user?.teamCode === String(matchingTeam.id) && (
                <div className="mt-6 mb-10">
                  <h2 className="text-xl font-bold">Match Videos</h2>
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchingTeam.videos?.map((video: any, index: number) => (
                      <div key={index}>
                        <video controls width="300">
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <p className="mt-2">{video.title}</p>
                      </div>
                    ))}
                  </div> */}
                </div>
            )}
        </div>
    </DefaultLayout>
  );
};

export default Team;

