import { Button, Form, Input, notification } from "antd";
import {
  LockOutlined,
  MailOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/useAuth";
import { register } from "./registerRequest";
import { login } from "../LoginPage/loginRequest";
import { Tooltip } from "antd";
import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import "../loginRegister.css";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [tooltipPlacement, setTooltipPlacement] = useState("right");

  useEffect(() => {
    const isCellPhone = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => {
      setTooltipPlacement(e.matches ? "top" : "right");
    };

    // Check on initial render
    handleChange(isCellPhone);

    // Add listener for changes
    isCellPhone.addEventListener("change", handleChange);

    // Cleanup listener
    return () => isCellPhone.removeEventListener("change", handleChange);
  }, []);

  const onFinish = async (values) => {
    if (!values.email || !values.password || !values.confirm) {
      notification.error({
        message: "You missed something!",
        description: "All fields are required",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email)) {
      notification.error({
        description: "The input is not a valid E-mail.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    if (values.password.length < 8) {
      notification.error({
        message: "Password needs to be at least 8 characters long.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    if (values.password !== values.confirm) {
      notification.error({
        description: "Confirm Password does not match Password.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    const hasUpperCase = /[A-Z]/.test(values.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);
    let missingPasswordRequirements = [];

    if (!hasUpperCase) {
      missingPasswordRequirements.push(<li key="upper">Capital letter</li>);
    }
    if (!hasSpecialChar) {
      missingPasswordRequirements.push(
        <li key="special">Special character</li>
      );
    }

    if (missingPasswordRequirements.length > 0) {
      notification.error({
        message: (
          <>
            <div>
              <div> Your password is missing: </div>
              <br />
            </div>
            <ul style={{ margin: 0 }}>{missingPasswordRequirements}</ul>
          </>
        ),
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 15,
        style: { width: 350 },
      });
      return;
    }

    try {
      notification.destroy("userexists");
      notification.destroy("registrationfailed");
      // Attempt to register
      await register(values.email, values.password);
      // Registration successful, now try to login
      try {
        await login(values.email, values.password);
        // If both registration and login are successful
        notification.success({
          message: "Registered and Logged In",
          placement: "bottomRight",
          duration: 2,
          style: { width: 300 },
        });
        setIsLoggedIn(true);
        navigate("/analysis");
      } catch (error) {
        // Login failed after successful registration
        notification.error({
          message: "Login Failed",
          description: "Login failed after successful registration.",
          icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
          placement: "top",
          duration: 15,
          style: { width: 300 },
        });
      }
    } catch (error) {
      if (
        error.message ===
        "registration failed because a user with that email already exists"
      ) {
        // User already exists
        notification.error({
          key: "userexists",
          message: "Registration Failed",
          description: "An account with this email already exists.",
          icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
          placement: "top",
          duration: 4.5,
          style: { width: 300 },
        });
      } else {
        // Registration failed
        notification.error({
          key: "registrationfailed",
          message: "Registration Failed",
          description:
            "An error occurred during registration. Please try again.",
          icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
          placement: "top",
          duration: 4.5,
          style: { width: 300 },
        });
      }
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
        <h1 className="loginregister-font">Register</h1>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: "1" }}
          scrollToFirstError
          className="register-form"
        >
          <Form.Item name="email" className="form-layout">
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Tooltip
            placement={tooltipPlacement}
            title={
              <>
                <div>Password must include:</div>
                <ul>
                  <li>Minimum 8 characters</li>
                  <li>Capital letter</li>
                  <li>Special character</li>
                </ul>
              </>
            }
          >
            <Form.Item name="password" className="form-layout">
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </Tooltip>
          <Form.Item
            name="confirm"
            className="form-layout"
            dependencies={["password"]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="loginregister-font custom-btn"
            >
              Submit
            </Button>
          </Form.Item>
          <span className="loginregister-font">Have An Account? </span>
          <a
            onClick={() => navigate("/login")}
            className="loginregister-font loginregister-toggle"
          >
            Sign In!
          </a>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
