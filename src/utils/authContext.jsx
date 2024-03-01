import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const confirmLogin = async () => {
    try {
      // Include credentials to send cookies with the request
      const response = await fetch("/auth/confirm", {
        credentials: "include",
      });
      if (response.status === 200) {
        // If the backend returns a 200 status, the user is logged in
        setIsLoggedIn(true);
      } else {
        // If the response.status is not 200, set logged in to false
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error confirming login", error);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, confirmLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
