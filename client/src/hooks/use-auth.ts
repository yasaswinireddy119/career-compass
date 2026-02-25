import { useState, useEffect } from "react";

/* ---------------------------------- */
/* Simple Local Auth Hook             */
/* ---------------------------------- */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return {
    user: isAuthenticated ? { firstName: "User" } : null,
    isLoading: false,
    isAuthenticated,
    login,
    logout,
  };
}