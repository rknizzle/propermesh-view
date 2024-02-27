import { useState } from "react";
import { Col, Row } from "antd";
import Login from "./Login";
import Register from "./Register";
import "./loginRegister.css";

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col
        xs={{ span: 12 }}
        sm={{ span: 10 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
        className="login-register-container"
      >
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </Col>
    </Row>
  );
};
export default LoginRegister;
