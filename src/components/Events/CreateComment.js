import React, {Component} from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import api from '../../services/Api';

class CreateComment extends Component {
  constructor(){
    super()

    this.state = {
      text: ""
    }
  }

  onChangeContent = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitComment = () => {
    api
      .post('comments', {
        user: {
          "avatar": "userAvatar_2.jpg",
          "name": "currentUser"
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
    if ( !this.props.userId ){
      return null
    }
    return(
      <div className="e-card__c-comment create-comment">
        <div className="create-comment__wrapper">
          <div className="create-comment__avatar">
            <div className="avatar avatar--small">
              <Image file="userAvatar.jpg" />
            </div>
          </div>
          <div className="create-comment__writable">
            <Textarea
              onChange={this.onChangeContent}
              minRows="1"
              maxRows="5"
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
  userId: state.user.userId
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
