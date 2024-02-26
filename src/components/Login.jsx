import { Form, Input, Button, notification } from "antd";
import {
  MailOutlined,
  LockOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { login } from "../loginRequest";

const Login = ({ toggleForm }) => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { loginSuccess } = await login(values.email, values.password);

    if (loginSuccess) {
      notification.success({
        message: "Logged In",
        placement: "bottomRight",
        duration: 1.5,
        style: {
          width: 300,
        },
      });
      setIsLoggedIn(true);
      navigate("/apppage");
    } else {
      notification.error({
        message: "Login Failed",
        description: "Please check your credentials and try again.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: {
          width: 300,
        },
      });
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
