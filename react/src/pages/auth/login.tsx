import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Fragment } from "react/jsx-runtime";
import { useAuth } from "~/authProvider";

const Login = () => {
  const { loginAction, loading } = useAuth();
  return (
    <Fragment>
      <Form
        name="login"
        initialValues={{ username: "admin", password: "Admin@123" }}
        style={{ maxWidth: 360 }}
        onFinish={loginAction}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "vui lòng nhập mật khẩu!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        {/* <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>
            <a href="">Quên mật khẩu</a>
          </Flex>
        </Form.Item> */}

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
          <p className="mt-1">
            Hoặc <a href="">đăng ký ngay!</a>
          </p>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Login;
