import React, {Component} from 'react';
import Image from '../Helpers/Image';

class Comments extends Component {
  render(){
    return(
      <div className="e-card__comments">
        <div className="e-comment">
          <div className="avatar">
            <Image file="userAvatar_3.jpg" />
          </div>
          <div className="e-comment__contents">
            <div className="e-comment__top">
              <div className="e-comment__name">Susie Holt</div>
              <div className="e-comment__actions">

              </div>
            </div>
            <div className="e-comment__text">
              Супер! Я бы тоже не против скататься в такое интересное путешествие. Когда выезжаете?
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
