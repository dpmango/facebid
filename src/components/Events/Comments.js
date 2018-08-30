import React, {Component} from 'react';
import Image from '../Helpers/Image';

class Comments extends Component {
  render(){
    const comments = [
      {
        id: 1,
        user: {
          avatar: "userAvatar_3.jpg",
          name: "Susie Holt"
        },
        text: "Супер! Я бы тоже не против скататься в такое интересное путешествие. Когда выезжаете?"
      },
      {
        id: 2,
        user: {
          avatar: "userAvatar_2.jpg",
          name: "Hello World"
        },
        text: "Супер! Я бы тоже не против скататься в такое интересное путешествие. Когда выезжаете?"
      }
    ]
    return(
      <div className="e-card__comments">
        {comments.map(comment => {
          return(
            <div className="e-comment" key={comment.id}>
              <div className="avatar">
                <Image file={comment.user.avatar} />
              </div>
              <div className="e-comment__contents">
                <div className="e-comment__top">
                  <div className="e-comment__name">{comment.user.name}</div>
                  <div className="e-comment__actions">
                  </div>
                </div>
                <div className="e-comment__text">
                  {comment.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Comments
