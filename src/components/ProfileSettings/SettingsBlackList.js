import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Image from '../Helpers/Image';
import SvgIcon from '../Helpers/SvgIcon';
import Loading from '../Helpers/Loading';
import api from 'services/Api';

class SettingsBlackList extends Component {
  constructor(){
    super()

    this.state = {
      blackList: null
    }
  }

  componentDidMount(){
    this.getBlackList()
  }

  getBlackList = () => {
    api
      .get(`blacklist`)
      .then(res => {
        this.setState({
          blacklist: res.data
        })
      })
      .catch(err => {
        console.log('Some error')
      })
  }

  removePerson = (e, id) => {
    console.log(e, id)
    e.preventDefault();
    e.stopPropagation();

    api
      .delete(`blacklist/${id}`)
      .then(res => {
        this.getBlackList()
      })
      .catch(err => {
        console.log('Some error')
      })
  }

  render(){
    const { blacklist } = this.state;

    return(
      <React.Fragment>
        <div className="h4-title">В вашем списке {blacklist ? blacklist.length : 0} человек</div>
        <div className="face-list">
          { !blacklist &&
            <Loading />
          }
          { blacklist &&
            <div className="face-list__grid">
              {blacklist.map(person => (
                <div key={person.id} className="face-list__col">
                  <Link
                    to="/profile/2"
                    className="face-list__card">
                    <div className="face-list__card-wrapper">
                      <div className="face-list__avatar avatar avatar--big">
                        <Image file={person.avatar} />
                      </div>
                      <div className="face-list__name">{person.name}</div>
                      <div
                        onClick={(e) => this.removePerson(e, person.id)}
                        className="face-list__remove">
                        <SvgIcon name="close" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          }

        </div>
      </React.Fragment>
    )
  }
}

export default SettingsBlackList
