import { apiHttp } from '../axiosApi.js';
import {
  appPath, allContent, postContentProgress, getComments, postComment,
  updateComment,
  deleteComment,
} from '../config/apiRoute.js';

export const getAppToken = () => apiHttp('GET', `${appPath}/token`);
export const getAllContent = () => apiHttp('POST', `${allContent}`);
export const postProgressAPI = (id, body) => apiHttp('POST', `${postContentProgress}${id}/progress`, body);

export const getCommentsAPI = (idClass) => apiHttp('POST', `${getComments}${idClass}/comments`);
export const postCommentsAPI = (body) => apiHttp('POST', `${postComment}`, body);
export const updateCommentsAPI = (id, body) => apiHttp('POST', `${updateComment}${id}/update`, body);
export const deleteCommentsAPI = (id) => apiHttp('DELETE', `${deleteComment}${id}`);

export const postContentProgressAPI = (id) => apiHttp('POST', `${postContentProgress}${id}/progress`);
