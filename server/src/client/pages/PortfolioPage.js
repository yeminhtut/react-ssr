import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent, fetchPortfolioItems, fetchRequiredData } from '../actions';
import { Helmet } from 'react-helmet';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMode: 'edit',
      items: '',
    };
    this.toggleMode = this.toggleMode.bind(this);
  }
  componentWillMount() {
    this.props.fetchContent();
    this.props.fetchPortfolioItems();
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
    const items = this.props.items.results;
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
      </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { content, items } = state;
  return {
    content,
    items
  };
}

// export default {
//   component: connect(mapStateToProps, { fetchContent, fetchPortfolioItems })(Portfolio),
//   loadData: ({ dispatch }) => dispatch(fetchContent(), dispatch(fetchPortfolioItems()))
// };

export default {
  component: connect(mapStateToProps, { fetchContent, fetchPortfolioItems, fetchRequiredData })(Portfolio),
  loadData: ({ dispatch }) => dispatch(fetchRequiredData())
};
