import { Form, Input, Button, notification } from "antd";
import {
  MailOutlined,
  LockOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/useAuth";
import { login } from "./loginRequest";
import "../loginRegister.css";

const LoginPage = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);

      notification.success({
        message: "Logged In",
        placement: "bottomRight",
        duration: 1.5,
        style: { width: 300 },
      });
      setIsLoggedIn(true);
      navigate("/analysis");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "Please check your credentials and try again.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
    }
  };

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      type="flex"
      justify="center"
      align="middle"
      className="login-register-row"
    >
      <Col
        xs={{ span: 15 }}
        sm={{ span: 12 }}
        md={{ span: 10 }}
        lg={{ span: 6 }}
        className="login-register-container"
      >
        <h1 className="loginregister-font">Sign In</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="email" className="form-layout">
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item name="password" className="form-layout">
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {
            // Hide the forgot password link for now until ryan builds out the backend for it
            false && (
              <Form.Item>
                <div className="forgot-password-container">
                  <a className="login-form-forgot loginregister-font" href="">
                    Forgot Password
                  </a>
                </div>
              </Form.Item>
            )
          }
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="login-form-button loginregister-font custom-btn"
            >
              Log in
            </Button>
          </Form.Item>
          <span className="loginregister-font">No Account? </span>
          <a
            onClick={() => navigate("/register")}
            className="loginregister-font loginregister-toggle"
          >
            Create One!
          </a>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
