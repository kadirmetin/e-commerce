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
  favorites: string[];
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  setTokenandUser: (newToken: string | null, userInfo: User | null) => void;
  updateUserFavorites: (newFavorites: string[]) => void;
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
      axios.defaults.headers.common["Authorization"] = `${newToken}`;

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const updateUserFavorites = (newFavorites: string[]) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, favorites: newFavorites };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return prevUser;
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, user, setTokenandUser, updateUserFavorites }),
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
