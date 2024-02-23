import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Register = ({ toggleForm }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { confirmLogin } = useAuth();

  const onFinish = async (values) => {
    try {
      const signupResponse = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!signupResponse.ok) throw new Error("Signup failed");

      // Automatically attempt to login after signup
      const loginResponse = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!loginResponse.ok) throw new Error("Login failed after signup");

      const loginData = await loginResponse.json();
      console.log("Login Success:", loginData);
      confirmLogin();
      // Navigate to the app page after login
      navigate("/apppage");
    } catch (error) {
      console.error("Error:", error.message);
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
