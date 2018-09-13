import React, {Component} from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../Helpers/SvgIcon';
import {openModal} from '../../actions/modal';

class NoEvents extends Component {
  render(){
    return(
      <div className="no-events">
        <div className="ntf-info">
          <div className="ntf-info__holder t-center">
            <SvgIcon name="smile-sad" />
            <div className="h4-title">У Вас нет событий</div>
            <p className="t-primary">Находите людей по интересам со всей планеты в считанные секунды</p>
            <button
              onClick={this.props.openModal.bind(this, 'create-event')}
              className="btn btn-primary">
              Создать событие
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoEvents);
