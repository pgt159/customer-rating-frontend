import React from "react";
import styles from "./styles.module.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void;
  loading?: boolean;
  title: string;
}
function Button({ onClick, title, loading, ...props }: IButton) {
  return (
    <button
      className={styles.buttonStyle}
      onClick={onClick}
      {...props}
      style={{
        cursor: loading || props.disabled ? "not-allowed" : "pointer",
        opacity: loading || props.disabled ? 0.7 : 1,
      }}
    >
      {loading ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 24, marginRight: "10px" }} />
          }
          spinning={loading}
          style={{ color: "#fff" }}
        />
      ) : null}

      <span className={styles.titleStyle}>{title}</span>
    </button>
  );
}

export default Button;
