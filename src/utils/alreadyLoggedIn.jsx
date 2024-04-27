import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";
import { notification } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const AlreadyLoggedIn = ({ children }) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      notification.success({
        message: "Already Logged In",
        description: "You're already registered and logged in.",
        duration: 4,
      });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

AlreadyLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlreadyLoggedIn;