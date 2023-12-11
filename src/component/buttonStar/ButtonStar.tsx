import React from "react";
import { StarIcon } from "../icons";
import styles from "./styles.module.scss";

interface IButtonStar {
  onHover: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut: ({}) => void;
  id: Number;
  onRating: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function ButtonStar({ onHover, onMouseOut, onRating, id }: IButtonStar) {
  return (
    <button
      className={`${styles.starContainer} button-star`}
      data-id={id}
      onMouseOver={onHover}
      onMouseLeave={() => onMouseOut({})}
      onClick={onRating}
    >
      <StarIcon />
    </button>
  );
}

export default ButtonStar;
