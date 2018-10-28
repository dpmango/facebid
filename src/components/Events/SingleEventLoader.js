import React, {Component} from 'react';
import api from 'services/Api';
import Loading from 'components/Helpers/Loading'
import EventCard from './Card/EventCard';

class SingleEventLoader extends Component{
  constructor(){
    super();

    this.state = {
      data: null
    }
  }

  componentDidMount(){
    this.getEventData()
  }

  getEventData = () => {
    const {eventId} = this.props;

    console.log(eventId)
    api
      .get(`events/${eventId}`)
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        console.log('error on GET events', err)
      })
  }

  render(){
    const {data} = this.state;

    if (!data){
      return <Loading />
    }

    return (
      <EventCard
        type="notification-inline"
        data={data} />
    )
  }
}

export default SingleEventLoader
