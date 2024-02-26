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
  const { confirmLogin } = useAuth();

  const onFinish = async (values) => {
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
        return; // Stop execution if login fails
      } else {
        // If both registration and login are successful
        notification.success({
          message: "Registered and Logged In",
          placement: "bottomRight",
          duration: 2,
          style: { width: 300 },
        });
        confirmLogin();
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
        <Form.Item
          name="email"
          className="form-layout"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="form-layout"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
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
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
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
