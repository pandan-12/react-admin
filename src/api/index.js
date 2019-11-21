import axiosInstance from './request';

export const reqLogin = (username, password) => {
  return axiosInstance({
    method: 'post',
    url: '/login',
    data: {
      username,
      password
    },
  })
}