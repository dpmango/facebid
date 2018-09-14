import React, { Component } from 'react';
import api from '../../services/Api';
import FeaturedCard from './FeaturedCard'
import Loading from '../Helpers/Loading';

class RecommendedProfiles extends Component {
  constructor(){
    super()
    this.state = {
      rocommendedProfiles: null
    }
  }

  componentDidMount(){
    api
      .get('rocommendedProfiles')
      .then(res => {
        this.setState({
          rocommendedProfiles: res.data
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  render(){
    const { rocommendedProfiles } = this.state

    return (
      <div className="events__f-people">
        <div className="h3-title">Похожие профили</div>
        { !rocommendedProfiles &&
          <Loading />
        }
        { rocommendedProfiles &&
          <div className="events__f-people-wrapper">
            {rocommendedProfiles.map(person => {
              return (
                <div
                  key={person.id}
                  className="events__f-people-col">
                  <FeaturedCard
                    noEvent={true}
                    data={person} />
                </div>
              )
            })}
          </div>

        }
      </div>
    )
  }
}

export default RecommendedProfiles
