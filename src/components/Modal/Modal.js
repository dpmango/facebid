import React, {Component} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class Modal extends Component{
  constructor(){
    super()

  }

  render(){
    const {
      props: {
        isActive, show, onHide, children
      }
    } = this

    return(
      <div className={"modal" + (isActive ? " is-active" : "")}>
        <div className="modal__wrapper">
          <div className="modal-bg" onClick={onHide}></div>
          <div className="modal__area">
            <div className="modal__container">
              <div className="modal__close" onClick={onHide}>
                <SvgIcon name="close" />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
