import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import api from 'services/Api';
import Image from 'components/Helpers/Image';
import Avatar from 'components/Shared/Avatar';
import SvgIcon from 'components/Helpers/SvgIcon';

class Comment extends Component{
  constructor(){
    super()

    this.state = {
      isAbused: false
    }
  }

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
  abuseClick = (id) => {
    // API CALL
    this.setState({
      isAbused: !this.state.isAbused
    })
  }

  replyClick = (username) => {
    this.props.onReplyClick(username)
  }

  removeClick = (id) => {
    api
      .delete(`comments/${id}`)
      .then(res => {
        this.props.onCommentRemove(id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  removeAvailable = () => {
    const { userId, eventAuthor, data } = this.props;
    // show remove action only if user owns whole event or specific comment
    return (userId === data.user.id) || ( userId === eventAuthor )
  }

  render(){

    const comment = this.props.data
    const {
      props: { userId },
      state: { isAbused }
    } = this;

    return(
      <div className={"e-comment" + (isAbused ? " is-abused" : "")}>
        <Avatar
          user={comment.user}
          className="avatar" />
        <div className="e-comment__contents">
          <div className="e-comment__top">
            <div className="e-comment__name">{comment.user.name}</div>
            <div className="e-comment__actions">
              { userId !== comment.user.id &&
                <Fragment>
                  <div
                    onClick={this.abuseClick.bind(this, comment.id)}
                    className={"e-comment__abuse" + (isAbused ? " is-active" : "")}>
                    <SvgIcon name="bell" />
                  </div>
                  <div
                    onClick={this.replyClick.bind(this, comment.user.username)}
                    className="e-comment__reply">
                    <SvgIcon name="reply" />
                  </div>
                </Fragment>
              }
              { this.removeAvailable() &&
                <div
                  onClick={this.removeClick.bind(this, comment.id)}
                  className="e-comment__remove">
                  <SvgIcon name="close" />
                </div>
              }
            </div>
          </div>
          <div className="e-comment__text">
            {this.renderText(comment.text)}
          </div>
          <div className="e-comment__popover">
            <p>Жалоба будет рассмотрена модераторами</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, null)(Comment);
