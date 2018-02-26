import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const COOKIE_DOMAIN = { domain: '', path: '/' };
const token = cookies.get(token);
//portfolio
export const ADDITEM = 'add_item';
export const addItem = (data, user) => async (dispatch, getState) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  };
  axios.post('http://dev-west-api.content.co/api/v1/portfolios/'+user.username+'/items/', requestOptions)
  .then(function (response) {
    console.log('redux', response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
