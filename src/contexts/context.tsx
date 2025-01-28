import { createContext, useState, ReactNode, useEffect } from "react";

interface AppContextType {
  loggedIn: boolean | null;
  setLoggedIn: (value: boolean | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  teamCode: number | null;
  setTeamCode: (teamCode: number | null) => void;
  editUser: boolean;
  setEditUser: (editUser: boolean) => void;
  editTeam: boolean;
  setEditTeam: (editUser: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  const [token, setTokenState] = useState<string | null>(null);
  const [teamCode, setTeamCode] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [editTeam, setEditTeam] = useState<boolean>(false);

  const tokenExpiryTime = 60 * 60 * 1000;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const expiryTime = localStorage.getItem('expiryTime');
    const currentTime = new Date().getTime();

    if (storedToken && expiryTime && currentTime < parseInt(expiryTime)) {
      setTokenState(storedToken);
      setLoggedIn(isLoggedIn);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('expiryTime');
      setLoggedIn(false);
      setTokenState(null);
    }
  }, []);

  const setToken = (token: string | null) => {
    setTokenState(token);

    if (token) {
      const expiryTime = new Date().getTime() + tokenExpiryTime;

      localStorage.setItem('token', token);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('expiryTime', expiryTime.toString());

      setLoggedIn(true);

      // Set timeout to clear token after the expiry time
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('expiryTime');
        setTokenState(null);
        setLoggedIn(false);
      }, tokenExpiryTime);

    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('expiryTime');
      setLoggedIn(false);
    }

  };

  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, teamCode, setTeamCode, editUser, setEditUser, editTeam, setEditTeam }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
