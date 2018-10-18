import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import api from 'services/Api';
import Avatar from 'components/Shared/Avatar';
import SimpleInput from '../Forms/SimpleInput';

class SearchPeople extends Component {
  constructor(){
    super()

    this.state = {
      searchValue: '',
      people: null
    }

    this.throttledOnchange = debounce(this.searchPeople, 200);
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState(
      {...this.state, [fieldName]: fieldVal},
      () => this.throttledOnchange()
    );
  }

  searchPeople = () => {
    const { searchValue } = this.state;

    if ( searchValue.length >= 2 ){
      api
        .get(`peopleSearch?q=${searchValue}`)
        .then(res => {
          this.setState({people: res.data})
        })
        .catch(err => {
          console.log('error happends trying to fetch people')
        })
    } else {
      this.setState({people: null}) // null and show nothing
    }
  }

  highlightMatch = (str) => {
    const { searchValue } = this.state;
    let result = str;

    const regEx = new RegExp(searchValue, 'gi'); // case insensative
    result = result.replace(regEx, (str) => '<b>'+str+'</b>')
    return {__html: result}
  }

  render(){
    const { searchValue, people } = this.state;

    return (
      <div className="user-panel__search ui-search-wrapper">
        <SimpleInput
          name="searchValue"
          placeholder="Поиск людей"
          icon="search"
          extraClass="is-dropdown"
          keepFocus={true}
          isClearable={true}
          value={searchValue}
          onChangeHandler={this.handleChange} />
        { people &&
          <div className="ui-search-drop">
            { people.length > 0 ?
              <Fragment>
                {people.map(x => (
                  <Link
                    onClick={() => this.setState({people: null, searchValue: ""})}
                    to={`/profile/${x.user.id}`}
                    key={x.id}
                    className="ui-search-person">
                    <Avatar
                      className="avatar avatar--small"
                      user={x.user} />
                    <div className="ui-search-person__contents">
                      <div className="ui-search-person__username" dangerouslySetInnerHTML={this.highlightMatch(x.user.username)} />
                      <div className="ui-search-person__name" dangerouslySetInnerHTML={this.highlightMatch(x.user.name)} />
                    </div>
                  </Link>
                ))}
              </Fragment>
              :
              <span className="ui-search-drop__no-res">Поиск не дал результатов</span>
            }
          </div>
        }
      </div>
    )
  }
}

export default SearchPeople
