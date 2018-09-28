import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import Sidebar from './Sidebar';
import Chat from './Chat';
import EmptyMessages from './EmptyMessages'
import {closeModal} from 'actions/modal';

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalName: 'messages',
      activeDialog: null, // null
      dialogsEmpty: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.activeDialog !== prevState.activeDialog)) {
      return { activeDialog: nextProps.modalOptions.activeDialog};
    } else {
      return null;
    }
  }

  componentDidUpdate(){
    console.log('messages a dialog', this.state.activeDialog)
  }

  hide = () => {
    this.props.closeModal()
  }

  dialogClick = (id) => {
    this.setState({activeDialog: id})
  }

  dialogsEmpty = () => {
    this.setState({dialogsEmpty: true})
  }

  render(){
    const {
      state: {
        modalName, activeDialog, dialogsEmpty
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}>
        { dialogsEmpty ?
          <EmptyMessages />
          :
          <div className={"ms" + (activeDialog ? " ms--dialog-opened" : "")}>
            <Sidebar
              onDialogClick={this.dialogClick}
              onEmpty={this.dialogsEmpty}
              activeDialog={activeDialog} />
            <Chat
              activeDialog={activeDialog} />
          </div>
        }
      </Modal>
    )
  }
}

Messages.propTypes = {
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  activeModal: state.modal.activeModal,
  modalOptions: state.modal.modalOptions
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
