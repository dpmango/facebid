import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import RenderImage from '../../helpers/RenderImage'

class HeadAvatar extends Component{
  constructor(props){
    super(props);

    this.uploadRef = React.createRef();
  }


  // avatar uploader
  replaceAvatar = () => {
    this.uploadRef.current.click();

    // ++ API add request
  }

  // when input was actually changed
  handleFileChange = (e) => {
    const input = e.target
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (ev) => {
        this.props.onAvatarUpdate(ev.target.result)
        // this.setState({
        //   avatar: ev.target.result
        // })
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  render(){

    const { avatar, editMode } = this.props

    return(
      <div className={"p-head__avatar avatar-outline" + (editMode ? " is-editable" : "")}>
        <div className="avatar-outline__wrapper">
          <div className="avatar-outline__holder">

            { RenderImage(avatar) }

            { editMode &&
              <React.Fragment>
                <input
                  type="file"
                  ref={this.uploadRef}
                  onChange={this.handleFileChange}
                  style={{ display: 'none' }} />
                <button
                  onClick={this.replaceAvatar}
                  className="p-head__avatar-btn btn btn-circle btn-circle--white">
                  <SvgIcon name="camera-add" />
                </button>
            </React.Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default HeadAvatar
