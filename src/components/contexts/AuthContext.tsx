import React, { createContext, useState, useEffect } from 'react';
import getService from "src/services/getService";

interface IAuthContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: Object;
  setUser: React.Dispatch<React.SetStateAction<Object>>;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  setToken: () => {},
  user: {},
  setUser: () => {}
});

function AuthProvider ({ children }: { children: React.ReactNode }) {
  const BASE_URL = "https://users-rest-service-production-9de5.up.railway.app";
  const [token, setToken] = useState(localStorage.getItem("token")||"");
  const [user, setUser] = useState({});

  useEffect(() => {
    const handleStorage = () => {
      const newToken = localStorage.getItem("token") || "";
      setToken(newToken);
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
