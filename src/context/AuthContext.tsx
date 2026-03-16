import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated] = useState(false);
  return <AuthContext.Provider value={{ isAuthenticated, user: null }}>{children}</AuthContext.Provider>;
};
