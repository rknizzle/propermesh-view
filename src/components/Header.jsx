import { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn", isLoggedIn);

  const confirmLogin = async () => {
    try {
      // Include credentials to send cookies with the request
      const response = await fetch("/auth/confirm", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.status === 200) {
        // If the backend returns a 200 status, the user is logged in
        setIsLoggedIn(true);
        console.log(response.status);
      } else {
        // If the response is not ok, set logged in to false
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error confirming login", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    confirmLogin();
  }, [navigate, setIsLoggedIn]);

  const onClick = (e) => {
    setCurrent(e.key);

    if (e.key === "logout") {
      fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (current === "loginregister") {
      navigate("/loginregister");
      setCurrent("");
    } else if (current === "apiDocs") {
      console.log("TODO: Redirect to API Docs page.");
      setCurrent("");
    }
  }, [current, navigate]);

  const menuItems = isLoggedIn
    ? [
        {
          label: "Logout",
          key: "logout",
        },
        {
          label: "API Docs",
          key: "apiDocs",
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
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
        className="header-menu"
      />
    </div>
  );
};

export default Header;
