import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import PropTypes from "prop-types";

//This component will be used to protect routes that require you to be signed in.
const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
