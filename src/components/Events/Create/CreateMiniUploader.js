import React, { Component } from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class CreateMiniUploader extends Component{
  constructor(){
    super();

    this.state = {
      files: [] // TODO ?
    }
  }

  render(){
    return(
      <div className="mini-uploader">
        { [1,2,3,4,5,6].map(id => <UploadCard
          key={id}
          id={id} /> )}
      </div>
    )
  }
}

class UploadCard extends Component{
  constructor(){
    super();

    this.state = {
      file: null
    }

    this.uploadRef = React.createRef();
  }

  addFile = () => {
    this.uploadRef.current.click();

    // ++ API add request
  }

  // when input was actually changed
  handleFileChange = (e) => {

    const input = e.target

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (ev) => {
        this.setState({
          file: ev.target.result
        })
      };

      reader.readAsDataURL(input.files[0]);
    }

  }

  removeFile = () => {
    this.setState({
      file: null
    })

    // ++ API remove request
  }

  render(){
    const { file } = this.state

    return(
      <div className={"mini-uploader-card" + ( file ? " have-file" : "" )}>
        <input
          type="file"
          ref={this.uploadRef}
          onChange={this.handleFileChange}
          style={{ display: 'none' }} />
        { file &&
          <div className="mini-uploader-card__image" style={{
            backgroundImage: `url(${file})`
          }}>
          </div>
        }
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
      </div>
    )
  }
}

export default CreateMiniUploader
