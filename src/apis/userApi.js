import devAPI from '../config/axiosDevConfig';

export const postSignupApi = async data => {
  const { email, password, nickname } = data;
  try {
    const response = await devAPI.post('/signup', {
      email,
      password,
      fullName: nickname,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postSigninApi = async data => {
  const { email, password } = data;
  try {
    const response = await devAPI.post('/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postProfileImage = async data => {
  try {
    const response = await devAPI.post('/users/upload-photo', data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserPassword = async data => {
  const { password } = data;
  try {
    const response = await devAPI.put('/settings/update-password', {
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserFullname = async data => {
  const { fullName } = data;
  try {
    const response = await devAPI.put('/settings/update-user', {
      fullName,
      userName: fullName,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async userId => {
  try {
    const response = await devAPI.delete('/users/delete-user', {
      id: userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postLogoutUserApi = async () => {
  try {
    const response = await devAPI.post('/logout');
    if (response.error) {
      return;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 팔로우 정보 가져오기
export const getUserFollowersApi = async (userId) => {
  try {
    const response = await axios.get(`${serverURL}/users/${userId}`);
    return {
      followers: response.data.followers || [],
      following: response.data.following || [],
    }
  } catch (error) {
    console.error('사용자 팔로워 정보 가져오기 실패:', error);
  }
}