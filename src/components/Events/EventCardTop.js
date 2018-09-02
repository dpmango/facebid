import React, { Component } from 'react';
import SvgIcon from '../Helpers/SvgIcon';
import Image from '../Helpers/Image';

class EventCardTop extends Component {
  render(){
    const { user } = this.props;

    return(
      <div className="e-card__top">
        <div className="e-card__user">
          <div className="e-card__user-avatar">
            <Image file="userAvatar.jpg" />
          </div>
          <div className="e-card__user-info">
            <div className="e-card__user-line">
              <div className="e-card__user-name">{user.name}, {user.age}</div>
              <div className="e-card__user-status">
                {user.isVerified &&
                  <div className="icon-verified">
                    <SvgIcon name="checkmark" />
                  </div>
                }
              </div>
            </div>
            <div className="e-card__user-distance">{user.distance}</div>
          </div>
        </div>
        <div className="e-card__actions">
          <div className="e-card__action e-card__bookmark">
            <SvgIcon name="bookmark" />
          </div>
          <div className="e-card__action e-card__share">
            <SvgIcon name="share" />
          </div>
          <div className="e-card__action e-card__more">
            <SvgIcon name="more" />
          </div>
        </div>
      </div>
    )
  }
}

export default EventCardTop
