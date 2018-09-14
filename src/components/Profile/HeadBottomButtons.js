import React, {Component, Fragment} from 'react';
import SvgIcon from '../Helpers/SvgIcon';

class HeadBottomButtons extends Component {

  toggleMoreBtn = () => {
    this.setState({
      moreMenuOpened: !this.state.moreMenuOpened
    })
  }

  render(){
    const { isMyProfile } = this.props

    return(
      <div className="p-head__bottom-cta">
        { isMyProfile &&
          <button
            onClick={this.props.onEnableEditMode}
            className="btn btn-primary btn--iconed">
            <SvgIcon name="pencil" />
            <span>Редактировать профиль</span>
          </button>
        }
        { !isMyProfile &&
          <Fragment>
            <button
              // onClick={}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="comments" />
              <span>Поболтать</span>
            </button>
            <button
              // onClick={}
              className="btn btn-primary btn--iconed">
              <SvgIcon name="plus" />
              <span>Пригласить</span>
            </button>
          </Fragment>
        }
      </div>
    )
  }
}

export default HeadBottomButtons
