import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class PaymentType extends Component{
  render(){

    const { activePayment, onPaymentSelected } = this.props;

    const options = [
      {
        id: 1,
        icon: 'credit-card',
        name: 'Банковская карта'
      },
      {
        id: 2,
        icon: 'paypal',
        name: 'PayPal'
      },
      {
        id: 3,
        icon: 'mobile-phone',
        name: 'Мобильный телефон'
      }
    ]

    return(
      <div className="p-payments">
        <div className="h4-title">Выберите способ оплаты</div>
        <div className="p-payments__wrapper">
          {options.map(opt => (
            <div
              key={opt.id}
              className="p-payments__col">
              <div
                onClick={onPaymentSelected.bind(this, opt.id, opt.icon)}
                className={"p-payment" + (activePayment === opt.id ? " is-selected" : "")}>
                <div className="p-payment__holder">
                  <div className="p-payment__icon">
                    <SvgIcon name={opt.icon} />
                  </div>
                  <div className="p-payment__name">{opt.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PaymentType
