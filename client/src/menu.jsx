import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="menu">
        <ul>
          <li>Ducats</li>
          <li>Hot Items</li>
          <li>Get Latest Data</li>
        </ul>
      </div>
    );
  }
}

export default Menu;