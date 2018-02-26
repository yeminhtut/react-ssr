import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import 'whatwg-fetch';
import { connect } from 'react-redux';
// import { PackeryComponent } from '../PackeryComponent';
// import { portfolioActions } from '../../actions';
import { PortfolioItem } from '../PortfolioItem';
import root from 'window-or-global';

class PortfolioList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items.results,
      draggable: false,
    };

    this.onListChanged = this.onListChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.portfolioItem && nextProps.portfolioItem.addedItem &&
      !this.state.items.includes(nextProps.portfolioItem.addedItem)) {
      let itemList = this.state.items;
      itemList = [nextProps.portfolioItem.addedItem, ...itemList]; //add new item

      // const items = (this.props.toggleMode == 'preview' || !this.props.authenticatedUser) ? itemList.filter(item => item.private == false) : itemList;
      const items = itemList;
      this.setState({ items: items });
      // this.props.onItemsChanged(items);
      // this.props.dispatch(portfolioActions.clear());
    }
  }

  onListChanged(itemOrder) {
    const { items } = this.state;
    const updatedItemArr = [];
    itemOrder.forEach((id) => {
      const editItem = items.find(item => item.id === id);
      if (editItem) {
        updatedItemArr.push(editItem);
      }
    });
    this.setState({ items: updatedItemArr });
  }

  render() {
    const packeryOptions = {
      transitionDuration: '0.5s', gutter: '.portfolio__gutter', originLeft: true, itemSelector: '.portfolio__item '
    };
    const { items } = this.state;
    // const { toggleMode, authenticatedUser} = this.props;
    const filterItems = items;
    // const filterItems = (toggleMode == 'preview' || !authenticatedUser) ? items.filter(item => item.private == false) : items;
    const portfolioItems = filterItems.map(item => (
      <div key={item.id} id={item.id} className={`portfolio__item`}>
        <PortfolioItem
          item={item}
        />
      </div>
    ));
    return (
      <div>
        {portfolioItems}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, portfolioItem, } = state;
  return {
    authentication,
    portfolioItem,
  };
}

const connectedPortfolioList = connect(mapStateToProps)(PortfolioList);
export { connectedPortfolioList as PortfolioList };
