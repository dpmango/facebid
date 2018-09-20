import React, {Component} from 'react';
import { Portal } from 'react-portal';
import SvgIcon from '../Helpers/SvgIcon';

class Modal extends Component{

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

export default Modal
