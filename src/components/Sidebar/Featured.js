import React, { Component } from 'react';
import {connect} from 'react-redux';
import api from 'services/Api';
import FeaturedCard from '../People/FeaturedCard'
import Loading from '../Helpers/Loading';
import { openModal } from 'actions/modal';

class Featured extends Component {
  constructor(){
    super()
    this.state = {
      featuredPeople: null
    }
  }

  onFeaturedClick = () => {
    if ( !this.props.userId ){
      this.props.openModal('signup');
      return
    }

    this.props.openModal({
      name: "premium",
      options: {
        activeTab: "vip"
      }
    })
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
        { !featuredPeople ?
          <Loading />
          :
          featuredPeople.map(person => (
            <FeaturedCard
              key={person.id}
              data={person} />
          ))
        }
        <div className="sidebar__featured-cta">
          <button onClick={this.onFeaturedClick} className="btn btn-primary btn--block">Хочу сюда</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Featured)
