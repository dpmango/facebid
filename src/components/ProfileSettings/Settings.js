import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import SettingsGeneral from './SettingsGeneral';
import SettingsNotifications from './SettingsNotifications';
import SettingsPayments from './SettingsPayments';
import SettingsBlackList from './SettingsBlackList';
import { openModal, closeModal } from '../../actions/modal'

class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'settings',
      currentTab: 1
    }

  }

  hide = () => {
    this.props.closeModal()
  }

  tabSelected = (index) => {
    this.setState({
      currentTab: index
    })
  }

  // bottom cta clicked
  saveButtonClicked = () => {

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

    const tabs = [
      {id: 1, icon: "profile", name: "Основные"},
      {id: 2, icon: "bell", name: "Уведомления"},
      {id: 3, icon: "dollar-sign", name: "Настройка платежей"},
      {id: 4, icon: "black-list", name: "Черный список"},
    ]

    const tabPanels = [
      {id: 1, component: <SettingsGeneral />},
      {id: 2, component: <SettingsNotifications />},
      {id: 3, component: <SettingsPayments />},
      {id: 4, component: <SettingsBlackList />},
    ]

    return(
      <Modal
        isActive={activeModal === modalName}
        containerClass="modal__container--scroller"
        onHide={this.hide} >
        <div className="modal__header">
          <div className="h4-title">
            Настройки профиля
          </div>
        </div>

        <div className="modal__tabs">
          { tabs.map(tab => (
            <li
              key={tab.id}
              className={currentTab === tab.id ? "is-active" : ""}
              onClick={this.tabSelected.bind(this, tab.id)}>
              <SvgIcon name={tab.icon} />
              <span>{tab.name}</span>
            </li>
          ))}
        </div>

        <PerfectScrollbar
          className="scrollbar-blue scrollbar-blue--modal modal__content modal__content--scrollable"
          option={{
            wheelSpeed: 1,
            wheelPropagation: false,
            suppressScrollX: true,
          }}>
          { tabPanels.map(panel => (
            <div
              key={panel.id}
              className={"modal__tab-panel" + ( currentTab === panel.id ? " is-active" : "")}>
              {panel.component}
            </div>
          ))}
        </PerfectScrollbar>

        <div className="modal__action">
          <button
            onClick={this.saveButtonClicked}
            className="btn btn-primary btn--iconed">
            <SvgIcon name="checkmark" />
            <span>Сохранить изминения</span>
          </button>
        </div>

      </Modal>
    )
  }
}

Settings.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
