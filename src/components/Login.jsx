import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const Login = ({ toggleForm }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
        <Form.Item>
          <div className="remember-forgot-container">
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="loginregister-font"
              style={{ color: "red" }}
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot loginregister-font" href="">
              Forgot password
            </a>
          </div>
        </Form.Item>
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
