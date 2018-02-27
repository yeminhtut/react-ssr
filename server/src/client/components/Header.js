import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { userActions } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
      authentication: props.authentication,
      profile: ''
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.accountLogout = this.accountLogout.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.showIntercom = this.showIntercom.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ authentication: nextProps.authentication });
    if (nextProps.profile) {
      this.setState({profile: nextProps.profile});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  toggleDropDown() {
    if (!this.state.dropDownOpen) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen,
    }));
  }

  handleOutsideClick(e) {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    this.toggleDropDown();
  }

  accountLogout() {
    this.props.dispatch(userActions.logout());
  }

  showIntercom() {
    window.Intercom('showNewMessage');
  }

  render() {
    const { user } = this.props;
    const userId = this.state.profile && this.state.profile.profile && this.state.profile.profile.id ? this.state.profile.profile.id : (user && user.id ? user.id : '');
    const { authentication } = this.state;
    const rightDropDown = authentication && authentication.user ?
      (<div
        className={`g-dropdown ${this.state.dropDownOpen ? 'g-dropdown--open' : ''}`}
        ref={node => { this.node = node; }}>
        <div className="c-nav__link-group">
          <div
            className="c-nav__link c-nav__link--square"
            aria-label="View profile"
            onClick={this.toggleDropDown}
          >
            <div className="g-text__row">
              <img
                className="c-nav__link-image"
                src={user.picture}
                alt=""
              />
              <p className="c-nav__link-text c-nav__name">
                {user.name}
              </p>
            </div>
          </div>
        </div>
        <div className="g-dropdown__menu c-nav__menu">
          <div role="menu">
            <Link
              to="/settings/user"
              className="c-menu__link--settings"
            >
              <div className="c-menu__image--settings i-settings" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" fillRule="evenodd" stroke="#020303" strokeWidth="1.75" d="M6.31 7.94a1.09 1.09 0 0 1-.1-.19l-.08-.18a1.7 1.7 0 0 1 2.49-2.1l.16.12c.07.04.12.09.17.14.42-.2.87-.37 1.33-.49 0-.07.02-.14.04-.2l.06-.2a1.7 1.7 0 0 1 3.24 0l.06.2c.02.06.04.13.04.2.46.12.9.28 1.33.49.05-.06.1-.1.17-.14l.16-.11a1.7 1.7 0 0 1 2.5 2.09l-.09.18a1.1 1.1 0 0 1-.1.2 7 7 0 0 1 .7 1.21h.22l.2.03a1.7 1.7 0 0 1 .56 3.2l-.18.09a1.1 1.1 0 0 1-.2.08c-.04.47-.12.94-.24 1.38l.16.15.14.14a1.7 1.7 0 0 1-1.63 2.81l-.2-.04a1.1 1.1 0 0 1-.2-.07c-.33.33-.69.64-1.08.9l.04.22v.2a1.7 1.7 0 0 1-3.04 1.11l-.12-.16a1.1 1.1 0 0 1-.12-.19 7.1 7.1 0 0 1-1.4 0c-.03.07-.07.13-.12.19l-.12.16a1.7 1.7 0 0 1-3.05-1.11l.01-.2c0-.08.02-.15.04-.22a7.04 7.04 0 0 1-1.08-.9l-.2.07-.2.04a1.7 1.7 0 0 1-1.63-2.8l.14-.15.16-.15c-.12-.44-.2-.9-.24-1.38a1.09 1.09 0 0 1-.2-.08l-.18-.1a1.7 1.7 0 0 1 .56-3.2l.2-.02h.22a7 7 0 0 1 .7-1.22zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
              </div>
              <p className="c-menu__text--primary">Settings</p>
            </Link>
            <span
              className="c-menu__link--settings"
              onClick={this.showIntercom}
            >
              <div className="c-menu__image--settings i-help">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd" transform="rotate(45 12.85 11.65)"><circle cx="12.57" cy="12.5" r="8.69" stroke="#020303" strokeWidth="2" transform="rotate(45 12.57 12.5)" /><path fill="#020303" fillRule="nonzero" d="M8.75 5.89c-.41-.46-1.1-.48-1.53-.04L5.9 7.15c-.44.44-.42 1.12.04 1.53l3.02 2.69a2.8 2.8 0 0 1 2.46-2.46L8.75 5.89zM16.17 11.36l3.01-2.68c.46-.41.48-1.1.04-1.53l-1.3-1.3a1.04 1.04 0 0 0-1.53.04L13.7 8.9a2.8 2.8 0 0 1 2.46 2.46zM8.97 13.64l-3.02 2.68c-.46.4-.48 1.1-.04 1.53l1.3 1.3c.44.44 1.12.42 1.54-.04l2.68-3.01a2.8 2.8 0 0 1-2.46-2.46zM13.7 16.1l2.69 3.01c.41.47 1.1.48 1.53.05l1.3-1.31c.44-.44.42-1.12-.04-1.53l-3.01-2.68a2.8 2.8 0 0 1-2.46 2.46z" /><circle cx="12.44" cy="12.37" r="4.5" stroke="#020303" strokeWidth="2" transform="rotate(45 12.44 12.37)" /></g></svg>
              </div>
              <p className="c-menu__text--primary">Help</p>
            </span>
            <a
              className="c-menu__link--settings"
              onClick={this.accountLogout}
            >
              <div className="c-menu__image--settings i-logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="#020303" fillRule="nonzero">
                    <path d="M16.38 9.09a.75.75 0 1 1 .94-1.17l3.25 3.45c.36.3.37.85 0 1.15l-3.24 3.55a.75.75 0 1 1-.96-1.15l2.54-2.96-2.53-2.87z" />
                    <path d="M10.7 12.75h8.72c.35 0 .64-.34.64-.75s-.29-.75-.64-.75H10.7c-.35 0-.64.34-.64.75s.29.75.64.75z" />
                    <path d="M13.19 17.7l-.01-.76c0-.5.4-.9.9-.9.5-.01.9.39.91.88a47 47 0 0 1 0 1.7.9.9 0 0 1-.9.88H5.9a.9.9 0 0 1-.91-.9V5.4c0-.5.4-.9.9-.9h8.07c.5 0 .9.4.9.9v1.67a.9.9 0 1 1-1.81 0V6.3H6.81v11.4h6.38z" />
                  </g>
                </svg>
              </div>
              <p className="c-menu__text--primary">Sign Out</p>
            </a>
          </div>
        </div>
      </div>) : (
      <Link
        className="c-nav__link"
        to="/accounts/register"><div className="c-nav__link-text">Create Your Portfolio</div>
      </Link>);
    return (
      <div className="c-nav__bar">
        <div className="c-nav__brand" aria-label="Logo">
          <div className="c-logo__logo">
            {!authentication.user &&
              <Link to='/accounts/login'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 40" width="137.5" height="20"><path className="c-logo__path" fill="#4A474A" fillRule="evenodd" d="M22.32 28.66c-1.5 1.13-3.9 2.1-6.6 2.1-4.35 0-7.46-3.48-7.46-7.6 0-4.14 3.1-7.55 7.47-7.55 2.76 0 5.03 1 6.6 2.1V9.1c-1.7-.83-4.62-1.37-6.6-1.37C6.28 7.68 0 14.38 0 23.18 0 31.9 6.28 38.7 15.73 38.7c2.04 0 4.9-.53 6.6-1.43v-8.6zm3.7-5.5c0-8.74 6.76-15.5 15.5-15.5 8.73 0 15.5 6.76 15.5 15.5 0 8.73-6.77 15.55-15.5 15.55-8.74 0-15.5-6.8-15.5-15.5zm8.26 0c0 4.12 3.1 7.6 7.24 7.6 4.18 0 7.17-3.48 7.17-7.6 0-4.14-3-7.55-7.2-7.55s-7.3 3.5-7.3 7.6zm36.3-14.9h-8.13v29.8h8.14v-17.3c.1-3.17 2-5.15 5-5.15 3.1 0 5.1 2.3 5.1 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.6-11.2-3.7 0-6.2 1.8-7.9 4.37v-3.8zm35.12 29.8V15.2h5.03V8.26h-5.03V0l-7.66 1.73v6.53h-5.02v6.94h4.54v22.85h8.14zm35.53-12.33H121c.73 3.4 3.72 5.62 7.9 5.62 3.72 0 7.43-1.08 10.12-2.8v7.82c-2.63 1.38-6.46 2.34-10.77 2.34-8.85 0-15.37-6.2-15.37-15.5 0-8.7 6.28-15.5 14.9-15.5 8.6 0 13.93 6.5 13.93 14.2 0 1.3-.2 2.9-.4 3.9zm-13.52-11.3c-3.5 0-6.2 2.32-6.7 5.13h12.9c-.1-3.05-2.7-5.14-6.1-5.14zm27.4-6.17H147v29.8h8.14v-17.3c.18-3.17 2.1-5.15 5.1-5.15 3.1 0 5.07 2.3 5.07 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.5-11.2-3.7 0-6.2 1.8-7.8 4.37v-3.8zm35.1 29.8V15.2h5V8.26h-5V0l-7.6 1.73v6.53h-5v6.94h4.6v22.85h8.16zm7.3-4.92c0 3.17 2.4 5.5 5.5 5.5 3.3 0 5.6-2.33 5.6-5.5 0-3.23-2.4-5.62-5.6-5.62-3.1 0-5.5 2.4-5.5 5.62zm37.5-4.48c-1.5 1.13-3.9 2.1-6.5 2.1-4.3 0-7.5-3.48-7.5-7.6 0-4.14 3.1-7.55 7.5-7.55 2.8 0 5 1 6.6 2.1V9.1c-1.62-.83-4.6-1.37-6.52-1.37-9.45 0-15.74 6.7-15.74 15.5 0 8.73 6.3 15.55 15.74 15.55 2 0 4.9-.5 6.56-1.4v-8.6zm3.7-5.5c0-8.74 6.8-15.5 15.5-15.5 8.8 0 15.5 6.76 15.5 15.5 0 8.73-6.7 15.55-15.5 15.55-8.7 0-15.5-6.8-15.5-15.5zm8.3 0c0 4.12 3.1 7.6 7.3 7.6 4.2 0 7.2-3.48 7.2-7.6 0-4.14-3-7.55-7.2-7.55-4.1 0-7.2 3.5-7.2 7.6z" /></svg><div className="c-logo__fallback" />
              </Link>
            }
            {authentication && authentication.user && userId && (userId == user.id) &&
              <Link to={`/${authentication.user.username}`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 40" width="137.5" height="20"><path className="c-logo__path" fill="#4A474A" fillRule="evenodd" d="M22.32 28.66c-1.5 1.13-3.9 2.1-6.6 2.1-4.35 0-7.46-3.48-7.46-7.6 0-4.14 3.1-7.55 7.47-7.55 2.76 0 5.03 1 6.6 2.1V9.1c-1.7-.83-4.62-1.37-6.6-1.37C6.28 7.68 0 14.38 0 23.18 0 31.9 6.28 38.7 15.73 38.7c2.04 0 4.9-.53 6.6-1.43v-8.6zm3.7-5.5c0-8.74 6.76-15.5 15.5-15.5 8.73 0 15.5 6.76 15.5 15.5 0 8.73-6.77 15.55-15.5 15.55-8.74 0-15.5-6.8-15.5-15.5zm8.26 0c0 4.12 3.1 7.6 7.24 7.6 4.18 0 7.17-3.48 7.17-7.6 0-4.14-3-7.55-7.2-7.55s-7.3 3.5-7.3 7.6zm36.3-14.9h-8.13v29.8h8.14v-17.3c.1-3.17 2-5.15 5-5.15 3.1 0 5.1 2.3 5.1 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.6-11.2-3.7 0-6.2 1.8-7.9 4.37v-3.8zm35.12 29.8V15.2h5.03V8.26h-5.03V0l-7.66 1.73v6.53h-5.02v6.94h4.54v22.85h8.14zm35.53-12.33H121c.73 3.4 3.72 5.62 7.9 5.62 3.72 0 7.43-1.08 10.12-2.8v7.82c-2.63 1.38-6.46 2.34-10.77 2.34-8.85 0-15.37-6.2-15.37-15.5 0-8.7 6.28-15.5 14.9-15.5 8.6 0 13.93 6.5 13.93 14.2 0 1.3-.2 2.9-.4 3.9zm-13.52-11.3c-3.5 0-6.2 2.32-6.7 5.13h12.9c-.1-3.05-2.7-5.14-6.1-5.14zm27.4-6.17H147v29.8h8.14v-17.3c.18-3.17 2.1-5.15 5.1-5.15 3.1 0 5.07 2.3 5.07 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.5-11.2-3.7 0-6.2 1.8-7.8 4.37v-3.8zm35.1 29.8V15.2h5V8.26h-5V0l-7.6 1.73v6.53h-5v6.94h4.6v22.85h8.16zm7.3-4.92c0 3.17 2.4 5.5 5.5 5.5 3.3 0 5.6-2.33 5.6-5.5 0-3.23-2.4-5.62-5.6-5.62-3.1 0-5.5 2.4-5.5 5.62zm37.5-4.48c-1.5 1.13-3.9 2.1-6.5 2.1-4.3 0-7.5-3.48-7.5-7.6 0-4.14 3.1-7.55 7.5-7.55 2.8 0 5 1 6.6 2.1V9.1c-1.62-.83-4.6-1.37-6.52-1.37-9.45 0-15.74 6.7-15.74 15.5 0 8.73 6.3 15.55 15.74 15.55 2 0 4.9-.5 6.56-1.4v-8.6zm3.7-5.5c0-8.74 6.8-15.5 15.5-15.5 8.8 0 15.5 6.76 15.5 15.5 0 8.73-6.7 15.55-15.5 15.55-8.7 0-15.5-6.8-15.5-15.5zm8.3 0c0 4.12 3.1 7.6 7.3 7.6 4.2 0 7.2-3.48 7.2-7.6 0-4.14-3-7.55-7.2-7.55-4.1 0-7.2 3.5-7.2 7.6z" /></svg><div className="c-logo__fallback" />
              </Link>
            }

            {authentication && authentication.user && userId && (userId !== user.id) &&
              <Link to={`/${authentication.user.username}`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 40" width="137.5" height="20"><path className="c-logo__path" fill="#4A474A" fillRule="evenodd" d="M22.32 28.66c-1.5 1.13-3.9 2.1-6.6 2.1-4.35 0-7.46-3.48-7.46-7.6 0-4.14 3.1-7.55 7.47-7.55 2.76 0 5.03 1 6.6 2.1V9.1c-1.7-.83-4.62-1.37-6.6-1.37C6.28 7.68 0 14.38 0 23.18 0 31.9 6.28 38.7 15.73 38.7c2.04 0 4.9-.53 6.6-1.43v-8.6zm3.7-5.5c0-8.74 6.76-15.5 15.5-15.5 8.73 0 15.5 6.76 15.5 15.5 0 8.73-6.77 15.55-15.5 15.55-8.74 0-15.5-6.8-15.5-15.5zm8.26 0c0 4.12 3.1 7.6 7.24 7.6 4.18 0 7.17-3.48 7.17-7.6 0-4.14-3-7.55-7.2-7.55s-7.3 3.5-7.3 7.6zm36.3-14.9h-8.13v29.8h8.14v-17.3c.1-3.17 2-5.15 5-5.15 3.1 0 5.1 2.3 5.1 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.6-11.2-3.7 0-6.2 1.8-7.9 4.37v-3.8zm35.12 29.8V15.2h5.03V8.26h-5.03V0l-7.66 1.73v6.53h-5.02v6.94h4.54v22.85h8.14zm35.53-12.33H121c.73 3.4 3.72 5.62 7.9 5.62 3.72 0 7.43-1.08 10.12-2.8v7.82c-2.63 1.38-6.46 2.34-10.77 2.34-8.85 0-15.37-6.2-15.37-15.5 0-8.7 6.28-15.5 14.9-15.5 8.6 0 13.93 6.5 13.93 14.2 0 1.3-.2 2.9-.4 3.9zm-13.52-11.3c-3.5 0-6.2 2.32-6.7 5.13h12.9c-.1-3.05-2.7-5.14-6.1-5.14zm27.4-6.17H147v29.8h8.14v-17.3c.18-3.17 2.1-5.15 5.1-5.15 3.1 0 5.07 2.3 5.07 5.6v16.9h8.2V18.9c0-6.4-4.1-11.2-10.5-11.2-3.7 0-6.2 1.8-7.8 4.37v-3.8zm35.1 29.8V15.2h5V8.26h-5V0l-7.6 1.73v6.53h-5v6.94h4.6v22.85h8.16zm7.3-4.92c0 3.17 2.4 5.5 5.5 5.5 3.3 0 5.6-2.33 5.6-5.5 0-3.23-2.4-5.62-5.6-5.62-3.1 0-5.5 2.4-5.5 5.62zm37.5-4.48c-1.5 1.13-3.9 2.1-6.5 2.1-4.3 0-7.5-3.48-7.5-7.6 0-4.14 3.1-7.55 7.5-7.55 2.8 0 5 1 6.6 2.1V9.1c-1.62-.83-4.6-1.37-6.52-1.37-9.45 0-15.74 6.7-15.74 15.5 0 8.73 6.3 15.55 15.74 15.55 2 0 4.9-.5 6.56-1.4v-8.6zm3.7-5.5c0-8.74 6.8-15.5 15.5-15.5 8.8 0 15.5 6.76 15.5 15.5 0 8.73-6.7 15.55-15.5 15.55-8.7 0-15.5-6.8-15.5-15.5zm8.3 0c0 4.12 3.1 7.6 7.3 7.6 4.2 0 7.2-3.48 7.2-7.6 0-4.14-3-7.55-7.2-7.55-4.1 0-7.2 3.5-7.2 7.6z" /></svg><div className="c-logo__fallback" />
              </Link>
            }

          </div>
        </div>
        {authentication && authentication.user &&
        <div className="c-nav__link-group--left">
          <a
            className="c-nav__link"
            href={`/projects`}
            aria-label="Projects"
          >
            <p className="c-nav__link-text">Projects</p>
          </a>
        </div>
        }

        {authentication && authentication.user &&
        <div className="c-nav__link-group--left">
          <div
            className="c-nav__link"
            aria-label="Portfolio"
          >
            {userId && (userId !== user.id) &&
              <div className="c-nav__link-text">
                <a href={`/${authentication.user.username}`}>
                  Portfolio
                </a>
              </div>
            }
            {userId && (userId == user.id) &&
              <div className="c-nav__link-text">
                <Link
                  to={`/${authentication.user.username}`}
                >Portfolio
                </Link>
              </div>
            }
          </div>
        </div>
        }

        {authentication && authentication.user &&
        <div className="c-nav__link-group--left">
          <div className="c-nav__link">
            <div className="c-nav__link-text">
              <Link
                to="/ratings"
              >Reviews
              </Link>
            </div>
          </div>
        </div>
            }

        <div className="c-nav__link-group c-nav__link-group--right">
          {authentication && authentication.user &&
            <Link
              to={`/guide`}
              className="c-nav__link c-nav__link--square"
            >
              <svg className="i-guide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" icon-guide="">
                <path id="guide" fill="#020303" fillRule="nonzero" d="M19.13 3.57a1 1 0 0 1 1.37.93v13a1 1 0 0 1-.63.93l-5 2a1 1 0 0 1-.74 0L9.5 18.58l-4.63 1.85a1 1 0 0 1-1.37-.93v-13a1 1 0 0 1 .63-.93l5-2a1 1 0 0 1 .74 0l4.63 1.85 4.63-1.85zM5.5 18.02l3-1.2V5.98l-3 1.2v10.84zm8-10.84l-3-1.2v10.84l3 1.2V7.18zm2 10.84l3-1.2V5.98l-3 1.2v10.84z"></path></svg>
            </Link>
          }
          {rightDropDown}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, profile, portfolio } = state;
  const { user } = authentication;
  return {
    authentication,
    user,
    profile,
    portfolio,
  };
}

// const connectedHeader = connect(mapStateToProps)(Header);
// export { connectedHeader as Header };
export default connect(mapStateToProps)(Header);
