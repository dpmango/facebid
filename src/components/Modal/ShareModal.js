import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { notify } from 'reapop';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import { closeModal } from '../../actions/modal';
import MapArrToSelect from '../../helpers/MapArrToSelect';

// TODO
// refresh the request every `1 hour` or so ?
// (compare geolocationRedux.timestamp with Date.now()

class ShareModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'share-event',
      userSelect: {},
      url: 'Https:\\facebid.com/234boy2b3uyb235b503'
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  copyToClipboard = (url) => {

  }

  copiedToClipboard = () => {
    this.props.notify({
      title: 'Скопировано',
      message: 'Ссылка успешно скопирована',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
  }

  render(){
    const {
      state: {
        modalName, url, userSelect
      },
      props: {
        activeModal
      }
    } = this

    const providers = [
      { provider: 'vkontakte', name: "Вконтакте" },
      { provider: 'facebook', name: "Facebook" },
      { provider: 'odnoklassniki', name: "Одноклассники" },
      { provider: 'twitter', name: "Twitter" },
      { provider: 'gplus', name: "Google+" }
    ]

    return(
      <Modal
        isActive={activeModal === modalName}
        onHide={this.hide}
        containerClass="modal__container--small"
        >
        <div className="modal__header">
          <div className="h4-title">
            Поделиться событием
          </div>
        </div>
        <div className="modal-share">
          <div className="modal-share__section">
            <div className="ui-group">
              <label htmlFor="">Кому:</label>
              <Select
                name="userSelect"
                searchable={true}
                noResultsText="Не найдено"
                autosize={false}
                value={userSelect}
                onChange={(e) => this.handleSelectChange(e, "userSelect")}
                placeholder="Введите имя пользователя"
                options={MapArrToSelect(
                  ["TO", "DO", "User lookup"]
                )
                }
              />
            </div>
          </div>
          <div className="modal-share__section">
            <div className="share">
              <span className="share__title">Отправить ссылку</span>
              <div className="share__grid">
                { providers.map(el => (
                  <ShareProvider
                    provider={el.provider}
                    name={el.name} />
                ))}
              </div>
              <div className="modal-share__copy">
                <div className="ui-input ui-input--button">
                  <input
                    disabled
                    value={url}
                    type="text"/>
                  <CopyToClipboard text={url}
                    onCopy={this.copiedToClipboard}>
                    <button
                      // onClick={this.copyToClipboard.bind(this, url)}
                      className="btn btn-outline" >
                      Копировать ссылку
                    </button>
                  </CopyToClipboard>

                </div>
              </div>
            </div>
          </div>
          <div className="modal-share__cta">
            <button className="btn btn-primary btn--iconed">
              <SvgIcon name="share" />
              <span>Поделиться</span>
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

class ShareProvider extends Component{

  shareAction = () => {

  }

  render(){
    const {
      props: { provider, name }
    } = this

    return(
      <div
        onClick={this.shareAction}
        className={`share__element share__element--${provider}`}>
        <div className="share__icon">
          <SvgIcon name={provider} />
        </div>
        <div className="share__name">
          {name}
        </div>
      </div>
    )
  }
}

ShareModal.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal
});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
