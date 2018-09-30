import React, {Component, Fragment} from 'react';
import api from 'services/Api';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SvgIcon from 'components/Helpers/SvgIcon';
import Image from 'components/Helpers/Image';


class Sidebar extends Component {
  constructor(){
    super()

    this.state = {
      activeTab: 1,
      dialogs: [],
      requests: [],
      search: ''
    }
  }

  componentDidMount(){
    this.getDialogs()
  }

  getDialogs = () => {
    api
      .get("messageDialogs")
      .then(res => {
        this.setState({
          dialogs: res.data
        })
      })
  }

  getRequests = () => {
    api
      .get("messageRequests")
      .then(res => {
        this.setState({
          requests: res.data
        })
      })
  }

  noDialogs = () => {
    // show empty window if nothing is present
    this.props.onEmpty()
  }

  selectTab = (id) => {
    this.setState({activeTab: id})

    if ( id !== this.state.activeTab ){
      console.log(id)
      id === 1 && this.getDialogs()
      id === 2 && this.getRequests()
    }
  }

  searchChanged = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.searchDialogis();
    }
  }

  searchDialogis = () => {
    // api something
    // and refresh state
  }


  // dialogs
  dialogClick = (id) => {
    this.props.onDialogClick(id)
  }

  renderDialog = (dialog) => {
    return(
      <Fragment>
        <div className="ms-dialog__avatar">
          {dialog.type === "private" &&
            <div className="avatar avatar--medium">
              <Image file={dialog.user.avatar} />
            </div>
          }
          {dialog.type === "group" &&
            <div className="avatar avatar--medium">
              <Image file={dialog.user.avatar} />
            </div>
          }
        </div>
        <div className="ms-dialog__content">
          <div className="ms-dialog__user-name">{dialog.user.name}</div>
          <div className="ms-dialog__short-text">{dialog.content}</div>
        </div>
      </Fragment>
    )
  }

  getDialogClass = (dialog) => {
    const {activeDialog} = this.props

    return "ms-dialog"
      + (activeDialog === dialog.id ? " is-current" : "")
      + (dialog.haveUnread ? " is-unread" : "")
  }
  render(){
    const {
      state: {activeTab, search, dialogs, requests}
    } = this;

    return(
      <div className="ms-dialogs">
        <div className="ms-dialogs__header">
          <div className="ms-dialogs__tabs">
            <div
              onClick={this.selectTab.bind(this, 1)}
              className={"ms-dialogs__tab" + (activeTab === 1 ? " is-active" : "")}>
              <div className="ms-dialogs__tab-name">Сообщения</div>
            </div>
            <div
              onClick={this.selectTab.bind(this, 2)}
              className={"ms-dialogs__tab" + (activeTab === 2 ? " is-active" : "")}>
              <div className="ms-dialogs__tab-name">Запросы
                <div className="ms-dialogs__tab-counter"><span>+3</span></div>
              </div>
            </div>
          </div>
        </div>

        { activeTab === 1 &&
          <div className="ms-dialogs__search">
            <div className="ms-dialogs__search-btn">
              <SvgIcon
                onClick={this.searchDialogis}
                name="search" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Введите фразу для поиска"
              onChange={this.searchChanged}
              onKeyPress={this.searchKeyPressed}
              value={search} />
          </div>
        }

        <PerfectScrollbar
          className="ms-dialogs__scrollable"
          option={{
            wheelSpeed: 1,
            wheelPropagation: false,
            suppressScrollX: true,
          }} >
          {activeTab === 1 && dialogs.map(dialog => (
            <div
              key={dialog.id}
              onClick={this.dialogClick.bind(this, dialog.id)}
              className={this.getDialogClass(dialog)}>
              {this.renderDialog(dialog)}
            </div>
          ))}
          {activeTab === 2 && requests.map(dialog => (
            <div
              key={dialog.id}
              onClick={this.dialogClick.bind(this, dialog.id)}
              className={this.getDialogClass(dialog)}>
              {this.renderDialog(dialog)}
            </div>
          ))}
        </PerfectScrollbar>

        <button
          className="ms-dialogs__blank-temp btn btn-primary"
          onClick={this.noDialogs}>(tmp) "нет диалогов"</button>
      </div>
    )
  }
}

export default Sidebar
