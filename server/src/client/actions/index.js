import axios from 'axios';
import Cookies from 'universal-cookie';
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
export const FETCH_PUBLIC_USER = 'fetch_public_user';
export const fetchPublicUser = (username) => async (dispatch, getState) => {
  const res = await axios.get(`http://dev-west-api.content.co/api/v1/portfolios/${username}`);
  dispatch({
    type: FETCH_PUBLIC_USER,
    payload: res.data
  });
};

export const FETCH_PORTFOLIO_ITEMS = 'fetch_portfolio_items';
export const fetchPortfolioItems = (username) => async (dispatch, getState) => {
  const res = await axios.get(`http://dev-west-api.content.co/api/v1/portfolios/${username}/items/`);
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

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  // console.log('check server', api);
  console.log('call this one');
  const requestOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  console.log('options', api);
  const res = await axios.get('http://dev-west-api.content.co/api/v1/me/', requestOptions);
  console.log('resp', res);
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });

  // const res = await api.get('/me');
  // console.log('then',res);
};

export const FETCH_REQUIRED_DATA = 'fetch_required_data';
export const fetchRequiredData = (data) => async (dispatch, getState) => {
  console.log('data', getState());
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
      type: FETCH_PUBLIC_USER,
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
