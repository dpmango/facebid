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
      console.log('seems to be the page has been changed')
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
        <h1 className="h2-title">{content.title}</h1>
        <div
          className="s-page__contents"
          dangerouslySetInnerHTML={{__html: content.content}}>
        </div>
      </div>
    )
  }
}

export default Static
