import React, { useState } from "react";
import styles from "@/styles/auth.module.scss";
import dynamic from "next/dynamic";
import { Input, Form } from "antd";
import Button from "@/component/button/Button";
import Router from "next/router";
import { loginService } from "@/store/services/auth.services";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/configureStore";
import { login } from "@/store/auth/authSlice";

type FieldType = {
  userName: string;
  password: string;
};

function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (value: FieldType) => {
    dispatch(login(value));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.loginWrapper}>
        <h3 className={styles.title}>Login</h3>
        <Form name="login" onFinish={onSubmit} autoComplete="off">
          <span className={styles.fieldTitle}>User name</span>
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input className={styles.input} />
          </Form.Item>
          <span className={styles.fieldTitle}>Password</span>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password className={styles.input} />
          </Form.Item>
          <Form.Item>
            <Button
              htmltype="submit"
              className={styles.loginButton}
              title="Login"
              loading={loading}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
