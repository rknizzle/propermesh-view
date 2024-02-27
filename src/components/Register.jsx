import PropTypes from "prop-types";
import { Button, Form, Input, notification } from "antd";
import {
  LockOutlined,
  MailOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { register } from "../registerRequest";
import { login } from "../loginRequest";

const Register = ({ toggleForm }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

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
        message: "Invalid Email",
        description: "The input is not valid E-mail!",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    if (values.password !== values.confirm) {
      notification.error({
        message: "Password Mismatch",
        description: "The passwords you entered do not match!",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
      return;
    }

    // Attempt to register
    const { registerSuccess } = await register(values.email, values.password);

    if (registerSuccess) {
      const { loginSuccess } = await login(values.email, values.password);

      if (!loginSuccess) {
        // Login failed after successful registration
        notification.error({
          message: "Login Failed",
          description: "Login failed after successful registration.",
          icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
          placement: "top",
          duration: 8,
          style: { width: 300 },
        });
        return;
      } else {
        // If both registration and login are successful
        notification.success({
          message: "Registered and Logged In",
          placement: "bottomRight",
          duration: 2,
          style: { width: 300 },
        });
        setIsLoggedIn(true);
        navigate("/apppage");
      }
    } else {
      notification.error({
        message: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
      });
    }
  };

  return (
    <>
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
        <Form.Item name="password" className="form-layout" hasFeedback>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          className="form-layout"
          dependencies={["password"]}
          hasFeedback
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
            style={{ width: "50%" }}
            className="loginregister-font custom-btn"
          >
            Submit
          </Button>
        </Form.Item>
        <span className="loginregister-font">Have An Account? </span>
        <a
          onClick={toggleForm}
          className="loginregister-font loginregister-toggle"
        >
          Sign In!
        </a>
      </Form>
    </>
  );
};

Register.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Register;
