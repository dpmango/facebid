import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal } from 'actions/modal';

class Modal extends Component{

  componentDidUpdate(){
    // redirect to login if protected and has no userId (not logined)
    if ( this.props.isActive && !this.props.userId && this.props.protected ){
      this.props.openModal('signup');
    }
  }

  render(){
    const {
      props: {
        isActive, onHide, children, containerClass
      }
    } = this

    return(
      <Portal>
        <div className={"modal" + (isActive ? " is-active" : "")}>
          <div className="modal__wrapper">
            <div className="modal-bg" onClick={onHide}></div>
            <div className="modal__area">
              <div className={"modal__container " + (containerClass ? containerClass : "")}>
                <div className="modal__close" onClick={onHide}>
                  <SvgIcon name="close" />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
