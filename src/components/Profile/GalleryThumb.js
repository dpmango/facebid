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

    // console.log(this.props)

    return (
      <div
        onClick={clickHandler ? clickHandler.bind(this, index) : undefined}
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
