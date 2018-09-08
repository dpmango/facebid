import React, {Component} from 'react';
import { connect } from 'react-redux';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import Loading from '../Helpers/Loading';

class Comments extends Component {

  userClick = (user) => {

  }

  renderText = (text) => {
    //helper function to get usernames as hyperlink
    // TODO - should it be backend based ?
    if ( text.indexOf("@") !== -1 ){
      return text.split(" ").map((str, index) => {
        if ( str.indexOf("@") === 0 ){
          return (
            <span key={index} onClick={this.userClick.bind(this, str)}>{str} </span>
          )
        } else {
          return `${str} `
        }
      })
    } else {
      return text
    }
  }

  // comment actions
  notifyClick = (id) => {

  }

  replyClick = (username) => {
    this.props.onReplyClick(username)
  }

  removeClick = (id) => {

  }

  render(){
    const { comments, userId } = this.props

    if ( !comments ){
      return (
        <Loading />
      )
    }
    return(
      <div className={'e-card__comments' + ( userId ? " is-logined" : "" )}>
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
                    <div
                      onClick={this.notifyClick.bind(this, comment.id)}
                      className="e-comment__notify">
                      <SvgIcon name="bell" />
                    </div>
                    <div
                      onClick={this.replyClick.bind(this, comment.user.username)}
                      className="e-comment__reply">
                      <SvgIcon name="reply" />
                    </div>
                    <div
                      onClick={this.removeClick.bind(this, comment.id)}
                      className="e-comment__remove">
                      <SvgIcon name="close" />
                    </div>
                  </div>
                </div>
                <div className="e-comment__text">
                  {this.renderText(comment.text)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
