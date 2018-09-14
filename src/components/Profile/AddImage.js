import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class AddImage extends Component{
  constructor(){
    super();

    this.uploadRef = React.createRef()
  }

  addFile = () => {
    this.uploadRef.current.click();
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
      props: { clickHandler }
    } = this;

    return(
      <div
        onClick={clickHandler}
        className="p-head-gal__thumb is-editable">
        <input
          type="file"
          ref={this.uploadRef}
          onChange={this.handleFileChange}
          style={{ display: 'none' }} />
        <div
          onClick={this.addFile}
          className="p-head-gal__thumb-add">
          <SvgIcon name="add-attachment" />
        </div>
      </div>
    )
  }
}

export default AddImage
