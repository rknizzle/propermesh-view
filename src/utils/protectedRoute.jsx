import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import PropTypes from "prop-types";
import { Spin } from "antd";

//This component will be used to protect routes that require you to be signed in.
const ProtectedRoute = ({ component: Component }) => {
  const { isLoggedIn, loading } = useAuth();

  //wait for confrimLogin to finish before rendering the component
  if (loading) {
    return <Spin size="large" />;
  }

  // 'replace' modifies the history stack so you can't return to the analysis page via the back button.
  // This isn't currently doing what was described above, but is a safeguard for future situations
  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
