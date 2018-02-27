import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { fetchCurrentUser, fetchUsers } from '../actions';
import { getRatings } from '../actions/user.actions';
import { Helmet } from 'react-helmet';

const cookies = new Cookies();
class ReviewsPage extends Component {
  head() {
    return (
      <Helmet>
        <title>Reviews Page</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  componentDidMount() {
    const token = cookies.get('token');
    // this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>
        {this.head()}
        Review Page
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    authentication,
    user,
  };
}

function loadData(store) {
  return store.dispatch(fetchCurrentUser());
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchCurrentUser, fetchUsers })(ReviewsPage)
};
