import React, { Component } from 'react';
import api from '../../services/Api';
import FeaturedPeople from '../People/FeaturedPeople'

class Featured extends Component {
  constructor(){
    super()
    this.state = {
      featuredPeople: null
    }
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
          <span>Загрузка... </span>
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
      </div>
    )
  }
}

export default Featured
