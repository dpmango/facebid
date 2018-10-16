import React, {Component, Fragment} from 'react';
import Avatar from './Avatar';

class UserInfo extends Component{
  render(){
    const {user} = this.props;

    if ( !user ){
      return null // or loader ? TODO
    }

    return(
      <div className="user-info">
        <div className="user-info__avatar">
          <Avatar user={user} />
        </div>

        <div className="user-info__contents">
          <div className="user-info__row">
            <div className="user-info__name">
              {user.username}
              {user.age && <Fragment>, {user.age}</Fragment>}
            </div>
          </div>
          <div className="user-info__distance">
            {user.distance}
          </div>
        </div>
      </div>
    )
  }
}

export default UserInfo
