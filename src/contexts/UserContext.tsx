import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMsalAuth } from '../hooks/useMsal';
 
interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
}
 
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}
 
const UserContext = createContext<UserContextType | undefined>(undefined);
 
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
 
interface UserProviderProps {
  children: ReactNode;
}
 
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentAccount, isAuthenticated, logout: msalLogout } = useMsalAuth();
 
  useEffect(() => {
    if (currentAccount && isAuthenticated) {
      // Extract user information from MSAL account
      const userInfo: User = {
        id: currentAccount.homeAccountId,
        name: currentAccount.name || currentAccount.username || 'User',
        email: currentAccount.username || '',
        initials: getInitials(currentAccount.name || currentAccount.username || 'User')
      };
      setUser(userInfo);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [currentAccount, isAuthenticated]);
 
  const getInitials = (name: string): string => {
    if (!name || typeof name !== 'string') return 'U';
    // Clean the name by removing parentheses, brackets, and other special characters
    const cleanName = name.replace(/[()\[\]{}]/g, '').trim();
    // Split by spaces and filter out empty strings
    const names = cleanName.split(' ').filter(part => part.length > 0);
    if (names.length === 0) return 'U';
    if (names.length === 1) {
      const firstChar = names[0].match(/[a-zA-Z]/)?.[0];
      return firstChar ? firstChar.toUpperCase() : 'U';
    }
    // Take first character of first two names (more intuitive for most users)
    const firstName = names[0];
    const secondName = names[1];
    // Extract first letter from each name, fallback to first character if no letter found
    const firstInitial = firstName.match(/[a-zA-Z]/)?.[0] || firstName.charAt(0);
    const secondInitial = secondName.match(/[a-zA-Z]/)?.[0] || secondName.charAt(0);
    // Ensure both initials are valid characters
    if (!firstInitial || !secondInitial) return 'U';
    return (firstInitial + secondInitial).toUpperCase();
  };
 
  const logout = async () => {
    try {
      await msalLogout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
 
  const value: UserContextType = {
    user,
    isLoading,
    logout
  };
 
  return (
<UserContext.Provider value={value}>
      {children}
</UserContext.Provider>
  );
};