import React from 'react';
import { connect } from 'react-redux';

class PortfolioItem extends React.Component {
  static checkImageUrl(imageUrl) {
    return (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  constructor(props) {
    super(props);

    this.state = {
      itemEdit: false,
      imagePreviewUrl: false,
    };
  }

  // cancelItem() {
  //   this.setState({ itemEdit: false });
  //   this.props.isItemEdit();
  // }
  //
  // handleTrashClick() {
  //   this.props.onTrashClick(this.props.item.id);
  // }
  //
  // handleEditClick() {
  //   this.props.onEditClick(this.props.item.id);
  //   this.setState({ itemEdit: true });
  //   this.props.isItemEdit();
  // }
  //
  // updateItem(item) {
  //   if (item.imagePreviewUrl) {
  //     this.setState({ imagePreviewUrl: item.imagePreviewUrl });
  //   }
  //   this.props.onClickUpdate(item);
  //   this.setState({ itemEdit: false });
  //   this.props.isItemEdit();
  // }
  //
  // handleTag(item) {
  //   this.props.onClickUpdate(item);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.toggleMode === 'preview') {
  //     this.setState({ itemEdit: false })
  //   }
  // }

  render() {
    const { item } = this.props;
    let itemImage;
    if (item.image || item.attachment) {
      const itemThumbnail = item.image ? item.image : item.attachment;
      itemImage = PortfolioItem.checkImageUrl(itemThumbnail);
    }

    let itemLabel;
    switch (item.type) {
      case 1:
        itemLabel = item.publication.name || item.publication.url || 'link';
        break;
      default:
        if (item.attachment) {
          itemLabel = (item.attachment.slice(-3) === 'pdf') ? 'pdf' : 'image';
        } else {
          itemLabel = 'image';
        }
        break;
    }

    let itemExcerpt = item.content;
    if (item.content) {
      let itemContent = item.content.replace(/[ ]{2,}/gi, ' ');
      itemContent = itemContent.replace(/\n /, '\n');
      const itemContentCount = itemContent.split(' ').length;
      itemExcerpt = itemContentCount > 50 ? `${itemContent.substring(0, 250)} ...` : item.content;
    }

    return (
      <div className="p-item__draggable">
        {item.show_thumbnail &&
          <a href={item.url ? item.url : item.attachment} target="_blank">
            {itemImage &&
              <img
                className="p-item__thumbnail p-item__draggable"
                alt=""
                src={(this.state.imagePreviewUrl ? this.state.imagePreviewUrl :
                  (item.image ? item.image : item.attachment))}
              />
            }
          </a>
        }
        <div className="p-item__details">
          <p className="p-item__label">{itemLabel}</p>
          <a className="p-item__link" href={item.url ? item.url : item.attachment} target="_blank">
            <h3 className="p-item__title">{item.title ? item.title : 'Untitled Content'}</h3>
          </a>
          <p className="p-item__content">
            {itemExcerpt}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication
  };
}

const connectedPortfolioItem = connect(mapStateToProps)(PortfolioItem);
export { connectedPortfolioItem as PortfolioItem };
