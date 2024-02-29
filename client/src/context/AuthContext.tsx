import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface User {
  userId: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  setTokenandUser: (newToken: string | null, userInfo: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken_] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });

  const setTokenandUser = (newToken: string | null, userInfo: User | null) => {
    setToken_(newToken);
    setUser(userInfo);

    if (newToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, user, setTokenandUser }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
