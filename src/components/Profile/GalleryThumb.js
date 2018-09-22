import React, { Component } from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import RenderImage from 'helpers/RenderImage';

class Thumb extends Component {
  removeFile = () => {
    this.props.fileRemoveHandler(this.props.index)
  }

  render(){

    const {
      props: { currentSlide, index, editMode, clickHandler, image }
    } = this;

    return (
      <div
        onClick={clickHandler.bind(this, index)}
        className={"p-head-gal__thumb" +
        (currentSlide === index ? " is-active": "") +
        ( editMode ? " has-image is-editable" : "" ) }>
        { editMode &&
          <div
            onClick={this.removeFile}
            className="p-head-gal__thumb-remove">
            <SvgIcon name="remove-attachment" />
          </div>
        }
        {RenderImage(image, "gallery", true)}
      </div>
    )
  }
}

export default Thumb
