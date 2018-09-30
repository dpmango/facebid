import React, {Component} from 'react';
import Image from 'components/Helpers/Image';

class VipOptions extends Component{
  render(){

    const { activeOption, onOptionSelected } = this.props;

    const options = [
      {
        id: 1,
        icon: "coins.png",
        name: "1 неделя",
        discount: {
          name: "Без скидки",
          color: "gray"
        }
      },
      {
        id: 2,
        icon: "coins.png",
        name: "1 месяц",
        discount: {
          name: "-10%",
          color: "green"
        }
      },
      {
        id: 3,
        icon: "coins.png",
        name: "3 месяца",
        discount: {
          name: "-30%",
          color: "green"
        }
      },
      {
        id: 4,
        icon: "coins.png",
        name: "Бессрочно",
        discount: {
          name: "-50%",
          color: "green"
        }
      }
    ]

    return(
      <div className="p-options">
        <div className="h4-title">Активируйте VIP аккаунт <br/> прямо сейчас</div>
        <div className="p-options__wrapper">
          {options.map(opt => (
            <div
              key={opt.id}
              className="p-options__col">
              <div
                className={"p-option" + (activeOption === opt.id ? " is-selected" : "")}
                onClick={onOptionSelected.bind(this, opt.id, "vip")}>
                <div className="p-option__holder">
                  <div className="p-option__image">
                    <Image file={opt.icon} folder="system" />
                  </div>
                  <div className="p-option__contents">
                    <div className="p-option__name">{opt.name}</div>
                    <div
                      className={"p-option__discount " +
                      (opt.discount.color)}>
                      {opt.discount.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default VipOptions;
