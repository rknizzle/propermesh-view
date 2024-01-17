import { useState } from "react";
import { Menu } from "antd";
import "./header.css";

const Header = () => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    // TODO: Add logic to handle menu clicks
    // if currentKey is "login", redirect to /login
    // if currentKey is "apiDocs", redirect to /apiDocs
  };

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
