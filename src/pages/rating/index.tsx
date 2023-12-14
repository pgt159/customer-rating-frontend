// @ts-nocheck
import React, { Fragment, useCallback, useEffect, useState } from "react";
import styles from "../../styles/rating.module.scss";
import ButtonStar from "../../component/buttonStar/ButtonStar";
import Button from "../../component/button/Button";

import {
  createRating,
  getTodayRatingService,
  updateRating,
} from "@/store/services/rating.services";
import LayoutMain from "@/component/layoutMain/LayoutMain";
import Router from "next/router";
import { getToken } from "@/utility/auth";
import { toast } from "react-toastify";

function RatingPage() {
  const [loading, setLoading] = useState(false);
  const [listButton, setListButton] = useState<Element[]>([]);
  const [ratingPoint, setRatingPoint] = useState<number>(0);
  const [ratingId, setRatingId] = useState<string>(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("authentication") || getToken();
    if (!isLogin) {
      Router.push("/auth");
    }

    const listEl = Array.from(document.querySelectorAll(".button-star"));
    if (listEl && listEl.length > 0) {
      setListButton(listEl);
    }
  }, []);

  useEffect(() => {
    const getTodayRating = async () => {
      try {
        const response = await getTodayRatingService();
        if (response.status == 200 && response?.data?.data?.length) {
          const data = response?.data?.data[0];
          setRatingPoint(data.rating);
          setRatingId(data._id);
          onHover(null, data.rating);
          onMouseOut({ number: data.rating });
          const descriptionEl = document.querySelector("#desc");
          descriptionEl.value = data.description;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodayRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listButton]);

  const onHover = (e: React.MouseEvent<HTMLButtonElement>, number) => {
    const elId = e?.target?.dataset?.id || number;
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
    setLoading(true);
    try {
      const desc = document.querySelector("#desc")?.value?.trim() || null;
      if (!ratingPoint) {
        return alert("Không chấp nhận 0 sao vì Thuận luôn có sao");
      }
      const type = ratingId ? "update" : "create";
      const result = await (type === "update" ? updateRating : createRating)({
        description: desc,
        rating: ratingPoint,
        id: ratingId,
      });
      if (result.status === 200 || result.status === 201) {
        toast.success(
          `Your feeling has been ${type === "create" ? "created" : "updated"}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutMain>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <span className={styles.title}>Hey there, how was your day?</span>
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
              maxLength={200}
              className={styles.descriptionStyle}
              rows={5}
            />
          </div>
          <Button
            onClick={onSubmit}
            title="Submit"
            className={styles.submitButton}
            loading={loading}
          />
        </div>
      </div>
    </LayoutMain>
  );
}

export default RatingPage;
