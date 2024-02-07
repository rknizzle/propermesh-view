import { Col, Row } from "antd";
import Login from "../components/Login";
import Register from "../components/Register";
import "./loginRegister.css";

const LoginRegister = () => (
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col
      xs={{ span: 20, offset: 2 }}
      sm={{ span: 18, offset: 3 }}
      md={{ span: 14, offset: 5 }}
      lg={{ span: 10, offset: 2 }}
      id="login"
    >
      <Login />
    </Col>
    <Col
      xs={{ span: 20, offset: 2 }}
      sm={{ span: 18, offset: 3 }}
      md={{ span: 14, offset: 5 }}
      lg={{ span: 10, offset: 0 }}
      id="register"
    >
      <Register />
    </Col>
  </Row>
);
export default LoginRegister;
