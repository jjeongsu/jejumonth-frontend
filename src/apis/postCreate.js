import axios from "axios";
import {serverURL} from "./endpoints";

export const createPost = async (formData) => {
  // 게시물 업로드 테스트를 위해서 임시 토큰  추후 삭제 후 아래 코드로 테스트 필요 !
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTA4ZGFlZThhMWU0MzQ5ZWQ3NmVjMiIsImVtYWlsIjoidGVzdCJ9LCJpYXQiOjE3Mzc1MjY3MDJ9.Zm8x7v2ZWGrWRwnBAimkPf4Nq88Sww0SIWxVBvBkWTU';
  // const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axios.post(`${serverURL}/posts/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};