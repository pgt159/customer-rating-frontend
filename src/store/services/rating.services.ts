import { API_URL } from "@/configs/constants";
import axios from "axios";
import ApiMethod from "@/utility/ApiMethod";
export const getAllRatings = () => {};

export const updateRating = async ({
  description,
  rating,
  id,
}: createRating) => {
  return ApiMethod.patch(`rating/${id}`, {
    description,
    rating,
  });
};

export const createRating = async ({ description, rating }: createRating) => {
  return ApiMethod.post(`rating`, {
    description,
    rating,
  });
};

export const getTodayRatingService = () => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(), // Year
    currentDate.getMonth(), // Month (zero-based)
    currentDate.getDate(), // Day
    0,
    0,
    0,
    0 // Hours, minutes, seconds, milliseconds (set to zero)
  );
  const nextDate = new Date();
  nextDate.setDate(startDate.getDate() + 1);
  return ApiMethod.get("rating", {
    params: {
      createdFrom: startDate,
      createdTo: nextDate,
      limit: 1,
    },
  });
};
