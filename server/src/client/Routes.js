import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';
import PortfolioPage from './pages/PortfolioPage';
import LoginPage from './pages/LoginPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...LoginPage,
        path: '/accounts/login'
      },
      {
        ...PortfolioPage,
        path: '/:user'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
