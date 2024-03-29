import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SvgIcon from '../Helpers/SvgIcon';
import Avatar from '../Shared/Avatar';
import UserMenu from './UserMenu';
import SearchPeople from './SearchPeople';
import { openModal } from 'actions/modal';

class AuthUser extends Component{
  render(){

    const { userId, userDetails, userBalance } = this.props

    return(
      <div className="user-panel">
        <Link to={`/profile/${userId}`} className="user-panel__scope">
          <Avatar
            className="avatar avatar--glow"
            user={userDetails} />
          <div className="user-panel__scope-contents">
            <div className="user-panel__name">{userDetails.username}, 24</div>
            <div className="user-panel__location">
              <SvgIcon name="location" />
              <span>Moscow, Russia</span>
            </div>
          </div>
        </Link>

        <div className="user-panel__actions">
          <div
            onClick={this.props.openModal.bind(this, {
              name: "premium",
              options: {
                activeTab: "promote"
              }
            })}
            className="panel-action panel-action--up">
            <div className="panel-action__icon">
              {userBalance.promote &&
                <div className="panel-action__counter"><span>{userBalance.promote}</span></div>
              }
              <SvgIcon name="star-stroke" />
            </div>
            <div className="panel-action__name">Поднять  <br/>объявление</div>
          </div>
          <div
            onClick={this.props.openModal.bind(this, {
              name: "premium",
              options: {
                activeTab: "vip"
              }
            })}
            className="panel-action panel-action--vip">
            <div className="panel-action__icon">
              <SvgIcon name="crown" />
            </div>
            <div className="panel-action__name">VIP <br/>аккаунт</div>
          </div>
        </div>

        <div className="user-panel__menu">
          <UserMenu />
        </div>

        <SearchPeople />

      </div>
    )
  }
}

AuthUser.propTypes = {
  userId: PropTypes.number,
  userDetails: PropTypes.object
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  userDetails: state.user.userDetails,
  userBalance: state.user.userBalance
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthUser);
