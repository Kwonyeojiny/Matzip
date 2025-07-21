import axios from "axios";
import type { MatZip } from "../types/MatZip";

const baseApi = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getMatZipPlace = async () => {
  try {
    const response = await baseApi.get("/places");
    return response.data.places;
  } catch (error) {
    console.error("맛집 정보를 가져오는 데 실패했습니다: ", error);
    return [];
  }
};

export const getMatZipPickPlace = async () => {
  try {
    const response = await baseApi.get("/users/places");
    return response.data.places;
  } catch (error) {
    console.error("찜한 맛집 정보를 가져오는 데 실패했습니다: ", error);
    return [];
  }
};

export const postMatZipPickPlace = async (data: { place: MatZip }) => {
  try {
    const response = await baseApi.post("/users/places", data);
    return response.data;
  } catch (error) {
    console.error("찜한 맛집 추가에 실패했습니다: ", error);
    throw error;
  }
};

export const deleteMatZipPickPlace = async (id: string) => {
  try {
    const response = await baseApi.delete(`/users/places/${id}`);
    return response.data;
  } catch (error) {
    console.error("찜한 맛집 삭제에 실패했습니다: ", error);
    throw error;
  }
};
