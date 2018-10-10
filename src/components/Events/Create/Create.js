import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import Modal from 'components/Modal/Modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import api from 'services/Api';
import { openModal, closeModal } from 'actions/modal';
import { setCreateEvent, resetCreateEvent } from 'actions/create-event';
import StepNav from './StepNav';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

class Create extends Component{
  constructor(props){
    super(props)

    this.state = {
      modalName: 'create-event',
      currentTab: props.createEventRedux.currentTab // asume as initial
      // currentTab: 2 // testing only
    }

    this.formRef = React.createRef();
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (nextProps.createEventRedux.currentTab !== prevState.currentTab) {
  //     return { currentTab: nextProps.createEventRedux.currentTab};
  //   } else {
  //     return null;
  //   }
  // }


  hide = () => {
    this.props.closeModal()
  }

  // navigation functions
  changeStep = (num) => {
    this.setState({currentTab: num})
  }

  prevButtonClicked = () => {
    const {currentTab} = this.state;

    if ( currentTab === 1 ){
      this.hide();
    } else if (currentTab === 2) {
      this.changeStep(1)
    }
  }

  nextButtonClicked = () => {
    const {currentTab} = this.state;

    if ( currentTab === 1 ){
      this.changeStep(2)
    } else if (currentTab === 2) {
      this.postEvent()
    }
  }

  postEvent = () => {
    // when clicked crate on last tab

    this.props.resetCreateEvent();
    this.props.openModal('event-created');
    this.props.notify({
      title: 'Событие создано',
      message: 'Спасибо, событие находится на модерации',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
    // + API post
    // api
    //   .post(`events`, {
    //
    //   })
    //   .then(res => {
    //
    //   })
    //   .catch(err => {
    //     console.log('error posting event')
    //   })
  }

  render(){
    const {
      state: {
        modalName, currentTab
      },
      props: {
        activeModal
      }
    } = this

    return(
      <Modal
        protected={true}
        isActive={activeModal === modalName}
        containerClass="modal__container--scroller"
        onHide={this.hide}>
        <div className="modal__header">
          <div className="h4-title">
            Создание события
          </div>
          <StepNav
            onStep1Click={this.changeStep.bind(this, 1)}
            currentTab={currentTab} />
        </div>
        <PerfectScrollbar
          className="scrollbar-blue scrollbar-blue--modal
          modal__content modal__content--scrollable modal__content--sectionized"
          option={{
            wheelSpeed: 1,
            wheelPropagation: false,
            suppressScrollX: true,
          }}>
          { currentTab === 1 &&
            <CreateStep1
              onSave={this.nextStep} />
          }
          { currentTab === 2 &&
            <CreateStep2
              onSave={this.nextStep} />
          }
        </PerfectScrollbar>
        <div className="modal__action modal__action--s-between">
          <button
            onClick={this.prevButtonClicked}
            className="btn btn-outline btn-outline--muted">
            <span>{currentTab === 1 ? "Отменить" : "К предыдущему шагу"}</span>
          </button>
          <button
            onClick={this.nextButtonClicked}
            className="btn btn-primary">
            <span>Продолжить</span>
          </button>
        </div>
      </Modal>
    )
  }
}

Create.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  resetCreateEvent: PropTypes.func,
  notify: PropTypes.func
}

const mapStateToProps = (state) => ({
  createEventRedux: state.createEvent,
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (data) => dispatch(openModal(data)),
  resetCreateEvent: () => dispatch(resetCreateEvent()),
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
