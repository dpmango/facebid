import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import SvgIcon from '../Helpers/SvgIcon';
import RenderImage from 'helpers/RenderImage';
import {openModal} from 'actions/modal';

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

  openEvent = () => {
    const {eventId, editMode, openModal} = this.props;

    if ( editMode || !eventId){
      return false
    }
    // if outline is active - click on avatar display modal with event
    openModal({
      name: "event",
      options: {
        eventId: eventId
      }
    })
  }

  render(){

    const { avatar, editMode, eventId } = this.props

    return(
      <div
        onClick={this.openEvent}
        className={"p-head__avatar avatar-outline" + ((editMode || !eventId) ? " no-outline" : "")}>
        <div className="avatar-outline__wrapper">
          <div className="avatar-outline__holder">

            { RenderImage(avatar) }

            { editMode &&
              <Fragment>
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
              </Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(null, mapDispatchToProps)(HeadAvatar)
