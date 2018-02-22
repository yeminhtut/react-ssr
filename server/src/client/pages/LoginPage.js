import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, userLogin } from '../actions';
import { Helmet } from 'react-helmet';

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
    // this.togglePassword = this.togglePassword.bind(this);
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


  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    const { username, password, submitted } = this.state;
    return (
      <div>
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

                <div
                  className="c-input__message-container"
                  role="alert"
                >
                  <p className="c-input__message--error">
                    Please enter your username
                  </p>
                </div>
            </div>
          </div>
          <div className="c-input__container">
            <div className="c-input__group">
              <div className="g-row--space-between">
                <label
                  className="c-login__label"
                  tabIndex="-1">Password</label>
              </div>

              <div className="c-login__password">
                <input
                  type="password"
                  className="c-login__input"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
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
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers, userLogin })(LoginPage)
};
