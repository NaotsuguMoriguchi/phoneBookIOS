import axios from 'axios';
import * as storageService from './storageService';
export const httpService = {
  get,
  post,
  put,
  deleteDetail
};

const baseUrl = 'https://meiwaku-denwa.club/api/'
function get(apiEndpoint, token)
{
  // token = storageService.getStorage('token');
  return axios.get(baseUrl + apiEndpoint, {
    headers: {
      // 'authorization': token
    }
  }).then((response) =>
  {
    return response;
  }).catch((err) =>
  {
    return err.response;
    //  console.log(err);
  })
}

function post(apiEndpoint, payload, token, form)
{
  // token = storageService.getStorage('token');
  var formheader = {
  }
  if (form === 'form')
  {
    formheader = {
      'recaptcha-token': token,
      // "Content-Type": "multipart/form-data"
    }
  }
  return axios.post(baseUrl + apiEndpoint, payload, {
    headers: formheader
  }).then((response) =>
  {
    return response;
  }).catch((err) =>
  {
    return err.response;
    // console.log(err);
  })
}
function put(apiEndpoint, payload, token)
{
  // token = storageService.getStorage('token');
  return axios.put(baseUrl + apiEndpoint, payload, {
    headers: {
      // 'authorization': token
    }
  }).then((response) =>
  {
    return response;
  }).catch((err) =>
  {
    return err.response;
    // console.log(err);
  })
}
function deleteDetail(apiEndpoint, token)
{
  // token = storageService.getStorage('token');
  return axios.delete(baseUrl + apiEndpoint, {
    headers: {
      // 'authorization': token
    }
  }).then((response) =>
  {
    return response;
  }).catch((err) =>
  {
    return err.response;
    // console.log(err);
  })
}