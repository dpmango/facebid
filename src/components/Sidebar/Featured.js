import React, { Component } from 'react';
import api from '../../services/Api';
import FeaturedPeople from '../People/FeaturedPeople'
import Loading from '../Helpers/Loading';

class Featured extends Component {
  constructor(){
    super()
    this.state = {
      featuredPeople: null
    }
  }

  onFeaturedClick = () => {

  }

  componentDidMount(){
    api
      .get('featuredPeople')
      .then(res => {
        this.setState({
          featuredPeople: res.data
        })
      })
      .catch(err => {
        console.log(`Something wrong happens - ${err.data}`, err)
      })
  }

  render(){
    const { featuredPeople } = this.state

    return (
      <div className="sidebar__featured">
        { !featuredPeople &&
          <Loading />
        }
        { featuredPeople &&
          featuredPeople.map(person => {
            return (
              <FeaturedPeople
                key={person.id}
                data={person} />
            )
          })
        }
        <div className="sidebar__featured-cta">
          <button onClick={this.onFeaturedClick} className="btn btn-primary btn--block">Хочу сюда</button>
        </div>
      </div>
    )
  }
}

export default Featured
