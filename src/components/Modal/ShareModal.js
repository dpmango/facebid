import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { notify } from 'reapop';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from '../Modal/Modal';
import SvgIcon from '../Helpers/SvgIcon';
import Loading from '../Helpers/Loading';
import ShareButton from 'components/Shared/ShareButton';
import { closeModal } from 'actions/modal';
import MapArrToSelect from 'helpers/MapArrToSelect';

class ShareModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalName: 'share-event',
      userSelect: {},
      eventId: null,
      // copyUrl: 'Https:\\facebid.com/234boy2b3uyb235b503'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.modalOptions && (nextProps.modalOptions.eventId !== prevState.eventId)) {
      return { eventId: nextProps.modalOptions.eventId};
    } else {
      return null;
    }
  }

  hide = () => {
    this.props.closeModal()
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
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
        modalName, eventId, userSelect
      },
      props: {
        activeModal, id, modalOptions
      }
    } = this

    const copyUrl = `https://facebid.surge.sh/event/${eventId}`

    const providers = [
      { provider: 'vkontakte', verbose: "Вконтакте" },
      { provider: 'facebook', verbose: "Facebook" },
      { provider: 'odnoklassniki', verbose: "Одноклассники" },
      { provider: 'twitter', verbose: "Twitter" },
      { provider: 'gplus', verbose: "Google+" }
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
              { !modalOptions ?
                <Loading />
                :
                <div className="share__grid">
                  { providers.map((el, i) => (
                    <ShareButton
                      type="withName"
                      key={i}
                      url={copyUrl}
                      shareContents={modalOptions && modalOptions.shareContents}
                      provider={el.provider}
                      verbose={el.verbose} />
                  ))}
                </div>
              }
              <div className="modal-share__copy">
                <div className="ui-input ui-input--button">
                  <input
                    disabled
                    value={copyUrl}
                    type="text"/>
                  <CopyToClipboard text={copyUrl}
                    onCopy={this.copiedToClipboard}>
                    <button
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

ShareModal.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  modalOptions: state.modal.modalOptions
});

const mapDispatchToProps = (dispatch) => ({
  notify: (data) => dispatch(notify(data)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
