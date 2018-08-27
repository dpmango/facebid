import React, {Component} from 'react';
import Gradients from './Helpers/Gradients'
import GeolocationRequest from './Modal/GeolocationRequest';

class Common extends Component {
  render(){
    return(
      <React.Fragment>
        <Gradients />
        <GeolocationRequest />
      </React.Fragment>
    )
  }
}

export default Common;
