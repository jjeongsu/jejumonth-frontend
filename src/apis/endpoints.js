export const serverURL = import.meta.env.VITE_API_BASE_URL;

/**
# ======================#
|         AUTH          |
# ======================#
*/

export const AUTH = Object.freeze({
  signup: '/signup',
  login: '/login',
  logout: '/logout',
});

/**
# ======================#
|         USER         |
# ======================#
*/

export const USER = Object.freeze({
  updateUser: '/settings/update-user',
  updatePassword: '/settings/update-password',
  updatePhoto: `${serverURL}/users/upload-photo`,
  deleteUser: '/users/delete-user',
  getUser: userId => `/users/${userId}`,
});
