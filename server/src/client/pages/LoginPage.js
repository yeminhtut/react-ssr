import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin } from '../actions';
import { Helmet } from 'react-helmet';
import AccountOverview from '../components/AccountOverview';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      togglePassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    let data = {};
    data.username = username;
    data.password = password;
    if (username && password) {
      this.props.userLogin(data);
    }
  }

  togglePassword() {
    if (this.state.togglePassword) {
      this.setState({ togglePassword: false });
    } else {
      this.setState({ togglePassword: true });
    }
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>Login</title>
        <meta property="og:title" content="contentco" />
      </Helmet>
    );
  }

  render() {
    const { username, password, submitted } = this.state;
    const toogleText = this.state.togglePassword ? 'hide' : 'show';
    const passwordType = this.state.togglePassword ? 'text' : 'password';
    return (
      <div className="c-accounts__container">
        {this.head()}
        <div className="c-login__panel">
          <div className="c-login__header">
            <div className="c-login__brand" aria-label="Logo">
              <div className="c-logo__logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 40" width="137.5" height="20">
                  <path className="c-logo__path" fill="#4A474A" fillRule="evenodd" d="M22.32 28.66c-1.5 1.13-3.9 2.1-6.6 2.1-4.35 0-7.46-3.48-7.46-7.6 0-4.14 3.1-7.55 7.47-7.55 2.76 0 5.03 1 6.6 2.1V9.1c-1.7-.83-4.62-1.37-6.6-1.37C6.28 7.68 0 14.38 0 23.18 0 31.9 6.28 38.7 15.73 38.7c2.04 0 4.9-.53 6.6-1.43v-8.6zm3.7-5.5c0-8.74 6.76-15.5 15.5-15.5 8.73 0 15.5 6.76 15.5 15.5 0 8.73-6.77 15.55-15.5 15.55-8.74 0-15.5-6.8-15.5-15.5zm8.26 0c0 4.12 3.1 7.6 7.24 7.6 4.18 0 7.17-3.48 7.17-7.6 0-4.14-3-7.55-7.2-7.55s-7.3 3.5-7.3 7.6zm36.3-14.9h-8.13v29.8h8.14v-17.3c.1-3.17 2-5.15 5-5.15 3.1 0 5.1 2.3 5.1 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.6-11.2-3.7 0-6.2 1.8-7.9 4.37v-3.8zm35.12 29.8V15.2h5.03V8.26h-5.03V0l-7.66 1.73v6.53h-5.02v6.94h4.54v22.85h8.14zm35.53-12.33H121c.73 3.4 3.72 5.62 7.9 5.62 3.72 0 7.43-1.08 10.12-2.8v7.82c-2.63 1.38-6.46 2.34-10.77 2.34-8.85 0-15.37-6.2-15.37-15.5 0-8.7 6.28-15.5 14.9-15.5 8.6 0 13.93 6.5 13.93 14.2 0 1.3-.2 2.9-.4 3.9zm-13.52-11.3c-3.5 0-6.2 2.32-6.7 5.13h12.9c-.1-3.05-2.7-5.14-6.1-5.14zm27.4-6.17H147v29.8h8.14v-17.3c.18-3.17 2.1-5.15 5.1-5.15 3.1 0 5.07 2.3 5.07 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.5-11.2-3.7 0-6.2 1.8-7.8 4.37v-3.8zm35.1 29.8V15.2h5V8.26h-5V0l-7.6 1.73v6.53h-5v6.94h4.6v22.85h8.16zm7.3-4.92c0 3.17 2.4 5.5 5.5 5.5 3.3 0 5.6-2.33 5.6-5.5 0-3.23-2.4-5.62-5.6-5.62-3.1 0-5.5 2.4-5.5 5.62zm37.5-4.48c-1.5 1.13-3.9 2.1-6.5 2.1-4.3 0-7.5-3.48-7.5-7.6 0-4.14 3.1-7.55 7.5-7.55 2.8 0 5 1 6.6 2.1V9.1c-1.62-.83-4.6-1.37-6.52-1.37-9.45 0-15.74 6.7-15.74 15.5 0 8.73 6.3 15.55 15.74 15.55 2 0 4.9-.5 6.56-1.4v-8.6zm3.7-5.5c0-8.74 6.8-15.5 15.5-15.5 8.8 0 15.5 6.76 15.5 15.5 0 8.73-6.7 15.55-15.5 15.55-8.7 0-15.5-6.8-15.5-15.5zm8.3 0c0 4.12 3.1 7.6 7.3 7.6 4.2 0 7.2-3.48 7.2-7.6 0-4.14-3-7.55-7.2-7.55-4.1 0-7.2 3.5-7.2 7.6z" />
                </svg>
              </div>
            </div>
            <Link
              className="g-button g-button--no-margin g-button--blue-outline"
              to="/accounts/register"
            >Sign Up
            </Link>
          </div>

          <div className="c-login__content" >
            <form
              name="form"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <div tabIndex="-1" className="c-login__heading">
                <p className="c-login__title">Log into Content.co</p>
                <p className="c-login__note g-text__secondary g-text__secondary--strong">
                  Welcome back
                </p>
              </div>
              <div className="c-input__container">
                <div className="c-input__group">
                  <label className="c-login__label" tabIndex="-1">E-mail</label>
                  <input
                    type="text"
                    className="c-input__input u-no-zoom"
                    name="username"
                    value={username}
                    placeholder="Username or E-mail"
                    onChange={this.handleChange}
                  />

                  {submitted && !username &&
                    <div
                      className="c-input__message-container"
                      role="alert"
                    >
                      <p className="c-input__message--error">
                        Please enter your username
                      </p>
                    </div>
                      }

                </div>
              </div>
              <div className="c-input__container">
                <div className="c-input__group">
                  <div className="g-row--space-between">
                    <label
                      className="c-login__label"
                      tabIndex="-1">Password</label>
                    <div className="c-login__forgot">
                      <Link
                        to="/accounts/password/reset"
                        tabIndex="-1"
                      >Forgot Password
                      </Link>
                    </div>
                  </div>

                  <div className="c-login__password">
                    <input
                      type={passwordType}
                      className="c-login__input"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <div
                      className="c-password__button"
                      role="button"
                      onClick={this.togglePassword}
                    >
                      {toogleText}
                    </div>
                  </div>

                  {submitted && !password &&
                  <div
                    className="c-input__message-container"
                    role="alert"
                  >
                    <p className="c-input__message--error">
                      Please enter your password
                    </p>
                  </div>
                    }
                </div>
              </div>
              <div className="c-login__actions">
                <button
                  className="g-button g-button--blue u-expand"
                  name="submit"
                  type="submit"
                >
                    Log In
                </button>
              </div>
            </form>
          </div>
        </div>
        <AccountOverview />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default {
  component: connect(mapStateToProps, { userLogin })(LoginPage)
};
