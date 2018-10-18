import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import Loading from 'components/Helpers/Loading';
import api from 'services/Api';

class Static extends Component{
  constructor(){
    super();

    this.state = {
      pagename: null,
      content: null
    }
  }

  componentDidMount(){
    this.getContent();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.value !== prevState.value) {
      return { pagename: nextProps.match.params.id};
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match !== this.props.match){
      this.getContent();
    }
  }

  getContent = () => {
    const page = this.props.match.params.id

    api
      .get(`pages?slug=${page}`)
      .then(res => {
        this.setState({content: res.data[0]}) // TODO - change when API will be returning pure json object
      })
      .catch(err => {
        console.log('error happens when fetching pages')
      })
  }

  render(){
    const { content } = this.state;

    if ( !content ){
      return (
        <div className="s-page">
          <div className="centered-info">
            <div className="centered-info__holder">
              <Loading />
            </div>
          </div>
        </div>
      )
    }
    return(
      <div className="s-page">
        <div className="s-page__scrollable">
          <h1 className="h3-title">{content.title}</h1>
          <div
            className="s-page__contents"
            dangerouslySetInnerHTML={{__html: content.content}}>
          </div>
        </div>
        <div className="s-page__sidebar">
          <div className="s-page__sidebar-holder">
            <div className="h4-title">Помощь</div>
            <ul className="s-page__links-collection">
              <li><NavLink activeClassName="is-active" to="/info/about">Популярные вопросы</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Общие вопросы о Badoo</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Профиль</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Верификация профиля</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Знакомства</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Люди Рядом и Поиск</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Сообщения</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Badoo Premium</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Кредиты</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Популярность</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Фото и видео</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Настройки</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Конфиденциальность</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Варианты жалоб</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Мобильное приложение Badoo</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Правила сообщества</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Советы по безопасности</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/about">Условия обслуживания</NavLink></li>
              <li><NavLink activeClassName="is-active" to="/info/rules">Конфиденциальность</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Static
