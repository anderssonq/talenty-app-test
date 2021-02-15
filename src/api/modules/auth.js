import { apiHttp } from '../axiosApi.js';
import { login, register, me } from '../config/apiRoute.js';

export const postLogin = (body) => apiHttp('POST', `${login}`, body);
export const postRegister = (body) => apiHttp('POST', `${register}`, body);
export const getUser = () => apiHttp('POST', `${me}`, {});
