import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "employee" | "manager" | null;

interface User {
  id: string;
  name: string;
  email: string
  role: Role;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);

      if (Date.now() < parsed.expiry) {
        setUser(parsed.user);
      } else {
        localStorage.removeItem("auth"); // expired
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook (clean usage)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};