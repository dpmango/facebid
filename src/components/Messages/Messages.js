import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {closeModal} from 'actions/modal';

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalName: 'messages',
      activeDialog: null
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  dialogClick = (id) => {
    this.setState({activeDialog: id})
  }

  render(){
    const {
      state: {
        modalName, activeDialog
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}>
        <div className={"ms" + (activeDialog ? " ms--dialog-opened" : "")}>
          <Sidebar
            onDialogClick={this.dialogClick}
            activeDialog={activeDialog} />
          <Chat
            activeDialog={activeDialog} />
        </div>
      </Modal>
    )
  }
}

Messages.propTypes = {
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  activeModal: state.modal.activeModal
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
