import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleForm }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log("Login Success:", data);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <h1 className="loginregister-font">Sign In</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
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
            style={{ width: "50%" }}
          >
            Log in
          </Button>
        </Form.Item>
        <span className="loginregister-font">No Account? </span>
        <a
          onClick={toggleForm}
          className="loginregister-font loginregister-toggle"
        >
          Create One!
        </a>
      </Form>
    </>
  );
};

Login.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Login;
