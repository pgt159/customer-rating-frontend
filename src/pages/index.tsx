import Image from "next/image";
import LayoutMain from "@/component/layoutMain/LayoutMain";
import styles from "@/styles/home.module.scss";
import Button from "@/component/button/Button";
import Router from "next/router";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/configureStore";

export default function Home() {
  const { isAuth } = useAppSelector((state: { auth: any }) => state.auth);
  const onGoRating = () => {
    Router.push("/rating");
  };

  const onLogin = () => {
    Router.push("/auth");
  };

  return (
    <LayoutMain>
      <div className={styles.homeWrapper}>
        {isAuth ? (
          <div className={styles.sloganWrapper}>
            <span className={styles.title}>Hey there,</span>
            <span className={styles.slogan}>Problem solving is easy</span>
            <span className={styles.subSlogan}>
              You tell me your feelings, I take care of it
            </span>
            <Button
              onClick={onGoRating}
              title={"Rate your day!"}
              className={styles.ratingButton}
            />
          </div>
        ) : (
          <div className={styles.sloganWrapper}>
            <span className={styles.smallSlogan}>
              A project that made just for you
            </span>
            <span className={styles.title}>PGT Rating</span>
            <span className={styles.slogan}>Rate our date, rate me</span>
            <span className={styles.subSlogan}>I am always here listening</span>
            <Button
              onClick={onLogin}
              title={"Login"}
              className={styles.ratingButton}
            />
          </div>
        )}
      </div>
    </LayoutMain>
  );
}
