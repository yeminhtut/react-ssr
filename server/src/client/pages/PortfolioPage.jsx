import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { fetchContent, fetchPortfolioItems, fetchRequiredData, fetchCurrentUser } from '../actions';
import { Helmet } from 'react-helmet';
import { PortfolioList } from '../components/PortfolioList';
import { AddPortfolio } from '../components/AddPortfolio';

const cookies = new Cookies();
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMode: 'edit',
      items: '',
      authenticatedUser: false,
    };
    this.toggleMode = this.toggleMode.bind(this);
  }
  componentWillMount() {
    this.props.fetchContent();
    this.props.fetchPortfolioItems();
    const token = cookies.get('token');
    if (token) {
      this.props.fetchCurrentUser(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ userPortfolio: nextProps.portfolio });
    // if (nextProps.portfolio.items && nextProps.portfolio.items.results) {
    //   this.setState({ changedItems: nextProps.portfolio.items.results });
    // }

    if (nextProps.content && nextProps.authentication.user) {
      if (nextProps.authentication.user && nextProps.authentication.user.id === nextProps.content.id) {
        this.setState({ authenticatedUser: true });
      }
    }
    // if (nextProps.profile.error) {
    //   this.setState({ notFound: true });
    // }

    if (!nextProps.authentication.user) {
      this.setState({ authenticatedUser: false });
    }
  }

  toggleMode(e) {
    this.setState({ toggleMode: e.target.value.toLowerCase() });
  }

  head() {
    return (
      <Helmet>
        <title>Portfolio</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        {this.head()}
        <div className='portfolio__container'>
          <div className={`portfolio__toggle ${this.state.toggleMode}`}>
            <button
              className='toggle__edit'
              type='button'
              value='Edit'
              onClick={this.toggleMode}
            >
            Edit
            </button>
            <button
              className='toggle__preview'
              type='button'
              value='Preview'
              onClick={this.toggleMode}
            >
            Preview
            </button>
          </div>
          {this.state.authenticatedUser &&
            <AddPortfolio />
          }
          <PortfolioList
            items={items}
          />
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, content, items } = state;
  const { user } = authentication;
  return {
    authentication,
    user,
    content,
    items
  };
}

// export default {
//   component: connect(mapStateToProps, { fetchContent, fetchPortfolioItems })(Portfolio),
//   loadData: ({ dispatch }) => dispatch(fetchContent(), dispatch(fetchPortfolioItems()))
// };

export default {
  component: connect(mapStateToProps, { fetchContent, fetchPortfolioItems, fetchRequiredData, fetchCurrentUser })(Portfolio),
  loadData: ({ dispatch }) => dispatch(fetchRequiredData())
};
