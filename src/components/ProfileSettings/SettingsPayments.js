import React, { Component } from 'react';
import SvgIcon from '../Helpers/SvgIcon'

class SettingsPayments extends Component {
  constructor(){
    super()

    this.state = {

    }
  }

  editPayment = (name) => {

  }

  removePayment = (name) => {

  }

  addPayment = () => {

  }


  render(){
    return(
      <React.Fragment>
        <div className="ui-group ui-group--row">
          <label htmlFor="">Текущий баланс:</label>
          <div className="p-row">
            <div className="p-btn p-btn--balance">
              <div className="p-btn__icon">
                <SvgIcon name="star-stroke" />
              </div>
              <div className="p-btn__label">12 объявлений</div>
            </div>
            <button className="btn btn-primary">Приобрести еще</button>
          </div>
        </div>
        <div className="ui-group ui-group--row">
          <label htmlFor="">VIP аккаунт:</label>
          <div className="p-row">
            <div className="p-btn p-btn--vip">
              <div className="p-btn__icon">
                <SvgIcon name="crown" />
              </div>
              <div className="p-btn__label">Активирован</div>
            </div>
            <div className="t-secondary">
              Действителен до 24.06.2018
            </div>
          </div>
        </div>
        <div className="ui-group ui-group--row">
          <label htmlFor="">Способ оплаты:</label>
          <div className="p-row">
            <div className="p-payments">
              <Payment
                name="Банковская карта"
                value="•••• – •••• – •••• –1234"
                onEditPayment={this.editPayment}
                onRemovePayment={this.removePayment}
                label="credit-card" />
              <Payment
                name="Мобильный телефон"
                value="+7 (925) ••• – •• – 12"
                onEditPayment={this.editPayment}
                onRemovePayment={this.removePayment}
                label="mobile-phone" />
              <Payment
                name="PayPal"
                value="••••••••1923@gmail.com"
                onEditPayment={this.editPayment}
                onRemovePayment={this.removePayment}
                label="paypal" />

            </div>
            <div className="p-payments__cta">
              <button
                onClick={this.addPayment}
                className="btn btn-primary btn--iconed">
                <SvgIcon name="plus" />
                <span>Добавить способ оплаты</span>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

class Payment extends Component {
  render(){
    const {name, value, label} = this.props

    return(
      <div className="p-pay">
        <div className="p-pay__name">{name}</div>
        <div className="p-pay__credentials">{value}</div>
        <div className="p-pay__actions">
          <button className="p-pay__edit" onClick={this.props.onEditPayment}>
            <SvgIcon name="pencil" />
          </button>
          <button className="p-pay__remove" onClick={this.props.onRemovePayment}>
            <SvgIcon name="close" />
          </button>
        </div>
      </div>
    )
  }
}

export default SettingsPayments
