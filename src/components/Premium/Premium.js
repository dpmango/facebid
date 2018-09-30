import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import VipOptions from './VIP/VipOptions';
import VipSidebar from './VIP/VipSidebar';
import PremiumTabs from './PremiumTabs';
import PaymentTypes from './PaymentTypes';
import { closeModal } from 'actions/modal';

class Premium extends Component{
  constructor(){
    super()

    this.state = {
      modalName: 'premium',
      activeTab: 'vip', //[vip, promote] as default, but get state from derived
      activeOption: [
        {type: "vip", id: 2},
        {type: "promote", id: 2}
      ],
      activePayment: { id: null, type: null },
      paymentAmount: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.activeTab !== prevState.activeTab)) {
      return { activeTab: nextProps.modalOptions.activeTab};
    } else {
      return null;
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  selectTab = (name) => {
    this.setState({
      activeTab: name
    })
  }

  selectPayment = (id, type) => {
    console.log(id, type)
    this.setState({
      ...this.state,
      activePayment: {
        id: id,
        type: type
      }
    })
  }

  selectOption = (id, type) => {
    // find by type, get id and change stateClone
    const stateClone = this.state.activeOption
    const foundObj = stateClone.filter(x => x.type === type)[0]
    const matchId = stateClone.indexOf(foundObj)
    stateClone[matchId].id = id

    this.setState({
      ...this.state,
      activeOption: stateClone
    })
  }

  isPaymentAvailable = () => {
    const { activeOption, activePayment } = this.state;

    if (activeOption.some(x => x.id) &&
        activePayment.id
    ){
      return true
    } else {
      return false
    }
  }

  render(){
    const {
      state: {
        modalName,
        activeTab,
        activeOption,
        activePayment,
        paymentAmount
      },
      props: {
        activeModal
      }
    } = this

    const isPaymentAvailable = this.isPaymentAvailable()

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}>
        <div className="premium">
          <div className="premium__wrapper">
            <div className="premium__contents">
              <PremiumTabs
                onTabSelected={this.selectTab}
                activeTab={activeTab}/>
              {activeTab === "vip" &&
                <VipOptions
                  activeOption={activeOption.filter(x => x.type === "vip")[0].id}
                  onOptionSelected={this.selectOption}/>
              }
              <PaymentTypes
                activePayment={activePayment.id}
                onPaymentSelected={this.selectPayment} />

              <div className="premium__cta">
                <button
                  disabled={!isPaymentAvailable}
                  className="btn btn-primary btn">
                  Перейти к оплате
                </button>
                <div className="premium__info">
                  {isPaymentAvailable ?
                    <span>С вашего счета будет списано {paymentAmount} рублей</span>
                    :
                    <span>Пакет не выбран</span>
                  }
                </div>
              </div>
            </div>
            <div className="premium__sidebar">
              {activeTab === "vip" &&
                <VipSidebar />
              }
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

Premium.propTypes = {
  activeModal: PropTypes.string,
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  modalOptions: state.modal.modalActions
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Premium);
