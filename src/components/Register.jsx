import { useState } from "react";
import { AutoComplete, Button, Form, Input, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  TeamOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <h1>Register</h1>
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

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="company"
          rules={[
            {
              required: false,
              message: "Please input your company!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<TeamOutlined className="site-form-item-icon" />}
            placeholder="Company"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            placeholder="Phone Number"
          />
        </Form.Item>

        <Form.Item
          name="website"
          rules={[
            {
              required: false,
              message: "Please input website!",
            },
          ]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
            <Input
              prefix={<DesktopOutlined className="site-form-item-icon" />}
              placeholder="Website"
            />
          </AutoComplete>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Register;
