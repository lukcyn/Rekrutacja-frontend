import axios from './axios';


export const login = async (login: string, password: string) => {
  try {
    const response = await axios.post('/auth/login', { login, password });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};