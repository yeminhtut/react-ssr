import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const COOKIE_DOMAIN = { domain: '', path: '/' };
const token = cookies.get(token);
//ratings
export const GETRATINGS = 'get_ratings';
export const getRatings = (user) => async (dispatch, getState) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  // return fetch(`${env.apiEndpoint}/users/${userId}/ratings/`, requestOptions).then(handleResponse);
  axios.get('http://dev-west-api.content.co/api/v1/users/'+user.username+'/items/', requestOptions)
  .then(function (response) {
    console.log('redux', response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
