import React from "react";
import styles from "./styles.module.scss";

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
      }}
    >
      {loading ? <div></div> : null}
      <span className={styles.titleStyle}>{title}</span>
    </button>
  );
}

export default Button;
