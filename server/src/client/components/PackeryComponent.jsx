import React from 'react';
import Packery from 'packery';
import imagesloaded from 'imagesloaded';
import Draggabilly from 'draggabilly';
import { connect } from 'react-redux';
// import { portfolioActions } from '../actions';

const refName = 'packeryContainer';
class PackeryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggable: props.draggable,
      draggiesArr: [],
      items: props.items,
      // screenWidth: (window.innerWidth > 0) ? window.innerWidth : screen.width,
    };

    this.initializePackery = this.initializePackery.bind(this);
    this.imagesLoaded = this.imagesLoaded.bind(this);
    this.makeDraggable = this.makeDraggable.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.comparePosition = this.comparePosition.bind(this);
  }

  componentDidMount() {
    this.initializePackery();
    this.imagesLoaded();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ draggable: nextProps.draggable });
    this._timer = setTimeout(() => {
      if (this.state.draggable && this.state.screenWidth > 600) {
        this.packery.getItemElements().forEach(this.makeDraggable, this);
      }
      else {
        this.state.draggiesArr.forEach((draggie) => {
          draggie.disable();
        });
      }
      this.forceUpdate();
    }, 0);
  }

  componentWillUpdate(nextProps) {
    if (this.state.items.length !== nextProps.items.length) {
      this.setState({ items: nextProps.items });
      this.packery.reloadItems();
    }
  }

  componentDidUpdate() {
    this.performLayout();
    this.imagesLoaded();
  }

  getNewDomChildren() {
    const node = this.refs[refName];
    const children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
    return Array.prototype.slice.call(children);
  }

  initializePackery(force) {
    if (!this.packery || force) {
      this.packery = new Packery(
        this.refs[refName],
        this.props.options,
      );

      this.domChildren = this.getNewDomChildren();
      if (this.props.draggable) {
        this.packery.getItemElements().forEach(this.makeDraggable, this);
      }
    }
  }

  makeDraggable(itemElem) {
    const { draggiesArr } = this.state;
    if (!itemElem.classList.contains('dragged__item') && this.state.draggable && (this.state.screenWidth > 600)) {
      itemElem.classList.add('dragged__item');
      const draggie = new Draggabilly(itemElem);
      this.packery.bindDraggabillyEvents(draggie);
      draggiesArr.push(draggie);
      // draggie.on('dragEnd', this.updatePosition);
    } else if (itemElem.classList.contains('dragged__item') && this.state.draggable) {
      this.state.draggiesArr.forEach((draggie) => {
        draggie.enable();
        // draggie.on('dragEnd', this.updatePosition);
      });
    }
    this.packery.on('dragItemPositioned', this.updatePosition);
  }

  updatePosition() {
    const updatedItemOrder = [];
    this.packery.getItemElements().forEach((itemElem) => {
      if (isNaN(parseInt(itemElem.id, 10)) === false) {
        updatedItemOrder.push(parseInt(itemElem.id, 10));
      }
    });
    this.props.onChanged(updatedItemOrder);
    this.comparePosition(updatedItemOrder);
  }

  comparePosition(updatedItemOrder) {
    // should compare two arrays?
    const data = {};
    data.ids = updatedItemOrder;
    const { dispatch } = this.props;
    // dispatch(portfolioActions.updatePositions(data));
    // this.packery.reloadItems();
  }

  imagesLoaded() {
    if (this.props.disableImagesLoaded) return;

    imagesloaded(
      this.refs[refName],
      (instance) => {
        this.packery.layout();
      },
    );
  }

  performLayout() {
    this.packery.layout();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
    this.packery.destroy();
  }

  render() {
    return React.createElement(
      'div', {
        className: this.props.className,
        ref: refName
      },
      React.createElement('div', { className: 'portfolio__gutter' }, ''),
      this.props.children
    );
  }
}

function mapStateToProps(state) {
  // const { portfolioItem } = state;
  return {
    // portfolioItem
  };
}

const connectedPackeryComponent = connect(mapStateToProps)(PackeryComponent);
export { connectedPackeryComponent as PackeryComponent };
