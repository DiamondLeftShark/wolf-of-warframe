/*Main Container: loaded into HTML document, and is in charge of rendering submodules/menus*/
import React from 'react';
import axios from 'axios';
import Menu from './menu.jsx';
import Landing from './landing.jsx';
import Ducats from './ducats.jsx';
import HotItems from './hot_items.jsx';
import rootUrl from './url.jsx';
import Inventory from './inventory.jsx';

class Container extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentTab: 'landing',
      inventory: null
    };
    this.getCurrentTab = this.getCurrentTab.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.getLatestData = this.getLatestData.bind(this);
    this.getInventory = this.getInventory.bind(this);
  }

  //gets latest data from Warframe Market API and updates the database.
  getLatestData() {
    let url = rootUrl.concat('latest');
    this.setState({currentTab: 'loading'});
    axios.get(url)
    .then((result) => {
      console.log("Latest data from Warframe Market retrieved.");
      this.setState  ({currentTab: 'landing'});
    })
    .catch((error) => {
      console.log("Error updating data, please try again.");
    });
  }

  getInventory() {
    let url=rootUrl.concat('inventory');
    axios.get(url)
    .then((result) => {
      console.log("User inventory data retrieved.");
      console.log(result.data);
      this.setState({inventory: result.data});
    })
    .catch((error) => {
      console.log("Error getting inventory data, please try again.");
    });
  }

  //check current tab and return appropriate component
  getCurrentTab() {
    if(this.state.currentTab === 'loading') {
      return (<div>Retrieving latest data from Warframe Market...</div>);
    }
    if(this.state.currentTab === 'landing') {
      return <Landing />;
    }
    if(this.state.currentTab === 'ducats') {
      return <Ducats inventory={this.state.inventory}/>;
    }
    if(this.state.currentTab === 'hot') {
      return <HotItems inventory={this.state.inventory}/>;
    }
    if(this.state.currentTab === 'inventory') {
      return <Inventory inventory={this.state.inventory} getInventory={this.getInventory}/>;
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

  componentDidMount() {
    this.getInventory();
  }

  render() {
    let currentTab = this.getCurrentTab();
    return(<div>
            <Menu setTab={this.setCurrentTab} getLatestData={this.getLatestData}/>
            {currentTab}
           </div>
    );
  }
};

export default Container;