import React, { createContext, useState, useEffect } from 'react';

interface IAuthContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  setToken: () => {}
});

function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");

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
    <AuthContext.Provider value={{ token, setToken }}>
      { children }
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
