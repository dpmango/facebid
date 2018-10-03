import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import ClickOutside from 'react-click-outside';
import SvgIcon from 'components/Helpers/SvgIcon';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import EmojiMartLangs from 'i18n/EmojiMartLangs'
class ChatCreate extends Component {
  constructor(props){
    super()

    this.state = {
      isFocused: false,
      textarea: '',
      emojiPickerVisible: false,
      emojiOffsetBottom: 0
    }

    this.textareaRef = React.createRef()
    this.chatBoxRef = React.createRef();
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
    const boxHeight = this.chatBoxRef.current.offsetHeight
    this.setState({
      emojiPickerVisible: !this.state.emojiPickerVisible,
      emojiOffsetBottom: boxHeight
    })
  }

  // update emoji position
  onTextareaHeightChange = (height, instance) => {
    if ( !instance ) return false

    const boxHeight = this.chatBoxRef.current.offsetHeight
    this.setState({
      emojiOffsetBottom: boxHeight
    })
  }

  emojiSelected = (emoji) => {
    console.log('emoji selected', emoji);
    const textarea = this.state.textarea.toString()
    const cursorPosition = this.textareaRef.current._ref.selectionStart
    let newTextareaValue
    if ( cursorPosition ){
      let splitedVal = [textarea.slice(0, cursorPosition), textarea.slice(cursorPosition)]
      // insert inside cursor position
      newTextareaValue = `${splitedVal[0]} ${emoji.native} ${splitedVal[1]}`
    } else {
      newTextareaValue = `${this.state.textarea} ${emoji.native}`
    }

    this.setState({textarea: newTextareaValue})
  }

  render(){
    const {
      state: { textarea,
        isFocused,
        emojiPickerVisible,
        emojiOffsetBottom
      }
    } = this

    return(
      <ClickOutside
        onClickOutside={() => this.setState({emojiPickerVisible: false})}>
        <div
          ref={this.chatBoxRef}
          className={"ms-chat__create ms-create" +
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
              onHeightChange={(height, instance) => this.onTextareaHeightChange(height, instance)}
              value={textarea} />
          </div>

          <div className="ms-create__actions">
            <div
              onClick={this.onSmileClick}
              className={"ms-create__action ms-create__action--attach"
              + (emojiPickerVisible ? " is-active" : "")}>
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
            <div
              style={{
                bottom: `${emojiOffsetBottom}px`
              }}
              className={"ms-create__emoji" + (emojiPickerVisible ? " is-visible" : "")}>
              <Picker
                set='emojione'
                color="#00A9FF"
                emoji={null}
                i18n={EmojiMartLangs.ru}
                showPreview={false}
                emojiTooltip={true}
                perLine={7}
                onSelect={this.emojiSelected}
               />
            </div>
          </div>
        </div>
      </ClickOutside>
    )
  }
}

export default ChatCreate
