import axios from 'axios';
import Cookies from 'universal-cookie';
import 'whatwg-fetch';
import { authHeader } from '../helpers';

const cookies = new Cookies();
const COOKIE_DOMAIN = { domain: '', path: '/' };
const token = cookies.get('token');

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

//portfolio
export const FETCH_CONTENT = 'fetch_content';
export const fetchContent = () => async (dispatch, getState) => {
  const res = await axios.get(`http://dev-west-api.content.co/api/v1/portfolios/ymh`);
  dispatch({
    type: FETCH_CONTENT,
    payload: res.data
  });
};

export const FETCH_PORTFOLIO_ITEMS = 'fetch_portfolio_items';
export const fetchPortfolioItems = () => async (dispatch, getState) => {
  const res = await axios.get(`http://dev-west-api.content.co/api/v1/portfolios/ymh/items/`);
  dispatch({
    type: FETCH_PORTFOLIO_ITEMS,
    payload: res.data
  });
};

export const USER_LOGIN = 'user_login';
export const userLogin = (data) => async (dispatch, getState) => {
  axios.post('http://dev-west-api.content.co/api/v1/accounts/login/', data)
  .then(function (response) {
    const token = response.data.key;
    cookies.set('token', token, COOKIE_DOMAIN);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';

export const fetchCurrentUser = (token) => async (dispatch, getState) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  const res = await axios.get('http://dev-west-api.content.co/api/v1/me/', requestOptions);
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_REQUIRED_DATA = 'fetch_required_data';
export const fetchRequiredData = () => async (dispatch, getState) => {

  function getUserAccount() {
    return axios.get('http://dev-west-api.content.co/api/v1/portfolios/ymh/');
  }

  function getUserPermissions() {
    return axios.get('http://dev-west-api.content.co/api/v1/portfolios/ymh/items/');
  }

  await axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
    dispatch({
      type: FETCH_CONTENT,
      payload: acct.data
    });
    dispatch({
      type: FETCH_PORTFOLIO_ITEMS,
      payload: perms.data
    });
  }));
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};

export const ADDITEM = 'add_item';
export const addItem = (data, user) => async (dispatch, getState) => {

  axios.post('http://dev-west-api.content.co/api/v1/portfolios/'+user.username+'/items/', data, {
    headers: authHeader()
  })
  .then(function (res) {
    dispatch({
      type: ADDITEM,
      payload: res.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};
