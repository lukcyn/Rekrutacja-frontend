import { axiosPublic } from './axios';


export const login = async (login: string, password: string) => {
  try {
    const response = await axiosPublic.post('/auth/login', { login, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};