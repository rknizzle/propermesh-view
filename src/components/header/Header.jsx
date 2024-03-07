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
    } else if (e.key === "login") {
      navigate("/login");
    } else if (e.key === "apiDocs") {
      window.location.href = "/docs";
    } else if (e.key === "analysispage") {
      navigate("/analysis");
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          label: "Analysis",
          key: "analysispage",
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
        // TODO: dont show the login button until I actually build out features that you can access
        // once you're logged in -Ryan
        //{
        //  label: "Login",
        //  key: "login",
        //},
        {
          label: "API Docs",
          key: "apiDocs",
        },
      ];

  return (
    <div className="header-container">
      <div className="header-logo-title" onClick={() => navigate("/")}>
        <img
          src="/assets/favicon.png"
          alt="logo-in-header"
          id="header-logo"
        />
        <div className="header-title">Propermesh</div>
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
