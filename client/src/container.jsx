/*Main Container: loaded into HTML document, and is in charge of rendering submodules/menus*/
import React from 'react';
import axios from 'axios';
import Menu from './menu.jsx';
import Landing from './landing.jsx';
import Ducats from './ducats.jsx';
import HotItems from './hot_items.jsx';
import rootUrl from './url.jsx';

class Container extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentTab: 'landing'
    };
    this.getCurrentTab = this.getCurrentTab.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
  }

  //gets latest data from Warframe Market API and updates the database.
  getLatestData() {

  }

  //check current tab and return appropriate component
  getCurrentTab() {
    if(this.state.currentTab === 'landing') {
      return <Landing />;
    }
    if(this.state.currentTab === 'ducats') {
      return <Ducats />;
    }
    if(this.state.currentTab === 'hot') {
      return <HotItems />;
    }
    //default to landing page if invalid tab is provided
    else {
      return <Landing />;
    }
  }

  //set current tab based on argument passed to function
  setCurrentTab(tab) {
    this.setState({currentTab: tab});
  }

  render() {
    let currentTab = this.getCurrentTab();
    return(<div>
            <Menu setTab={this.setCurrentTab}/>
            <h1>Testing!</h1>
            {currentTab}
           </div>
    );
  }
};

export default Container;