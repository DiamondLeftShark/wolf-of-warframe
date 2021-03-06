import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="menu">
        <ul>
          <li onClick={()=>{this.props.setTab('inventory')}}>My Inventory</li>
          <li onClick={()=>{this.props.setTab('ducats')}}>Ducats</li>
          <li onClick={()=>{this.props.setTab('hot')}}>Hot Items</li>
          <li onClick={this.props.getLatestData}>Get Latest Data</li>
        </ul>
      </div>
    );
  }
}

export default Menu;