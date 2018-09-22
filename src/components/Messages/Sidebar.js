import React, {Component} from 'react';
import api from 'services/Api';
import SvgIcon from 'components/Helpers/SvgIcon';
import Image from 'components/Helpers/Image';


class Sidebar extends Component {
  constructor(){
    super()

    this.state = {
      activeTab: 1,
      dialogs: [],
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

  selectTab = (id) => {
    this.setState({activeTab: id})
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

  render(){
    const {
      props: {activeDialog},
      state: {activeTab, search, dialogs}
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

        <div className="ms-dialogs__scrollable">
          {dialogs.map(dialog => (
            <div
              key={dialog.id}
              onClick={this.dialogClick.bind(this, dialog.id)}
              className={"ms-dialog" + (activeDialog === dialog.id ? " is-current" : "")}>
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
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Sidebar
