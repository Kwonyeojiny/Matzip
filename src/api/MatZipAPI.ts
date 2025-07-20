import axios from "axios";

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
