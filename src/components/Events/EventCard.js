import React, {Component} from 'react';
// import SvgIcon from '../../components/Helpers/SvgIcon';
import Image from '../../components/Helpers/Image';

class EventCard extends Component {

  render(){
    return(
      <div className="e-card">
        <div className="e-card__wrapper">
          <div className="e-card__media">
            <div className="e-card__image">
              <Image file="eventImage_1.jpg" />
            </div>
          </div>
          <div className="e-card__contents">

          </div>
        </div>
      </div>
    )
  }
}

export default EventCard
