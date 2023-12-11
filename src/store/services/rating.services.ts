import { API_URL } from "@/configs/constants";
import axios from "axios";

export const getAllRatings = () => {};
export const updateRating = () => {};
export const createRating = async ({ description, rating }: createRating) => {
  try {
    const response = await axios.post(`${API_URL}/rating`, {
      description,
      rating,
    });
    console.log(response);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
