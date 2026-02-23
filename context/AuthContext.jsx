"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket } from "@/sockets/connectSocket";
import { useApiRequest } from "@/hooks/useApi";
import { useRouter, usePathname } from "next/navigation";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { logoutAPI, checkToken } = useApiRequest();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const ROLE_REDIRECT = {
    doctor: "/doctor",
    staff: "/staff",
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.role) {
      connectSocket(user?.role);
    }
  }, [user?.role]);

  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res?.status === "VALID") {
          const redirectPath = ROLE_REDIRECT[res.user.role];
          setUser(res.user);
          localStorage.setItem("user", JSON.stringify(res.user));
          const isLoginPage = pathname === "/";
          // const claimId = searchParams.get("claimid");
          // const hn = searchParams.get("hn");
          // const patregId = searchParams.get("patregId");
          if (isLoginPage && redirectPath) {
            // if (hn && patregId) {
            //   router.replace(
            //     `${redirectPath}?claimid=${claimId}&hn=${hn}&patregId=${patregId}`,
            //   );
            // } else {
              router.replace(redirectPath);
            // }
          }
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
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
      // const data = await res.json();

      if (!res.status == 200) {
        return false;
      }

      return res;
    } catch (err) {
      console.log(err);

      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await checkTokenTimeout();

      if (result.success !== true) {
        logout(); // clear state + redirect
      }
    }, 60 * 30 * 1000); // เช็คทุก 1 นาที

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
