import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SvgIcon from 'components/Helpers/SvgIcon';
import api from 'services/Api'
import { openModal } from 'actions/modal';

class UserMenu extends Component {

  constructor(props){
    super(props)

    this.state = {
      menu: [
        {
          id: 1,
          link: `/profile/${props.userId}`,
          name: "Моя страница",
          icon: "profile-thin",
          counter: null
        },
        {
          id: 2,
          link: "/events",
          name: "Поиск встреч",
          icon: "menu-events",
          plusIcon: {
            type: 'modal',
            target: 'create-event'
          },
          counter: null
        },
        {
          id: 3,
          link: "/invite",
          name: "Пригласить",
          icon: "menu-invite",
          counter: null
        },
        // {
        //   id: 3,
        //   link: "/my-events",
        //   name: "Мои события",
        //   icon: "menu-my-events",
        //   counter: null
        // },
        {
          id: 4,
          modal: "messages",
          name: "Сообщения",
          icon: "menu-messages",
          counter: null
        },
        {
          id: 5,
          modal: 'notifications',
          name: "Уведомления",
          icon: "menu-notifications",
          counter: null
        },
        // {
        //   id: 6,
        //   link: "/news",
        //   name: "Новости",
        //   icon: "menu-news",
        //   counter: null
        // },
        // {
        //   id: 7,
        //   link: "/bookmarks",
        //   name: "Закладки",
        //   icon: "menu-bookmarks",
        //   counter: null
        // }
      ]
    }
  }

  componentDidMount(){
    this.getCounters();
  }

  getCounters = () => {
    api
      .get('menuCounters')
      .then(res => {
        let menuState = this.state.menu;

        res.data.forEach(x => {
          menuState
            .find(y => y.id === x.id).counter = x.counter
        })

        this.setState({
          ...this.state, menu: menuState
        })
      })
      .catch(err => {
        console.log('Something wrong with menuCounters request')
      })
  }

  plusIconClick = (e,obj) => {
    e.preventDefault();
    e.stopPropagation();

    if ( obj.type === "modal" ){
      this.props.openModal(obj.target)
    }
  }

  renderNavEl = (el) => (
    <Fragment>
      <div className="user-menu__icon">
       <SvgIcon name={el.icon} />
      </div>
      <span className="user-menu__name">{el.name}</span>
      { (el.plusIcon && !el.counter) &&
        <div
          onClick={(e) => this.plusIconClick(e, el.plusIcon)}
          className="user-menu__add">
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
    </Fragment>
  )

  isActiveLink = (linkPath) => {
    // TODO
    // NavLink doesn't update activeClass even with {pure:false} on connect
    // Wait till React redux router v4 support and refactor
    const { activeModal } = this.props;
    const currentLocation = window.location.pathname

    const isModalActiveFromMenu = this.state.menu.some(x => x.modal === activeModal)
    if ( isModalActiveFromMenu ){
      // return false to activeRoute if some "modal-route" is active
      // i.e. when notifications are opened
      return false
    }

    // separated logic to find owner user profile
    if ( currentLocation.indexOf('profile/') !== -1 ){
      return currentLocation === linkPath
    }

    // else search for simplified "starts with" category type
    return currentLocation.indexOf(linkPath) !== -1
  }


  render(){
    const {
      props: {activeModal},
      state: {menu}
    } = this

    return(
      <ul className="user-menu">
        {menu.map(el => {
          return (
            <li key={el.id}>
              {!el.modal ?
                <NavLink
                  className={this.isActiveLink(el.link) ? "is-active ": ""}
                  to={el.link}
                  // activeClassName="is-active"
                  >
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
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(UserMenu);
