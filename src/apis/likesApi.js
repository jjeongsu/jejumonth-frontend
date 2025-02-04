import devAPI from '../config/axiosDevConfig';

export const createLikesApi = async postId => {
  try {
    const response = await devAPI.post(`/likes/create`, { postId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLikesApi = async (likeId, token) => {
  try {
    const response = await devAPI.delete(`/likes/delete`, { id: likeId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
