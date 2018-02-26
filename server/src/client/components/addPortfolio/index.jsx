import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
// import { portfolioActions, alertActions } from '../../actions';
import { addItem } from '../../actions';

class AddPortfolio extends React.Component {
  static ensureHttpPrefix(value) {
    // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
    if (value && !/^(https?):\/\//i.test(value) && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0) {
      return `http://${value}`;
    }
    return value;
  }
  constructor(props) {
    super(props);

    this.state = {
      item: {
        url: '',
        title: '',
        description: '',
      },
      file: '',
      submitted: false,
      toggleFileUpload: false,
    };

    this.addLink = this.addLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleFileUploadAction = this.toggleFileUploadAction.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.clearFile = this.clearFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.portfolio.loading) {
      this.setState({
        item:
          { url: '', title: '', description: '' },
      });
      this.setState({ file: '' });
    }
  }

  onImageDrop(files) {
    this.setState({ file: files[0] });
  }

  toggleFileUploadAction() {
    if (this.state.toggleFileUpload) {
      this.setState({ toggleFileUpload: false });
    } else {
      this.setState({ toggleFileUpload: true });
    }
  }

  addLink(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { item } = this.state;
    const { user, dispatch } = this.props;
    // to do: validate url here
    // console.log('item', item);
    if (item.url && user.username) {
      this.props.addItem(item, user)
    }
    this.setState({ item: { url: '', title: '', description: '' } });
  }

  uploadFile(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { item, file } = this.state;
    const { user, dispatch } = this.props;
    item.file = file;
    delete item.url; // can not submit url and attachment at the same time
    if (item.file && item.title) {
      dispatch(portfolioActions.uploadFile(item, user));
      this.setState({ item: { file: '', title: '', description: '' }, file: '' });
    } else {
      dispatch(alertActions.error('Please add a file and give it a title'));
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { item } = this.state;
    let inputValue = value;
    if (name === 'url') {
      inputValue = AddPortfolio.ensureHttpPrefix(value);
    }
    this.setState({
      item: {
        ...item,
        [name]: inputValue,
      },
    });
  }

  handleImageUpload(file) {
    const { user } = this.props;
    const { dispatch } = this.props;
    if (file) {
      dispatch(portfolioActions.uploadFile(file, user));
    }
  }

  clearFile() {
    this.setState({
      file: '',
    });
  }

  render() {
    const { item, submitted, file } = this.state;
    let fileUpload;
    let addItemElement;
    const fileUploadElement = file.name ? (<div className="p-add__uploaded">
      <p>{this.state.file.name}</p>
      <img
        src="https://cdn.content.co/portfolio/icons/close-dark.svg"
        onClick={this.clearFile}
      />
    </div>)
      :
      (<div className="p-add__upload">
        <Dropzone
          className="p-add__dropbox"
          multiple={false}
          accept=".pdf,.doc,.docx,image/*,video/*,!.exe"
          onDrop={this.onImageDrop.bind(this)}
        >
          <p>Drag here, or <strong>browse</strong> to upload</p>
        </Dropzone>
        <span>* Max file size of 15MB</span>
       </div>);

    fileUpload = (<form
      className="p-add__file"
      onSubmit={this.uploadFile}
    >
      {fileUploadElement}
      <input
        id="title"
        type="text"
        name="title"
        className="p-add__text"
        onChange={this.handleChange}
        value={item.title}
        placeholder="Title"
      />
      <textarea
        id="desc"
        rows="3"
        name="description"
        placeholder="Description"
        onChange={this.handleChange}
        value={item.description}
        className="p-add__textarea"
      />
      <button
        className="p-add__button"
        name="submit"
        type="submit"
      >
      ADD
      </button>
    </form>);

    const linkUpload = (
      <form
        className="p-add__link"
        name="form"
        onSubmit={this.addLink}
        noValidate
      >
        <input
          className="p-add__text"
          name="url"
          placeholder="Add the URL of your content i.e. an article, a video or an image you have previously created"
          type="text"
          value={item.url}
          onChange={this.handleChange}
        />

        <button
          className="p-add__button"
          name="submit"
          type="submit"
        >
        ADD
        </button>
      </form>);

    if (this.state.toggleFileUpload) {
      addItemElement = fileUpload;
    } else {
      addItemElement = linkUpload;
    }
    return (
      <div
        className="portfolio__add"
      >
        <h4>Add your work</h4>
        <div className="p-add__switch" onClick={this.toggleFileUploadAction}>
          {this.state.toggleFileUpload ? "Link your work's URL instead" : 'Upload an image or PDF instead' }
        </div>
        {addItemElement}
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


const connectedAddPortfolio = connect(mapStateToProps, { addItem })(AddPortfolio);
export { connectedAddPortfolio as AddPortfolio };
