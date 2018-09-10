import React, { Component } from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';

class Thumb extends Component {
  constructor(){
    super();

    this.uploadRef = React.createRef()
  }

  // avatar uploader
  addFile = () => {
    this.uploadRef.current.click();
  }

  removeFile = () => {
    this.props.fileRemoveHandler(this.props.index)
  }

  // when input was actually changed
  handleFileChange = (e) => {
    const input = e.target
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (ev) => {
        this.props.fileChangeHandler(ev.target.result, this.props.index)
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  render(){

    const {
      props: { currentSlide, index, editMode, clickHandler, image }
    } = this;

    return (
      <div
        onClick={clickHandler.bind(this, index)}
        className={"p-head-gal__thumb" + (currentSlide === index ? " is-active": "") }>
        { editMode &&
          <React.Fragment>
            <input
              type="file"
              ref={this.uploadRef}
              onChange={this.handleFileChange}
              style={{ display: 'none' }} />
            <div
              onClick={this.removeFile}
              className="mini-uploader-card__remove">
              <SvgIcon name="remove-attachment" />
            </div>
            <div
              onClick={this.addFile}
              className="mini-uploader-card__add">
              <SvgIcon name="add-attachment" />
            </div>
          </React.Fragment>
        }
        <Image file={image} />
      </div>
    )
  }
}

export default Thumb
