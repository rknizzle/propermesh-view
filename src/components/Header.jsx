import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../utils/useAuth";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { confirmLogin, isLoggedIn } = useAuth();

  useEffect(() => {
    confirmLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = async (e) => {
    if (e.key === "logout") {
      // Make a call to the backend to logout and wait for it to complete
      await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
      confirmLogin(); // Check login status again after logout
    } else if (e.key === "loginregister") {
      navigate("/loginregister");
    } else if (e.key === "apiDocs") {
      console.log("TODO: Redirect to API Docs page.");
    } else if (e.key === "apppage") {
      navigate("/apppage");
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          label: "App",
          key: "apppage",
        },
        {
          label: "API Docs",
          key: "apiDocs",
        },
        {
          label: "Logout",
          key: "logout",
        },
      ]
    : [
        {
          label: "Login",
          key: "loginregister",
        },
        {
          label: "API Docs",
          key: "apiDocs",
        },
      ];

  return (
    <div className="header-container">
      <div className="header-title">Propermesh</div>
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={menuItems}
        className="header-menu"
      />
    </div>
  );
};

Header.propTypes = {
  confirmLogin: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default Header;
