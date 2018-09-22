import React, {Component} from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import Image from 'components/Helpers/Image';
import SvgIcon from 'components/Helpers/SvgIcon';
import api from 'services/Api';

class CreateComment extends Component {
  constructor(){
    super()

    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  appendUserMention = (username) => {
    this.setState({
      text: this.state.text + " @" + username
    })
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props, state)
  //
  //   this.setState({
  //     text: this.state.text + props.mentionUser
  //   })
  // }

  onChangeContent = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitComment = () => {
    const {
      state: {text},
      props: {userDetails}
    } = this

    // prevent submiting blank messages
    // any other validations ?
    if ( this.state.text.replace(/\s/g, '').length === 0 ){
      return null
    }

    api
      .post('comments', {
        user: {
          "username": userDetails.username,
          "avatar": userDetails.avatar,
          "name": userDetails.fullname
        },
        text: this.state.text
      })
      .then(res => {
        this.props.onNewComment()
      })
      .catch(err => {
        console.log('error happends', err);
      })
  }

  render(){

    const {
      props: { userId, isVisible, haveComments },
      state: { text }
    } = this;

    if ( !userId || !haveComments){
      return null
    }
    return(
      <div className={"e-card__c-comment create-comment" + (isVisible ? " is-visible" : "")}>
        <div className="create-comment__wrapper">
          <div className="create-comment__avatar">
            <div className="avatar avatar--small">
              <Image file="userAvatar.jpg" />
            </div>
          </div>
          <div className="create-comment__writable">
            <Textarea
              onChange={this.onChangeContent}
              value={text}
              minRows={1}
              maxRows={5}
              placeholder="Введите текст комментария" />
            {/* <textarea
              onChange={this.onChangeContent}
              rows="1"
              placeholder="Введите текст комментария" /> */}
          </div>
          <div className="create-comment__cta">
            <button onClick={this.submitComment}>
              <SvgIcon name="sent" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userId: state.user.userId,
  userDetails: state.user.userDetails
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
