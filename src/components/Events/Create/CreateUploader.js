import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';
import RenderImage from 'helpers/RenderImage';

class CreateUploader extends Component {
  render(){
    const {images} = this.props

    return(
      <div className="e-card-uploader">
        { images.map(img => (
          <UploadCard
            key={img.id}
            onImageUploaded={this.props.onChangeImages}
            image={img.image}
            id={img.id} />
        ))}
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
      <div className={"e-card-ucard" + ( file ? " have-file" : "" )}>
        <input
          type="file"
          ref={this.uploadRef}
          onChange={this.handleFileChange}
          style={{ display: 'none' }} />
        <div className="e-card-ucard__image">
          {RenderImage(file, true)}
        </div>
        <div className="e-card-ucard__counter">
          <span>{this.props.id}</span>
        </div>
        <div
          onClick={this.removeFile}
          className="e-card-ucard__remove">
          <SvgIcon name="remove-attachment" />
        </div>
        <div
          onClick={this.addFile}
          className="e-card-ucard__add">
          <SvgIcon name="add-attachment" />
        </div>
      </div>
    )
  }
}


export default CreateUploader
