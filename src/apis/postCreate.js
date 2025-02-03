import devAPI from '../config/axiosDevConfig';
export const createPost = async formData => {
  try {
    const response = await devAPI.post('/posts/create', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
