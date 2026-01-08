"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket } from "@/sockets/connectSocket";
import { useApiRequest } from "@/hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { logoutAPI, checkToken } = useApiRequest();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.role) {
      connectSocket(user.role);
    }
  }, [user?.role]);

  const login = (data) => {
    setUser(data.data.user);
    localStorage.setItem("user", JSON.stringify(data.data.user));
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.error("logout failed", e);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const checkTokenTimeout = async () => {
    try {
      const res = await checkToken();
      const data = await res.json();

      if (!res.ok) {
        return false;
      }

      return data;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await checkTokenTimeout();
      console.log("result:", result);

      if (result === "false") {
        logout(); // clear state + redirect
      }
    }, 5 * 1000); // เช็คทุก 1 นาที

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
