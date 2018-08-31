import React, {Component} from 'react';
import Image from '../Helpers/Image';
import Loading from '../Helpers/Loading';

class Comments extends Component {
  render(){
    const { comments } = this.props

    if ( !comments ){
      return (
        <Loading />
      )
    }
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
