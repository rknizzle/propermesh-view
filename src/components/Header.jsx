import { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (current === "login") {
      navigate("/login");
      setCurrent("");
    } else if (current === "apiDocs") {
      console.log("TODO: Redirect to API Docs page.");
      setCurrent("");
    }
  }, [current, navigate]);

  const menuItems = [
    {
      label: "Login",
      key: "login",
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
