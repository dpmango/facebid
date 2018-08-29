import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import svg4everybody from 'svg4everybody';
import RenderSwitch from './Switch';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header'; // for tablet
import Common from './components/Common';

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
        <div className={"page container " + (this.props.pageClass)}>
          <Sidebar />
          <Header />
          <div className="page__content">
            <RenderSwitch />
          </div>
          <Common />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  pageClass: state.page.pageClass
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
