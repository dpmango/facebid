import React, {Component} from 'react';
import api from '../../services/Api';
import SvgIcon from '../../components/Helpers/SvgIcon';

export default class NewUser extends Component {
  constructor(){
    super()

    this.state = {
      totalPosts: null
    }
  }

  componentDidMount(){
    api
      .get('postCounter')
      .then(res => {
        console.log(res)
        this.setState({
          totalPosts: res.data.totalPosts
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  loginUserClick = () => {
    // modal ?
    alert('тут будет модалка')
  }

  signupUserClick = () => {
    // modal ?
    alert('тут будет модалка')
  }

  socialLoginClick = (provider) => {
    alert(`Авторизация через ${provider}`)
  }

  render(){
    const {
      state: {
        totalPosts
      }
    } = this
    return (
      <div className="new-user">
        <div className="new-user__title">Создайте аккаунт</div>
        <div className="new-user__message t-secondary">Начинте общение уже сейчас! Получите доступ к <span>{totalPosts}</span> объявлениям в 2 клика!</div>
        <div className="new-user__cta">
          <a href="" onClick={this.loginUserClick} className="btn btn-outline btn--block">Войти</a>
          <a href="" onClick={this.signupUserClick} className="btn btn-primary btn--block">Зарегистрироваться</a>
        </div>
        <div className="new-user__socials">
          <div className="t-secondary t-center">Или войдите с помощью социальных сетей</div>
          <div className="social-list">
            <div onClick={this.socialLoginClick.bind(this, "facebook")} className="social-btn social-btn--facebook">
              <SvgIcon name="facebook" />
            </div>
            <div onClick={this.socialLoginClick.bind(this, "vkontakte")} className="social-btn social-btn--vkontakte">
              <SvgIcon name="vkontakte" />
            </div>
            <div onClick={this.socialLoginClick.bind(this, "instagram")} className="social-btn social-btn--instagram">
              <SvgIcon name="instagram" />
            </div>
            <div onClick={this.socialLoginClick.bind(this, "twitter")} className="social-btn social-btn--twitter">
              <SvgIcon name="twitter" />
            </div>
          </div>
        </div>
      </div>

    )
  }
}
