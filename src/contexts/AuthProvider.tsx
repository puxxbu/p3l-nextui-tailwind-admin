import { createContext, useState, useEffect } from 'react';

interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('token');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('AUTHPROVIDER');
      console.log(storedData);
      setAuth(parsedData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
