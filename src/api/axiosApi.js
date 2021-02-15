import axios from 'axios';
// import { VUE_APP_API_URL_BACKEND } from '../environment/environment'
export const API_URL_BACKEND = 'https://fchallenge.talently.tech/api';

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);
axios.interceptors.response.use((response) => response,
  (error) => Promise.reject(error));

// eslint-disable-next-line no-unused-vars
export const apiHttp = async (method, endpoint, data, options = {}, loading = true) => {
  const { token } = localStorage; // takes user's token
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // put it on our request headers
  };
  // eslint-disable-next-line no-prototype-builtins
  if (!options.hasOwnProperty('headers')) { options.headers = defaultHeaders; }
  if (loading) { window.getApp.$emit('LOADING', true); }
  let serviceResponse = {};
  method = method.toLowerCase();
  const servicePromise = axios({
    method,
    url: `${API_URL_BACKEND}${endpoint}`,
    data,
    ...options,
  });
  try {
    const [materializedPromise] = await Promise.all([servicePromise]);
    serviceResponse = { ...materializedPromise.data };
  } catch (error) {
    serviceResponse = error;
    // buildErrorMessage(error)
  }
  window.getApp.$emit('LOADING', false);
  return serviceResponse;
};
// function buildErrorMessage (error) {
//   console.error(error.response)
//   const errorResponse = {
//     ok: 0,
//     message: {
//       code: String,
//       text: String,
//     },
//   }
//   if (typeof error.response === 'undefined') { errorResponse.message.text =
// i18n.t('message.apiErrorUndefined') } else if (error.response.status === 404)
// { errorResponse.message.text = i18n.t('message.apiError404') } else if (error.response.status === 500)
//  { errorResponse.message.text = i18n.t('message.apiError500') } else if
//  (error.response.status === 405 || error.response.status === 406)
//  { errorResponse.message.text = i18n.t('message.apiError405_406') }
//   else errorResponse.message.text = error.response.data.message[0]
//   errorResponse.ok = 0
//   errorResponse.message.code = 'E999'
//   return errorResponse
// }
