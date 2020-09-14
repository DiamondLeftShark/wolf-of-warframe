/*Main Container: loaded into HTML document, and is in charge of rendering submodules/menus*/
import React from 'react';
import Menu from './menu.jsx';
import Landing from './landing.jsx';

class Container extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return(<div>
            <Menu />
            <h1>Testing!</h1>
            <Landing />
           </div>
    );
  }
};

export default Container;