import React, {Component} from 'react';
import {connect} from 'react-redux';
import Image from '../Helpers/Image';
import Loading from '../Helpers/Loading';
import api from '../../services/Api';

class SubscribersList extends Component {
  constructor(props){
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount(){
    this.props.onRef(this)
    this.getUserList()
  }

  componentWillUnmount(){
    this.props.onRef(undefined)
  }

  getUserList = () => {
    const { type } = this.props
    const endPoint = (type === "subscribers") ? "subscribers" : "subscribed"

    console.log('getting users')
    api
      .get(endPoint)
      .then(res => {
        let data = this.state.list;
        [1,2,3,4,5,6,7,8,9,10]
          .forEach(x => {
            data = data.concat(res.data)
          })

        this.setState({
          list: data
        }, () => console.log(this.state.list))
      })
      .catch(err => {
        console.log(err)
        // console.log('error fetching subscribers')
      })
  }


  // action events
  subscribeClick = (id) => {

  }

  unsubscribeClick = (id) => {

  }

  render(){
    const {
      state: {list}
    } = this

    return(
      <div className="subscribers">
        {list.length === 0 &&
          <Loading />
        }
        { list.length > 0 &&
          list.map((el, index) => (
            <div
              key={index}
              className="subscribers__el">
              <div className="subscribers__content">
                <div className="avatar avatar--small">
                  <Image file={el.avatar} />
                </div>
                <div className="subscribers__content-main">
                  <div className="subscribers__name">{el.name}, {el.age}</div>
                  <div className="subscribers__distance">{el.distance}</div>
                </div>
              </div>
              <div className="subscribers__cta">
                { !el.subscribed ?
                  <button
                    className="btn btn-outline"
                    onClick={this.subscribeClick.bind(this, el.id)}>
                    Подписаться
                  </button>
                  :
                  <button
                    className="btn btn-outline btn-outline--muted"
                    onClick={this.unsubscribeClick.bind(this, el.id)}>
                    Отписаться
                  </button>
                }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
});

export default connect(mapStateToProps, null)(SubscribersList);
