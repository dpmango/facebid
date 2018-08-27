import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import svg4everybody from 'svg4everybody';
import RenderSwitch from './Switch';
import Sidebar from './components/Sidebar/Sidebar';
import Gradients from './components/Helpers/Gradients'

class App extends Component {
  componentDidMount(){
    require('viewport-units-buggyfill').init({
      force: false,
      refreshDebounceWait: 150
    });

    svg4everybody();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="page container">
          <Sidebar />
          <div className="page__content">
            <RenderSwitch />
          </div>
          <Gradients />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
