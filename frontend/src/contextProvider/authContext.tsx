import axios from 'axios';
import React, { createContext, useContext, useState, useEffect} from 'react';

interface AuthContextType {
  accessToken: string | null;
  fetchAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);



type AuthProviderProps = {
    children: React.ReactNode;
} 

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const fetchAccessToken = async () => {
    try {
      const response = await axios.get('/api/your-endpoint');
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Error fetching access token:', error);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, fetchAccessToken }}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};