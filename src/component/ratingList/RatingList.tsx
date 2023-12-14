import { getAllRatings } from "@/store/services/rating.services";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import moment from "moment";

interface IRecordData {
  createdAt: string;
  description: string;
  rating: number;
  _id: string;
}
export default function RatingList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<IRecordData[]>([]);

  useEffect(() => {
    const getHistoryRating = async () => {
      setLoading(true);
      try {
        const res = await getAllRatings();
        if (res.status === 200) {
          setListData(res.data.data);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getHistoryRating();
  }, []);
  return (
    <div className={styles.ratingHistoryWrapper}>
      <span className={styles.ratingHistoryTitle}>Your rating history</span>
      <span className={styles.ratingHistoryCol}>
        <span className={styles.date}>Date</span>
        <span className={styles.point}>Rating stars</span>
        <span className={styles.desc}>Description</span>
      </span>
      <div className={styles.scrollWrapper}>
        {listData?.length > 0
          ? listData.map((rating) => (
              <RatingRecord data={rating} key={rating?._id} />
            ))
          : null}
      </div>
    </div>
  );
}

const RatingRecord = ({ data }: { data: IRecordData }) => {
  return (
    <div className={styles.recordWrapper}>
      <span className={styles.date}>
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </span>
      <span className={styles.point}>{data.rating}</span>
      <span className={styles.desc}>{data.description}</span>
    </div>
  );
};
