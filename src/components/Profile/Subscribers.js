import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import throttle from 'lodash/throttle'
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import SubscribersList from './SubscribersList';
import api from '../../services/Api';
import { closeModal } from '../../actions/modal';

class Subscribers extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'subscribers',
      currentTab: 1, // TODO - refactor to redux as it
      totalElements: {}
    }
  }

  componentDidMount(){
    this.getTotalList()
  }

  getTotalList = () => {
    api
      .get('totalSubscribers')
      .then(res => {
        this.setState({
          totalElements: res.data
        })
      })
  }

  hide = () => {
    this.props.closeModal()
  }

  tabSelected = (index) => {
    this.setState({
      currentTab: index
    })
  }

  onScrollContainer = (container) => {
    const scrollDistance = container.scrollTop
    const containerHeight = container.offsetHeight

    console.log(scrollDistance, containerHeight)
    // get scroll from bottom and load more
    // this.getUserList()
  }

  render(){
    const {
      state: {
        modalName, currentTab, totalElements
      },
      props: {
        activeModal
      }
    } = this

    const tabs = [
      {id: 1, name: "Подписчики"},
      {id: 2, name: "Подписки"},
    ]

    const tabPanels = [
      {id: 1, component: <SubscribersList onRef={ref => (this.subscribersRef = ref)} type="subscribers" />},
      {id: 2, component: <SubscribersList onRef={ref => (this.subscribedRef = ref)} type="subscribed" />},
    ]

    return(
      <Modal
        isActive={activeModal === modalName}
        containerClass="modal__container--small modal__container--scroller"
        onHide={this.hide} >
        <div className="modal__header">
          <div className="modal__header-tabs">
            <div
              className={"modal__header-tab" + (currentTab === 1 ? " is-active" : "")}
              onClick={this.tabSelected.bind(this, 1)}>
              Подписчики <span>{totalElements.subscribers}</span>
            </div>
            <div
              className={"modal__header-tab" + (currentTab === 2 ? " is-active" : "")}
              onClick={this.tabSelected.bind(this, 2)}>
              Подписки <span>{totalElements.subscribed}</span>
            </div>
          </div>
        </div>
        <PerfectScrollbar
          className="scrollbar-blue scrollbar-blue--modal modal__content modal__content--scrollable"
          onScrollY={throttle(this.onScrollContainer, 100)}
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

      </Modal>
    )
  }
}

Subscribers.propTypes = {
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
