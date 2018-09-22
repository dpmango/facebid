import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import SvgIcon from 'components/Helpers/SvgIcon';

class ChatCreate extends Component {
  constructor(props){
    super()

    this.state = {
      isFocused: false,
      textarea: ''
    }

    this.textareaRef = React.createRef()
  }

  // textarea funtions
  onTextareaChange = (e) => {
    this.setState({
      textarea: e.target.value
    })
  }

  onTextareaFocus = () => {
    this.setState({ isFocused: true })
  }

  onTextareaBlur = () => {
    this.setState({ isFocused: false })
  }

  onTextareaKeyPress = (e) => {
    if ( e.key === "Enter" ){
      e.preventDefault();
      e.stopPropagation();
      this.sendForm()
    }
  }

  // null state and send to parent component for API things
  sendForm = () => {
    this.setState({
      textarea: ''
    }, () => this.props.onSend(this.state))
  }

  // content helper functions
  onAttachmentClick = () => {

  }

  onSmileClick = () => {

  }

  render(){
    const {
      state: { textarea, isFocused }
    } = this

    return(
      <div className={"ms-chat__create ms-create" +
        (isFocused ? " is-focused" : "")}>

        <div className="ms-create__textarea">
          <Textarea
            // useCacheForDOMMeasurements
            ref={this.textareaRef}
            minRows={1}
            maxRows={7}
            name="chat-create"
            placeholder="Введите текст сообщения и нажмите Enter"
            onChange={this.onTextareaChange}
            onBlur={this.onTextareaBlur}
            onFocus={this.onTextareaFocus}
            onKeyPress={this.onTextareaKeyPress}
            value={textarea} />
        </div>

        <div className="ms-create__actions">
          <div
            onClick={this.onSmileClick}
            className="ms-create__action ms-create__action--attach">
            <SvgIcon name="smile-happy" />
          </div>
          <div
            onClick={this.onAttachmentClick}
            className="ms-create__action ms-create__action--smile">
            <SvgIcon name="attachment" />
          </div>
          <div
            onClick={this.sendForm}
            className="ms-create__action ms-create__action--send">
            <SvgIcon name="sent" />
          </div>
        </div>

      </div>
    )
  }
}

export default ChatCreate
