import React, {Component} from 'react';
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
            <ul className="s-page__links-collection">
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Static
