import React, { Fragment, useEffect, useState } from "react";
import styles from "../../styles/rating.module.scss";
import ButtonStar from "../../component/buttonStar/ButtonStar";
import Button from "../../component/button/Button";
import { createRating } from "@/store/services/rating.services";
import LayoutMain from "@/component/layoutMain/LayoutMain";
import { useSelector } from "react-redux";
import Router from "next/router";
import { getToken } from "@/utility/auth";
function RatingPage() {
  const [listButton, setListButton] = useState<Element[]>([]);
  const [ratingPoint, setRatingPoint] = useState<number>(0);

  useEffect(() => {
    const isLogin = localStorage.getItem("authentication") || getToken();
    if (!isLogin) {
      Router.push("/auth");
    }
  }, []);

  useEffect(() => {
    const listEl = Array.from(document.querySelectorAll(".button-star"));
    if (listEl && listEl.length > 0) {
      setListButton(listEl);
    }
  }, []);

  const onHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elId = e.target.dataset.id;
    listButton.forEach((item) => {
      const itemId = item.dataset.id;

      if (parseInt(itemId || -1) <= parseInt(elId || 0)) {
        item.children[0].children[0].setAttribute("fill", "#B72EF2");
        item.children[0].children[0].setAttribute("stroke", "#F2B6E2");
      }
    });
  };

  const onMouseOut = ({ number }: { number?: number }) => {
    listButton.forEach((item) => {
      const elId = parseInt(item.dataset.id);
      if (elId > (number || ratingPoint || -1)) {
        const path = item.children[0].children[0];
        path.removeAttribute("fill");
        path.setAttribute("stroke", "#F2B6E2");
      }
    });
  };

  const onRating = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      const point = parseInt(e.target.dataset.id);
      setRatingPoint(point);
      onMouseOut({ number: point });
    }
  };

  const onSubmit = async () => {
    try {
      const desc = document.querySelector("#desc")?.value?.trim() || null;
      if (!ratingPoint) {
        return alert("Không chấp nhận 0 sao vì Thuận luôn có sao");
      }
      const result = await createRating({
        description: desc,
        rating: ratingPoint,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LayoutMain>
      <div className={styles.wrapper}>
        <span className={styles.title}>Hey there, how was your day</span>
        <div className={styles.starWrapper}>
          {Array(5)
            .fill(0)
            .map((star, index) => (
              <ButtonStar
                key={index}
                onHover={onHover}
                id={index + 1}
                onMouseOut={onMouseOut}
                onRating={onRating}
              />
            ))}
        </div>
        <div className={styles.descriptionWrapper}>
          <span className={styles.descriptionTitle}>Description</span>
          <textarea
            name="description"
            id="desc"
            rows="8"
            maxLength={200}
            className={styles.descriptionStyle}
          />
        </div>
        <Button
          onClick={onSubmit}
          title="Submit"
          className={styles.submitButton}
        />
      </div>
    </LayoutMain>
  );
}

export default RatingPage;
