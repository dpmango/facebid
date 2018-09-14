import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SvgIcon from '../Helpers/SvgIcon';
import { openModal, closeModal } from '../../actions/modal';

class UserMenu extends Component {

  renderNavEl = (el) => (
    <React.Fragment>
      <div className="user-menu__icon">
       <SvgIcon name={el.icon} />
      </div>
      <span className="user-menu__name">{el.name}</span>
      { el.haveAdd &&
       <div className="user-menu__add">
         <div className="icon-add">
           <SvgIcon name="plus" />
         </div>
       </div>
      }
      { el.counter &&
       <div className="user-menu__counter">
         <span>{el.counter}</span>
       </div>
      }
    </React.Fragment>
  )

  render(){

    const menu = [
      {
        link: "/events",
        name: "Поиск встреч",
        icon: "menu-events",
        haveAdd: true,
        counter: false
      },
      {
        link: "/invite",
        name: "Пригласить",
        icon: "menu-invite",
        haveAdd: false,
        counter: false
      },
      {
        link: "/my-events",
        name: "Мои события",
        icon: "menu-my-events",
        haveAdd: false,
        counter: false
      },
      {
        link: "/messages",
        name: "Сообщения",
        icon: "menu-messages",
        haveAdd: false,
        counter: false
      },
      {
        modal: 'notifications',
        name: "Уведомления",
        icon: "menu-notifications",
        haveAdd: false,
        counter: 9
      },
      {
        link: "/news",
        name: "Новости",
        icon: "menu-news",
        haveAdd: false,
        counter: false
      },
      {
        link: "/bookmarks",
        name: "Закладки",
        icon: "menu-bookmarks",
        haveAdd: false,
        counter: 14
      }
    ]

    const {
      props: {activeModal}
    } = this

    return(
      <ul className="user-menu">
        {menu.map((el, index) => {
          return (
            <li key={index}>
              {!el.modal ?
                <NavLink
                  onClick={this.props.closeModal}
                  to={el.link}
                  activeClassName={!activeModal ? "is-active" : ""}>
                  {this.renderNavEl(el)}
                </NavLink>
                :
                <a
                  className={activeModal === el.modal ? "is-active" : ""}
                  onClick={this.props.openModal.bind(this, el.modal)}>
                  {this.renderNavEl(el)}
                </a>
              }
            </li>
          )
        })}

      </ul>
    )
  }
}

UserMenu.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(UserMenu);
