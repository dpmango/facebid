import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Image from '../Helpers/Image';
import {openModal} from 'actions/modal';

class AvatarList extends Component {
  render(){
    const {
      props: {
        avatars
      }
    } = this;

    return(
      <Fragment>
        <div
          onClick={this.props.openModal.bind(this, 'subscribers-list')}
          className="avatar-list">
          {avatars.list.map((avatar, index) => (
            <div
              key={avatar.id ? avatar.id : index}
              className="avatar-list__el">
              <Image file={avatar.file} />
            </div>
          ))}
          <div className="avatar-list__el avatar-list__el--more">
            <span>{`+${avatars.more}`}</span>
          </div>
        </div>
      </Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(null, mapDispatchToProps)(AvatarList);
