import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SimpleInput from '../Forms/SimpleInput';

class SearchPeople extends Component {
  constructor(){
    super()

    this.state = {
      searchValue: '',
      shouldRedirect: false
    }
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
    }
  }

  submitForm = () => {

    // TODO
    // do the API thigs and redirect to results page

    this.setState({
      shouldRedirect: true
    })
  }

  render(){

    const { searchValue, shouldRedirect } = this.state;

    if ( shouldRedirect ) {
      return <Redirect to="/" />
    }

    return (
      <div className="user-panel__search">
        <SimpleInput
          name="searchValue"
          placeholder="Поиск людей"
          icon="search"
          value={searchValue}
          onChangeHandler={this.handleChange}
          onKeyHandler={this.keyPressHandler} />
      </div>
    )
  }
}

export default SearchPeople
