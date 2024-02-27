import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../utils/useAuth";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { confirmLogin, isLoggedIn, setIsLoggedIn } = useAuth();

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
      setIsLoggedIn(false);
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
      <div className="header-title" onClick={() => navigate("/")}>
        Propermesh
      </div>
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={menuItems}
        className="header-menu"
      />
    </div>
  );
};

export default Header;
