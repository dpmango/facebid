import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from 'components/Modal/Modal';
import SvgIcon from 'components/Helpers/SvgIcon';
import { closeModal } from 'actions/modal';

class EventCreated extends Component{
  constructor(){
    super()
    this.state = {
      modalName: 'event-created'
    }
  }


  hide = () => {
    this.props.closeModal()
  }

  render(){
    const {
      state: {
        modalName
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        isActive={activeModal === modalName}
        containerClass="modal__container--scroller"
        onHide={this.hide}>
        <div className="modal__content">
          <div className="centered-info centered-info--modal">
            <div className="centered-info__holder t-center">
              <SvgIcon name="confetti" />
              <div className="h4-title">Поздравляем!</div>
              <p className="t-primary">Ваше объявление почти опубликовано, оно проходит модерацию, это обычно занимает не более часа</p>
              <Link
                to="/my-events"
                onClick={this.props.closeModal}
                className="btn btn-primary">
                Мои события
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

EventCreated.propTypes = {
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCreated);
