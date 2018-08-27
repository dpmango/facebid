import React, {Component} from 'react';
import Image from '../Helpers/Image';

class AvatarList extends Component {
  render(){
    const {
      props: {
        avatars
      }
    } = this;

    return(
      <div className="avatar-list">
        {avatars.list.map((avatar, index) => {
          return(
            <div
              key={avatar.id ? avatar.id : index}
              className="avatar-list__el">
              <Image file={avatar.file} />
            </div>
          )
        })}
        <div className="avatar-list__el avatar-list__el--more">
          <span>{`+${avatars.more}`}</span>
        </div>
      </div>
    )
  }
}

export default AvatarList;
